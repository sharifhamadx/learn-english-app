
"use client";

import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ChevronRight, Library, Sparkles, Volume2, FileDown, Globe, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export default function HomePage() {
  const featuredLessons = MOCK_LESSONS.slice(0, 3);
  const { t, language } = useLanguage();

  return (
    <div className="space-y-16 md:space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-primary px-6 py-16 text-white md:px-20 md:py-40 shadow-[0_50px_100px_rgba(0,0,0,0.15)] group">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
          <div className="inline-flex items-center gap-3 bg-white/10 px-4 md:px-6 py-2 md:py-2.5 rounded-full backdrop-blur-xl border border-white/20">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-accent" />
            <span className="text-[10px] md:text-sm font-black tracking-widest uppercase">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-4xl md:text-8xl font-black font-headline leading-[1.1] md:leading-none tracking-tighter">
            {language === 'en' ? (
              <>Learn English with <br className="hidden md:block" /><span className="text-accent underline decoration-white/20 underline-offset-4 md:underline-offset-8">300 Real Stories</span></>
            ) : (
              <>تعلم الإنجليزية مع <br className="hidden md:block" /><span className="text-accent underline decoration-white/20 underline-offset-4 md:underline-offset-8">300 قصة حقيقية</span></>
            )}
          </h1>
          
          <p className="text-lg md:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto font-medium">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4 md:pt-8">
            <Button size="lg" className="bg-accent text-primary font-black hover:bg-white px-8 md:px-12 h-16 md:h-20 text-xl md:text-2xl rounded-[1.5rem] md:rounded-[2rem] shadow-2xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto" asChild>
              <Link href="/lessons">{t.hero.start}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 hover:bg-white/10 text-white px-8 md:px-12 h-16 md:h-20 text-xl md:text-2xl rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-md w-full sm:w-auto" asChild>
              <Link href="/stats">{t.hero.viewStats}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12 md:space-y-20 py-10 px-2 md:px-4">
        <div className="text-center space-y-4 md:space-y-6">
          <h2 className="text-3xl md:text-5xl font-black font-headline text-primary">{t.features.title}</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">{t.features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <FeatureCard 
            icon={<Library className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />}
            title={t.features.f1_title}
            description={t.features.f1_desc}
          />
          <FeatureCard 
            icon={<Globe className="h-8 w-8 md:h-10 md:w-10 text-accent" />}
            title={t.features.f2_title}
            description={t.features.f2_desc}
          />
          <FeatureCard 
            icon={<Volume2 className="h-8 w-8 md:h-10 md:w-10 text-purple-600" />}
            title={t.features.f3_title}
            description={t.features.f3_desc}
          />
          <FeatureCard 
            icon={<FileDown className="h-8 w-8 md:h-10 md:w-10 text-green-600" />}
            title={t.features.f4_title}
            description={t.features.f4_desc}
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8 md:h-10 md:w-10 text-amber-600" />}
            title={t.features.f5_title}
            description={t.features.f5_desc}
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8 md:h-10 md:w-10 text-red-600" />}
            title={t.features.f6_title}
            description={t.features.f6_desc}
          />
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="space-y-10 md:space-y-16 px-2 md:px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-primary/10 pb-8 md:pb-12 text-center md:text-left rtl:md:text-right">
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-3xl md:text-4xl font-black font-headline text-slate-900">{language === 'en' ? 'Chapter Highlights' : 'أبرز الفصول'}</h2>
            <p className="text-muted-foreground text-lg md:text-xl">{language === 'en' ? 'Experience the quality with our featured trial lessons.' : 'اختبر الجودة من خلال فصولنا التجريبية المختارة.'}</p>
          </div>
          <Button variant="ghost" className="text-primary font-black group text-lg md:text-xl hover:bg-primary/5 px-6 md:px-8 h-14 md:h-16 rounded-xl md:rounded-2xl mx-auto md:mx-0" asChild>
            <Link href="/lessons" className="flex items-center gap-3">
              {language === 'en' ? 'Explore All' : 'استكشف الكل'} <ChevronRight className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
    <div className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all border-b-8 border-b-primary/10 group">
      <div className="bg-muted/50 w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-primary">{title}</h3>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{description}</p>
    </div>
  );
}
