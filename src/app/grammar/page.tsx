
"use client";

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { GRAMMAR_DATA, GrammarTopic } from '@/lib/grammar-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, CheckCircle2, XCircle, ArrowRight, BookCheck, Settings2, ListChecks, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GrammarAcademy() {
  const { t, language } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [examAnswers, setExamAnswers] = useState<Record<number, string>>({});
  const [examFeedback, setExamFeedback] = useState<Record<number, boolean>>({});

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
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 pb-20 px-3 md:px-4">
      {/* Header - Improved Padding and Font Sizes */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 space-y-4 text-center md:text-left rtl:md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md mx-auto md:mx-0">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="font-bold text-[10px] md:text-xs tracking-widest uppercase">{t.grammar.title}</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black font-headline tracking-tight">{t.grammar.title}</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto md:mx-0">{t.grammar.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Sidebar Topics - Optimized for Mobile View */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-black text-primary uppercase tracking-widest text-xs px-4 opacity-70">{t.grammar.select_topic}</h3>
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-4 lg:pb-0 pr-2 no-scrollbar">
            {GRAMMAR_DATA.map(topic => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setExamAnswers({});
                  setExamFeedback({});
                }}
                className={cn(
                  "flex-shrink-0 lg:w-full text-left rtl:text-right p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] transition-all flex items-center justify-between group border-2 whitespace-nowrap lg:whitespace-normal",
                  selectedTopic?.id === topic.id 
                    ? "bg-primary text-white border-primary shadow-xl scale-105 lg:scale-105" 
                    : "bg-white hover:border-primary/20 border-transparent shadow-sm"
                )}
              >
                <span className="font-bold text-sm md:text-lg">{language === 'en' ? topic.titleEn : topic.titleAr}</span>
                <ArrowRight className={cn("h-4 w-4 md:h-5 md:w-5 ml-2 transition-transform hidden md:block", selectedTopic?.id === topic.id ? (language === 'ar' ? '-translate-x-1 rotate-180' : 'translate-x-1') : "group-hover:translate-x-1")} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {selectedTopic ? (
            <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* 1. Stories Section */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-tighter">Narrative Context</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {selectedTopic.stories.map((story, i) => (
                    <Card key={i} className="border-none shadow-lg rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white/80 border border-white">
                      <CardHeader className="bg-primary/5 p-6 md:p-8 pb-3 md:pb-4">
                        <CardTitle className="text-lg md:text-xl font-black text-primary">{story.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 md:p-8 pt-2 md:pt-4">
                        <p className="text-muted-foreground leading-relaxed italic text-base md:text-lg" dir="ltr">
                          {story.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 2. Rule & Formulation Section */}
              <Card className="border-none shadow-xl rounded-[2rem] md:rounded-[3rem] bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <CardContent className="p-6 md:p-10 space-y-6 md:space-y-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 md:p-4 rounded-xl md:rounded-2xl">
                      <Settings2 className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black">How it's Made</h2>
                      <p className="text-white/70 font-medium text-sm md:text-base">{language === 'en' ? selectedTopic.explanationEn : selectedTopic.explanationAr}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-2 border-dashed border-white/20">
                    <p className="text-lg md:text-3xl font-black italic tracking-tight text-center leading-tight" dir="ltr">
                      {selectedTopic.formulationEn}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10 text-center font-bold opacity-80 text-sm md:text-base">
                      {selectedTopic.formulationAr}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 3. Examples Section */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <ListChecks className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-tighter">15 Practical Examples</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                  {selectedTopic.examples.map((ex, i) => (
                    <div key={i} className="bg-white p-4 md:p-5 rounded-2xl border-2 border-slate-100 shadow-sm hover:border-primary/20 transition-all group flex items-start gap-4" dir="ltr">
                      <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-[10px] md:text-xs shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">{i+1}</span>
                      <p className="font-bold text-slate-700 leading-tight pt-1 text-sm md:text-base">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Exam Section */}
              <div className="space-y-6 md:space-y-8 pt-6 md:pt-10">
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-5 md:px-6 py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest border border-accent/20">
                    <GraduationCap className="h-3 w-3 md:h-4 md:w-4" />
                    Interactive Exam
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Mastery Test</h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {selectedTopic.quiz.map((q, i) => (
                    <Card key={i} className="border-none shadow-md rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white/50 border border-white">
                      <CardContent className="p-6 md:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="text-primary font-black text-lg md:text-xl">0{i+1}.</span>
                          <p className="text-lg md:text-xl font-bold text-slate-800" dir="ltr">{q.question}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4" dir="ltr">
                          {q.options.map(opt => (
                            <Button
                              key={opt}
                              variant={examAnswers[i] === opt ? "default" : "outline"}
                              className={cn(
                                "h-14 md:h-16 rounded-xl font-bold border-2 transition-all text-sm md:text-base",
                                examAnswers[i] === opt && examFeedback[i] ? "border-green-500 bg-green-50 text-green-700" : 
                                examAnswers[i] === opt && !examFeedback[i] ? "border-red-500 bg-red-50 text-red-700" : ""
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
                            "flex items-center gap-2 font-black uppercase tracking-widest text-[10px]",
                            examFeedback[i] ? "text-green-600" : "text-red-600"
                          )}>
                            {examFeedback[i] ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {examFeedback[i] ? 'Excellent' : `Correct: ${q.correct}`}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {Object.keys(examAnswers).length === selectedTopic.quiz.length && (
                  <Card className="border-none shadow-2xl rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-green-500 to-emerald-700 text-white p-8 md:p-10 text-center">
                    <CardContent className="space-y-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                        <BookCheck className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black">Score: {calculateScore()}%</h3>
                      <p className="text-white/80 font-bold">Great progress! Keep studying the saga.</p>
                      <Button 
                        variant="secondary" 
                        className="rounded-2xl h-12 md:h-14 px-8 md:px-10 font-black text-primary bg-white hover:bg-white/90"
                        onClick={() => {
                          setExamAnswers({});
                          setExamFeedback({});
                        }}
                      >
                        Retake Exam
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 md:p-10 space-y-6 bg-white/30 rounded-[2rem] md:rounded-[3rem] border-4 border-dashed border-primary/10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <BookCheck className="h-10 w-10 md:h-12 md:w-12 text-primary/40" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-primary/60">{t.grammar.select_topic}</h3>
                <p className="text-muted-foreground text-sm md:text-base">Everything you need to master English grammar is here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
