
"use client";

import Link from 'next/link';
import { BookOpen, Home, Trophy, Search, LogIn, LogOut, Settings, Moon, Sun, Info, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [authType, setAuthType] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAuthType(localStorage.getItem('moc-co-auth'));
    // Check initial theme
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('moc-co-auth');
    localStorage.removeItem('moc-co-access-code');
    setAuthType(null);
    router.push('/login');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:top-0 md:bottom-auto md:border-t-0 md:border-b shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
          <BookOpen className="h-8 w-8 text-accent" />
          <span className="hidden sm:inline">Moc-co</span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
          <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">الرئيسية</span>
          </Link>
          <Link href="/lessons" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">الدروس</span>
          </Link>
          <Link href="/about" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Info className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">من نحن</span>
          </Link>
          
          {authType === 'admin' && (
            <Link href="/admin/dashboard" className="flex flex-col items-center gap-1 text-accent hover:text-accent/80 transition-colors font-bold shrink-0">
              <Settings className="h-5 w-5" />
              <span className="text-[10px] uppercase tracking-wider">الإدارة</span>
            </Link>
          )}

          <Link href="/stats" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Trophy className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">تقدمي</span>
          </Link>

          <div className="h-8 w-px bg-border mx-2 hidden md:block" />

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full shrink-0">
            {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-primary" />}
          </Button>
          
          {authType ? (
            <button 
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-destructive transition-colors shrink-0"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">خروج</span>
            </button>
          ) : (
            <Link href="/login" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
              <LogIn className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">دخول</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
