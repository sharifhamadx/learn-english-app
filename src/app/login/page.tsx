
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '77102026') {
      // For the sake of this prototype, we'll use localStorage to "persist" session
      localStorage.setItem('moc-co-auth', 'true');
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "أهلاً بك في Moc-co!",
      });
      router.push('/');
    } else {
      toast({
        variant: "destructive",
        title: "رمز غير صحيح",
        description: "يرجى التأكد من الرمز والمحاولة مرة أخرى.",
      });
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold font-headline">تسجيل الدخول</CardTitle>
          <CardDescription>أدخل رمز الدخول الخاص بك للبدء</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-right block">الرمز السري</Label>
              <Input 
                id="code" 
                type="password" 
                placeholder="أدخل الرمز هنا" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center h-12 text-lg tracking-[0.5em]"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90">
              دخول
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
              <ShieldAlert className="h-3 w-3" />
              <span>محتوى تعليمي محمي</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
