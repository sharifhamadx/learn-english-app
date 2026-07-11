
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { MessageCircle, Loader2, ShieldCheck, Eye, EyeOff, LockKeyhole, Mail, UserPlus, UserCircle, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useAuth, useUser, setDocumentNonBlocking, initiateEmailSignIn, initiateEmailSignUp } from '@/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/LanguageProvider';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { user } = useUser();
  const { toast } = useToast();
  const { language } = useLanguage();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    // Check if it's the admin login bypass
    if (email === 'sharif@moko.admin' && password === 'Hamed1@moko122a@') {
      const adminRef = doc(db, 'adminUsers', user.uid);
      setDocumentNonBlocking(adminRef, {
        id: user.uid,
        role: 'admin',
        name: 'شريف حماد عبد الله',
        lastActive: serverTimestamp()
      }, { merge: true });
      localStorage.setItem('moc-co-auth', 'admin');
      toast({ title: "مرحباً يا أستاذ شريف", description: "تم تفعيل صلاحيات الإدارة العليا." });
      router.push('/admin/dashboard');
      return;
    }

    // Normal User Logic
    const userRef = doc(db, 'users', user.uid);
    setDocumentNonBlocking(userRef, {
      id: user.uid,
      email: user.email || email,
      username: username || "طالب جديد",
      registrationDate: serverTimestamp(),
      plan: "free",
      lastLogin: serverTimestamp()
    }, { merge: true });

    localStorage.setItem('moc-co-auth', 'user');
    toast({ title: "تم الدخول بنجاح", description: "مرحباً بك في ملحمة شريف." });
    router.push('/lessons');
    
  }, [user, db, toast, router, email, password, username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !username)) {
      toast({ variant: "destructive", title: "تنبيه", description: "يرجى ملء كافة الحقول." });
      return;
    }

    setLoading(true);

    // Super Admin Secret Entry
    if (password === 'Hamed1@moko122a@' && email === 'sharif@moko.admin') {
      initiateEmailSignIn(auth, email, password);
      return;
    }

    try {
      if (mode === 'signup') {
        initiateEmailSignUp(auth, email, password);
      } else {
        initiateEmailSignIn(auth, email, password);
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "خطأ", description: "تأكد من البيانات وحاول مجدداً." });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-[3.5rem] overflow-hidden bg-white/90 backdrop-blur-xl">
        <div className="bg-primary p-10 text-center text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="mx-auto w-20 h-20 bg-white/20 rounded-[2.5rem] flex items-center justify-center backdrop-blur-md shadow-inner">
            <BookOpen className="h-10 w-10 text-accent" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-black font-headline tracking-tighter">
              {language === 'en' ? 'Al-Mugran' : 'المُقرن'}
            </CardTitle>
            <p className="text-white/70 text-[10px] font-black tracking-widest uppercase">
              {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
            </p>
          </div>
        </div>

        <CardContent className="p-8 space-y-8">
          <div className="flex bg-muted/50 p-1 rounded-2xl">
            <button 
              onClick={() => setMode('login')}
              className={cn("flex-1 py-3 rounded-xl font-black text-xs transition-all", mode === 'login' ? "bg-white text-primary shadow-sm" : "text-muted-foreground")}
            >
              تسجيل دخول
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={cn("flex-1 py-3 rounded-xl font-black text-xs transition-all", mode === 'signup' ? "bg-white text-primary shadow-sm" : "text-muted-foreground")}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label className="text-right block font-black text-primary text-[10px] uppercase opacity-60">الاسم</Label>
                <div className="relative">
                  <UserCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                  <Input 
                    placeholder="اسمك الكامل" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pr-12 h-14 rounded-2xl border-2 font-bold text-right"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-right block font-black text-primary text-[10px] uppercase opacity-60">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30" />
                <Input 
                  type="email"
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-12 h-14 rounded-2xl border-2 font-bold text-left"
                  dir="ltr"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-right block font-black text-primary text-[10px] uppercase opacity-60">كلمة السر</Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 rounded-2xl border-2 font-bold text-left"
                  dir="ltr"
                  autoComplete="current-password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full h-16 text-lg font-black bg-primary rounded-2xl shadow-xl hover:scale-[1.01] active:scale-95 transition-all mt-4" 
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin h-6 w-6" /> : mode === 'signup' ? "ابدأ الملحمة الآن" : "دخول"}
            </Button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-[10px] text-muted-foreground font-bold italic">
              "صدقة جارية لاختي عائشة رحمة الله عليها"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
