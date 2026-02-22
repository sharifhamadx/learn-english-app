'use server';
/**
 * @fileOverview A GenAI tool to generate immersive, long-form lesson content.
 *
 * - generateLessonContent - Generates long stories, questions, and grammar.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonContentInputSchema = z.object({
  topic: z.string().describe('The main topic or theme for the lesson content.'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty level of the lesson.'),
});
export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;

const GenerateLessonContentOutputSchema = z.object({
  story: z.string().describe('A detailed long-form story for the English lesson.'),
  comprehensionQuestions: z.array(z.string()).describe('An array of 5-8 comprehension questions.'),
  grammarExplanation: z.string().describe('Detailed grammar explanation with multiple examples.'),
});
export type GenerateLessonContentOutput = z.infer<typeof GenerateLessonContentOutputSchema>;

export async function generateLessonContent(input: GenerateLessonContentInput): Promise<GenerateLessonContentOutput> {
  return generateLessonContentFlow(input);
}

const generateLessonContentPrompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: {schema: GenerateLessonContentInputSchema},
  output: {schema: GenerateLessonContentOutputSchema},
  prompt: `You are an elite English educator for Moc-co, building a library of 1,000 professional lessons. 
Your goal is to create an IMMERSIVE and LONG story.

Requirements based on Difficulty '{{{difficulty}}}':
- Beginner: 400-600 words. Simple vocabulary, clear sentence structure.
- Intermediate: 800-1000 words. More complex tenses and descriptive language.
- Advanced: 1200-1500 words. Nuanced vocabulary, professional idioms, and deep narrative structure.

The story should focus on '{{{topic}}}'. 

After the story, provide:
1. 5 to 8 challenging comprehension questions.
2. A deep dive into a relevant grammar point with at least 5 examples from the story context.

Topic: {{{topic}}}
Difficulty: {{{difficulty}}}`,
});

const generateLessonContentFlow = ai.defineFlow(
  {
    name: 'generateLessonContentFlow',
    inputSchema: GenerateLessonContentInputSchema,
    outputSchema: GenerateLessonContentOutputSchema,
  },
  async input => {
    const {output} = await generateLessonContentPrompt(input);
    return output!;
  }
);
