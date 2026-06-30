
import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Star, BookOpen, ChevronRight, Anchor, Heart, GraduationCap, Library, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuredLessons = MOCK_LESSONS.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section - Ultra Professional with updated text */}
      <section className="relative overflow-hidden rounded-[3.5rem] bg-slate-900 px-8 py-24 text-white md:px-20 md:py-36 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://picsum.photos/seed/tech/1920/1080')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="relative z-10 max-w-4xl space-y-10 text-right mr-auto">
          <div className="inline-flex items-center gap-3 bg-accent/20 px-6 py-2.5 rounded-2xl backdrop-blur-xl border border-accent/30 animate-pulse">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">The Sharif Saga: تجربة تعليمية ثورية</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight font-headline md:text-8xl leading-[1.1]">
            لا تتعلم اللغة.. <br />
            <span className="text-accent underline decoration-white/20 underline-offset-8">عِش الملحمة.</span>
          </h1>
          <p className="text-2xl text-slate-300 leading-relaxed max-w-3xl mr-auto font-bold">
            تعلم الإنجليزية بـ 300 قصة حقيقية مع تمارين وترجمة حصرية لأي كلمة جديدة.
          </p>
          <div className="flex flex-wrap gap-6 pt-6 justify-end">
            <Button size="lg" className="bg-accent text-slate-900 font-black hover:bg-white px-12 h-16 text-xl rounded-2xl shadow-2xl transition-all hover:scale-105" asChild>
              <Link href="/lessons">ابدأ الرحلة الأسطورية الآن</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-12 h-16 text-xl rounded-2xl backdrop-blur-md" asChild>
              <Link href="/about">اكتشف قصة شريف</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2"><ShieldCheck className="h-6 w-6" /> <span className="font-bold">حماية قانونية سودانية</span></div>
        <div className="flex items-center gap-2"><Sparkles className="h-6 w-6" /> <span className="font-bold">خوارزميات تعليمية متطورة</span></div>
        <div className="flex items-center gap-2"><Library className="h-6 w-6" /> <span className="font-bold">300 فصل معتمد</span></div>
      </div>

      {/* Narrative Stages - Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group text-right hover:-translate-y-2">
          <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 mr-0 ml-auto group-hover:rotate-6 transition-transform">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black mb-4 text-slate-900">سنوات التحدي</h3>
          <p className="text-slate-500 leading-relaxed">المرحلة الأولى: 100 درس تغطي 22 عاماً من الكفاح الأكاديمي بجامعة السودان وصدمات الواقع المرير.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group text-right hover:-translate-y-2">
          <div className="bg-pink-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 mr-0 ml-auto group-hover:rotate-6 transition-transform">
            <Heart className="h-8 w-8 text-pink-600" />
          </div>
          <h3 className="text-2xl font-black mb-4 text-slate-900">صراع القلوب والمال</h3>
          <p className="text-slate-500 leading-relaxed">المرحلة الثانية: 100 درس درامي. قصص نمارق، مكارم، وصرامة سارة. حيث يختبر المال معدن الوفاء.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group text-right hover:-translate-y-2">
          <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 mr-0 ml-auto group-hover:rotate-6 transition-transform">
            <Anchor className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-black mb-4 text-slate-900">ما وراء البحار</h3>
          <p className="text-slate-500 leading-relaxed">المرحلة الثالثة: 100 درس متقدم. أهوال المحيط، انفجار القوارب، السجون، وحرب البقاء في الغربة.</p>
        </div>
      </section>

      {/* Featured Lessons Header */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b pb-12">
          <div className="space-y-4 text-right">
            <h2 className="text-4xl font-black font-headline text-slate-900">مختارات من الملحمة</h2>
            <p className="text-slate-500 text-lg">فصول مختارة بعناية لتبدأ بها رحلتك في Moc-co اليوم.</p>
          </div>
          <Button variant="ghost" className="text-primary font-black group text-xl hover:bg-primary/5 p-8 rounded-2xl" asChild>
            <Link href="/lessons" className="flex items-center gap-3">
              استكشف الـ 300 فصل <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </div>
  );
}
