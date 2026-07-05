
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, ShieldAlert, MessageCircle, Loader2, Smartphone } from 'lucide-react';
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
      // نظام دخول المدير (الرمز الماستر)
      if (cleanCode === '77102026') {
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        await setDoc(doc(db, 'adminUsers', user.uid), {
          id: user.uid,
          role: 'admin',
          lastActive: serverTimestamp()
        }, { merge: true });

        localStorage.setItem('moc-co-auth', 'admin');
        toast({ title: "مرحباً يا مبرمج شريف", description: "تم تفعيل صلاحيات الإدارة الكاملة." });
        window.location.href = '/admin/dashboard';
        return;
      }

      // البحث عن الكود في قاعدة البيانات
      const q = query(collection(db, 'accessCodes'), where('code', '==', cleanCode));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({ variant: "destructive", title: "كود خاطئ", description: "هذا الكود غير موجود في نظامنا." });
        setLoading(false);
        return;
      }

      const codeDoc = querySnapshot.docs[0];
      const codeData = codeDoc.data();

      if (!codeData.isActive) {
        toast({ variant: "destructive", title: "كود معطل", description: "عذراً، هذا الكود تم إبطاله من قبل الإدارة." });
        setLoading(false);
        return;
      }

      // تسجيل دخول مجهول للحصول على UID فريد لهذا الجهاز
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // فحص ربط الجهاز (Device Binding)
      if (codeData.usedByUid && codeData.usedByUid !== user.uid) {
        toast({ 
          variant: "destructive", 
          title: "حماية الجهاز", 
          description: "هذا الكود مرتبط بجهاز آخر. لا يمكن تفعيله على أكثر من جهاز." 
        });
        setLoading(false);
        return;
      }

      // إذا كان الكود جديداً، نربطه بهذا الـ UID
      if (!codeData.usedByUid) {
        await updateDoc(doc(db, 'accessCodes', codeDoc.id), {
          usedByUid: user.uid
        });
      }

      // تحديث ملف المستخدم بالباقة الصحيحة
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
        title: "خطأ في الاتصال", 
        description: "تعذر التحقق من الكود حالياً. يرجى التأكد من الإنترنت." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-[3rem] overflow-hidden">
        <div className="bg-primary p-10 text-center text-white space-y-4">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md">
            <Smartphone className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-black">Activation Lab</CardTitle>
          <p className="text-white/70 text-sm">أدخل الكود التسلسلي المخصص لجهازك</p>
        </div>
        <CardContent className="p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-right block font-bold">Serial Access Code</Label>
              <Input 
                id="code" 
                placeholder="77102026..." 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center h-16 text-2xl font-black rounded-2xl border-2 focus:border-primary tracking-widest"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full h-16 text-xl font-black bg-primary rounded-2xl shadow-xl shadow-primary/20" disabled={loading}>
              {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Unlock Saga"}
            </Button>
            
            <div className="pt-6 border-t text-center space-y-4">
              <p className="text-sm text-muted-foreground font-bold">لا تملك كود تفعيل؟</p>
              <Button variant="outline" className="w-full gap-3 h-14 rounded-2xl text-green-600 border-green-200 bg-green-50/50 hover:bg-green-50" asChild>
                <a href="https://wa.me/447342322206" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-6 w-6" />
                  طلب كود من شريف حماد
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground justify-center uppercase tracking-widest font-black opacity-50">
              <ShieldAlert className="h-3 w-3" />
              <span>Device Locked Protection System</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
