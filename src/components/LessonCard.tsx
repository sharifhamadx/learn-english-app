
"use client";

import Link from 'next/link';
import { Lesson } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ChevronRight, Lock, MessageCircle, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { t, language } = useLanguage();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const lessonNumber = parseInt(lesson.id.replace('lesson-', ''));
  const isTrial = lessonNumber <= 3;

  useEffect(() => {
    const auth = localStorage.getItem('moc-co-auth');
    const savedPlan = localStorage.getItem('moc-co-plan') || 'gold'; // For demo, default to gold or implement real plan check
    
    if (auth === 'user' || auth === 'admin') {
      // Logic for plan-based access:
      // Silver: 1-100
      // Bronze: 1-200
      // Gold: 1-300
      let hasAccess = false;
      if (auth === 'admin') hasAccess = true;
      else if (savedPlan === 'gold') hasAccess = true;
      else if (savedPlan === 'bronze' && lessonNumber <= 200) hasAccess = true;
      else if (savedPlan === 'silver' && lessonNumber <= 100) hasAccess = true;
      
      setIsUnlocked(hasAccess);
      setUserPlan(savedPlan);
    }
  }, [lessonNumber]);

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  const getRequiredPlan = () => {
    if (lessonNumber <= 100) return t.pricing.silver;
    if (lessonNumber <= 200) return t.pricing.bronze;
    return t.pricing.gold;
  };

  if (!isTrial && !isUnlocked) {
    return (
      <Card className="group overflow-hidden opacity-90 grayscale-[0.5] border-dashed border-2 relative">
        <div className="relative h-32 w-full flex items-center justify-center bg-muted">
          <Lock className="h-12 w-12 text-muted-foreground/30" />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] uppercase font-black">{getRequiredPlan()}</Badge>
          </div>
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg text-muted-foreground">{lesson.title}</CardTitle>
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 flex flex-col gap-2 mt-2 text-right">
            <p className="text-[10px] font-bold text-amber-800">
              {language === 'ar' ? `هذا الدرس يتطلب الباقة (${getRequiredPlan()})` : `This lesson requires the (${getRequiredPlan()})`}
            </p>
            <Link 
              href="/pricing"
              className="text-[10px] bg-primary text-white p-2 rounded-xl text-center flex items-center justify-center gap-1 hover:bg-primary/90 transition-all font-bold"
            >
              {language === 'ar' ? 'ترقية الاشتراك' : 'Upgrade Plan'}
            </Link>
          </div>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
          <Link href="/login" className="text-xs text-primary font-bold underline">
            {language === 'ar' ? 'هل لديك رمز؟ أدخله هنا' : 'Have a code? Enter it here'}
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Link href={`/lessons/${lesson.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-2xl hover:border-accent border-2 rounded-[2rem] bg-white dark:bg-card">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${lesson.imageSeed}/600/400`}
            alt={lesson.title}
            fill
            className="object-cover transition-transform group-hover:scale-110 duration-700"
            data-ai-hint="educational scene"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge className={`${difficultyColors[lesson.difficulty]} border-none font-bold uppercase text-[10px]`}>
              {lesson.difficulty}
            </Badge>
            {isTrial && <Badge className="bg-accent text-primary border-none font-black text-[10px]">TRIAL</Badge>}
          </div>
        </div>
        <CardHeader className="p-5 pb-2">
          <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors font-bold">
            {lesson.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground font-medium">{lesson.topic}</p>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <p className="text-sm line-clamp-2 text-muted-foreground leading-relaxed italic">
            {lesson.story}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-0 flex justify-between items-center border-t border-slate-50 mt-2">
          <div className="flex items-center gap-2 text-xs font-black text-accent uppercase tracking-widest pt-4">
            <ShieldCheck className="h-4 w-4" />
            {lesson.grammarPoint}
          </div>
          <div className="pt-4">
            <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
