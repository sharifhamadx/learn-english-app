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
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 text-white space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 space-y-3 text-center md:text-left rtl:md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md mx-auto md:mx-0">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="font-bold text-[10px] tracking-widest uppercase">{t.grammar.title}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-headline tracking-tight">{t.grammar.title}</h1>
          <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto md:mx-0 text-pretty">{t.grammar.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Sidebar Topics */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-black text-primary uppercase tracking-widest text-[10px] px-2 opacity-70">{t.grammar.select_topic}</h3>
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-2 lg:pb-0 pr-1 no-scrollbar">
            {GRAMMAR_DATA.map(topic => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setExamAnswers({});
                  setExamFeedback({});
                }}
                className={cn(
                  "flex-shrink-0 lg:w-full text-left rtl:text-right p-4 rounded-2xl transition-all flex items-center justify-between group border-2 whitespace-nowrap lg:whitespace-normal shadow-sm",
                  selectedTopic?.id === topic.id 
                    ? "bg-primary text-white border-primary shadow-lg scale-102" 
                    : "bg-white hover:border-primary/20 border-transparent"
                )}
              >
                <span className="font-bold text-sm md:text-base">{language === 'en' ? topic.titleEn : topic.titleAr}</span>
                <ArrowRight className={cn("h-4 w-4 ml-2 transition-transform hidden md:block", selectedTopic?.id === topic.id ? (language === 'ar' ? '-translate-x-1 rotate-180' : 'translate-x-1') : "group-hover:translate-x-1")} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {selectedTopic ? (
            <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              
              {/* 1. Stories Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-lg md:text-xl font-black text-primary uppercase tracking-tighter">Narrative Context</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {selectedTopic.stories.map((story, i) => (
                    <Card key={i} className="border-none shadow-md rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white/80 border border-white">
                      <CardHeader className="bg-primary/5 p-6 pb-2">
                        <CardTitle className="text-base md:text-lg font-black text-primary">{story.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-2">
                        <p className="text-muted-foreground leading-relaxed italic text-base md:text-lg" dir="ltr">
                          {story.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 2. Rule & Formulation Section */}
              <Card className="border-none shadow-lg rounded-[1.5rem] md:rounded-[2.5rem] bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <CardContent className="p-6 md:p-10 space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 md:p-3 rounded-xl">
                      <Settings2 className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-black">How it's Made</h2>
                      <p className="text-white/70 font-medium text-xs md:text-sm">{language === 'en' ? selectedTopic.explanationEn : selectedTopic.explanationAr}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 p-5 md:p-8 rounded-2xl border-2 border-dashed border-white/20">
                    <p className="text-lg md:text-2xl lg:text-3xl font-black italic tracking-tight text-center leading-tight" dir="ltr">
                      {selectedTopic.formulationEn}
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/10 text-center font-bold opacity-80 text-xs md:text-base">
                      {selectedTopic.formulationAr}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 3. Examples Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <ListChecks className="h-5 w-5 text-primary" />
                  <h2 className="text-lg md:text-xl font-black text-primary uppercase tracking-tighter">15 Practical Examples</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {selectedTopic.examples.map((ex, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border-2 border-slate-50 shadow-sm hover:border-primary/20 transition-all group flex items-start gap-3" dir="ltr">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-[9px] shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">{i+1}</span>
                      <p className="font-bold text-slate-700 leading-tight pt-0.5 text-sm md:text-base">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Exam Section */}
              <div className="space-y-6 pt-6 md:pt-10">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest border border-accent/20">
                    <GraduationCap className="h-3 w-3" />
                    Interactive Exam
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">Mastery Test</h2>
                </div>

                <div className="space-y-4">
                  {selectedTopic.quiz.map((q, i) => (
                    <Card key={i} className="border-none shadow-md rounded-[1.5rem] overflow-hidden bg-white/50 border border-white">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-black text-base md:text-lg">0{i+1}.</span>
                          <p className="text-base md:text-lg font-bold text-slate-800" dir="ltr">{q.question}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3" dir="ltr">
                          {q.options.map(opt => (
                            <Button
                              key={opt}
                              variant={examAnswers[i] === opt ? "default" : "outline"}
                              className={cn(
                                "h-12 rounded-xl font-bold border-2 transition-all text-sm",
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
                            "flex items-center gap-1.5 font-black uppercase tracking-widest text-[9px]",
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
                  <Card className="border-none shadow-xl rounded-[2rem] bg-gradient-to-br from-green-500 to-emerald-700 text-white p-8 text-center">
                    <CardContent className="space-y-4">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                        <BookCheck className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black">Score: {calculateScore()}%</h3>
                      <p className="text-white/80 font-bold text-sm">Great progress! Keep studying the saga.</p>
                      <Button 
                        variant="secondary" 
                        className="rounded-xl h-12 px-8 font-black text-primary bg-white hover:bg-white/90"
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
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 space-y-4 bg-white/30 rounded-[2rem] border-4 border-dashed border-primary/10">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <BookCheck className="h-10 w-10 text-primary/40" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-black text-primary/60">{t.grammar.select_topic}</h3>
                <p className="text-muted-foreground text-sm">Everything you need to master English grammar is here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BookCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}