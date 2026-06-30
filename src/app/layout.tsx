
import type {Metadata} from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Moc-co | اتقن الإنجليزية عبر ملحمة شريف الأسطورية',
  description: 'تجربة تعليمية ثورية تجمع بين الدراما الإنسانية وأحدث أساليب تعلم اللغة الإنجليزية. 300 فصل من الصمود والنجاح.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#f8fafc] pb-20 md:pb-0 md:pt-16 min-h-screen flex flex-col">
        <FirebaseClientProvider>
          <Navigation />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-grow w-full">
            {children}
          </main>
          
          <FloatingWhatsApp />

          <footer className="bg-white border-t py-16 px-6 mt-20" dir="rtl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-right">
              <div className="md:col-span-2 space-y-6">
                <h3 className="font-headline text-3xl font-black text-primary">Moc-co</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  المنصة التعليمية الأولى التي تدمج الواقع الإنساني بالتمكين اللغوي. رؤية هندسية من تطوير المبرمج شريف حماد عبد الله، تهدف لتحطيم حواجز الخوف من اللغة الإنجليزية عبر القصص الواقعية.
                </p>
              </div>
              
              <div className="space-y-6">
                <h4 className="font-bold text-xl text-foreground">روابط استراتيجية</h4>
                <nav className="flex flex-col gap-3 text-muted-foreground">
                  <Link href="/about" className="hover:text-primary transition-all hover:translate-x-[-5px]">قصة المؤسس</Link>
                  <Link href="/contact" className="hover:text-primary transition-all hover:translate-x-[-5px]">الدعم الفني</Link>
                  <Link href="/lessons" className="hover:text-primary transition-all hover:translate-x-[-5px]">استعراض الـ 300 فصل</Link>
                  <Link href="/login" className="hover:text-primary transition-all hover:translate-x-[-5px]">تفعيل الاشتراك</Link>
                </nav>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold text-xl text-foreground">مركز التواصل</h4>
                <div className="text-muted-foreground space-y-3">
                  <p className="font-mono">+44 7342 322206</p>
                  <p className="text-sm">sharifhamadmoko@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto border-t mt-16 pt-10 text-center space-y-6">
              <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto opacity-70">
                جميع الحقوق الفكرية والبرمجية محفوظة للمبرمج والمؤلف <strong>شريف حماد عبد الله</strong>.
                <br />
                يخضع هذا المشروع لحماية <strong>قانون السودان لحماية حق المؤلف والحقوق المجاورة لسنة 1996م</strong>، وأي محاولة للنسخ أو التعديل البرمجي دون إذن تعتبر مخالفة قانونية صريحة.
              </p>
              <div className="inline-block bg-primary/5 px-6 py-2 rounded-full">
                <p className="text-xs font-black text-primary">
                  Copyright © 2024 - Developed with Pride by Sharif Hamad
                </p>
              </div>
            </div>
          </footer>

          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
