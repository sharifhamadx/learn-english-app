
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { MessageCircle, Loader2, ShieldCheck, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useAuth, useUser, setDocumentNonBlocking, updateDocumentNonBlocking, initiateAnonymousSignIn } from '@/firebase';
import { collection, query, where, getDocs, doc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [authFlow, setAuthFlow] = useState<'idle' | 'admin' | 'user'>('idle');
  const [pendingCodeData, setPendingCodeData] = useState<any>(null);
  
  const { user } = useUser();
  const { toast } = useToast();
  const db = useFirestore();
  const auth = useAuth();

  useEffect(() => {
    if (!user || authFlow === 'idle') return;

    if (authFlow === 'admin') {
      const adminRef = doc(db, 'adminUsers', user.uid);
      setDocumentNonBlocking(adminRef, {
        id: user.uid,
        role: 'admin',
        name: 'شريف حماد عبد الله',
        lastActive: serverTimestamp()
      }, { merge: true });

      localStorage.setItem('moc-co-auth', 'admin');
      toast({ title: "مرحباً يا أستاذ شريف حماد", description: "تم تفعيل صلاحيات الإدارة العليا بنجاح." });
      window.location.href = '/admin/dashboard';
    } else if (authFlow === 'user' && pendingCodeData) {
      const codeRef = doc(db, 'accessCodes', pendingCodeData.id);
      const userRef = doc(db, 'users', user.uid);

      if (!pendingCodeData.usedByUid) {
        updateDocumentNonBlocking(codeRef, {
          usedByUid: user.uid,
          activatedAt: serverTimestamp()
        });
      }

      setDocumentNonBlocking(userRef, {
        id: user.uid,
        accessCode: pendingCodeData.code,
        plan: pendingCodeData.plan,
        lastLogin: serverTimestamp()
      }, { merge: true });

      localStorage.setItem('moc-co-auth', 'user');
      localStorage.setItem('moc-co-plan', pendingCodeData.plan);
      localStorage.setItem('moc-co-access-code', pendingCodeData.code);
      
      toast({ title: "تم التفعيل بنجاح", description: `مرحباً بك في باقة (${pendingCodeData.plan})` });
      window.location.href = '/lessons';
    }

    setAuthFlow('idle');
    setLoading(false);
  }, [user, authFlow, pendingCodeData, db, toast]);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode) {
      toast({ variant: "destructive", title: "تنبيه", description: "يرجى إدخال رمز التفعيل أولاً." });
      return;
    }
    
    setLoading(true);

    // كود المدير العام (فائق الأمان)
    if (cleanCode === 'Hamed1@moko122a@') {
      setAuthFlow('admin');
      initiateAnonymousSignIn(auth);
      return;
    }

    try {
      const q = query(collection(db, 'accessCodes'), where('code', '==', cleanCode));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({ variant: "destructive", title: "رمز خاطئ", description: "عذراً، رمز التفعيل هذا غير صحيح أو غير مسجل." });
        setLoading(false);
        return;
      }

      const codeDoc = querySnapshot.docs[0];
      const codeData = { id: codeDoc.id, ...codeDoc.data() } as any;

      if (!codeData.isActive) {
        toast({ variant: "destructive", title: "ترخيص معطل", description: "تم إبطال هذا الرمز من قبل الإدارة." });
        setLoading(false);
        return;
      }

      setPendingCodeData(codeData);
      setAuthFlow('user');
      initiateAnonymousSignIn(auth);

    } catch (error: any) {
      toast({ variant: "destructive", title: "خطأ فني", description: "تعذر الاتصال بنظام الحماية." });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-none rounded-[3.5rem] overflow-hidden bg-white/90 backdrop-blur-xl border border-white">
        <div className="bg-primary p-12 text-center text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="mx-auto w-20 h-20 bg-white/20 rounded-[2.5rem] flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
            <LockKeyhole className="h-10 w-10 text-accent" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-black font-headline tracking-tighter">Moko Secure</CardTitle>
            <p className="text-white/70 text-[10px] font-black tracking-[0.3em] uppercase">Access Code Required</p>
          </div>
        </div>
        <CardContent className="p-10 space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="code" className="text-right block font-black text-primary text-[10px] uppercase tracking-widest opacity-60">Activation Serial Code</Label>
              <div className="relative">
                <Input 
                  id="code" 
                  type={showCode ? "text" : "password"}
                  placeholder="••••••••••••" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center h-20 text-2xl font-black rounded-[1.5rem] border-4 focus:border-accent transition-all bg-muted/30 tracking-[0.2em]"
                  disabled={loading}
                />
                <button 
                  onClick={() => setShowCode(!showCode)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                >
                  {showCode ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <Button 
              onClick={(e) => handleLogin(e)} 
              className="w-full h-20 text-xl font-black bg-primary rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all" 
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin h-8 w-8" /> : "Unlock Saga"}
            </Button>
          </div>
          
          <div className="pt-6 border-t border-dashed text-center space-y-4">
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-50">Authorized Personnel Only</p>
            <Button variant="outline" className="w-full gap-3 h-14 rounded-2xl text-green-600 border-2 border-green-100 bg-green-50/30 hover:bg-green-50 font-black text-sm" asChild>
              <a href="https://wa.me/447342322206" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Request New Serial
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-[8px] text-muted-foreground justify-center uppercase tracking-[0.4em] font-black opacity-30">
            <ShieldCheck className="h-3 w-3" />
            <span>Encrypted Session Link</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
