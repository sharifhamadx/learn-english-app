
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Clock, BookOpen, GraduationCap, Flame, Anchor, Heart, ShieldCheck } from 'lucide-react';
import { MOCK_LESSONS } from '@/lib/mock-data';

export default function StatsPage() {
  const [completedCount, setCompletedCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [xp, setXp] = useState(0);

  // في التطبيق الحقيقي سنقوم بجلب هذه البيانات من Firestore
  useEffect(() => {
    // محاكاة لبيانات التقدم
    setCompletedCount(0); // كبداية للمشترك الجديد
    setAccuracy(0);
    setXp(0);
  }, []);

  const totalLessons = 300;
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12 text-right" dir="rtl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black font-headline text-primary">لوحة الإنجازات</h1>
        <p className="text-muted-foreground text-lg italic">"كل خطوة في ملحمة شريف هي خطوة نحو إتقانك للغة."</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-xl rounded-[2rem] overflow-hidden relative group">
          <CardContent className="p-8 space-y-4">
            <div className="flex justify-between items-center">
              <Trophy className="h-10 w-10 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">المستوى الحالي</span>
            </div>
            <div>
              <div className="text-5xl font-black italic">مبتدئ</div>
              <p className="text-sm opacity-80 mt-1">أنت في بداية رحلة الصمود (أول 100 فصل)</p>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
            <div className="flex justify-between text-xs font-bold">
              <span>{completedCount} من {totalLessons} فصل</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
          </CardContent>
          <div className="absolute -bottom-6 -left-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <GraduationCap className="h-32 w-32" />
          </div>
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
              <div className="text-3xl font-black text-primary">{xp}</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">نقاط الخبرة (XP)</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md rounded-3xl hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-green-50 rounded-2xl">
                <Clock className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl font-black text-primary">0</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">دقائق التعلم</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md rounded-3xl hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-purple-50 rounded-2xl">
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-3xl font-black text-primary">0</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">قواعد مكتسبة</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Saga Phases Tracking */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-primary">تتبع مراحل الملحمة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PhaseCard 
            title="سنوات الصمود" 
            range="1 - 100" 
            status="نشط" 
            icon={<GraduationCap className="h-5 w-5" />} 
            color="border-green-200 bg-green-50/30 text-green-700" 
          />
          <PhaseCard 
            title="خيبات الأمل" 
            range="101 - 200" 
            status="مغلق" 
            icon={<Heart className="h-5 w-5" />} 
            color="border-amber-200 bg-amber-50/30 text-amber-700" 
          />
          <PhaseCard 
            title="مغامرة المجهول" 
            range="201 - 300" 
            status="مغلق" 
            icon={<Anchor className="h-5 w-5" />} 
            color="border-blue-200 bg-blue-50/30 text-blue-700" 
          />
        </div>
      </div>

      {/* Rewards/Badges */}
      <Card className="border-none shadow-sm rounded-[2rem] bg-white">
        <CardHeader>
          <CardTitle className="text-xl">الأوسمة المحصلة</CardTitle>
          <CardDescription>أكمل الفصول لتحصل على أوسمة تميزك كمحارب لغوي.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-8 justify-center py-6 opacity-30 grayscale">
            <BadgeItem icon={<ShieldCheck className="h-8 w-8" />} label="أول فصل" />
            <BadgeItem icon={<Flame className="h-8 w-8" />} label="أسبوع متواصل" />
            <BadgeItem icon={<Trophy className="h-8 w-8" />} label="بطل القواعد" />
            <BadgeItem icon={<Star className="h-8 w-8" />} label="100% دقة" />
          </div>
          <p className="text-center text-sm text-muted-foreground">لم يتم تحصيل أي وسام بعد. ابدأ أول درس الآن!</p>
        </CardContent>
      </Card>
    </div>
  );
}

function PhaseCard({ title, range, status, icon, color }: { title: string, range: string, status: string, icon: React.ReactNode, color: string }) {
  return (
    <div className={`p-6 border-2 rounded-3xl flex flex-col gap-3 ${color}`}>
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <div className="flex justify-between items-center text-sm font-medium">
        <span>الفصول: {range}</span>
        <span className="px-2 py-1 rounded-full bg-white/50 text-[10px] font-black uppercase tracking-widest">{status}</span>
      </div>
    </div>
  );
}

function BadgeItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-4 border-white shadow-inner">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
