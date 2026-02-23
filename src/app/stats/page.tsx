
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trophy, Star, Clock, BookOpen, GraduationCap, Flame, Anchor, Heart, ShieldCheck, Bell, BellRing } from 'lucide-react';
import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, setDoc } from 'firebase/firestore';

export default function StatsPage() {
  const { user } = useUser();
  const db = useFirestore();
  
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("20:00");

  // Fetch real progress from Firestore
  const progressQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(db, 'users', user.uid, 'lessonProgress');
  }, [user, db]);

  const { data: progressData, isLoading } = useCollection(progressQuery);

  const completedCount = progressData?.length || 0;
  const totalLessons = 300;
  const progressPercentage = (completedCount / totalLessons) * 100;

  // Calculate Accuracy and XP
  const accuracy = progressData?.length 
    ? Math.round(progressData.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions), 0) / progressData.length * 100) 
    : 0;

  const totalTimeSpent = progressData?.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0) || 0;
  const totalXP = (completedCount * 100) + (accuracy * 10);

  useEffect(() => {
    // Load local reminder settings
    const savedReminder = localStorage.getItem('daily-reminder');
    if (savedReminder) {
      const { enabled, time } = JSON.parse(savedReminder);
      setReminderEnabled(enabled);
      setReminderTime(time);
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

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12 text-right" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black font-headline text-primary">لوحة الإنجازات الحقيقية</h1>
          <p className="text-muted-foreground text-lg italic">"كل ثانية تقضيها هنا هي استثمار في مستقبلك."</p>
        </div>
        
        {/* Daily Reminder Widget */}
        <Card className="w-full md:w-auto border-none shadow-sm bg-accent/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-2 rounded-full ${reminderEnabled ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
              {reminderEnabled ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary">تنبيه المذاكرة اليومي</span>
              <input 
                type="time" 
                value={reminderTime} 
                onChange={(e) => { setReminderTime(e.target.value); saveReminder(reminderEnabled, e.target.value); }}
                className="bg-transparent border-none text-sm font-bold text-primary focus:outline-none"
              />
            </div>
            <Switch checked={reminderEnabled} onCheckedChange={handleToggleReminder} />
          </CardContent>
        </Card>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-xl rounded-[2rem] overflow-hidden relative group">
          <CardContent className="p-8 space-y-4">
            <div className="flex justify-between items-center">
              <Trophy className="h-10 w-10 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">رتبتك الحالية</span>
            </div>
            <div>
              <div className="text-5xl font-black italic">
                {completedCount < 100 ? 'مبتدئ' : completedCount < 200 ? 'متوسط' : 'خبير'}
              </div>
              <p className="text-sm opacity-80 mt-1">
                {completedCount < 100 ? 'أنت في بداية رحلة الصمود (المرحلة 1)' : 'أنت تتقدم في فصول الملحمة'}
              </p>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
            <div className="flex justify-between text-xs font-bold">
              <span>{completedCount} من {totalLessons} فصل مكتمل</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 md:col-span-2">
          <Card className="border-none shadow-md rounded-3xl hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-amber-50 rounded-2xl">
                <Star className="h-8 w-8 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-primary">{accuracy}%</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">دقة الإجابات</div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md rounded-3xl hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-blue-50 rounded-2xl">
                <Flame className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-3xl font-black text-primary">{totalXP}</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">نقاط الخبرة (XP)</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md rounded-3xl hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-green-50 rounded-2xl">
                <Clock className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl font-black text-primary">{Math.floor(totalTimeSpent / 60)}</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">دقائق التعلم</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md rounded-3xl hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-purple-50 rounded-2xl">
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-3xl font-black text-primary">{completedCount}</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">فصول منجزة</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rewards/Badges */}
      <Card className="border-none shadow-sm rounded-[2rem] bg-white">
        <CardHeader>
          <CardTitle className="text-xl">الأوسمة المستحقة</CardTitle>
          <CardDescription>أكمل التحديات لتفتح أوسمة شريف التذكارية.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8 justify-center py-6">
            <BadgeItem icon={<ShieldCheck className="h-8 w-8" />} label="أول فصل" active={completedCount >= 1} />
            <BadgeItem icon={<Flame className="h-8 w-8" />} label="محارب لغوي" active={totalXP > 500} />
            <BadgeItem icon={<Star className="h-8 w-8" />} label="دقة 100%" active={accuracy >= 100} />
            <BadgeItem icon={<Anchor className="h-8 w-8" />} label="ناجي من البحر" active={completedCount >= 5} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BadgeItem({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2 transition-all ${active ? 'opacity-100 scale-100' : 'opacity-20 grayscale scale-90'}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-inner ${active ? 'bg-accent' : 'bg-muted'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
