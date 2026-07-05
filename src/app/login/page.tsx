
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, ShieldAlert, MessageCircle, Loader2, Smartphone, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useAuth } from '@/firebase';
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const db = useFirestore();
  const auth = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode) return;
    
    setLoading(true);

    try {
      // نظام دخول المدير العام (الرمز الماستر)
      if (cleanCode === '77102026') {
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        await setDoc(doc(db, 'adminUsers', user.uid), {
          id: user.uid,
          role: 'admin',
          name: 'شريف حماد عبد الله',
          lastActive: serverTimestamp()
        }, { merge: true });

        localStorage.setItem('moc-co-auth', 'admin');
        toast({ title: "مرحباً يا أستاذ شريف حماد", description: "تم تفعيل صلاحيات الإدارة العليا." });
        window.location.href = '/admin/dashboard';
        return;
      }

      // البحث عن الكود في قاعدة البيانات
      const q = query(collection(db, 'accessCodes'), where('code', '==', cleanCode));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({ variant: "destructive", title: "كود خاطئ", description: "عذراً، هذا الكود غير مسجل في النظام." });
        setLoading(false);
        return;
      }

      const codeDoc = querySnapshot.docs[0];
      const codeData = codeDoc.data();

      if (!codeData.isActive) {
        toast({ variant: "destructive", title: "ترخيص معطل", description: "تم إبطال هذا الكود من قبل الإدارة." });
        setLoading(false);
        return;
      }

      // تسجيل دخول مجهول للحصول على UID فريد للجهاز
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // فحص حماية ربط الجهاز (Device Binding)
      if (codeData.usedByUid && codeData.usedByUid !== user.uid) {
        toast({ 
          variant: "destructive", 
          title: "حماية الجهاز", 
          description: "هذا الكود مرتبط بجهاز آخر بالفعل. لا يسمح بالتفعيل المتعدد." 
        });
        setLoading(false);
        return;
      }

      // ربط الجهاز بالكود إذا كان جديداً
      if (!codeData.usedByUid) {
        await updateDoc(doc(db, 'accessCodes', codeDoc.id), {
          usedByUid: user.uid,
          activatedAt: serverTimestamp()
        });
      }

      // تحديث ملف المستخدم
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        accessCode: cleanCode,
        plan: codeData.plan,
        lastLogin: serverTimestamp()
      }, { merge: true });

      localStorage.setItem('moc-co-auth', 'user');
      localStorage.setItem('moc-co-plan', codeData.plan);
      localStorage.setItem('moc-co-access-code', cleanCode);
      
      toast({ title: "تم التفعيل بنجاح", description: `مرحباً بك في باقة (${codeData.plan})` });
      window.location.href = '/lessons';

    } catch (error: any) {
      console.error(error);
      toast({ 
        variant: "destructive", 
        title: "خطأ فني", 
        description: "تعذر الاتصال بخادم الحماية. تأكد من الإنترنت." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-none rounded-[3.5rem] overflow-hidden bg-white/90 backdrop-blur-xl">
        <div className="bg-primary p-12 text-center text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="mx-auto w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center backdrop-blur-md shadow-inner">
            <Smartphone className="h-10 w-10 text-accent" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-4xl font-black font-headline">Security Hub</CardTitle>
            <p className="text-white/70 text-sm font-bold tracking-widest uppercase">Activation System v2.0</p>
          </div>
        </div>
        <CardContent className="p-12">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="code" className="text-right block font-black text-primary text-xs uppercase tracking-widest">Serial Access Code</Label>
              <Input 
                id="code" 
                placeholder="77102026..." 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center h-20 text-3xl font-black rounded-[1.5rem] border-4 focus:border-accent transition-all bg-muted/30 tracking-widest"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full h-20 text-2xl font-black bg-primary rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all" disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-8 w-8" /> : "Unlock Full Saga"}
            </Button>
            
            <div className="pt-8 border-t border-dashed text-center space-y-4">
              <p className="text-sm text-muted-foreground font-black uppercase tracking-widest opacity-60">Need a VIP Access Code?</p>
              <Button variant="outline" className="w-full gap-3 h-16 rounded-[1.5rem] text-green-600 border-2 border-green-200 bg-green-50/50 hover:bg-green-50 font-black text-lg shadow-sm" asChild>
                <a href="https://wa.me/447342322206" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-7 w-7" />
                  Request Serial from Sharif
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground justify-center uppercase tracking-[0.3em] font-black opacity-40">
              <ShieldCheck className="h-3 w-3" />
              <span>Biometric Device Binding Active</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
