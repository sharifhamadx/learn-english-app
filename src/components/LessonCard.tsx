
"use client";

import Link from 'next/link';
import { Lesson } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/components/LanguageProvider';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { t } = useLanguage();
  
  const lessonNumber = parseInt(lesson.id.replace('lesson-', ''));
  const isTrial = lessonNumber <= 3;
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <Link href={`/lessons/${lesson.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] hover:-translate-y-3 border-none rounded-[2.5rem] bg-white dark:bg-card shadow-xl border border-white">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${lesson.imageSeed}/600/400`}
            alt={lesson.title}
            fill
            className="object-cover transition-transform group-hover:scale-110 duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-6 left-6 flex gap-2">
            <Badge className={`${difficultyColors[lesson.difficulty]} border-none font-black uppercase text-[10px] py-1 px-4 tracking-widest shadow-md`}>
              {t.lessons[lesson.difficulty as keyof typeof t.lessons] || lesson.difficulty}
            </Badge>
            {isTrial && <Badge className="bg-accent text-primary border-none font-black text-[10px] py-1 px-4 tracking-widest shadow-md">TRIAL</Badge>}
            <Badge className="bg-green-500 text-white border-none font-black text-[10px] py-1 px-4 tracking-widest shadow-md">FREE</Badge>
          </div>
        </div>
        <CardHeader className="p-8 pb-3">
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-2xl line-clamp-1 group-hover:text-primary transition-colors font-black tracking-tighter">
              {lesson.title}
            </CardTitle>
          </div>
          <p className="text-xs font-black text-muted-foreground/60 uppercase tracking-[0.2em]">{lesson.topic}</p>
        </CardHeader>
        <CardContent className="p-8 pt-2">
          <p className="text-sm line-clamp-2 text-muted-foreground/80 leading-relaxed italic border-r-4 border-accent pr-4">
            {lesson.story}
          </p>
        </CardContent>
        <CardFooter className="p-8 pt-0 flex justify-between items-center border-t border-slate-50 mt-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] pt-6">
            <ShieldCheck className="h-4 w-4 text-accent" />
            {lesson.grammarPoint}
          </div>
          <div className="pt-6">
            <div className="bg-primary/5 p-2 rounded-full group-hover:bg-primary transition-all group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
              <ChevronRight className="h-6 w-6 text-primary group-hover:text-white" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
