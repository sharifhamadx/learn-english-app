import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ChevronRight, Library, Sparkles, Volume2, FileDown, Globe, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuredLessons = MOCK_LESSONS.slice(0, 3);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[4rem] bg-primary px-10 py-24 text-white md:px-20 md:py-40 shadow-[0_50px_100px_rgba(0,0,0,0.15)] group">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl border border-white/20">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-black tracking-widest uppercase">The Next Gen of Language Learning</span>
          </div>
          
          <h1 className="text-6xl font-black font-headline md:text-8xl leading-none tracking-tighter">
            Learn English with <br />
            <span className="text-accent underline decoration-white/20 underline-offset-8">300 Real Stories</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto font-medium">
            Master the language through real-life drama, interactive exercises, and context-aware translations. 
            300 chapters of professional experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button size="lg" className="bg-accent text-primary font-black hover:bg-white px-12 h-20 text-2xl rounded-[2rem] shadow-2xl transition-all hover:scale-105 active:scale-95" asChild>
              <Link href="/lessons">Start the Journey</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/5 hover:bg-white/10 text-white px-12 h-20 text-2xl rounded-[2rem] backdrop-blur-md" asChild>
              <Link href="/stats">View Progress</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="space-y-20 py-10 px-4">
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-black font-headline text-primary">System Features</h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">Educational engineering designed for ambitious learners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Library className="h-10 w-10 text-blue-600" />}
            title="300 Modular Chapters"
            description="A massive curriculum covering all levels from foundation to absolute mastery."
          />
          <FeatureCard 
            icon={<Globe className="h-10 w-10 text-accent" />}
            title="Contextual Translation"
            description="Smart technology to translate words in their original context for better retention."
          />
          <FeatureCard 
            icon={<Volume2 className="h-10 w-10 text-purple-600" />}
            title="High-Fidelity Audio"
            description="Integrated Text-to-Speech (TTS) engine to enhance pronunciation and listening."
          />
          <FeatureCard 
            icon={<FileDown className="h-10 w-10 text-green-600" />}
            title="Professional PDF Reports"
            description="Generate complete educational documents in PDF format for every single lesson."
          />
          <FeatureCard 
            icon={<Zap className="h-10 w-10 text-amber-600" />}
            title="Real-Time Analytics"
            description="Intelligent dashboard calculating XP, accuracy, and real learning hours."
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-10 w-10 text-red-600" />}
            title="Secure Access System"
            description="Subscription management via unique codes and secure cloud database."
          />
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="space-y-16 px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-primary/10 pb-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black font-headline text-slate-900">Chapter Highlights</h2>
            <p className="text-muted-foreground text-xl">Experience the quality with our featured trial lessons.</p>
          </div>
          <Button variant="ghost" className="text-primary font-black group text-xl hover:bg-primary/5 px-8 h-16 rounded-2xl" asChild>
            <Link href="/lessons" className="flex items-center gap-3">
              Explore All Lessons <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-lg hover:shadow-2xl transition-all border-b-8 border-b-primary/10 group">
      <div className="bg-muted/50 w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 text-primary">{title}</h3>
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
    </div>
  );
}
