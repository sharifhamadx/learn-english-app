import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Star, BookOpen, ChevronRight, Layers, Anchor, Heart, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuredLessons = MOCK_LESSONS.slice(0, 3);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-20 text-primary-foreground md:px-16 md:py-28 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
            <Star className="h-4 w-4 text-accent fill-accent" />
            <span className="text-xs font-bold uppercase tracking-widest">ملحمة شريف: 1000 درس من الواقع</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight font-headline md:text-7xl leading-tight">
            تعلم الإنجليزية مع <span className="text-accent">قصة كفاح شريف</span>
          </h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl">
            انغمس في 1,000 قصة طويلة تروي رحلة شريف من 22 عاماً من الدراسة، إلى صراعات الحب والمال، وصولاً إلى أهوال المحيط والسجون. تجربة تعليمية واقعية لم يسبق لها مثيل.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90 px-10 h-14 text-lg rounded-2xl shadow-lg shadow-accent/20" asChild>
              <Link href="/lessons">ابدأ الرحلة الآن</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 hover:bg-white/10 text-white px-10 h-14 text-lg rounded-2xl" asChild>
              <Link href="/stats">لوحة الإنجازات</Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 hidden lg:block transform rotate-12 scale-150">
          <Anchor className="w-[30rem] h-[30rem] text-accent" />
        </div>
      </section>

      {/* 3 Chapters of the Saga */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-3xl border-2 border-transparent hover:border-accent transition-all group shadow-sm">
          <GraduationCap className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">سنوات الصمود (22 عاماً)</h3>
          <p className="text-sm text-muted-foreground">دروس المستوى المبتدئ تركز على سنوات الدراسة، الخدمة الوطنية، وتطلعات الأم والأسرة.</p>
        </div>
        <div className="bg-card p-6 rounded-3xl border-2 border-transparent hover:border-accent transition-all group shadow-sm">
          <Heart className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">خيبات الأمل والوفاء</h3>
          <p className="text-sm text-muted-foreground">دروس المستوى المتوسط تروي قصص نمارق ومزدلفة وعرفة وسارة، ودور الأصدقاء الأوفياء.</p>
        </div>
        <div className="bg-card p-6 rounded-3xl border-2 border-transparent hover:border-accent transition-all group shadow-sm">
          <Anchor className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">مغامرة المجهول</h3>
          <p className="text-sm text-muted-foreground">دروس المستوى المتقدم تغوص في أهوال البحر، انفجار القوارب، السجون، والعمل الشاق.</p>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">الدروس المنجزة</CardTitle>
            <Clock className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary">0 <span className="text-sm text-muted-foreground font-normal">/ 1000</span></div>
            <p className="text-xs text-muted-foreground mt-2">ابدأ رحلة شريف اليوم</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">دقة الإجابات</CardTitle>
            <Star className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary">0%</div>
            <p className="text-xs text-muted-foreground mt-2">بانتظار أول تمرين</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">نقاط الخبرة</CardTitle>
            <Trophy className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary">0</div>
            <p className="text-xs text-muted-foreground mt-2">تقدم لتحصل على الرتب</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">رفيق الدرب</CardTitle>
            <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">فتح الرحمن</div>
            <p className="text-xs text-muted-foreground mt-2">صديق الطفولة يسانده</p>
          </CardContent>
        </Card>
      </section>

      {/* Featured Lessons */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black font-headline text-primary">فصول من الملحمة</h2>
          <Button variant="link" className="text-primary font-bold group text-lg" asChild>
            <Link href="/lessons" className="flex items-center">
              عرض كل الفصول <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </div>
  );
}
