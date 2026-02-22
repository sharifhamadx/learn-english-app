import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Star, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuredLessons = MOCK_LESSONS.slice(0, 3);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-24">
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight font-headline md:text-6xl">
            Master English with <span className="text-accent">Moc-co</span>
          </h1>
          <p className="text-lg opacity-90 leading-relaxed max-w-md">
            Dive into 1,000 immersive stories and interactive lessons designed to boost your fluency effectively.
          </p>
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90" asChild>
              <Link href="/lessons">Browse Catalog</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-white/10 hover:bg-white/20 text-white" asChild>
              <Link href="/stats">My Progress</Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-20 hidden lg:block">
          <BookOpen className="w-96 h-96 text-accent" />
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Completed</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">12 / 1000</div>
            <p className="text-xs text-muted-foreground mt-1">+2 this week</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Accuracy</CardTitle>
            <Star className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">94%</div>
            <p className="text-xs text-muted-foreground mt-1">Excellent performance</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Points</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">2,450 XP</div>
            <p className="text-xs text-muted-foreground mt-1">Next rank in 550 XP</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Streak</CardTitle>
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">5 Days</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
          </CardContent>
        </Card>
      </section>

      {/* Featured Lessons */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-headline text-primary">Jump Back In</h2>
          <Button variant="link" className="text-primary font-bold group" asChild>
            <Link href="/lessons" className="flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </div>
  );
}