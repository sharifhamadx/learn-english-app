"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Code, Award, User } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-16 px-4">
      <div className="text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center rotate-3 border-2 border-primary/20">
          <User className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-5xl font-black font-headline text-primary tracking-tight">Who is Sharif Hamad?</h1>
        <p className="text-muted-foreground text-xl italic max-w-2xl mx-auto">"An educational vision born from struggle to create a generation of linguistically empowered individuals"</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="bg-primary text-primary-foreground p-10">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <Code className="h-8 w-8" />
              Founder and Developer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-10 text-lg leading-relaxed">
            <div className="flex gap-6 items-start">
              <div className="bg-accent/20 p-4 rounded-2xl shadow-inner">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-primary text-xl mb-3">Academic Journey</p>
                <p className="text-muted-foreground">
                  Sharif Hamad Abdallah is a distinguished graduate from <strong className="text-foreground">Sudan University of Science and Technology</strong>. A passionate programmer and scientific researcher, currently continuing his academic journey as a student at <strong className="text-foreground">University of the People (UoPeople)</strong>, USA, specializing in Computer Science and intelligent educational systems.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-accent/20 p-4 rounded-2xl shadow-inner">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-primary text-xl mb-3">Moc-co Philosophy</p>
                <p className="text-muted-foreground">
                  Moc-co is not just software; it is the embodiment of a human journey (The Sharif Saga). As a digital solutions expert, Sharif designed this system to merge "narrative drama" with "educational algorithms" to ensure language acquisition is natural and interactive.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-dashed italic text-primary font-medium text-center">
              "At Moc-co, we don't just study English.. we live it."
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
