import Link from 'next/link';
import { BookOpen, Home, Trophy, Wand2, Search } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
          <BookOpen className="h-8 w-8 text-accent" />
          <span className="hidden sm:inline">Moc-co</span>
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
          </Link>
          <Link href="/lessons" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Lessons</span>
          </Link>
          <Link href="/stats" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Trophy className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Progress</span>
          </Link>
          <Link href="/admin/generate" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Wand2 className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">AI Lab</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}