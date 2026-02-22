'use server';
/**
 * @fileOverview A GenAI tool to generate the "Sharif Saga" - immersive English lessons based on his life.
 * 
 * - generateLessonContent - A function that handles the lesson generation process.
 * - GenerateLessonContentInput - The input type for the function.
 * - GenerateLessonContentOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonContentInputSchema = z.object({
  topic: z.string().describe('The specific life event or person from Sharif’s saga (e.g., Namariq, Makarem, The 6m Pit, Prison, etc.).'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty level of the lesson.'),
});
export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;

const GenerateLessonContentOutputSchema = z.object({
  storyText: z.string().describe('A detailed long-form story (800-1500 words) about Sharif’s life, focused on the specific topic provided.'),
  comprehensionQuestions: z.array(z.object({
    id: z.string(),
    text: z.string(),
    options: z.array(z.string()).optional(),
    correctAnswer: z.string(),
    type: z.enum(['multiple-choice', 'short-answer'])
  })).describe('An array of 5-8 comprehension questions.'),
  grammarPoint: z.string().describe('The title of the grammar point.'),
  grammarExplanation: z.string().describe('Detailed grammar explanation linked to the story context.'),
});
export type GenerateLessonContentOutput = z.infer<typeof GenerateLessonContentOutputSchema>;

export async function generateLessonContent(input: GenerateLessonContentInput): Promise<GenerateLessonContentOutput> {
  return generateLessonContentFlow(input);
}

const generateLessonContentPrompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: {schema: GenerateLessonContentInputSchema},
  output: {schema: GenerateLessonContentOutputSchema},
  prompt: `You are an elite English educator creating the "Sharif Saga" curriculum. 

CONTEXT FOR THE SAGA (Use these details to create deeply emotional and long stories):
- Sharif: Studied for 22 years, national service, English courses. Eldest son.
- Family: Father has 4 wives. Mother and younger sisters wait for him. Brothers did not help him at all.
- The 6 Women of Sharif's Life:
  1. Namariq: Deep love, but left him for a wealthy man from abroad. Wealth won over heart.
  2. Muzdalifa: Felt unappreciated and neglected because Sharif was too busy with studies/work. Married her ex-lover.
  3. Arafa: Cheated on him and left him specifically for a man with "full pockets" (money). Calculated betrayal.
  4. Sara: Very strict family customs. Strict herself—refused to send her photo for 2 years. Still waiting but distant.
  5. Kawthar: Still waiting far away, separated by geography and borders.
  6. Makarem: The kindest and most loving. Tribal closure/bigotry (forced marriage to a cousin from Kuwait) separated them. She lost consciousness and became a medical case due to grief. She sent her photo after 4 years of knowing him. She still checks on him.
- Immigration: 4 failed attempts. 4th attempt: fell into a 6m hole, knee injury, chased by police.
- The Sea: 12m rubber boat, 71 passengers (3 women/children), engine explosion, 6 hours in the ocean fighting for life.
- Prison: 3 months, illness, no sleep, loss of dignity.
- Work: 16 hours/day for 24 months, salary $120/month. Modern slavery.
- Supporters: ONLY his friends Fath Al-Rahman (childhood friend/main supporter), Mohammed Ibrahim, Nour El-Din, Abdel-Hamid.

Your goal is to create an IMMERSIVE and LONG story (800-1500 words) focusing EXCLUSIVELY on '{{{topic}}}'. 

Requirements:
- Difficulty '{{{difficulty}}}': Adjust vocabulary and sentence structure.
- Focus: Maintain a serious, emotional, and educational tone. 
- Detail: Be very descriptive about the emotions, the setting, and the social challenges.
- Grammar: Include a deep dive into a relevant grammar point that appears in the story.

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
