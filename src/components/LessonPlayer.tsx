
"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { Lesson } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Play, Pause, Download, Loader2, Clock, Trophy, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { translateWord } from '@/ai/flows/translate-word';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from "jspdf";
import { useFirestore, useUser } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const db = useFirestore();
  const { user } = useUser();

  const lessonNumber = parseInt(lesson.id.replace('lesson-', ''));
  const nextLessonId = `lesson-${lessonNumber + 1}`;
  const isLastLesson = lessonNumber >= 300;

  const storyWords = useMemo(() => lesson.story.split(' '), [lesson.story]);

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCompleted && activeTab === 'story') setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, isCompleted]);

  // Sync highlighting with audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        const progress = audio.currentTime / audio.duration;
        const index = Math.floor(progress * storyWords.length);
        setActiveWordIndex(index);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audioUrl, storyWords.length]);

  const saveProgress = async (finalScore: number) => {
    if (!user || !db) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'lessonProgress', lesson.id), {
        score: finalScore,
        totalQuestions: lesson.questions.length,
        timeSpent,
        completedAt: serverTimestamp(),
      }, { merge: true });
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
      // Wait for audio element to load the source
      setTimeout(() => {
        audioRef.current?.play();
        setIsPlaying(true);
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
      toast({ title: "Lesson Mastered!", description: "Progress saved to your profile." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-4">
      {/* Persistent Audio Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sticky top-16 z-30 bg-background/90 backdrop-blur-xl py-6 border-b-2 border-primary/10 transition-all duration-300">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-primary border-primary bg-primary/5 font-bold uppercase tracking-wider">{lesson.difficulty}</Badge>
            <span className="text-muted-foreground text-sm font-bold flex items-center gap-1 bg-muted px-2 py-0.5 rounded-lg">
              <Clock className="h-3.5 w-3.5" /> {formatTime(timeSpent)}
            </span>
          </div>
          <h1 className="text-3xl font-black text-primary font-headline tracking-tight">{lesson.title}</h1>
        </div>
        <div className="flex gap-2 bg-white/50 dark:bg-black/20 p-2 rounded-2xl shadow-sm border border-white">
          <Button variant="ghost" size="icon" onClick={handleStopAudio} disabled={!audioUrl} className="rounded-xl hover:bg-destructive/10 text-destructive">
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleTogglePlay} 
            disabled={isAudioLoading}
            className="rounded-xl bg-primary text-white font-black hover:bg-primary/90 px-6 h-12 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            {isAudioLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span className="ml-2">{isAudioLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Listen Now'}</span>
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF} size="icon" className="rounded-xl h-12 w-12 border-2">
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={audioUrl || undefined} 
        onEnded={() => setIsPlaying(false)} 
        className="hidden" 
      />

      {isCompleted && (
        <Card className="border-none bg-gradient-to-br from-primary to-blue-600 text-white animate-in zoom-in-95 duration-500 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/30">
          <CardContent className="p-10 text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center shadow-inner backdrop-blur-md">
              <Trophy className="h-12 w-12 text-accent" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black">Success!</h2>
              <p className="text-white/80 text-xl">Score: <span className="font-black text-accent">{score}</span> / {lesson.questions.length}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              {!isLastLesson && (
                <Button asChild size="lg" className="bg-accent text-primary font-black h-16 px-12 rounded-2xl shadow-xl hover:bg-white transition-all hover:scale-105">
                  <Link href={`/lessons/${nextLessonId}`}>
                    Continue Journey <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="h-16 rounded-2xl border-white/30 bg-white/10 hover:bg-white/20 text-white" asChild>
                <Link href="/lessons">Browse Catalog</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-16 p-1.5 bg-muted/50 backdrop-blur-md rounded-[2rem] border border-white">
          <TabsTrigger value="story" className="rounded-[1.5rem] font-bold text-lg data-[state=active]:shadow-lg">Story</TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-[1.5rem] font-bold text-lg data-[state=active]:shadow-lg">Quiz</TabsTrigger>
          <TabsTrigger value="grammar" className="rounded-[1.5rem] font-bold text-lg data-[state=active]:shadow-lg">Grammar</TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="mt-8">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white/80 dark:bg-card/50 backdrop-blur-sm border border-white">
            <div className="h-80 relative group overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${lesson.imageSeed}/1200/600`} 
                alt="Illustration" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-10 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                <span className="text-sm font-black uppercase tracking-widest text-primary bg-white/80 px-3 py-1 rounded-full">Interactive Narrative</span>
              </div>
            </div>
            <CardContent className="p-12">
              <div className="flex flex-wrap gap-x-2 gap-y-4 leading-[1.8] text-2xl text-foreground/90 font-medium">
                {storyWords.map((word, i) => (
                  <Popover key={i} onOpenChange={(open) => open && handleTranslate(word)}>
                    <PopoverTrigger asChild>
                      <span className={cn(
                        "cursor-help transition-all duration-300 p-1.5 rounded-xl underline-offset-8 decoration-2",
                        activeWordIndex === i 
                          ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30 underline decoration-white" 
                          : "hover:text-primary hover:bg-primary/10 hover:underline decoration-primary"
                      )}>
                        {word}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-5 text-center rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-none bg-primary text-primary-foreground">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-[10px] opacity-70 font-black uppercase tracking-[0.2em]">Contextual Meaning</p>
                          <p className="text-xl font-black">{word.replace(/[^a-zA-Z]/g, '')}</p>
                        </div>
                        <div className="h-0.5 bg-white/20 w-12 mx-auto rounded-full" />
                        {translation ? (
                          <p className="text-2xl font-black text-accent font-arabic" dir="rtl">{translation}</p>
                        ) : (
                          <div className="flex justify-center py-2"><Loader2 className="h-6 w-6 animate-spin" /></div>
                        )}
                        <p className="text-[10px] opacity-50 italic">AI-Powered Translation System</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-8 space-y-8">
          <div className="grid grid-cols-1 gap-8">
            {lesson.questions.map((q, idx) => (
              <Card key={q.id} className="border-none shadow-xl rounded-[2.5rem] overflow-hidden transition-all hover:shadow-2xl">
                <CardContent className="p-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                        {idx + 1}
                      </div>
                      <span className="text-xl font-black text-primary uppercase tracking-widest">Question</span>
                    </div>
                    {feedback[q.id] && (
                      <Badge className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-bold border-none",
                        feedback[q.id].correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {feedback[q.id].correct ? 'CORRECT' : 'INCORRECT'}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-2xl font-bold leading-tight text-slate-800 dark:text-slate-100">{q.text}</p>
                  
                  {q.type === 'multiple-choice' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options?.map(opt => (
                        <Button
                          key={opt}
                          variant={answers[q.id] === opt ? "default" : "outline"}
                          className={cn(
                            "h-20 text-xl rounded-2xl border-2 transition-all font-bold",
                            answers[q.id] === opt && "border-primary bg-primary text-white shadow-xl scale-[1.02]",
                            feedback[q.id] && opt === q.correctAnswer && "border-green-500 bg-green-50 text-green-700"
                          )}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                          disabled={!!feedback[q.id]}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <Input 
                      placeholder="Your answer in English..."
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      className="h-20 text-center text-2xl rounded-2xl border-4 focus:border-primary transition-all font-bold"
                      disabled={!!feedback[q.id]}
                    />
                  )}

                  {!feedback[q.id] && (
                    <Button 
                      onClick={() => handleQuizSubmit(q.id, answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim())} 
                      disabled={!answers[q.id]}
                      className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Verify Answer
                    </Button>
                  )}

                  {feedback[q.id] && (
                    <div className={cn(
                      "p-6 rounded-[2rem] flex items-center justify-center gap-4 font-black text-lg border-2",
                      feedback[q.id].correct ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
                    )}>
                      {feedback[q.id].correct ? <CheckCircle2 className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
                      {feedback[q.id].message}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grammar" className="mt-8">
          <Card className="border-none shadow-2xl rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-card dark:to-background border border-white">
            <div className="p-12 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-accent/20 rounded-3xl shadow-inner">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-4xl font-black text-primary tracking-tight">{lesson.grammarPoint}</h2>
              </div>
              <p className="text-2xl leading-[1.7] text-muted-foreground font-medium italic border-l-8 border-primary/20 pl-8">
                {lesson.grammarExplanation}
              </p>
              <div className="bg-primary/5 p-8 rounded-[2.5rem] border-2 border-dashed border-primary/20 space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Live Usage
                </div>
                <p className="text-3xl font-black italic text-slate-800 dark:text-slate-100">"Sharif has never given up."</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
