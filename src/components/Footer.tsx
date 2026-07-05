
"use client";

import { useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-headline text-3xl font-black text-primary">Moc-co</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.footer.desc}
          </p>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-bold text-xl text-foreground">{t.footer.links_title}</h4>
          <nav className="flex flex-col gap-3 text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-all hover:translate-x-[5px]">{t.footer.story}</Link>
            <Link href="/contact" className="hover:text-primary transition-all hover:translate-x-[5px]">{t.footer.support}</Link>
            <Link href="/lessons" className="hover:text-primary transition-all hover:translate-x-[5px]">{t.footer.browse}</Link>
            <Link href="/login" className="hover:text-primary transition-all hover:translate-x-[5px]">{t.footer.activate}</Link>
          </nav>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold text-xl text-foreground">{t.footer.contact_title}</h4>
          <div className="text-muted-foreground space-y-3">
            <p className="font-mono" dir="ltr">+44 7342 322206</p>
            <p className="text-sm">sharifhamadmoko@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t mt-16 pt-10 text-center space-y-6">
        <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto opacity-70">
          {t.footer.rights}
          <br />
          {t.footer.law}
        </p>
        <div className="inline-block bg-primary/5 px-6 py-2 rounded-full">
          <p className="text-xs font-black text-primary">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
