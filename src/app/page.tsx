"use client";

import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ChevronRight, Library, Sparkles, Volume2, FileDown, Globe, Zap } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export default function HomePage() {
  const featuredLessons = MOCK_LESSONS.slice(0, 3);
  const { t, language } = useLanguage();

  return (
    <div className="space-y-12 md:space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-primary px-6 py-12 text-white md:px-16 md:py-32 shadow-[0_30px_60px_rgba(0,0,0,0.12)] group">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 md:px-5 md:py-2 rounded-full backdrop-blur-xl border border-white/20">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">{t.hero.badge}</span>
          </div>
          
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black font-headline leading-[1.15] tracking-tighter text-balance">
            {language === 'en' ? (
              <>Learn English with <br className="hidden md:block" /><span className="text-accent underline decoration-white/20 underline-offset-4 md:underline-offset-8">300 Real Stories</span></>
            ) : (
              <>تعلم الإنجليزية مع <br className="hidden md:block" /><span className="text-accent underline decoration-white/20 underline-offset-4 md:underline-offset-8">300 قصة حقيقية</span></>
            )}
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto font-medium text-pretty">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center pt-4">
            <Button size="lg" className="bg-accent text-primary font-black hover:bg-white px-6 md:px-10 h-14 md:h-16 text-lg md:text-xl rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto" asChild>
              <Link href="/lessons">{t.hero.start}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 hover:bg-white/10 text-white px-6 md:px-10 h-14 md:h-16 text-lg md:text-xl rounded-2xl backdrop-blur-md w-full sm:w-auto" asChild>
              <Link href="/stats">{t.hero.viewStats}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-10 md:space-y-16 py-6 px-2">
        <div className="text-center space-y-3 md:space-y-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-headline text-primary">{t.features.title}</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto text-pretty">{t.features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard 
            icon={<Library className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />}
            title={t.features.f1_title}
            description={t.features.f1_desc}
          />
          <FeatureCard 
            icon={<Globe className="h-6 w-6 md:h-8 md:w-8 text-accent" />}
            title={t.features.f2_title}
            description={t.features.f2_desc}
          />
          <FeatureCard 
            icon={<Volume2 className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />}
            title={t.features.f3_title}
            description={t.features.f3_desc}
          />
          <FeatureCard 
            icon={<FileDown className="h-6 w-6 md:h-8 md:w-8 text-green-600" />}
            title={t.features.f4_title}
            description={t.features.f4_desc}
          />
          <FeatureCard 
            icon={<Zap className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />}
            title={t.features.f5_title}
            description={t.features.f5_desc}
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-red-600" />}
            title={t.features.f6_title}
            description={t.features.f6_desc}
          />
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="space-y-8 md:space-y-12 px-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 border-b border-primary/10 pb-6 md:pb-8 text-center md:text-left rtl:md:text-right">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-2xl md:text-3xl font-black font-headline text-slate-900">{language === 'en' ? 'Chapter Highlights' : 'أبرز الفصول'}</h2>
            <p className="text-muted-foreground text-base md:text-lg">{language === 'en' ? 'Experience the quality with our featured trial lessons.' : 'اختبر الجودة من خلال فصولنا التجريبية المختارة.'}</p>
          </div>
          <Button variant="ghost" className="text-primary font-black group text-base md:text-lg hover:bg-primary/5 px-4 md:px-6 h-12 md:h-14 rounded-xl mx-auto md:mx-0" asChild>
            <Link href="/lessons" className="flex items-center gap-2">
              {language === 'en' ? 'Explore All' : 'استكشف الكل'} <ChevronRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
    <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all border-b-4 border-b-primary/10 group">
      <div className="bg-muted/50 w-12 h-12 md:w-16 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl mb-4 md:mb-6 group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-black mb-2 text-primary">{title}</h3>
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{description}</p>
    </div>
  );
}