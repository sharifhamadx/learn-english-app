
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-12 text-right" dir="rtl">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black font-headline text-primary">اتصل بنا</h1>
        <p className="text-muted-foreground">نحن هنا للإجابة على استفساراتكم ودعم رحلتكم التعليمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-md rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 justify-end">
              معلومات التواصل
              <Phone className="h-5 w-5 text-accent" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <span className="font-mono text-primary font-bold">+44 7342 322206</span>
              <span className="text-sm font-bold">واتساب / هاتف</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <span className="font-mono text-primary font-bold">sharifhamadmoko@gmail.com</span>
              <span className="text-sm font-bold">البريد الإلكتروني</span>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600 gap-2 h-12 rounded-xl" asChild>
              <a href="https://wa.me/447342322206" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                تحدث معنا الآن عبر واتساب
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md rounded-3xl bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-xl">ساعات الدعم</CardTitle>
            <CardDescription className="text-primary-foreground/70">نحاول الرد على جميع الاستفسارات خلال 24 ساعة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              إذا كنت تواجه مشكلة في تفعيل الكود الخاص بك، أو ترغب في الاشتراك في الباقة الكاملة (300 فصل)، يرجى إرسال رسالة تضم اسمك والكود المستخدم.
            </p>
            <div className="pt-4 flex items-center gap-2 justify-end opacity-70">
              <span>الموقع الرسمي لملحمة شريف</span>
              <MapPin className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
