
"use client";

import Link from 'next/link';
import { Lesson } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ShieldCheck, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { t } = useLanguage();
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <Link href={`/lessons/${lesson.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.2)] hover:-translate-y-4 border-none rounded-[3rem] bg-white dark:bg-card shadow-2xl border border-white">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${lesson.imageSeed}/800/600`}
            alt={lesson.title}
            fill
            className="object-cover transition-transform group-hover:scale-110 duration-[2000ms]"
            data-ai-hint="Sudanese students"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/20 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
            <div className="bg-accent/90 p-4 rounded-full shadow-2xl">
              <PlayCircle className="h-12 w-12 text-primary fill-primary/20" />
            </div>
          </div>

          <div className="absolute bottom-8 left-8 flex gap-3">
            <Badge className={`${difficultyColors[lesson.difficulty]} border-none font-black uppercase text-[10px] py-1.5 px-5 tracking-widest shadow-2xl`}>
              {t.lessons[lesson.difficulty as keyof typeof t.lessons] || lesson.difficulty}
            </Badge>
            <Badge className="bg-green-500 text-white border-none font-black text-[10px] py-1.5 px-5 tracking-widest shadow-2xl">FREE</Badge>
          </div>
        </div>
        
        <CardHeader className="p-10 pb-4">
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-3xl line-clamp-1 group-hover:text-primary transition-colors font-black tracking-tighter">
              {lesson.title}
            </CardTitle>
          </div>
          <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.3em]">{lesson.topic}</p>
        </CardHeader>
        
        <CardContent className="p-10 pt-2">
          <p className="text-base line-clamp-2 text-muted-foreground/90 leading-relaxed italic border-r-8 border-accent pr-6">
            {lesson.story}
          </p>
        </CardContent>
        
        <CardFooter className="p-10 pt-0 flex justify-between items-center border-t border-slate-50 mt-4">
          <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.3em] pt-8">
            <ShieldCheck className="h-5 w-5 text-accent" />
            {lesson.grammarPoint}
          </div>
          <div className="pt-8">
            <div className="bg-primary/5 p-3 rounded-2xl group-hover:bg-primary transition-all group-hover:translate-x-3 rtl:group-hover:-translate-x-3 shadow-sm group-hover:shadow-xl">
              <ChevronRight className="h-7 w-7 text-primary group-hover:text-white" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
