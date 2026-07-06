
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Trophy, Star, Clock, BookOpen, Flame, Anchor, Heart, ShieldCheck, Bell, BellRing, Loader2 } from 'lucide-react';
import { useFirestore, useUser, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function StatsPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("20:00");

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(db, 'users', user.uid);
  }, [user, db]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  const progressQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(db, 'users', user.uid, 'lessonProgress');
  }, [user, db]);

  const { data: progressData, isLoading: isProgressLoading } = useCollection(progressQuery);

  const completedCount = progressData?.length || 0;
  const totalLessons = 300;
  const progressPercentage = (completedCount / totalLessons) * 100;

  const accuracy = useMemo(() => {
    if (!progressData?.length) return 0;
    const totalAccuracy = progressData.reduce((acc, curr) => {
      const lessonAcc = curr.score / curr.totalQuestions;
      return acc + (isNaN(lessonAcc) ? 0 : lessonAcc);
    }, 0);
    return Math.round((totalAccuracy / progressData.length) * 100);
  }, [progressData]);

  const totalTimeSpent = useMemo(() => {
    return progressData?.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0) || 0;
  }, [progressData]);

  // Use real data from user document if available
  const totalXP = userData?.xp || 0;
  const currentStreak = userData?.streak || 0;

  useEffect(() => {
    const savedReminder = localStorage.getItem('daily-reminder');
    if (savedReminder) {
      try {
        const { enabled, time } = JSON.parse(savedReminder);
        setReminderEnabled(enabled);
        setReminderTime(time);
      } catch (e) {
        console.error("Error parsing reminder settings", e);
      }
    }
  }, []);

  const handleToggleReminder = async (checked: boolean) => {
    setReminderEnabled(checked);
    if (checked && "Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        saveReminder(true, reminderTime);
      } else {
        setReminderEnabled(false);
      }
    } else {
      saveReminder(false, reminderTime);
    }
  };

  const saveReminder = (enabled: boolean, time: string) => {
    localStorage.setItem('daily-reminder', JSON.stringify({ enabled, time }));
    if (user) {
      setDoc(doc(db, 'users', user.uid), {
        reminder: { enabled, time }
      }, { merge: true });
    }
  };

  if (isUserLoading || (user && (isUserDataLoading || isProgressLoading))) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-6 px-4">
        <div className="mx-auto w-24 h-24 bg-muted rounded-[2rem] md:rounded-[3rem] flex items-center justify-center">
          <ShieldCheck className="h-12 w-12 text-muted-foreground/30" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tighter">Access Denied</h1>
        <p className="text-muted-foreground text-base md:text-lg italic">Please activate your account to see your real progress.</p>
        <button className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 w-full sm:w-auto" onClick={() => window.location.href = '/login'}>
          Unlock with Code
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 pb-20 px-4 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            Performance Analytics
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-headline text-primary tracking-tight">Achievement Board</h1>
          <p className="text-muted-foreground text-lg md:text-xl italic font-medium">"Your future is being written chapter by chapter."</p>
        </div>
        
        <Card className="w-full lg:w-auto border-none shadow-2xl bg-white dark:bg-card/50 backdrop-blur-md rounded-[2rem] border border-white">
          <CardContent className="p-4 md:p-6 flex items-center gap-4 md:gap-6">
            <div className={`p-3 md:p-4 rounded-2xl transition-all duration-500 shadow-inner ${reminderEnabled ? 'bg-accent text-primary scale-110' : 'bg-muted text-muted-foreground'}`}>
              {reminderEnabled ? <BellRing className="h-5 w-5 md:h-6 md:w-6 animate-pulse" /> : <Bell className="h-5 w-5 md:h-6 md:w-6" />}
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">Daily Reminder</span>
              <input 
                type="time" 
                value={reminderTime} 
                onChange={(e) => { setReminderTime(e.target.value); saveReminder(reminderEnabled, e.target.value); }}
                className="bg-transparent border-none text-lg md:text-xl font-black text-primary focus:outline-none cursor-pointer w-full"
              />
            </div>
            <Switch checked={reminderEnabled} onCheckedChange={handleToggleReminder} className="scale-110 md:scale-125" />
          </CardContent>
        </Card>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <Card className="bg-gradient-to-br from-primary to-blue-700 text-primary-foreground border-none shadow-2xl rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group transition-all hover:scale-[1.01]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <CardContent className="p-8 md:p-10 space-y-8 relative z-10">
            <div className="flex justify-between items-center">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <Trophy className="h-8 w-8 md:h-10 md:w-10 text-accent" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Streak</span>
                <span className="text-2xl font-black text-accent">{currentStreak} 🔥</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-black italic tracking-tighter">
                {completedCount < 100 ? 'Novice' : completedCount < 200 ? 'Warrior' : 'Master'}
              </div>
              <p className="text-xs md:text-sm font-bold opacity-70">
                {completedCount < 100 ? 'The resilience journey has just begun' : 'You are forging a legacy through the saga'}
              </p>
            </div>
            <div className="space-y-4">
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span>{completedCount} / {totalLessons} Chapters</span>
                <span className="text-accent">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:col-span-2">
          <StatCard 
            icon={<Star className="h-6 w-6 md:h-10 md:w-10 text-amber-500" />} 
            value={`${accuracy}%`} 
            label="Accuracy" 
            bgColor="bg-amber-50" 
          />
          <StatCard 
            icon={<Flame className="h-6 w-6 md:h-10 md:w-10 text-blue-500" />} 
            value={totalXP} 
            label="Total XP" 
            bgColor="bg-blue-50" 
          />
          <StatCard 
            icon={<Clock className="h-6 w-6 md:h-10 md:w-10 text-green-500" />} 
            value={Math.floor(totalTimeSpent / 60)} 
            label="Minutes" 
            bgColor="bg-green-50" 
          />
          <StatCard 
            icon={<BookOpen className="h-6 w-6 md:h-10 md:w-10 text-purple-500" />} 
            value={completedCount} 
            label="Chapters" 
            bgColor="bg-purple-50" 
          />
        </div>
      </div>

      {/* Rewards/Badges */}
      <Card className="border-none shadow-2xl rounded-[2rem] md:rounded-[4rem] bg-white/80 dark:bg-card/30 backdrop-blur-md border border-white">
        <CardHeader className="p-8 md:p-12 pb-4 md:pb-6">
          <CardTitle className="text-2xl md:text-3xl font-black text-primary tracking-tight">Unlocked Memorabilia</CardTitle>
          <CardDescription className="text-base md:text-lg font-medium">Earn exclusive digital badges as you survive the saga.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 md:p-12 pt-0">
          <div className="flex flex-wrap gap-6 md:gap-12 justify-center py-6 md:py-10">
            <BadgeItem icon={<ShieldCheck className="h-8 w-8 md:h-10 md:w-10" />} label="First Step" active={completedCount >= 1} color="bg-primary" />
            <BadgeItem icon={<Flame className="h-8 w-8 md:h-10 md:w-10" />} label="Linguistic Fire" active={totalXP > 500} color="bg-blue-500" />
            <BadgeItem icon={<Star className="h-8 w-8 md:h-10 md:w-10" />} label="Perfect Focus" active={accuracy >= 90 && completedCount > 0} color="bg-amber-500" />
            <BadgeItem icon={<Anchor className="h-8 w-8 md:h-10 md:w-10" />} label="Ocean Survivor" active={completedCount >= 5} color="bg-slate-800" />
            <BadgeItem icon={<Heart className="h-8 w-8 md:h-10 md:w-10" />} label="Kind Heart" active={completedCount >= 10} color="bg-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, value, label, bgColor }: { icon: React.ReactNode, value: string | number, label: string, bgColor: string }) {
  return (
    <Card className="border-none shadow-xl rounded-[1.5rem] md:rounded-[2.5rem] hover:shadow-2xl transition-all duration-300 group bg-white/50 dark:bg-card/30 backdrop-blur-sm border border-white">
      <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-3 md:space-y-4">
        <div className={`p-4 md:p-5 ${bgColor} rounded-2xl md:rounded-[2rem] shadow-inner transition-transform group-hover:scale-110 duration-500`}>
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-2xl md:text-4xl font-black text-primary tracking-tighter">{value}</div>
          <div className="text-[9px] md:text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function BadgeItem({ icon, label, active, color }: { icon: React.ReactNode, label: string, active: boolean, color: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 md:gap-4 transition-all duration-700 ${active ? 'opacity-100 scale-105 md:scale-110' : 'opacity-20 grayscale scale-90 blur-[0.5px]'}`}>
      <div className={`w-16 h-16 md:w-24 md:h-24 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center border-2 md:border-4 border-white shadow-xl relative ${active ? color : 'bg-muted'}`}>
        {active && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-[1rem] md:rounded-[1.8rem]" />}
        <div className="text-white relative z-10">{icon}</div>
      </div>
      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary text-center max-w-[80px] md:max-w-[100px] leading-tight">{label}</span>
    </div>
  );
}
