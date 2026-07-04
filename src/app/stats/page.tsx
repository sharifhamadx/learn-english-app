
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Trophy, Star, Clock, BookOpen, Flame, Anchor, Heart, ShieldCheck, Bell, BellRing, Loader2 } from 'lucide-react';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function StatsPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("20:00");

  const progressQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(db, 'users', user.uid, 'lessonProgress');
  }, [user, db]);

  const { data: progressData, isLoading } = useCollection(progressQuery);

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

  const totalXP = (completedCount * 100) + (accuracy * 10);

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

  if (isUserLoading || (user && isLoading)) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-muted rounded-[3rem] flex items-center justify-center">
          <ShieldCheck className="h-12 w-12 text-muted-foreground/30" />
        </div>
        <h1 className="text-3xl font-black text-primary">Login Required</h1>
        <p className="text-muted-foreground text-lg italic">Please activate your account to see your real progress and achievements.</p>
        <button className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20" onClick={() => window.location.href = '/login'}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            Performance Analytics
          </div>
          <h1 className="text-5xl font-black font-headline text-primary tracking-tight">Achievement Board</h1>
          <p className="text-muted-foreground text-xl italic font-medium">"Every second spent here is an investment in your future."</p>
        </div>
        
        <Card className="w-full md:w-auto border-none shadow-2xl bg-white dark:bg-card/50 backdrop-blur-md rounded-[2.5rem] border border-white">
          <CardContent className="p-6 flex items-center gap-6">
            <div className={`p-4 rounded-[1.5rem] transition-all duration-500 shadow-inner ${reminderEnabled ? 'bg-accent text-primary scale-110' : 'bg-muted text-muted-foreground'}`}>
              {reminderEnabled ? <BellRing className="h-6 w-6 animate-pulse" /> : <Bell className="h-6 w-6" />}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-primary uppercase tracking-widest opacity-60">Daily Reminder</span>
              <input 
                type="time" 
                value={reminderTime} 
                onChange={(e) => { setReminderTime(e.target.value); saveReminder(reminderEnabled, e.target.value); }}
                className="bg-transparent border-none text-xl font-black text-primary focus:outline-none cursor-pointer"
              />
            </div>
            <Switch checked={reminderEnabled} onCheckedChange={handleToggleReminder} className="scale-125" />
          </CardContent>
        </Card>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gradient-to-br from-primary to-blue-700 text-primary-foreground border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-[3rem] overflow-hidden relative group transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
          <CardContent className="p-10 space-y-8 relative z-10">
            <div className="flex justify-between items-center">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <Trophy className="h-10 w-10 text-accent group-hover:rotate-12 transition-transform" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Current Rank</span>
            </div>
            <div className="space-y-2">
              <div className="text-6xl font-black italic tracking-tighter">
                {completedCount < 100 ? 'Novice' : completedCount < 200 ? 'Warrior' : 'Master'}
              </div>
              <p className="text-sm font-bold opacity-70">
                {completedCount < 100 ? 'The resilience journey has just begun' : 'You are forging a legacy through the saga'}
              </p>
            </div>
            <div className="space-y-4">
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
              <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                <span>{completedCount} / {totalLessons} Chapters</span>
                <span className="text-accent">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-8 md:col-span-2">
          <StatCard 
            icon={<Star className="h-10 w-10 text-amber-500" />} 
            value={`${accuracy}%`} 
            label="Accuracy" 
            bgColor="bg-amber-50" 
          />
          <StatCard 
            icon={<Flame className="h-10 w-10 text-blue-500" />} 
            value={totalXP} 
            label="Total XP" 
            bgColor="bg-blue-50" 
          />
          <StatCard 
            icon={<Clock className="h-10 w-10 text-green-500" />} 
            value={Math.floor(totalTimeSpent / 60)} 
            label="Minutes" 
            bgColor="bg-green-50" 
          />
          <StatCard 
            icon={<BookOpen className="h-10 w-10 text-purple-500" />} 
            value={completedCount} 
            label="Chapters" 
            bgColor="bg-purple-50" 
          />
        </div>
      </div>

      {/* Rewards/Badges */}
      <Card className="border-none shadow-2xl rounded-[4rem] bg-white/80 dark:bg-card/30 backdrop-blur-md border border-white">
        <CardHeader className="p-12 pb-6">
          <CardTitle className="text-3xl font-black text-primary tracking-tight">Unlocked Memorabilia</CardTitle>
          <CardDescription className="text-lg font-medium">Earn exclusive digital badges as you survive the saga.</CardDescription>
        </CardHeader>
        <CardContent className="p-12 pt-0">
          <div className="flex flex-wrap gap-12 justify-center py-10">
            <BadgeItem icon={<ShieldCheck className="h-10 w-10" />} label="First Step" active={completedCount >= 1} color="bg-primary" />
            <BadgeItem icon={<Flame className="h-10 w-10" />} label="Linguistic Fire" active={totalXP > 500} color="bg-blue-500" />
            <BadgeItem icon={<Star className="h-10 w-10" />} label="Perfect Focus" active={accuracy >= 90 && completedCount > 0} color="bg-amber-500" />
            <BadgeItem icon={<Anchor className="h-10 w-10" />} label="Ocean Survivor" active={completedCount >= 5} color="bg-slate-800" />
            <BadgeItem icon={<Heart className="h-10 w-10" />} label="Kind Heart" active={completedCount >= 10} color="bg-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, value, label, bgColor }: { icon: React.ReactNode, value: string | number, label: string, bgColor: string }) {
  return (
    <Card className="border-none shadow-xl rounded-[2.5rem] hover:shadow-2xl transition-all duration-300 group bg-white/50 dark:bg-card/30 backdrop-blur-sm border border-white">
      <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className={`p-5 ${bgColor} rounded-[2rem] shadow-inner transition-transform group-hover:scale-110 duration-500`}>
          {icon}
        </div>
        <div className="space-y-1">
          <div className="text-4xl font-black text-primary tracking-tighter">{value}</div>
          <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function BadgeItem({ icon, label, active, color }: { icon: React.ReactNode, label: string, active: boolean, color: string }) {
  return (
    <div className={`flex flex-col items-center gap-4 transition-all duration-700 ${active ? 'opacity-100 scale-110' : 'opacity-10 grayscale scale-90 blur-[1px]'}`}>
      <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-2xl relative ${active ? color : 'bg-muted'}`}>
        {active && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-[1.8rem]" />}
        <div className="text-white relative z-10">{icon}</div>
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-primary text-center max-w-[100px]">{label}</span>
    </div>
  );
}
