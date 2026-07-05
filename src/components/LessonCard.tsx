
"use client";

import Link from 'next/link';
import { Lesson } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Lock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const { t, language } = useLanguage();
  const { user } = useUser();
  const db = useFirestore();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  const lessonNumber = parseInt(lesson.id.replace('lesson-', ''));
  const isTrial = lessonNumber <= 3;

  useEffect(() => {
    async function checkAccess() {
      // 1. تحقق من الـ Admin أولاً (دخول كامل)
      const authFlag = localStorage.getItem('moc-co-auth');
      if (authFlag === 'admin') {
        setIsUnlocked(true);
        return;
      }

      // 2. التحقق من المستخدم العادي
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const plan = userData.plan;
          setCurrentPlan(plan);

          // منطق فتح الدروس بناءً على الباقة:
          // Silver: 1-100
          // Bronze: 1-200
          // Gold: 1-300
          let allowed = false;
          if (plan === 'gold') allowed = true;
          else if (plan === 'bronze' && lessonNumber <= 200) allowed = true;
          else if (plan === 'silver' && lessonNumber <= 100) allowed = true;
          
          setIsUnlocked(allowed);
        }
      }
    }
    
    checkAccess();
  }, [user, db, lessonNumber]);

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  const getRequiredPlan = () => {
    if (lessonNumber <= 100) return 'Silver';
    if (lessonNumber <= 200) return 'Bronze';
    return 'Gold';
  };

  if (!isTrial && !isUnlocked) {
    return (
      <Card className="group overflow-hidden opacity-90 border-dashed border-2 relative rounded-[2rem] bg-muted/20">
        <div className="relative h-40 w-full flex items-center justify-center bg-muted/50 backdrop-blur-sm">
          <Lock className="h-16 w-16 text-muted-foreground/20 animate-pulse" />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-primary text-white border-none font-black text-[10px] py-1 px-3">REQUIRED: {getRequiredPlan()}</Badge>
          </div>
        </div>
        <CardHeader className="p-6">
          <CardTitle className="text-xl text-muted-foreground/60 font-bold">{lesson.title}</CardTitle>
          <div className="bg-white/50 p-4 rounded-2xl border border-primary/10 mt-4 space-y-3">
            <p className="text-xs font-bold text-primary/80 leading-relaxed">
              {language === 'ar' 
                ? `هذا الفصل يتطلب تفعيل الباقة (${getRequiredPlan()}) وما فوق.` 
                : `This chapter requires activation of the (${getRequiredPlan()}) plan.`}
            </p>
            <Button size="sm" className="w-full bg-primary text-white rounded-xl h-10 font-bold" asChild>
              <Link href="/pricing">{language === 'ar' ? 'ترقية الباقة' : 'Upgrade Now'}</Link>
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Link href={`/lessons/${lesson.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 border-2 rounded-[2.5rem] bg-white dark:bg-card">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${lesson.imageSeed}/600/400`}
            alt={lesson.title}
            fill
            className="object-cover transition-transform group-hover:scale-110 duration-1000"
            data-ai-hint="lesson scene"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Badge className={`${difficultyColors[lesson.difficulty]} border-none font-black uppercase text-[10px] py-1 px-3`}>
              {lesson.difficulty}
            </Badge>
            {isTrial && <Badge className="bg-accent text-primary border-none font-black text-[10px] py-1 px-3">TRIAL</Badge>}
          </div>
        </div>
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-2xl line-clamp-1 group-hover:text-primary transition-colors font-black tracking-tight">
            {lesson.title}
          </CardTitle>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{lesson.topic}</p>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <p className="text-sm line-clamp-2 text-muted-foreground leading-relaxed italic opacity-80">
            {lesson.story}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-slate-50 mt-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] pt-4">
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
