
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, User, Code, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-16 text-right px-4" dir="rtl">
      <div className="text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center rotate-3 border-2 border-primary/20">
          <User className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-5xl font-black font-headline text-primary tracking-tight">من هو شريف حماد؟</h1>
        <p className="text-muted-foreground text-xl italic max-w-2xl mx-auto">"رؤية تعليمية ولدت من قلب المعاناة لتصنع جيلاً من المتمكنين لغوياً"</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="bg-primary text-primary-foreground p-10">
            <CardTitle className="text-3xl font-bold flex items-center justify-end gap-3">
              المؤسس والمطور
              <Code className="h-8 w-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-10 text-lg leading-relaxed">
            <div className="flex gap-6 items-start">
              <div className="bg-accent/20 p-4 rounded-2xl shadow-inner">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-primary text-xl mb-3">المسيرة الأكاديمية</p>
                <p className="text-muted-foreground">
                  شريف حماد عبد الله، خريج متميز من <strong className="text-foreground">جامعة السودان للعلوم والتكنولوجيا</strong>. مبرمج وباحث علمي شغوف، يواصل حالياً رحلته الأكاديمية العالمية كطالب في <strong className="text-foreground">جامعة الناس (UoPeople)</strong> بالولايات المتحدة الأمريكية، متخصصاً في علوم الحاسوب وتطوير الأنظمة التعليمية الذكية.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-accent/20 p-4 rounded-2xl shadow-inner">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-primary text-xl mb-3">فلسفة Moc-co</p>
                <p className="text-muted-foreground">
                  لم يكن Moc-co مجرد تطبيق برمجي، بل هو تجسيد لرحلة إنسانية (ملحمة شريف). كخبير في الحلول الرقمية، صمم شريف هذا النظام ليدمج بين "القصة الدرامية" و"الخوارزميات التعليمية" لضمان ترسيخ اللغة الإنجليزية في عقل المتعلم بطريقة طبيعية وتفاعلية بعيداً عن الرتابة.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-dashed italic text-primary font-medium text-center">
              "في Moc-co، نحن لا ندرس الإنجليزية.. نحن نعيشها."
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
