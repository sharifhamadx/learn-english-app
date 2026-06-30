
import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Button } from '@/components/ui/button';
import { Trophy, ShieldCheck, BookOpen, ChevronRight, Anchor, Heart, GraduationCap, Library, Sparkles, Volume2, FileDown, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuredLessons = MOCK_LESSONS.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3rem] bg-[#346da1] px-8 py-20 text-white md:px-16 md:py-32 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full backdrop-blur-md border border-white/20">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold">تجربة تعليمية حصرية ومبتكرة</span>
          </div>
          
          <h1 className="text-5xl font-black font-headline md:text-7xl leading-tight" dir="rtl">
            تعلم الإنجليزية مع <br />
            <span className="text-accent">300 قصة حقيقية</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium" dir="rtl">
            تمارين تفاعلية، ترجمة حصرية مدمجة لكل كلمة، استماع صوتي عالي الجودة، وإمكانية تحميل كل قصة كملف PDF. رحلة تعليمية متكاملة بانتظارك.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-accent text-primary font-black hover:bg-white px-10 h-16 text-xl rounded-2xl shadow-xl transition-all" asChild>
              <Link href="/lessons">ابدأ التعلم الآن</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 hover:bg-white/10 text-white px-10 h-16 text-xl rounded-2xl backdrop-blur-md" asChild>
              <Link href="/stats">تتبع تقدمي</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ما يميزنا Section */}
      <section className="space-y-16 py-10" dir="rtl">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black font-headline text-primary">ما يميز Mo_Co؟</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">نحن لا نقدم مجرد دروس، نحن نقدم نظاماً تعليمياً ذكياً مصمماً لكسر حاجز اللغة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <FeatureCard 
            icon={<Library className="h-8 w-8 text-blue-600" />}
            title="300 قصة حقيقية"
            description="محتوى ضخم ومتنوع يغطي كافة جوانب الحياة اليومية والعملية بأسلوب قصصي مشوق."
          />
          <FeatureCard 
            icon={<Globe className="h-8 w-8 text-accent" />}
            title="ترجمة حصرية فورية"
            description="اضغط على أي كلمة في القصة لتعرف معناها بالعربي فوراً دون الحاجة لمغادرة الصفحة."
          />
          <FeatureCard 
            icon={<Volume2 className="h-8 w-8 text-purple-600" />}
            title="استماع صوتي مدمج"
            description="استمع للنطق الصحيح للقصص بلكنة واضحة لتحسين مهارة الاستماع لديك."
          />
          <FeatureCard 
            icon={<FileDown className="h-8 w-8 text-green-600" />}
            title="تحميل ملفات PDF"
            description="يمكنك تحميل أي قصة مع تمارينها بصيغة PDF للمراجعة والمذاكرة في أي وقت."
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-amber-600" />}
            title="تمارين تفاعلية"
            description="اختبر فهمك بعد كل قصة من خلال تمارين ذكية تصحح لك إجاباتك فوراً."
          />
          <FeatureCard 
            icon={<Trophy className="h-8 w-8 text-red-600" />}
            title="تتبع التقدم الحقيقي"
            description="لوحة إنجازات ذكية تحسب نقاط خبرتك ووقت مذاكرتك ودقة إجاباتك."
          />
        </div>
      </section>

      {/* Narrative Stages (Visual context) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl text-right hover:-translate-y-2 transition-all group">
          <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mr-0 ml-auto">
            <GraduationCap className="h-7 w-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-black mb-3 text-slate-900">مرحلة التأسيس</h3>
          <p className="text-slate-500 text-sm leading-relaxed">أول 100 درس: بناء القواعد الأساسية والمفردات الضرورية عبر قصص واقعية بسيطة.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl text-right hover:-translate-y-2 transition-all group">
          <div className="bg-pink-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mr-0 ml-auto">
            <Heart className="h-7 w-7 text-pink-600" />
          </div>
          <h3 className="text-xl font-black mb-3 text-slate-900">مرحلة التمكين</h3>
          <p className="text-slate-500 text-sm leading-relaxed">ثاني 100 درس: التعمق في التعبيرات الاصطلاحية والدراما الاجتماعية المعقدة.</p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl text-right hover:-translate-y-2 transition-all group">
          <div className="bg-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mr-0 ml-auto">
            <Anchor className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-xl font-black mb-3 text-slate-900">مرحلة الاحتراف</h3>
          <p className="text-slate-500 text-sm leading-relaxed">آخر 100 درس: إتقان اللغة في سياقات صعبة وأهوال ومواقف تتطلب لغة متقدمة.</p>
        </div>
      </section>

      {/* Featured Lessons Header */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b pb-8">
          <div className="space-y-4 text-right">
            <h2 className="text-3xl font-black font-headline text-slate-900">مختارات من المكتبة</h2>
            <p className="text-slate-500">ابدأ بأحد هذه الدروس لتختبر جودة المحتوى والترجمة الحصرية.</p>
          </div>
          <Button variant="ghost" className="text-primary font-black group text-lg" asChild>
            <Link href="/lessons" className="flex items-center gap-2">
              استكشف كافة الدروس <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg text-right hover:shadow-xl transition-all border-b-4 border-b-primary/10">
      <div className="bg-muted/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mr-0 ml-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
