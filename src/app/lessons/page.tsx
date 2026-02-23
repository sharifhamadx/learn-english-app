"use client";

import { useState } from 'react';
import { MOCK_LESSONS } from '@/lib/mock-data';
import { LessonCard } from '@/components/LessonCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Library } from 'lucide-react';

export default function LessonsPage() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');

  const filteredLessons = MOCK_LESSONS.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(search.toLowerCase()) || 
                          lesson.topic.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficulty === 'all' || lesson.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-accent">
            <Library className="h-6 w-6" />
            <span className="font-bold tracking-widest uppercase text-sm">300 Chapters of the Saga</span>
          </div>
          <h1 className="text-4xl font-black font-headline text-primary text-right">المكتبة الشاملة (300 فصل)</h1>
          <p className="text-muted-foreground max-w-lg text-right ml-auto">
            جميع فصول ملحمة شريف جاهزة للتعلم. اختر فصلاً وابدأ فوراً في تطوير لغتك الإنجليزية من خلال القصة والتمارين.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="بحث في الـ 300 فصل..." 
              className="pl-10 h-12 rounded-xl text-right"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[160px] h-12 rounded-xl">
                <SelectValue placeholder="المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="beginner">مبتدئ (Beginner)</SelectItem>
                <SelectItem value="intermediate">متوسط (Intermediate)</SelectItem>
                <SelectItem value="advanced">متقدم (Advanced)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
        {filteredLessons.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium">لم يتم العثور على دروس</h3>
            <p className="text-muted-foreground">جرب تغيير كلمات البحث أو الفلاتر.</p>
          </div>
        )}
      </div>
    </div>
  );
}
