
"use client";

import Link from 'next/link';
import { Lesson } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ChevronRight, Lock, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const lessonNumber = parseInt(lesson.id.replace('lesson-', ''));
  const isTrial = lessonNumber <= 3;

  useEffect(() => {
    const auth = localStorage.getItem('moc-co-auth');
    if (auth === 'user' || auth === 'admin') {
      setIsUnlocked(true);
    }
  }, []);

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  if (!isTrial && !isUnlocked) {
    return (
      <Card className="group overflow-hidden opacity-90 grayscale-[0.5] border-dashed border-2">
        <div className="relative h-32 w-full flex items-center justify-center bg-muted">
          <Lock className="h-12 w-12 text-muted-foreground/30" />
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">محمي</Badge>
          </div>
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg text-muted-foreground">{lesson.title}</CardTitle>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 flex flex-col gap-2 mt-2">
            <p className="text-[10px] font-bold text-amber-800">هذا الدرس يتطلب اشتراكاً كاملاً</p>
            <a 
              href="https://wa.me/13238181488" 
              className="text-[10px] bg-green-500 text-white p-1 rounded text-center flex items-center justify-center gap-1 hover:bg-green-600 transition-colors"
              target="_blank"
            >
              <MessageCircle className="h-3 w-3" /> اشترك الآن
            </a>
          </div>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
          <Link href="/login" className="text-xs text-primary font-bold underline">هل لديك رمز؟ أدخله هنا</Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Link href={`/lessons/${lesson.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-accent">
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${lesson.imageSeed}/600/300`}
            alt={lesson.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            data-ai-hint="educational illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 flex gap-1">
            <Badge className={`${difficultyColors[lesson.difficulty]} border-none`}>
              {lesson.difficulty}
            </Badge>
            {isTrial && <Badge className="bg-accent text-primary border-none">تجريبي مجاني</Badge>}
          </div>
        </div>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {lesson.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{lesson.topic}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm line-clamp-2 text-muted-foreground mb-4">
            {lesson.story}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-medium text-accent">
            <BookOpen className="h-3 w-3" />
            {lesson.grammarPoint}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </CardFooter>
      </Card>
    </Link>
  );
}
