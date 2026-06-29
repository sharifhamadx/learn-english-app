"use client";

import { useState, useRef, useEffect } from 'react';
import { Lesson } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, BookOpen, Lightbulb, GraduationCap, Play, Pause, Volume2, Download, Loader2, Clock, Globe } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { translateWord } from '@/ai/flows/translate-word';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from "jspdf";
import { useFirestore, useUser } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const db = useFirestore();
  const { user } = useUser();

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === 'story') setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

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
      toast({ title: "تم توليد الصوت", description: "يمكنك الآن الاستماع للقصة." });
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ في الصوت", description: "تعذر تشغيل الصوت حالياً." });
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
      setTranslation("تعذر الترجمة");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(lesson.title, 20, 20);
    doc.text(`Topic: ${lesson.topic}`, 20, 30);
    doc.setFontSize(12);
    const splitStory = doc.splitTextToSize(lesson.story, 170);
    doc.text(splitStory, 20, 45);
    doc.save(`${lesson.title}.pdf`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const storyWords = lesson.story.split(' ');

  return (
    <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2 text-right">
          <div className="flex items-center gap-3 justify-end">
            <Badge variant="outline" className="text-accent border-accent uppercase tracking-wider">{lesson.difficulty}</Badge>
            <span className="text-muted-foreground text-sm font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" /> {formatTime(timeSpent)}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-primary font-headline">{lesson.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadPDF} className="gap-2">
            <Download className="h-4 w-4" /> تنزيل PDF
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleTogglePlay} 
            disabled={isAudioLoading}
            className="gap-2 bg-accent text-primary font-bold hover:bg-accent/90 min-w-[140px]"
          >
            {isAudioLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'إيقاف مؤقت' : 'استماع للقصة'}
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-muted rounded-xl">
          <TabsTrigger value="story" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BookOpen className="ml-2 h-4 w-4" /> القصة
          </TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <GraduationCap className="ml-2 h-4 w-4" /> التمارين
          </TabsTrigger>
          <TabsTrigger value="grammar" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Lightbulb className="ml-2 h-4 w-4" /> القواعد
          </TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-none shadow-md overflow-hidden">
            <div className="h-64 relative">
              <img 
                src={`https://picsum.photos/seed/${lesson.imageSeed}/800/400`} 
                alt="Story Illustration" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-x-1 gap-y-2 leading-relaxed text-xl text-foreground/90 font-medium" dir="ltr">
                {storyWords.map((word, i) => (
                  <Popover key={i}>
                    <PopoverTrigger asChild>
                      <span 
                        className="cursor-help hover:text-accent hover:underline decoration-accent underline-offset-4 transition-colors p-0.5 rounded"
                        onClick={() => handleTranslate(word)}
                      >
                        {word}
                      </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-3 text-center" dir="rtl">
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-bold uppercase">{translatingWord}</p>
                        {translation ? (
                          <p className="text-lg font-bold text-primary">{translation}</p>
                        ) : (
                          <div className="flex justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin text-accent" />
                          </div>
                        )}
                        <p className="text-[10px] text-muted-foreground">اضغط بعيداً للإغلاق</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
              <div className="mt-8 flex justify-start gap-4" dir="rtl">
                <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                  <Globe className="h-3 w-3" /> اضغط على أي كلمة لمعرفة معناها بالعربي.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">التقدم</span>
            <span className="text-sm font-bold text-primary">النتيجة: {score}/{lesson.questions.length}</span>
          </div>
          <Progress value={(Object.keys(feedback).length / lesson.questions.length) * 100} className="h-2 bg-muted-foreground/10" />
          
          <div className="space-y-6">
            {lesson.questions.map((q, idx) => (
              <Card key={q.id} className="border shadow-sm overflow-hidden text-right">
                <CardContent className="p-6">
                  <div className="flex flex-row-reverse gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-grow space-y-4">
                      <p className="text-lg font-medium text-foreground">{q.text}</p>
                      
                      {q.type === 'multiple-choice' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="ltr">
                          {q.options?.map(opt => (
                            <Button
                              key={opt}
                              variant={answers[q.id] === opt ? "default" : "outline"}
                              className="justify-center h-12 font-medium"
                              onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                              disabled={!!feedback[q.id]}
                            >
                              {opt}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <Input 
                          placeholder="اكتب إجابتك هنا..."
                          value={answers[q.id] || ''}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          className="h-12 text-center"
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
                          className="w-full bg-primary"
                        >
                          تحقق من الإجابة
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grammar" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-card">
            <div className="bg-primary p-6 text-primary-foreground text-right">
              <h2 className="text-2xl font-bold flex items-center justify-end gap-2">
                {lesson.grammarPoint}
                <Lightbulb className="h-6 w-6 text-accent" />
              </h2>
            </div>
            <CardContent className="p-8 text-right">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{lesson.grammarExplanation}</p>
              <div className="mt-6 p-4 bg-muted rounded-lg border-r-4 border-accent">
                <p className="text-sm font-bold text-primary mb-2">أمثلة سريعة:</p>
                <p className="italic font-medium" dir="ltr">"Sharif has been studying for 22 years."</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
