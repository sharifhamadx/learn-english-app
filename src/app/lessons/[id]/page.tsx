import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonPlayer } from '@/components/LessonPlayer';
import { notFound } from 'next/navigation';

export default async function LessonPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const lesson = MOCK_LESSONS.find(l => l.id === id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <LessonPlayer lesson={lesson} />
    </div>
  );
}