
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, ShieldAlert, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const db = useFirestore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (code === '77102026') {
      localStorage.setItem('moc-co-auth', 'admin');
      toast({ title: "أهلاً بك أيها المدير", description: "جاري الانتقال للوحة التحكم..." });
      router.push('/admin/dashboard');
      return;
    }

    try {
      const q = query(collection(db, 'accessCodes'), where('code', '==', code.trim()), where('isActive', '==', true));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        localStorage.setItem('moc-co-auth', 'user');
        localStorage.setItem('moc-co-access-code', code.trim());
        toast({ title: "تم التفعيل بنجاح", description: "استمتع برحلة التعلم الكاملة!" });
        router.push('/lessons');
      } else {
        toast({
          variant: "destructive",
          title: "رمز غير صحيح أو منتهي",
          description: "تأكد من الرمز أو تواصل معنا للاشتراك.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "خطأ", description: "تعذر التحقق من الرمز حالياً." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold font-headline">تسجيل الدخول / التفعيل</CardTitle>
          <CardDescription>أدخل رمز الوصول الخاص بك لفتح 300 فصل من ملحمة شريف</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-right block">الرمز السري</Label>
              <Input 
                id="code" 
                type="text" 
                placeholder="أدخل الرمز هنا" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center h-12 text-lg font-bold"
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? "جاري التحقق..." : "تفعيل الحساب"}
            </Button>
            
            <div className="pt-4 border-t text-center space-y-4">
              <p className="text-sm text-muted-foreground">ليس لديك رمز تفعيل؟</p>
              <Button variant="outline" className="w-full gap-2 text-green-600 border-green-200 hover:bg-green-50" asChild>
                <a href="https://wa.me/13238181488" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  تواصل معنا عبر واتساب للاشتراك
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
              <ShieldAlert className="h-3 w-3" />
              <span>محتوى تعليمي محمي - Moc-co</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
