
import type {Metadata} from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Moc-co | Learn English through Stories',
  description: 'Improve your English skills with 300 interactive lessons featuring the story of Sharif.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background pb-20 md:pb-0 md:pt-16 min-h-screen flex flex-col">
        <FirebaseClientProvider>
          <Navigation />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-grow w-full">
            {children}
          </main>
          
          {/* Footer Section with Sudanese Legal Copyright */}
          <footer className="bg-card border-t py-12 px-4 mt-auto" dir="rtl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
              <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold text-primary">Moc-co</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  تطبيق تعليمي رائد يهدف لتمكين متعلمي اللغة الإنجليزية من خلال قصص واقعية ملهمة ومبنية على تجارب حياتية حقيقية.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-lg">روابط سريعة</h4>
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <Link href="/about" className="hover:text-primary transition-colors">من نحن</Link>
                  <Link href="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link>
                  <Link href="/lessons" className="hover:text-primary transition-colors">مكتبة الدروس</Link>
                  <Link href="/login" className="hover:text-primary transition-colors">تفعيل الحساب</Link>
                </nav>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-lg">تواصل مباشر</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>واتساب: +44 7342 322206</p>
                  <p>الإيميل: sharifhamadmoko@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto border-t mt-10 pt-8 text-center space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                جميع الحقوق محفوظة لصالح <strong>شريف حمد عبد الله</strong> - تطبيق Moc-co. 
                <br />
                يخضع هذا المحتوى لحماية <strong>قانون السودان لحماية حق المؤلف والحقوق المجاورة لسنة 1996م</strong>. 
                يُمنع منعاً باتاً نسخ أو إعادة نشر أو استخدام أي جزء من قصص "ملحمة شريف" دون إذن خطي مسبق.
              </p>
              <p className="text-xs font-bold text-primary">
                حقوق الطبع والنشر © 2024 - ملحمة شريف.
              </p>
            </div>
          </footer>

          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
