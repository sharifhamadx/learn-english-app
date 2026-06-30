
import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Button } from '@/components/ui/button';
import { Trophy, ShieldCheck, BookOpen, ChevronRight, Anchor, Heart, GraduationCap, Library, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuredLessons = MOCK_LESSONS.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section - Matching the User Image */}
      <section className="relative overflow-hidden rounded-[3rem] bg-[#346da1] px-8 py-20 text-white md:px-16 md:py-32 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full backdrop-blur-md border border-white/20">
            <Library className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold">مكتبة الـ 300 فصل الجاهزة</span>
          </div>
          
          <h1 className="text-5xl font-black font-headline md:text-7xl leading-tight">
            تعلم الإنجليزية مع <br />
            <span className="text-accent">ملحمة شريف</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-medium">
            انغمس في 300 قصة واقعية طويلة تروي رحلة شريف. من 22 عاماً من الصمود، إلى مآسي الحب، وصولاً إلى أهوال المحيط. دروس جاهزة للتعلم الفوري والمكثف.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-accent text-primary font-black hover:bg-white px-10 h-16 text-xl rounded-2xl shadow-xl transition-all" asChild>
              <Link href="/lessons">ابدأ الرحلة (300 فصل)</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 hover:bg-white/10 text-white px-10 h-16 text-xl rounded-2xl backdrop-blur-md" asChild>
              <Link href="/stats">لوحة الإنجازات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 py-4">
        <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> <span className="font-bold text-sm">حماية قانونية سودانية</span></div>
        <div className="flex items-center gap-2"><Sparkles className="h-5 w-5" /> <span className="font-bold text-sm">خوارزميات تعليمية متطورة</span></div>
        <div className="flex items-center gap-2"><Library className="h-5 w-5" /> <span className="font-bold text-sm">300 فصل معتمد</span></div>
      </div>

      {/* Narrative Stages */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl text-right hover:-translate-y-2 transition-all group">
          <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mr-0 ml-auto">
            <GraduationCap className="h-7 w-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-black mb-3 text-slate-900">سنوات التحدي</h3>
          <p className="text-slate-500 text-sm leading-relaxed">المرحلة الأولى: 100 درس تغطي 22 عاماً من الكفاح الأكاديمي بجامعة السودان وصدمات الواقع المرير.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl text-right hover:-translate-y-2 transition-all group">
          <div className="bg-pink-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mr-0 ml-auto">
            <Heart className="h-7 w-7 text-pink-600" />
          </div>
          <h3 className="text-xl font-black mb-3 text-slate-900">صراع القلوب والمال</h3>
          <p className="text-slate-500 text-sm leading-relaxed">المرحلة الثانية: 100 درس درامي. قصص نمارق، مكارم، وصرامة سارة. حيث يختبر المال معدن الوفاء.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl text-right hover:-translate-y-2 transition-all group">
          <div className="bg-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mr-0 ml-auto">
            <Anchor className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-xl font-black mb-3 text-slate-900">ما وراء البحار</h3>
          <p className="text-slate-500 text-sm leading-relaxed">المرحلة الثالثة: 100 درس متقدم. أهوال المحيط، انفجار القوارب، السجون، وحرب البقاء في الغربة.</p>
        </div>
      </section>

      {/* Featured Lessons Header */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b pb-8">
          <div className="space-y-4 text-right">
            <h2 className="text-3xl font-black font-headline text-slate-900">مختارات من الملحمة</h2>
            <p className="text-slate-500">فصول مختارة بعناية لتبدأ بها رحلتك في Moc-co اليوم.</p>
          </div>
          <Button variant="ghost" className="text-primary font-black group text-lg" asChild>
            <Link href="/lessons" className="flex items-center gap-2">
              استكشف الـ 300 فصل <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
