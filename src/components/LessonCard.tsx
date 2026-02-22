import Link from 'next/link';
import { Lesson } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

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
          <Badge className={`absolute bottom-2 left-2 ${difficultyColors[lesson.difficulty]} border-none`}>
            {lesson.difficulty}
          </Badge>
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