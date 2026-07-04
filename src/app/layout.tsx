
import type {Metadata} from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { LanguageProvider } from '@/components/LanguageProvider';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Moc-co | Master English through The Sharif Saga',
  description: 'A revolutionary educational experience combining human drama with modern English learning. 300 chapters of resilience and success.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var lang = localStorage.getItem('language') || 'en';
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                  document.documentElement.lang = lang;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground pb-20 md:pb-0 md:pt-16 min-h-screen flex flex-col">
        <FirebaseClientProvider>
          <LanguageProvider>
            <Navigation />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-grow w-full">
              {children}
            </main>
            
            <FloatingWhatsApp />

            <footer className="bg-card border-t py-16 px-6 mt-20">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-2 space-y-6">
                  <h3 className="font-headline text-3xl font-black text-primary">Moc-co</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The primary educational platform merging human reality with linguistic empowerment. 
                    Designed by Sharif Hamad Abdallah, aiming to break the fear of English through immersive real-life stories.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h4 className="font-bold text-xl text-foreground">Strategic Links</h4>
                  <nav className="flex flex-col gap-3 text-muted-foreground">
                    <Link href="/about" className="hover:text-primary transition-all hover:translate-x-[5px]">The Story</Link>
                    <Link href="/contact" className="hover:text-primary transition-all hover:translate-x-[5px]">Technical Support</Link>
                    <Link href="/lessons" className="hover:text-primary transition-all hover:translate-x-[5px]">Browse 300 Chapters</Link>
                    <Link href="/login" className="hover:text-primary transition-all hover:translate-x-[5px]">Activate Subscription</Link>
                  </nav>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-xl text-foreground">Contact Center</h4>
                  <div className="text-muted-foreground space-y-3">
                    <p className="font-mono">+44 7342 322206</p>
                    <p className="text-sm">sharifhamadmoko@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto border-t mt-16 pt-10 text-center space-y-6">
                <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto opacity-70">
                  All intellectual and software rights are reserved to Sharif Hamad Abdallah.
                  <br />
                  This project is protected by copyright laws according to the Sudanese Copyright Act of 1996.
                </p>
                <div className="inline-block bg-primary/5 px-6 py-2 rounded-full">
                  <p className="text-xs font-black text-primary">
                    Copyright © 2024 - Developed with Pride by Sharif Hamad
                  </p>
                </div>
              </div>
            </footer>
          </LanguageProvider>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
