
"use client";

import Link from 'next/link';
import { BookOpen, Home, Trophy, Wand2, Search, LogIn, LogOut, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Navigation() {
  const [authType, setAuthType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setAuthType(localStorage.getItem('moc-co-auth'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('moc-co-auth');
    localStorage.removeItem('moc-co-access-code');
    setAuthType(null);
    router.push('/login');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
          <BookOpen className="h-8 w-8 text-accent" />
          <span className="hidden sm:inline">Moc-co</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">الرئيسية</span>
          </Link>
          <Link href="/lessons" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">الدروس</span>
          </Link>
          
          {authType === 'admin' && (
            <Link href="/admin/dashboard" className="flex flex-col items-center gap-1 text-accent hover:text-accent/80 transition-colors font-bold">
              <Settings className="h-5 w-5" />
              <span className="text-[10px] uppercase tracking-wider">الإدارة</span>
            </Link>
          )}

          <Link href="/stats" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Trophy className="h-5 w-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">تقدمي</span>
          </Link>
          
          {authType ? (
            <button 
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">خروج</span>
            </button>
          ) : (
            <Link href="/login" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <LogIn className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">دخول</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
