
"use client";

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { GRAMMAR_DATA, GrammarTopic } from '@/lib/grammar-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, BookOpen, Download, CheckCircle2, XCircle, ArrowRight, BookCheck, Lightbulb, Settings2, Info } from 'lucide-react';
import { jsPDF } from "jspdf";
import { cn } from '@/lib/utils';

export default function GrammarAcademy() {
  const { t, language } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});

  const handleDownloadPDF = (topic: GrammarTopic) => {
    const doc = new jsPDF();
    const title = topic.titleEn; // Keep title En for PDF professional look
    const explanation = language === 'en' ? topic.explanationEn : topic.explanationAr;
    const formulation = language === 'en' ? topic.formulationEn : topic.formulationAr;
    
    doc.setFontSize(22);
    doc.text(title, 20, 20);
    
    doc.setFontSize(14);
    doc.text("How it's made / طريقة الصياغة:", 20, 35);
    doc.setFontSize(11);
    doc.text(formulation, 20, 45, { maxWidth: 170 });

    doc.setFontSize(14);
    doc.text("Explanation / الشرح:", 20, 60);
    doc.setFontSize(11);
    doc.text(explanation, 20, 70, { maxWidth: 170 });

    doc.setFontSize(14);
    doc.text("English Examples (15):", 20, 95);
    doc.setFontSize(10);
    topic.examples.forEach((ex, i) => {
      doc.text(`${i + 1}. ${ex}`, 20, 105 + (i * 7));
    });

    doc.addPage();
    doc.setFontSize(14);
    doc.text("Educational Stories:", 20, 20);
    topic.stories.forEach((s, i) => {
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${s.title}`, 20, 35 + (i * 70));
      doc.setFontSize(10);
      doc.text(s.content, 20, 45 + (i * 70), { maxWidth: 170 });
    });

    doc.save(`${topic.id}-complete-guide.pdf`);
  };

  const checkAnswer = (idx: number, opt: string, correct: string) => {
    setAnswers(prev => ({ ...prev, [idx]: opt }));
    setFeedback(prev => ({ ...prev, [idx]: opt === correct }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-[3rem] p-10 md:p-16 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-bold text-xs tracking-widest uppercase">{t.grammar.title}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-headline">{t.grammar.title}</h1>
          <p className="text-white/80 text-xl max-w-2xl">{t.grammar.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Topics */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-black text-primary uppercase tracking-widest text-sm px-4">{t.grammar.select_topic}</h3>
          <div className="grid grid-cols-1 gap-3">
            {GRAMMAR_DATA.map(topic => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setAnswers({});
                  setFeedback({});
                }}
                className={cn(
                  "w-full text-left p-6 rounded-[2rem] transition-all flex items-center justify-between group border-2",
                  selectedTopic?.id === topic.id 
                    ? "bg-primary text-white border-primary shadow-xl scale-105" 
                    : "bg-white hover:border-primary/20 border-transparent shadow-sm"
                )}
              >
                <span className="font-bold text-lg">{language === 'en' ? topic.titleEn : topic.titleAr}</span>
                <ArrowRight className={cn("h-5 w-5 transition-transform", selectedTopic?.id === topic.id ? (language === 'ar' ? '-translate-x-1 rotate-180' : 'translate-x-1') : "group-hover:translate-x-1")} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {selectedTopic ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Formulation & Explanation Card */}
              <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-sm border border-white">
                <CardHeader className="bg-primary/5 p-10 flex flex-col md:flex-row items-start justify-between gap-6">
                  <div className="space-y-4 text-left rtl:text-right w-full">
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-3xl font-black text-primary flex items-center gap-3">
                        <Lightbulb className="h-8 w-8 text-accent" />
                        {language === 'en' ? selectedTopic.titleEn : selectedTopic.titleAr}
                      </CardTitle>
                      <Button 
                        variant="outline" 
                        className="rounded-2xl border-2 h-14 px-6 font-bold gap-2 shrink-0 hidden md:flex"
                        onClick={() => handleDownloadPDF(selectedTopic)}
                      >
                        <Download className="h-5 w-5" />
                        {t.grammar.download_pdf}
                      </Button>
                    </div>

                    <div className="bg-accent/10 p-6 rounded-[2rem] border-2 border-dashed border-accent/30 space-y-2">
                      <div className="flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest">
                        <Settings2 className="h-4 w-4" />
                        How it's made / طريقة الصياغة
                      </div>
                      <p className="text-xl font-bold text-primary italic leading-relaxed">
                        {language === 'en' ? selectedTopic.formulationEn : selectedTopic.formulationAr}
                      </p>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-2xl">
                      <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                      <p className="text-lg font-medium text-muted-foreground">
                        {language === 'en' ? selectedTopic.explanationEn : selectedTopic.explanationAr}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <Tabs defaultValue="stories">
                    <TabsList className="grid grid-cols-3 h-14 p-1 rounded-2xl bg-muted/50 mb-8">
                      <TabsTrigger value="stories" className="rounded-xl font-bold">{t.grammar.stories_title}</TabsTrigger>
                      <TabsTrigger value="examples" className="rounded-xl font-bold">{t.grammar.examples_title}</TabsTrigger>
                      <TabsTrigger value="quiz" className="rounded-xl font-bold">{t.grammar.quiz_title}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="stories" className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {selectedTopic.stories.map((story, i) => (
                          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-md space-y-4 border-b-4 border-primary/10">
                            <h4 className="text-xl font-black text-primary">{story.title}</h4>
                            <p className="text-muted-foreground leading-relaxed italic font-body text-left" dir="ltr">
                              {story.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="examples" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedTopic.examples.map((ex, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-slate-50 transition-all hover:border-primary/20 group" dir="ltr">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">{i+1}</span>
                            <span className="font-medium text-slate-700">{ex}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="quiz" className="space-y-6">
                      {selectedTopic.quiz.map((q, i) => (
                        <div key={i} className="p-8 bg-white rounded-[2.5rem] shadow-sm space-y-6">
                          <p className="text-xl font-bold text-slate-800" dir="ltr">{q.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" dir="ltr">
                            {q.options.map(opt => (
                              <Button
                                key={opt}
                                variant={answers[i] === opt ? "default" : "outline"}
                                className={cn(
                                  "h-14 rounded-xl font-bold border-2",
                                  answers[i] === opt && feedback[i] ? "border-green-500 bg-green-50 text-green-700" : 
                                  answers[i] === opt && !feedback[i] ? "border-red-500 bg-red-50 text-red-700" : ""
                                )}
                                onClick={() => checkAnswer(i, opt, q.correct)}
                                disabled={feedback[i] !== undefined}
                              >
                                {opt}
                              </Button>
                            ))}
                          </div>
                          {feedback[i] !== undefined && (
                            <div className={cn(
                              "flex items-center gap-2 font-black uppercase tracking-widest text-sm",
                              feedback[i] ? "text-green-600" : "text-red-600"
                            )}>
                              {feedback[i] ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                              {feedback[i] ? t.grammar.correct : t.grammar.wrong}
                            </div>
                          )}
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              <div className="md:hidden px-4">
                <Button 
                  className="w-full rounded-2xl h-16 font-black gap-2 shadow-xl"
                  onClick={() => handleDownloadPDF(selectedTopic)}
                >
                  <Download className="h-6 w-6" />
                  {t.grammar.download_pdf}
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 bg-white/30 rounded-[3rem] border-4 border-dashed border-primary/10">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <BookCheck className="h-12 w-12 text-primary/40" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary/60">{t.grammar.select_topic}</h3>
                <p className="text-muted-foreground">{language === 'en' ? 'Pick a rule from the left to start mastering English grammar.' : 'اختر قاعدة من القائمة لتبدأ إتقان قواعد اللغة الإنجليزية.'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
