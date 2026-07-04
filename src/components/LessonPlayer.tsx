
"use client";

import { useState, useRef, useEffect } from 'react';
import { Lesson } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, BookOpen, Lightbulb, GraduationCap, Play, Pause, Download, Loader2, Clock, Globe, ArrowRight, Trophy, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { translateWord } from '@/ai/flows/translate-word';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from "jspdf";
import { useFirestore, useUser } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [activeTab, setActiveTab] = useState('story');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; message: string }>>({});
  const [score, setScore] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [translatingWord, setTranslatingWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const db = useFirestore();
  const { user } = useUser();

  const lessonNumber = parseInt(lesson.id.replace('lesson-', ''));
  const nextLessonId = `lesson-${lessonNumber + 1}`;
  const isLastLesson = lessonNumber >= 300;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCompleted && activeTab === 'story') setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, isCompleted]);

  // التحقق من اكتمال الدرس وحفظ التقدم
  useEffect(() => {
    if (Object.keys(feedback).length === lesson.questions.length && lesson.questions.length > 0) {
      setIsCompleted(true);
      saveProgress();
    }
  }, [feedback]);

  const saveProgress = async () => {
    if (!user || !db) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'lessonProgress', lesson.id), {
        score,
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
      setIsPlaying(true);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Audio generation failed." });
    } finally {
      setIsAudioLoading(false);
    }
  };

  const handleTranslate = async (word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    setTranslatingWord(cleanWord);
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

  const storyWords = lesson.story.split(' ');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20" dir="rtl">
      {/* Header مع مؤشر التقدم اللحظي */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sticky top-16 z-30 bg-background/80 backdrop-blur-md py-4 border-b">
        <div className="flex flex-col gap-2 text-right">
          <div className="flex items-center gap-3 justify-end">
            <Badge variant="outline" className="text-accent border-accent uppercase">{lesson.difficulty}</Badge>
            <span className="text-muted-foreground text-sm font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" /> {formatTime(timeSpent)}
            </span>
          </div>
          <h1 className="text-3xl font-black text-primary font-headline">{lesson.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadPDF} size="sm" className="rounded-xl">
            <Download className="h-4 w-4 ml-2" /> PDF
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleTogglePlay} 
            disabled={isAudioLoading}
            className="rounded-xl bg-accent text-primary font-bold hover:bg-accent/90"
          >
            {isAudioLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span className="mr-2">{isPlaying ? 'إيقاف' : 'استماع'}</span>
          </Button>
        </div>
      </div>

      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={() => setIsPlaying(false)} 
          className="hidden" 
        />
      )}

      {/* الحالة عند النجاح */}
      {isCompleted && (
        <Card className="border-2 border-accent bg-accent/5 animate-in zoom-in-95 duration-500 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-xl">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-black text-primary">عمل رائع يا بطل!</h2>
            <p className="text-muted-foreground text-lg">لقد أتممت هذا الفصل بنجاح بنتيجة {score}/{lesson.questions.length}</p>
            <div className="flex justify-center gap-4 pt-4">
              {!isLastLesson && (
                <Button asChild size="lg" className="bg-primary text-white font-bold h-14 px-10 rounded-2xl shadow-lg hover:scale-105 transition-transform">
                  <Link href={`/lessons/${nextLessonId}`}>
                    الدرس التالي <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="h-14 rounded-2xl" asChild>
                <Link href="/lessons">العودة للمكتبة</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-muted rounded-2xl">
          <TabsTrigger value="story" className="rounded-xl">القصة</TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-xl">التمارين</TabsTrigger>
          <TabsTrigger value="grammar" className="rounded-xl">القواعد</TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="mt-6">
          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className="h-72 relative">
              <img 
                src={`https://picsum.photos/seed/${lesson.imageSeed}/1200/600`} 
                alt="Illustration" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <CardContent className="p-10">
              <div className="flex flex-wrap gap-x-2 gap-y-3 leading-loose text-2xl text-foreground/90 font-medium" dir="ltr">
                {storyWords.map((word, i) => (
                  <Popover key={i}>
                    <PopoverTrigger asChild>
                      <span className="cursor-help hover:text-accent hover:underline decoration-accent underline-offset-8 transition-colors p-1 rounded-md hover:bg-accent/10">
                        {word}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 text-center rounded-2xl shadow-2xl border-none bg-primary text-primary-foreground" dir="rtl">
                      <div className="space-y-3">
                        <p className="text-xs opacity-70 font-bold uppercase tracking-widest">{word.replace(/[^a-zA-Z]/g, '')}</p>
                        {translation ? (
                          <p className="text-xl font-black">{translation}</p>
                        ) : (
                          <div className="flex justify-center py-2"><Loader2 className="h-5 w-5 animate-spin" /></div>
                        )}
                        <div className="h-px bg-white/20" />
                        <p className="text-[10px] opacity-60">ملحمة شريف - ترجمة حصرية</p>
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
              <Card key={q.id} className="border-none shadow-lg rounded-[2rem] overflow-hidden">
                <CardContent className="p-8 space-y-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-lg font-bold">السؤال {idx + 1}</span>
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black">
                      {idx + 1}
                    </div>
                  </div>
                  
                  <p className="text-xl font-bold leading-relaxed">{q.text}</p>
                  
                  {q.type === 'multiple-choice' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
                      {q.options?.map(opt => (
                        <Button
                          key={opt}
                          variant={answers[q.id] === opt ? "default" : "outline"}
                          className={`h-16 text-lg rounded-2xl ${feedback[q.id] && opt === q.correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : ''}`}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                          disabled={!!feedback[q.id]}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <Input 
                      placeholder="الإجابة بالإنجليزية..."
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      className="h-16 text-center text-xl rounded-2xl border-2"
                      disabled={!!feedback[q.id]}
                    />
                  )}

                  {!feedback[q.id] && (
                    <Button 
                      onClick={() => {
                        const isCorrect = answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
                        if (isCorrect) setScore(s => s + 1);
                        setFeedback(f => ({ ...f, [q.id]: { correct: isCorrect, message: isCorrect ? 'أداء رائع!' : `الجواب: ${q.correctAnswer}` } }));
                      }} 
                      disabled={!answers[q.id]}
                      className="w-full h-14 rounded-2xl bg-primary text-white font-black"
                    >
                      تأكيد الإجابة
                    </Button>
                  )}

                  {feedback[q.id] && (
                    <div className={`p-4 rounded-2xl flex items-center justify-center gap-3 font-bold ${feedback[q.id].correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {feedback[q.id].correct ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                      {feedback[q.id].message}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grammar" className="mt-6">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
            <div className="bg-primary/5 p-10 space-y-6 text-right">
              <div className="flex items-center justify-end gap-3 text-primary">
                <h2 className="text-3xl font-black">{lesson.grammarPoint}</h2>
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <p className="text-xl leading-loose text-muted-foreground italic">
                {lesson.grammarExplanation}
              </p>
              <div className="bg-white/50 p-6 rounded-[2rem] border-2 border-dashed border-primary/20">
                <p className="text-sm font-bold text-primary mb-3">مثال من القصة:</p>
                <p className="text-2xl font-black italic text-slate-800" dir="ltr">"Sharif has never given up."</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
