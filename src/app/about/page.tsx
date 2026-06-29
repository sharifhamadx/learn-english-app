
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, User } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-12 text-right" dir="rtl">
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-black font-headline text-primary">من نحن</h1>
        <p className="text-muted-foreground text-lg italic">"رحلة تعليمية ولدت من رحم التجربة الإنسانية"</p>
      </div>

      <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-8">
          <CardTitle className="text-2xl">عن المؤسس: شريف حمد عبد الله</CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8 text-lg leading-relaxed">
          <div className="flex gap-4 items-start">
            <div className="bg-accent/20 p-3 rounded-2xl">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-bold text-primary mb-2">الخلفية الأكاديمية</p>
              <p>شريف حمد عبد الله، خريج <strong>جامعة السودان للعلوم والتكنولوجيا</strong> (Sudan University of Science and Technology). وباحث علمي طموح يواصل حالياً مسيرته الأكاديمية كطالب في <strong>جامعة الناس</strong> (University of the People - UoPeople) بالولايات المتحدة الأمريكية.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-accent/20 p-3 rounded-2xl">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-bold text-primary mb-2">رؤية تطبيق Moc-co</p>
              <p>جاءت فكرة هذا التطبيق لتكون جسراً بين التجربة الحياتية العميقة وبين الرغبة في تمكين الآخرين لغوياً. "ملحمة شريف" ليست مجرد قصص، بل هي منهج تعليمي صمم بعناية لدمج مفردات وقواعد اللغة الإنجليزية في سياقات إنسانية واقعية تجعل التعلم تجربة لا تُنسى.</p>
            </div>
          </div>

          <div className="pt-6 border-t italic text-muted-foreground">
            "أؤمن أن اللغة هي المفتاح الوحيد الذي لا يمكن لأي سجن أو بحر أو حفرة أن ينتزعه منك." - شريف حمد
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
