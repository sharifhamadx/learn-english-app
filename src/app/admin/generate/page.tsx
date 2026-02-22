"use client";

import { useState } from 'react';
import { generateLessonContent, GenerateLessonContentOutput } from '@/ai/flows/generate-lesson-content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function GenerateLessonPage() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GenerateLessonContentOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic) {
      toast({ title: "Topic required", description: "Please enter a topic for the lesson.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const result = await generateLessonContent({ topic, difficulty });
      setGeneratedContent(result);
      toast({ title: "Lesson Drafted!", description: "The AI has successfully created a new lesson draft." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate lesson. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">AI Lesson Lab</h1>
          <p className="text-muted-foreground">Instantly create high-quality English lessons with our AI tool.</p>
        </div>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Lesson Generator</CardTitle>
          <CardDescription>Enter a topic and select difficulty to build your curriculum.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Main Topic / Theme</Label>
              <Input 
                id="topic" 
                placeholder="e.g., Environment, Cooking, Space Travel" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                <SelectTrigger id="difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full bg-accent text-primary font-bold hover:bg-accent/90"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            {loading ? 'Generating Lesson...' : 'Generate Lesson Draft'}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary">Generated Draft</h2>
            <Button className="bg-primary">
              <Save className="mr-2 h-4 w-4" /> Save to Catalog
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Draft Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-4">
                  {generatedContent.story}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Grammar Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-muted-foreground text-sm">
                    {generatedContent.grammarExplanation}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Comprehension Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {generatedContent.comprehensionQuestions.map((q, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="font-bold text-accent">{i + 1}.</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}