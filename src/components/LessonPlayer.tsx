
"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { Lesson } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  Pause, 
  Loader2, 
  Clock, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  FastForward, 
  FileDown,
  Volume2
} from 'lucide-react';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { translateWord } from '@/ai/flows/translate-word';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from "jspdf";
import { useFirestore, useUser } from '@/firebase';
import { doc, setDoc, serverTimestamp, getDoc, updateDoc, increment } from 'firebase/firestore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [activeTab, setActiveTab] = useState('story');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; message: string }>>({});
  const [score, setScore] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [translation, setTranslation] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const db = useFirestore();
  const { user } = useUser();

  const lessonNumber = parseInt(lesson.id.replace('lesson-', ''));
  const nextLessonId = `lesson-${lessonNumber + 1}`;
  const isLastLesson = lessonNumber >= 300;

  const storyWords = useMemo(() => lesson.story.split(/\s+/), [lesson.story]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCompleted && activeTab === 'story') setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, isCompleted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && audio.duration > 0) {
        // Heuristic mapping: linear distribution of words over duration
        const progress = audio.currentTime / audio.duration;
        const index = Math.floor(progress * storyWords.length);
        setActiveWordIndex(index);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setActiveWordIndex(null);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.playbackRate = playbackRate;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl, storyWords.length, playbackRate]);

  const saveProgress = async (finalScore: number) => {
    if (!user || !db) return;
    
    try {
      const progressRef = doc(db, 'users', user.uid, 'lessonProgress', lesson.id);
      setDoc(progressRef, {
        lessonId: lesson.id,
        score: finalScore,
        totalQuestions: lesson.questions.length,
        timeSpent,
        completedAt: serverTimestamp(),
      }, { merge: true });

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      const xpEarned = (finalScore * 50) + 100;
      const today = new Date().toISOString().split('T')[0];

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const lastActive = userData.lastActiveDate || "";
        let newStreak = userData.streak || 0;

        if (lastActive !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          newStreak = lastActive === yesterdayStr ? newStreak + 1 : 1;
        }

        updateDoc(userRef, {
          xp: increment(xpEarned),
          streak: newStreak,
          lastActiveDate: today,
          lastLogin: serverTimestamp()
        });
      }
    } catch (e) {
      console.error("Error saving progress", e);
    }
  };

  const handleTogglePlay = async () => {
    if (audioUrl) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }
    
    setIsAudioLoading(true);
    try {
      const result = await textToSpeech({ text: lesson.story });
      setAudioUrl(result.audioUri);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.playbackRate = playbackRate;
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    } catch (error) {
      toast({ variant: "destructive", title: "Audio Error", description: "Failed to generate speech." });
    } finally {
      setIsAudioLoading(false);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setActiveWordIndex(null);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleTranslate = async (word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    setTranslation(null);
    try {
      const result = await translateWord({ word: cleanWord, context: lesson.story });
      setTranslation(result.arabicTranslation);
    } catch (error) {
      setTranslation("Error translating");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(lesson.title, 20, 20);
    doc.text(lesson.story, 20, 30, { maxWidth: 170 });
    doc.save(`${lesson.title}.pdf`);
  };

  const formatAudioTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuizSubmit = (qId: string, isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    
    const newFeedback = { ...feedback, [qId]: { correct: isCorrect, message: isCorrect ? 'Excellent!' : `Answer: ${lesson.questions.find(q => q.id === qId)?.correctAnswer}` } };
    setFeedback(newFeedback);

    if (Object.keys(newFeedback).length === lesson.questions.length) {
      setIsCompleted(true);
      saveProgress(newScore);
      toast({ title: "Lesson Mastered!", description: "XP and Streak updated." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 pb-24 px-4 relative">
      {/* Dynamic Persistent Audio Header */}
      <div className="sticky top-0 z-[100] bg-background/95 backdrop-blur-2xl py-6 border-b-4 border-primary/10 shadow-2xl -mx-4 px-6 transition-all duration-500 rounded-b-[2rem]">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-primary border-primary bg-primary/5 font-black uppercase text-[10px] py-1 px-4 tracking-widest">{lesson.difficulty}</Badge>
                <span className="text-muted-foreground text-[10px] font-black flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full uppercase tracking-tighter shadow-inner">
                  <Clock className="h-3 w-3" /> {formatTime(timeSpent)}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-primary font-headline tracking-tighter truncate max-w-sm">{lesson.title}</h1>
            </div>
            
            <div className="flex items-center gap-2 bg-white dark:bg-black/30 p-2 rounded-2xl border-2 border-primary/5 shadow-xl">
              <Button variant="ghost" size="icon" onClick={handleStopAudio} disabled={!audioUrl} className="rounded-xl h-12 w-12 hover:bg-destructive/10 text-destructive transition-all">
                <RotateCcw className="h-5 w-5" />
              </Button>

              <div className="h-10 w-px bg-border/50 mx-1" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-12 px-4 rounded-xl font-black text-xs gap-2 hover:bg-primary/10">
                    <FastForward className="h-4 w-4 text-primary" />
                    {playbackRate}x
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2 bg-white/90 backdrop-blur-xl">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <DropdownMenuItem 
                      key={rate} 
                      onClick={() => setPlaybackRate(rate)}
                      className={cn(
                        "rounded-xl font-black text-xs px-4 py-2 cursor-pointer transition-colors",
                        playbackRate === rate ? "bg-primary text-white" : "hover:bg-primary/5"
                      )}
                    >
                      {rate === 1 ? 'Normal' : `${rate}x`}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                onClick={handleTogglePlay} 
                disabled={isAudioLoading}
                className="rounded-xl bg-primary text-white font-black hover:bg-primary/90 px-8 h-12 shadow-2xl shadow-primary/30 transition-all active:scale-95 text-sm gap-3"
              >
                {isAudioLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                {isAudioLoading ? 'جاري التحميل...' : isPlaying ? 'إيقاف' : 'تشغيل القصة'}
              </Button>

              <div className="h-10 w-px bg-border/50 mx-1" />

              <Button variant="outline" onClick={handleDownloadPDF} size="icon" className="rounded-xl h-12 w-12 border-2 border-primary/20 hover:bg-primary/5">
                <FileDown className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>

          <div className="space-y-2 px-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="py-1 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] font-mono">
              <span>{formatAudioTime(currentTime)}</span>
              <span>{formatAudioTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl || undefined} className="hidden" />

      {isCompleted && (
        <Card className="border-none bg-gradient-to-br from-primary to-blue-600 text-white animate-in zoom-in-95 duration-500 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <CardContent className="p-12 text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center shadow-inner backdrop-blur-md">
              <Trophy className="h-12 w-12 text-accent" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-black">أحسنت يا بطل!</h2>
              <p className="text-white/80 text-2xl font-medium">لقد أتممت الفصل بنجاح بنتيجة: <span className="font-black text-accent">{score}</span> من {lesson.questions.length}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              {!isLastLesson && (
                <Button asChild size="lg" className="bg-accent text-primary font-black h-16 px-12 rounded-2xl shadow-2xl hover:bg-white transition-all hover:scale-105">
                  <Link href={`/lessons/${nextLessonId}`}>
                    الفصل التالي <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-white/30 bg-white/10 hover:bg-white/20 text-white font-black" asChild>
                <Link href="/lessons">قائمة الفصول</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-20 p-2 bg-muted/50 backdrop-blur-md rounded-[2.5rem] border-2 border-white shadow-inner">
          <TabsTrigger value="story" className="rounded-2xl font-black text-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-2xl transition-all">القصة</TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-2xl font-black text-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-2xl transition-all">اختبار</TabsTrigger>
          <TabsTrigger value="grammar" className="rounded-2xl font-black text-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-2xl transition-all">القواعد</TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="mt-10">
          <Card className="border-none shadow-2xl rounded-[4rem] overflow-hidden bg-white/90 dark:bg-card/50 backdrop-blur-sm border border-white">
            <div className="h-[300px] md:h-[550px] relative group overflow-hidden">
              <Image 
                src={`https://picsum.photos/seed/${lesson.imageSeed}/1200/800`} 
                alt="Sudanese Students Learning" 
                fill
                className="object-cover transition-transform duration-[3000ms] group-hover:scale-110" 
                data-ai-hint="Sudanese students"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 flex items-center gap-4">
                <div className="bg-white/90 p-3 rounded-2xl shadow-2xl animate-pulse">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <span className="text-sm font-black uppercase tracking-[0.3em] text-primary bg-white/90 px-6 py-2 rounded-full shadow-2xl">رواية تفاعلية</span>
              </div>
            </div>
            <CardContent className="p-12 md:p-20">
              <div className="flex flex-wrap gap-x-3 gap-y-6 leading-relaxed text-2xl md:text-3xl text-foreground/90 font-medium select-none" dir="ltr">
                {storyWords.map((word, i) => (
                  <Popover key={i} onOpenChange={(open) => open && handleTranslate(word)}>
                    <PopoverTrigger asChild>
                      <span className={cn(
                        "cursor-help transition-all duration-300 px-2 py-1 rounded-2xl underline-offset-8 decoration-4",
                        activeWordIndex === i 
                          ? "bg-primary text-white scale-110 shadow-2xl shadow-primary/40 underline decoration-accent font-black" 
                          : "hover:text-primary hover:bg-primary/5 hover:underline decoration-primary/30"
                      )}>
                        {word}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-8 text-center rounded-[2.5rem] shadow-2xl border-none bg-primary text-primary-foreground animate-in slide-in-from-top-4">
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <p className="text-[10px] opacity-70 font-black uppercase tracking-widest">المعنى بالعربي</p>
                          <p className="text-2xl font-bold">{word.replace(/[^a-zA-Z]/g, '')}</p>
                        </div>
                        <div className="h-1 bg-white/20 w-16 mx-auto rounded-full" />
                        {translation ? (
                          <p className="text-3xl font-black text-accent font-arabic leading-tight" dir="rtl">{translation}</p>
                        ) : (
                          <div className="flex justify-center py-2"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-10 space-y-10">
          <div className="grid grid-cols-1 gap-10">
            {lesson.questions.map((q, idx) => (
              <Card key={q.id} className="border-none shadow-2xl rounded-[3rem] overflow-hidden transition-all hover:shadow-[0_50px_100px_rgba(0,0,0,0.1)] bg-white/80">
                <CardContent className="p-12 space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl shadow-2xl shadow-primary/20">
                        {idx + 1}
                      </div>
                      <span className="text-xl font-black text-primary uppercase tracking-widest">السؤال</span>
                    </div>
                    {feedback[q.id] && (
                      <Badge className={cn("px-6 py-2 rounded-full text-xs font-black border-none shadow-lg", feedback[q.id].correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                        {feedback[q.id].correct ? 'إجابة صحيحة' : 'إجابة خاطئة'}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-3xl font-bold leading-tight text-slate-900" dir="ltr">{q.text}</p>
                  
                  {q.type === 'multiple-choice' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" dir="ltr">
                      {q.options?.map(opt => (
                        <Button
                          key={opt}
                          variant={answers[q.id] === opt ? "default" : "outline"}
                          className={cn("h-20 text-xl rounded-2xl border-2 transition-all font-bold shadow-md", answers[q.id] === opt && "border-primary bg-primary text-white shadow-2xl scale-[1.02]", feedback[q.id] && opt === q.correctAnswer && "border-green-500 bg-green-50 text-green-700")}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                          disabled={!!feedback[q.id]}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <Input placeholder="اكتب الإجابة هنا بالإنجليزية..." value={answers[q.id] || ''} onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))} className="h-20 text-center text-2xl rounded-2xl border-4 focus:border-accent font-black transition-all bg-muted/20" disabled={!!feedback[q.id]} dir="ltr" />
                  )}

                  {!feedback[q.id] && (
                    <Button onClick={() => handleQuizSubmit(q.id, answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim())} disabled={!answers[q.id]} className="w-full h-20 rounded-2xl bg-primary text-white font-black text-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">تحقق من الإجابة</Button>
                  )}

                  {feedback[q.id] && (
                    <div className={cn("p-8 rounded-3xl flex items-center justify-center gap-6 font-black text-xl border-4 shadow-inner", feedback[q.id].correct ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700")}>
                      {feedback[q.id].correct ? <CheckCircle2 className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
                      {feedback[q.id].message}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grammar" className="mt-10">
          <Card className="border-none shadow-2xl rounded-[4rem] overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-card dark:to-background border border-white">
            <div className="p-12 md:p-20 space-y-12">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-accent/20 rounded-[2.5rem] shadow-inner">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-5xl font-black text-primary tracking-tighter">{lesson.grammarPoint}</h2>
              </div>
              <p className="text-2xl md:text-3xl leading-relaxed text-muted-foreground font-medium italic border-l-8 border-primary/20 pl-10">
                {lesson.grammarExplanation}
              </p>
              <div className="bg-primary/5 p-10 rounded-[3rem] border-4 border-dashed border-primary/10 space-y-6">
                <div className="inline-flex items-center gap-3 bg-primary text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                  مثال حي من القصة
                </div>
                <p className="text-3xl md:text-5xl font-black italic text-slate-900" dir="ltr">"Sharif has never given up."</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
