
"use client";

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { GRAMMAR_DATA, GrammarTopic } from '@/lib/grammar-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BookOpen, CheckCircle2, XCircle, ArrowRight, BookCheck, Lightbulb, Settings2, Info, GraduationCap, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GrammarAcademy() {
  const { t, language } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [examFeedback, setExamFeedback] = useState<Record<number, boolean>>({});
  const [showExamResults, setShowExamResults] = useState(false);

  const checkAnswer = (idx: number, opt: string, correct: string) => {
    setExamAnswers(prev => ({ ...prev, [idx]: opt }));
    setExamFeedback(prev => ({ ...prev, [idx]: opt === correct }));
  };

  const calculateScore = () => {
    if (!selectedTopic) return 0;
    const correctCount = Object.values(examFeedback).filter(v => v).length;
    return Math.round((correctCount / selectedTopic.quiz.length) * 100);
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
                  setExamAnswers({});
                  setExamFeedback({});
                  setShowExamResults(false);
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
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
              
              {/* 1. Stories Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">Narrative Practice / القصص التعليمية</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedTopic.stories.map((story, i) => (
                    <Card key={i} className="border-none shadow-lg rounded-[2.5rem] overflow-hidden bg-white/80 border border-white">
                      <CardHeader className="bg-primary/5 p-8 pb-4">
                        <CardTitle className="text-xl font-black text-primary">{story.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 pt-4">
                        <p className="text-muted-foreground leading-relaxed italic text-lg" dir="ltr">
                          {story.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 2. Rule & Formulation Section */}
              <Card className="border-none shadow-xl rounded-[3rem] bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <CardContent className="p-10 space-y-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-2xl">
                      <Settings2 className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black">How it's Made / هيكل القاعدة</h2>
                      <p className="text-white/70 font-medium">{language === 'en' ? selectedTopic.explanationEn : selectedTopic.explanationAr}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 p-8 rounded-[2rem] border-2 border-dashed border-white/20">
                    <p className="text-2xl md:text-3xl font-black italic tracking-tight text-center" dir="ltr">
                      {selectedTopic.formulationEn}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10 text-center font-bold opacity-80">
                      {selectedTopic.formulationAr}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 3. Examples Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-4">
                  <ListChecks className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">15 Practical Examples / 15 مثالاً تطبيقياً</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedTopic.examples.map((ex, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm hover:border-primary/20 transition-all group flex items-start gap-4" dir="ltr">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">{i+1}</span>
                      <p className="font-bold text-slate-700 leading-tight pt-1">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Exam Section */}
              <div className="space-y-8 pt-10">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-accent/20">
                    <GraduationCap className="h-4 w-4" />
                    Interactive Exam / امتحان تفاعلي
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Test Your Knowledge</h2>
                </div>

                <div className="space-y-6">
                  {selectedTopic.quiz.map((q, i) => (
                    <Card key={i} className="border-none shadow-md rounded-[2.5rem] overflow-hidden bg-white/50 border border-white">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="text-primary font-black text-xl">0{i+1}.</span>
                          <p className="text-xl font-bold text-slate-800" dir="ltr">{q.question}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" dir="ltr">
                          {q.options.map(opt => (
                            <Button
                              key={opt}
                              variant={examAnswers[i] === opt ? "default" : "outline"}
                              className={cn(
                                "h-16 rounded-xl font-bold border-2 transition-all",
                                examAnswers[i] === opt && examFeedback[i] ? "border-green-500 bg-green-50 text-green-700 hover:bg-green-100" : 
                                examAnswers[i] === opt && !examFeedback[i] ? "border-red-500 bg-red-50 text-red-700 hover:bg-red-100" : ""
                              )}
                              onClick={() => checkAnswer(i, opt, q.correct)}
                              disabled={examFeedback[i] !== undefined}
                            >
                              {opt}
                            </Button>
                          ))}
                        </div>
                        {examFeedback[i] !== undefined && (
                          <div className={cn(
                            "flex items-center gap-2 font-black uppercase tracking-widest text-xs",
                            examFeedback[i] ? "text-green-600" : "text-red-600"
                          )}>
                            {examFeedback[i] ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                            {examFeedback[i] ? 'Excellent / إجابة صحيحة' : `Wrong / الإجابة الصحيحة هي: ${q.correct}`}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {Object.keys(examAnswers).length === selectedTopic.quiz.length && (
                  <Card className="border-none shadow-2xl rounded-[3rem] bg-gradient-to-br from-green-500 to-emerald-700 text-white p-10 text-center animate-in zoom-in-95">
                    <CardContent className="space-y-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                        <BookCheck className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-black">Exam Completed!</h3>
                      <div className="text-6xl font-black italic tracking-tighter">{calculateScore()}%</div>
                      <p className="text-white/80 font-bold">"You are one step closer to mastering English."</p>
                      <Button 
                        variant="secondary" 
                        className="rounded-2xl h-14 px-10 font-black text-primary bg-white hover:bg-white/90"
                        onClick={() => {
                          setExamAnswers({});
                          setExamFeedback({});
                          setShowExamResults(false);
                        }}
                      >
                        Retake Exam / إعادة الامتحان
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6 bg-white/30 rounded-[3rem] border-4 border-dashed border-primary/10">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <BookCheck className="h-12 w-12 text-primary/40" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary/60">{t.grammar.select_topic}</h3>
                <p className="text-muted-foreground">{language === 'en' ? 'Choose a rule to start your professional English journey.' : 'اختر قاعدة لتبدأ رحلتك الاحترافية في اللغة الإنجليزية.'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
