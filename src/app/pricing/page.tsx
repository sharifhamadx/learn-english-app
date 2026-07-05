
"use client";

import { Check, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/LanguageProvider';

export default function PricingPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-20 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black font-headline text-primary tracking-tight">{t.pricing.title}</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto italic">
          {t.pricing.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Silver Plan */}
        <PricingCard 
          tier={t.pricing.silver}
          price="15,000"
          currency="SDG"
          period={t.pricing.monthly}
          color="border-slate-300 text-slate-500"
          features={[
            t.pricing.foundation,
            t.pricing.features.audio,
            t.pricing.features.pdf,
            t.pricing.features.translation,
            t.pricing.features.tracking
          ]}
          cta={t.pricing.subscribe}
          language={language}
          t={t}
        />

        {/* Bronze Plan */}
        <PricingCard 
          tier={t.pricing.bronze}
          price="20,000"
          currency="SDG"
          period={t.pricing.monthly}
          color="border-amber-600 text-amber-700"
          highlight
          features={[
            t.pricing.foundation,
            t.pricing.empowerment,
            t.pricing.features.audio,
            t.pricing.features.pdf,
            t.pricing.features.translation,
            t.pricing.features.tracking
          ]}
          cta={t.pricing.subscribe}
          language={language}
          t={t}
        />

        {/* Gold Plan */}
        <PricingCard 
          tier={t.pricing.gold}
          price="25,000"
          currency="SDG"
          period={t.pricing.monthly}
          color="border-accent text-primary"
          features={[
            t.pricing.foundation,
            t.pricing.empowerment,
            t.pricing.mastery,
            t.pricing.features.audio,
            t.pricing.features.pdf,
            t.pricing.features.translation,
            t.pricing.features.tracking
          ]}
          cta={t.pricing.subscribe}
          language={language}
          t={t}
        />
      </div>

      <div className="bg-primary/5 rounded-[3rem] p-10 text-center space-y-6 border border-primary/10">
        <h3 className="text-2xl font-bold text-primary">{t.pricing.custom_plan_title}</h3>
        <p className="text-muted-foreground">{t.pricing.custom_plan_desc}</p>
        <Button className="bg-green-500 hover:bg-green-600 h-14 px-8 rounded-2xl gap-3" asChild>
          <a href="https://wa.me/447342322206" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-6 w-6" />
            {t.pricing.contact_button}
          </a>
        </Button>
      </div>
    </div>
  );
}

function PricingCard({ tier, price, currency, period, features, cta, color, highlight, language, t }: any) {
  return (
    <Card className={`relative flex flex-col border-2 rounded-[3rem] transition-all hover:shadow-2xl hover:-translate-y-2 ${highlight ? 'border-primary shadow-xl scale-105 z-10' : 'border-slate-100 shadow-lg'}`}>
      {highlight && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <Sparkles className="h-3 w-3" />
          {t.pricing.recommended}
        </div>
      )}
      <CardHeader className="p-10 text-center">
        <CardTitle className={`text-2xl font-black uppercase tracking-widest ${color}`}>{tier}</CardTitle>
        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-primary">{price}</span>
            <span className="text-sm font-bold text-muted-foreground">{currency}</span>
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">{period}</span>
        </div>
      </CardHeader>
      <CardContent className="p-10 pt-0 space-y-6 flex-grow">
        <div className="h-px bg-slate-100 w-full" />
        <ul className="space-y-4">
          {features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
              <div className="bg-primary/10 p-1 rounded-full">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">{f}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-10">
        <Button className={`w-full h-16 rounded-[1.5rem] font-black text-lg transition-all ${highlight ? 'bg-primary hover:bg-primary/90' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`} asChild>
          <a href="https://wa.me/447342322206" target="_blank" rel="noopener noreferrer">
            {cta}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
