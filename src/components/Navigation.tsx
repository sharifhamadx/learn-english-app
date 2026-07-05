
"use client";

import Link from 'next/link';
import { BookOpen, Home, Trophy, Search, LogIn, LogOut, Settings, Moon, Sun, Info, Languages, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageProvider';

export function Navigation() {
  const [authType, setAuthType] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    setAuthType(localStorage.getItem('moc-co-auth'));
    setIsDark(document.documentElement.classList.contains('dark'));
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:top-0 md:bottom-auto md:border-t-0 md:border-b shadow-lg transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2 font-headline text-xl font-black text-primary hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6 text-accent" />
          <span className="inline">Mo_Co learn english</span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
          <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t.nav.home}</span>
          </Link>
          <Link href="/lessons" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t.nav.lessons}</span>
          </Link>
          <Link href="/pricing" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <CreditCard className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t.nav.pricing}</span>
          </Link>
          <Link href="/about" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Info className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t.nav.about}</span>
          </Link>
          
          {authType === 'admin' && (
            <Link href="/admin/dashboard" className="flex flex-col items-center gap-1 text-accent hover:text-accent/80 transition-colors font-bold shrink-0">
              <Settings className="h-5 w-5" />
              <span className="text-[10px] uppercase tracking-wider">{t.nav.admin}</span>
            </Link>
          )}

          <Link href="/stats" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Trophy className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{t.nav.stats}</span>
          </Link>

          <div className="h-8 w-px bg-border mx-2 hidden md:block" />

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLanguage} 
            className="rounded-full shrink-0 hover:bg-primary/10 transition-all text-primary font-bold"
            aria-label="Toggle Language"
          >
            <Languages className="h-5 w-5 mr-1" />
            <span className="text-xs">{language === 'en' ? 'AR' : 'EN'}</span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full shrink-0 hover:bg-accent/20 transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-amber-400 animate-in zoom-in-50 duration-300" />
            ) : (
              <Moon className="h-5 w-5 text-primary animate-in zoom-in-50 duration-300" />
            )}
          </Button>
          
          {authType ? (
            <button 
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-destructive transition-colors shrink-0"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">{t.nav.logout}</span>
            </button>
          ) : (
            <Link href="/login" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0">
              <LogIn className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">{t.nav.login}</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
