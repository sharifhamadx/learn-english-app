
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

  const storyWords = useMemo(() => lesson.story.split(' '), [lesson.story]);

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
      if (audio.duration) {
        const progress = audio.currentTime / audio.duration;
        const index = Math.floor(progress * storyWords.length);
        setActiveWordIndex(index);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.playbackRate = playbackRate;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioUrl, storyWords.length, playbackRate]);

  const saveProgress = async (finalScore: number) => {
    if (!user || !db) return;
    
    try {
      // 1. Save Lesson Progress
      const progressRef = doc(db, 'users', user.uid, 'lessonProgress', lesson.id);
      setDoc(progressRef, {
        lessonId: lesson.id,
        score: finalScore,
        totalQuestions: lesson.questions.length,
        timeSpent,
        completedAt: serverTimestamp(),
      }, { merge: true });

      // 2. Update User Gamification Data
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      const xpEarned = (finalScore * 50) + 100; // Base 100 + 50 per correct answer
      const today = new Date().toISOString().split('T')[0];

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const lastActive = userData.lastActiveDate || "";
        let newStreak = userData.streak || 0;

        if (lastActive !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (lastActive === yesterdayStr) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        }

        updateDoc(userRef, {
          xp: increment(xpEarned),
          streak: newStreak,
          lastActiveDate: today,
          lastLogin: serverTimestamp()
        });
      } else {
        // Initial setup for new user doc if missing
        setDoc(userRef, {
          xp: xpEarned,
          streak: 1,
          lastActiveDate: today,
          lastLogin: serverTimestamp()
        }, { merge: true });
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

  const handleDownloadAudio = () => {
    if (!audioUrl) return;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${lesson.title}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Audio Downloaded", description: "The lesson audio has been saved to your device." });
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
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 pb-24 px-4">
      {/* Persistent Audio Header */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-2xl py-3 border-b-2 border-primary/10 transition-all duration-300">
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-primary border-primary bg-primary/5 font-black uppercase text-[9px] tracking-widest">{lesson.difficulty}</Badge>
                <span className="text-muted-foreground text-[9px] font-black flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  <Clock className="h-2.5 w-2.5" /> {formatTime(timeSpent)}
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-black text-primary font-headline tracking-tight truncate max-w-sm">{lesson.title}</h1>
            </div>
            
            <div className="flex items-center gap-2 bg-white/40 dark:bg-black/20 p-1.5 rounded-xl border border-white/50 shadow-sm">
              <Button variant="ghost" size="icon" onClick={handleStopAudio} disabled={!audioUrl} className="rounded-lg h-9 w-9 hover:bg-destructive/10 text-destructive">
                <RotateCcw className="h-4 w-4" />
              </Button>

              <div className="h-6 w-px bg-border/50 mx-1" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 px-2 rounded-lg font-black text-[10px] gap-1 hover:bg-primary/10">
                    <FastForward className="h-3.5 w-3.5 text-primary" />
                    {playbackRate}x
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl border-none shadow-2xl p-2 bg-white/90 backdrop-blur-xl">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <DropdownMenuItem 
                      key={rate} 
                      onClick={() => setPlaybackRate(rate)}
                      className={cn(
                        "rounded-lg font-black text-xs px-4 py-2 cursor-pointer transition-colors",
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
                className="rounded-lg bg-primary text-white font-black hover:bg-primary/90 px-4 h-9 shadow-lg shadow-primary/20 transition-all active:scale-95 text-[10px] gap-2"
              >
                {isAudioLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isAudioLoading ? '...' : isPlaying ? 'Pause' : 'Play'}
              </Button>

              <div className="h-6 w-px bg-border/50 mx-1" />

              <Button variant="outline" onClick={handleDownloadAudio} disabled={!audioUrl} size="icon" className="rounded-lg h-9 w-9 border-2 hover:bg-accent/10 hover:text-accent border-accent/20">
                <Volume2 className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" onClick={handleDownloadPDF} size="icon" className="rounded-lg h-9 w-9 border-2 border-primary/20">
                <FileDown className="h-3.5 w-3.5 text-primary" />
              </Button>
            </div>
          </div>

          <div className="space-y-0.5 px-1">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="py-1 cursor-pointer"
            />
            <div className="flex justify-between text-[8px] font-black text-muted-foreground/60 uppercase tracking-widest font-mono">
              <span>{formatAudioTime(currentTime)}</span>
              <span>{formatAudioTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl || undefined} onEnded={() => setIsPlaying(false)} className="hidden" />

      {isCompleted && (
        <Card className="border-none bg-gradient-to-br from-primary to-blue-600 text-white animate-in zoom-in-95 duration-500 rounded-[2rem] overflow-hidden shadow-xl shadow-primary/30">
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-inner backdrop-blur-md">
              <Trophy className="h-8 w-8 text-accent" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black">Success!</h2>
              <p className="text-white/80 text-lg">Score: <span className="font-black text-accent">{score}</span> / {lesson.questions.length}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              {!isLastLesson && (
                <Button asChild size="lg" className="bg-accent text-primary font-black h-12 px-8 rounded-xl shadow-xl hover:bg-white transition-all hover:scale-105">
                  <Link href={`/lessons/${nextLessonId}`}>
                    Continue Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="h-12 rounded-xl border-white/30 bg-white/10 hover:bg-white/20 text-white" asChild>
                <Link href="/lessons">Catalog</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-muted/50 backdrop-blur-md rounded-2xl border border-white">
          <TabsTrigger value="story" className="rounded-xl font-black text-base data-[state=active]:shadow-md">Story</TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-xl font-black text-base data-[state=active]:shadow-md">Quiz</TabsTrigger>
          <TabsTrigger value="grammar" className="rounded-xl font-black text-base data-[state=active]:shadow-md">Grammar</TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="mt-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white/80 dark:bg-card/50 backdrop-blur-sm border border-white">
            <div className="h-64 md:h-80 relative group overflow-hidden">
              <img src={`https://picsum.photos/seed/${lesson.imageSeed}/1200/600`} alt="Illustration" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-white/80 px-2 py-0.5 rounded-full">Interactive Narrative</span>
              </div>
            </div>
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-wrap gap-x-1.5 gap-y-3 leading-relaxed text-lg md:text-xl text-foreground/90 font-medium">
                {storyWords.map((word, i) => (
                  <Popover key={i} onOpenChange={(open) => open && handleTranslate(word)}>
                    <PopoverTrigger asChild>
                      <span className={cn(
                        "cursor-help transition-all duration-300 px-1 rounded-lg underline-offset-4 decoration-1",
                        activeWordIndex === i 
                          ? "bg-primary text-white scale-105 shadow-md shadow-primary/30 underline decoration-white" 
                          : "hover:text-primary hover:bg-primary/5 hover:underline decoration-primary/30"
                      )}>
                        {word}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 text-center rounded-2xl shadow-2xl border-none bg-primary text-primary-foreground">
                      <div className="space-y-3">
                        <div className="space-y-0.5">
                          <p className="text-[8px] opacity-70 font-black uppercase tracking-widest">Meaning</p>
                          <p className="text-lg font-black">{word.replace(/[^a-zA-Z]/g, '')}</p>
                        </div>
                        <div className="h-0.5 bg-white/20 w-8 mx-auto rounded-full" />
                        {translation ? (
                          <p className="text-xl font-black text-accent font-arabic" dir="rtl">{translation}</p>
                        ) : (
                          <div className="flex justify-center py-1"><Loader2 className="h-4 w-4 animate-spin" /></div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {lesson.questions.map((q, idx) => (
              <Card key={q.id} className="border-none shadow-lg rounded-[2rem] overflow-hidden transition-all">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20">
                        {idx + 1}
                      </div>
                      <span className="text-base font-black text-primary uppercase tracking-widest">Question</span>
                    </div>
                    {feedback[q.id] && (
                      <Badge className={cn("px-3 py-1 rounded-full text-xs font-bold border-none", feedback[q.id].correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                        {feedback[q.id].correct ? 'CORRECT' : 'INCORRECT'}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xl font-bold leading-tight text-slate-800 dark:text-slate-100">{q.text}</p>
                  
                  {q.type === 'multiple-choice' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options?.map(opt => (
                        <Button
                          key={opt}
                          variant={answers[q.id] === opt ? "default" : "outline"}
                          className={cn("h-16 text-lg rounded-xl border-2 transition-all font-bold", answers[q.id] === opt && "border-primary bg-primary text-white shadow-md", feedback[q.id] && opt === q.correctAnswer && "border-green-500 bg-green-50 text-green-700")}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                          disabled={!!feedback[q.id]}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <Input placeholder="Answer in English..." value={answers[q.id] || ''} onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))} className="h-16 text-center text-xl rounded-xl border-2 focus:border-primary font-bold" disabled={!!feedback[q.id]} />
                  )}

                  {!feedback[q.id] && (
                    <Button onClick={() => handleQuizSubmit(q.id, answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim())} disabled={!answers[q.id]} className="w-full h-14 rounded-xl bg-primary text-white font-black text-lg shadow-lg hover:scale-[1.01] active:scale-95 transition-all">Verify</Button>
                  )}

                  {feedback[q.id] && (
                    <div className={cn("p-4 rounded-xl flex items-center justify-center gap-3 font-black text-base border-2", feedback[q.id].correct ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700")}>
                      {feedback[q.id].correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                      {feedback[q.id].message}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grammar" className="mt-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-card dark:to-background border border-white">
            <div className="p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-2xl shadow-inner">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-black text-primary tracking-tight">{lesson.grammarPoint}</h2>
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-medium italic border-l-4 border-primary/20 pl-6">
                {lesson.grammarExplanation}
              </p>
              <div className="bg-primary/5 p-6 rounded-2xl border-2 border-dashed border-primary/20 space-y-3">
                <div className="inline-flex items-center gap-2 bg-primary text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Live Usage
                </div>
                <p className="text-xl md:text-2xl font-black italic text-slate-800 dark:text-slate-100">"Sharif has never given up."</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
