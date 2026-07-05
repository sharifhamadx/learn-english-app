
"use client";

import { useState, useMemo } from 'react';
import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Library, Anchor, Heart, GraduationCap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/components/LanguageProvider';

export default function LessonsPage() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [activePhase, setActivePhase] = useState('foundation');
  const { t } = useLanguage();

  const filteredLessons = useMemo(() => {
    return MOCK_LESSONS.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(search.toLowerCase()) || 
                            lesson.topic.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficulty === 'all' || lesson.difficulty === difficulty;
      
      const lessonNum = parseInt(lesson.id.replace('lesson-', ''));
      let matchesPhase = false;
      if (activePhase === 'foundation') matchesPhase = lessonNum <= 100;
      else if (activePhase === 'empowerment') matchesPhase = lessonNum > 100 && lessonNum <= 200;
      else if (activePhase === 'mastery') matchesPhase = lessonNum > 200;

      return matchesSearch && matchesDifficulty && matchesPhase;
    });
  }, [search, difficulty, activePhase]);

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4">
      {/* Header */}
      <div className="bg-primary/5 rounded-[3rem] p-10 md:p-16 space-y-8 border border-primary/10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-accent bg-white px-4 py-2 rounded-full shadow-sm">
            <Library className="h-5 w-5" />
            <span className="font-bold text-xs tracking-widest uppercase">{t.lessons.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-headline text-primary">{t.lessons.title}</h1>
          <p className="text-muted-foreground text-xl max-w-2xl">
            {t.lessons.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder={t.lessons.search_placeholder}
              className="pl-12 h-14 rounded-2xl border-none bg-white shadow-md text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-[180px] h-14 rounded-2xl bg-white shadow-md border-none font-bold">
              <SelectValue placeholder={t.lessons.difficulty} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.lessons.all_levels}</SelectItem>
              <SelectItem value="beginner">{t.lessons.beginner}</SelectItem>
              <SelectItem value="intermediate">{t.lessons.intermediate}</SelectItem>
              <SelectItem value="advanced">{t.lessons.advanced}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Saga Phases */}
      <Tabs value={activePhase} onValueChange={setActivePhase} className="w-full">
        <TabsList className="flex flex-col md:flex-row w-full h-auto bg-transparent gap-4 p-0">
          <PhaseTrigger 
            value="foundation" 
            icon={<GraduationCap className="h-6 w-6" />}
            title={t.lessons.foundation_title} 
            desc={t.lessons.lessons_range.replace('{{start}}', '1').replace('{{end}}', '100')} 
          />
          <PhaseTrigger 
            value="empowerment" 
            icon={<Heart className="h-6 w-6" />}
            title={t.lessons.empowerment_title} 
            desc={t.lessons.lessons_range.replace('{{start}}', '101').replace('{{end}}', '200')} 
          />
          <PhaseTrigger 
            value="mastery" 
            icon={<Anchor className="h-6 w-6" />}
            title={t.lessons.mastery_title} 
            desc={t.lessons.lessons_range.replace('{{start}}', '201').replace('{{end}}', '300')} 
          />
        </TabsList>

        <TabsContent value={activePhase} className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
            {filteredLessons.length === 0 && (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-muted rounded-[2rem] flex items-center justify-center">
                  <Search className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <h3 className="text-2xl font-bold">{t.lessons.no_results}</h3>
                <p className="text-muted-foreground text-lg">{t.lessons.try_different}</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PhaseTrigger({ value, icon, title, desc }: { value: string, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <TabsTrigger 
      value={value} 
      className="flex-1 h-24 rounded-[2rem] border-2 bg-white data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white transition-all shadow-md flex items-center justify-between px-8"
    >
      <div className="flex flex-col text-left rtl:text-right">
        <span className="text-lg font-black">{title}</span>
        <span className="text-xs opacity-70 font-bold">{desc}</span>
      </div>
      <div className="bg-primary/10 p-3 rounded-2xl group-data-[state=active]:bg-white/20">
        {icon}
      </div>
    </TabsTrigger>
  );
}
