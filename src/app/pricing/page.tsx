
"use client";

import { Check, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/LanguageProvider';

export default function PricingPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-20 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black font-headline text-primary tracking-tight">مشروع Moc-co الخيري</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto italic">
          لقد تقرر فتح كافة فصول "ملحمة شريف" مجاناً لجميع الطلاب كصدقة جارية.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="relative flex flex-col border-4 border-accent rounded-[3rem] shadow-2xl bg-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <CardHeader className="p-10 text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10 text-accent fill-accent" />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-widest text-primary">باقة العلم النافع</CardTitle>
            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-7xl font-black text-primary">مجاناً</span>
              </div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest mt-4">صدقة لاختي عائشة رحمة الله عليها</span>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-0 space-y-6">
            <div className="h-px bg-slate-100 w-full" />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "دخول كامل لـ 300 فصل",
                "استماع صوتي عالي الجودة",
                "تحميل ملفات PDF مجانية",
                "ترجمة فورية لكافة الكلمات",
                "تتبع التقدم ونقاط XP",
                "دعم فني مباشر من شريف"
              ].map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                  <div className="bg-green-500/10 p-1 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="p-10">
            <Button className="w-full h-20 rounded-[2rem] font-black text-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all" asChild>
              <a href="/lessons">ابدأ التعلم الآن</a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-primary/5 rounded-[3rem] p-10 text-center space-y-6 border border-primary/10">
        <h3 className="text-2xl font-bold text-primary">هل تحتاج للمساعدة؟</h3>
        <p className="text-muted-foreground">أنا شريف حماد، متاح دائماً لدعمكم في رحلتكم التعليمية.</p>
        <p className="font-bold text-primary">sharifhamadmoko@gmail.com</p>
        <Button className="bg-green-500 hover:bg-green-600 h-14 px-8 rounded-2xl gap-3" asChild>
          <a href="https://wa.me/447342322206" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-6 w-6" />
            تحدث مع شريف مباشرة
          </a>
        </Button>
      </div>
    </div>
  );
}
