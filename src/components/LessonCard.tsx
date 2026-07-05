
"use client";

import Link from 'next/link';
import { Lesson } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  
  const lessonNumber = parseInt(lesson.id.replace('lesson-', ''));
  const isTrial = lessonNumber <= 3;
  
  const [isUnlocked, setIsUnlocked] = useState(isTrial);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  useEffect(() => {
    if (isTrial) {
      setIsUnlocked(true);
      return;
    }

    async function checkAccess() {
      const authFlag = localStorage.getItem('moc-co-auth');
      
      if (authFlag === 'admin') {
        setIsUnlocked(true);
        return;
      }

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const plan = userData.plan;
            setCurrentPlan(plan);

            let allowed = false;
            if (plan === 'gold' || plan === 'vip') allowed = true;
            else if (plan === 'bronze' && lessonNumber <= 200) allowed = true;
            else if (plan === 'silver' && lessonNumber <= 100) allowed = true;
            
            setIsUnlocked(allowed);
          }
        } catch (error) {
          console.error("Error checking access:", error);
        }
      }
    }
    
    checkAccess();
  }, [user, db, lessonNumber, isTrial]);

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  const getRequiredPlan = () => {
    if (lessonNumber <= 100) return 'Silver';
    if (lessonNumber <= 200) return 'Bronze';
    return 'Gold / VIP';
  };

  if (!isUnlocked) {
    return (
      <Card className="group overflow-hidden opacity-90 border-dashed border-2 relative rounded-[2.5rem] bg-muted/20 border-primary/20">
        <div className="relative h-44 w-full flex items-center justify-center bg-muted/50 backdrop-blur-sm">
          <Lock className="h-16 w-16 text-primary/10 animate-pulse" />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-primary text-white border-none font-black text-[10px] py-1 px-3 tracking-widest uppercase shadow-lg">
              {t.lessons.required_plan.replace('{{plan}}', getRequiredPlan())}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-8">
          <CardTitle className="text-xl text-muted-foreground/40 font-black font-headline line-clamp-1">{lesson.title}</CardTitle>
          <div className="bg-white/50 p-6 rounded-[2rem] border border-primary/10 mt-6 space-y-4">
            <p className="text-xs font-black text-primary/70 leading-relaxed uppercase tracking-widest">
              {t.lessons.license_required_msg.replace('{{plan}}', getRequiredPlan())}
            </p>
            <Button size="sm" className="w-full bg-primary text-white rounded-2xl h-12 font-black shadow-md hover:scale-[1.02] transition-all" asChild>
              <Link href="/pricing">{t.lessons.upgrade_plan}</Link>
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

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
