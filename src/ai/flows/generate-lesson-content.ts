'use server';
/**
 * @fileOverview A GenAI tool to generate drafts for new lesson stories, comprehension questions, and grammar explanations.
 *
 * - generateLessonContent - A function that generates lesson content based on topic and difficulty.
 * - GenerateLessonContentInput - The input type for the generateLessonContent function.
 * - GenerateLessonContentOutput - The return type for the generateLessonContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonContentInputSchema = z.object({
  topic: z.string().describe('The main topic or theme for the lesson content.'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty level of the lesson.'),
});
export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;

const GenerateLessonContentOutputSchema = z.object({
  story: z.string().describe('A short story for the English lesson, appropriate for the specified topic and difficulty.'),
  comprehensionQuestions: z.array(z.string()).describe('An array of 3-5 comprehension questions based on the story.'),
  grammarExplanation: z.string().describe('A clear and concise explanation of a relevant grammar point, suitable for the difficulty level, with examples.'),
});
export type GenerateLessonContentOutput = z.infer<typeof GenerateLessonContentOutputSchema>;

export async function generateLessonContent(input: GenerateLessonContentInput): Promise<GenerateLessonContentOutput> {
  return generateLessonContentFlow(input);
}

const generateLessonContentPrompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: {schema: GenerateLessonContentInputSchema},
  output: {schema: GenerateLessonContentOutputSchema},
  prompt: `You are an expert English teacher and content creator for an English learning app called Moc-co. Your task is to generate comprehensive lesson content based on a given topic and difficulty level. The content should be engaging, educational, and suitable for learners.

Please generate the following three components:

1.  **Story**: Create a short, simple, and interesting story that is appropriate for the '{{{difficulty}}}' level and focuses on the '{{{topic}}}'. The story should be between 150-250 words for 'beginner' and 'intermediate', and 250-400 words for 'advanced' levels. Use clear language and introduce vocabulary relevant to the topic.

2.  **Comprehension Questions**: Generate 3-5 multiple-choice or short-answer comprehension questions directly related to the story. These questions should test the learner's understanding of the plot, characters, and key details. Ensure the questions are appropriate for the '{{{difficulty}}}' level.

3.  **Grammar Explanation**: Provide a concise and clear explanation of one relevant grammar point that naturally arises from the story or is suitable for the '{{{difficulty}}}' level. Include at least two simple example sentences to illustrate the grammar rule. The explanation should be easy to understand for the target audience.

Ensure all generated content aligns with the specified '{{{topic}}}' and '{{{difficulty}}}'.

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
