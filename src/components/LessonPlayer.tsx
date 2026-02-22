
"use client";

import { useState, useRef } from 'react';
import { Lesson } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, BookOpen, Lightbulb, GraduationCap, Play, Volume2, Download, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from "jspdf";

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [activeTab, setActiveTab] = useState('story');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; message: string }>>({});
  const [score, setScore] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswer = (questionId: string) => {
    const question = lesson.questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = answers[questionId]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    
    if (!feedback[questionId]) {
       if (isCorrect) setScore(prev => prev + 1);
    }

    setFeedback(prev => ({
      ...prev,
      [questionId]: {
        correct: isCorrect,
        message: isCorrect ? 'أداء رائع! إجابة صحيحة.' : `حاول مرة أخرى! الإجابة الصحيحة هي: ${question.correctAnswer}.`
      }
    }));
  };

  const handleTTS = async () => {
    if (audioUrl) {
      audioRef.current?.play();
      return;
    }
    
    setIsAudioLoading(true);
    try {
      const result = await textToSpeech({ text: lesson.story });
      setAudioUrl(result.audioUri);
      toast({ title: "تم توليد الصوت", description: "يمكنك الآن الاستماع للقصة." });
    } catch (error) {
      toast({ variant: "destructive", title: "خطأ في الصوت", description: "تعذر تشغيل الصوت حالياً." });
    } finally {
      setIsAudioLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text(lesson.title, 20, 20);
    
    doc.setFontSize(14);
    doc.text(`Topic: ${lesson.topic} | Difficulty: ${lesson.difficulty}`, 20, 30);
    
    doc.setFontSize(16);
    doc.text("The Story:", 20, 45);
    
    doc.setFontSize(12);
    const splitStory = doc.splitTextToSize(lesson.story, 170);
    doc.text(splitStory, 20, 55);
    
    let currentY = 55 + (splitStory.length * 7);
    
    doc.setFontSize(16);
    doc.text("Grammar Point:", 20, currentY + 10);
    doc.setFontSize(12);
    doc.text(`${lesson.grammarPoint}: ${lesson.grammarExplanation}`, 20, currentY + 20);
    
    toast({ title: "تم تجهيز الملف", description: "بدأ تحميل الدرس كملف PDF." });
    doc.save(`${lesson.title}.pdf`);
  };

  const quizProgress = (Object.keys(feedback).length / lesson.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-accent border-accent uppercase tracking-wider">{lesson.difficulty}</Badge>
            <span className="text-muted-foreground text-sm font-medium">{lesson.topic}</span>
          </div>
          <h1 className="text-3xl font-bold text-primary font-headline">{lesson.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadPDF} className="gap-2">
            <Download className="h-4 w-4" /> تنزيل PDF
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleTTS} 
            disabled={isAudioLoading}
            className="gap-2 bg-accent text-primary font-bold hover:bg-accent/90"
          >
            {isAudioLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
            استماع للقصة
          </Button>
        </div>
      </div>

      {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" controls autoPlay />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-muted rounded-xl">
          <TabsTrigger value="story" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BookOpen className="mr-2 h-4 w-4" /> القصة
          </TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <GraduationCap className="mr-2 h-4 w-4" /> التمارين
          </TabsTrigger>
          <TabsTrigger value="grammar" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Lightbulb className="mr-2 h-4 w-4" /> القواعد
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
              <div className="prose prose-blue max-w-none">
                <p className="text-xl leading-relaxed text-foreground/90 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                  {lesson.story}
                </p>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <Button onClick={handleTTS} variant="outline" className="gap-2">
                   {isAudioLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                   استماع
                </Button>
                <Button onClick={() => setActiveTab('quiz')} className="bg-accent hover:bg-accent/90 text-primary font-bold">
                  ابدأ التمارين
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">التقدم</span>
            <span className="text-sm font-bold text-primary">النتيجة: {score}/{lesson.questions.length}</span>
          </div>
          <Progress value={quizProgress} className="h-2 bg-muted-foreground/10" />
          
          <div className="space-y-6">
            {lesson.questions.map((q, idx) => (
              <Card key={q.id} className="border shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-grow space-y-4">
                      <p className="text-lg font-medium text-foreground">{q.text}</p>
                      
                      {q.type === 'multiple-choice' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {q.options?.map(opt => (
                            <Button
                              key={opt}
                              variant={answers[q.id] === opt ? "default" : "outline"}
                              className={`justify-start h-12 text-left font-medium ${answers[q.id] === opt && !feedback[q.id] ? 'bg-primary border-primary' : ''}`}
                              onClick={() => handleAnswer(q.id, opt)}
                              disabled={!!feedback[q.id]}
                            >
                              {opt}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input 
                            placeholder="اكتب إجابتك هنا..."
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                            className="max-w-md h-12"
                            disabled={!!feedback[q.id]}
                          />
                        </div>
                      )}

                      {!feedback[q.id] ? (
                        <Button 
                          onClick={() => checkAnswer(q.id)} 
                          disabled={!answers[q.id]}
                          className="mt-2 bg-primary hover:bg-primary/90"
                        >
                          تحقق من الإجابة
                        </Button>
                      ) : (
                        <div className={`mt-2 p-4 rounded-lg flex items-start gap-3 animate-in zoom-in-95 ${feedback[q.id].correct ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                          {feedback[q.id].correct ? <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600" /> : <XCircle className="h-5 w-5 mt-0.5 text-red-600" />}
                          <p className="text-sm font-medium">{feedback[q.id].message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {quizProgress === 100 && (
            <div className="flex justify-center pt-4">
              <Button onClick={() => setActiveTab('grammar')} size="lg" className="bg-accent text-primary font-bold shadow-lg shadow-accent/20">
                عرض درس القواعد
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="grammar" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
          <Card className="border-none shadow-md overflow-hidden bg-white">
            <div className="bg-primary p-6 text-primary-foreground">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                {lesson.grammarPoint}
              </h2>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="prose prose-blue max-w-none">
                <p className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed text-right">
                  {lesson.grammarExplanation}
                </p>
              </div>
              <div className="bg-secondary/30 rounded-xl p-6 border border-secondary">
                <h3 className="text-sm font-bold text-secondary-foreground uppercase tracking-wider mb-4">أمثلة من السياق</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <p className="text-foreground italic">"Sarah lives in London."</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <p className="text-foreground italic">"Humanity had reached the Red Planet."</p>
                  </li>
                </ul>
              </div>
              <div className="pt-6 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('quiz')}>مراجعة التمارين</Button>
                <Button className="bg-primary text-primary-foreground">إنهاء الدرس</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
