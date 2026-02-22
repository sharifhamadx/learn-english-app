'use server';
/**
 * @fileOverview A GenAI tool to generate the "Sharif Saga" - immersive English lessons based on his life.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonContentInputSchema = z.object({
  topic: z.string().describe('The specific life event of Sharif (e.g., Makarem and tribalism, Sara’s strictness, the ocean escape).'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty level of the lesson.'),
});
export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;

const GenerateLessonContentOutputSchema = z.object({
  story: z.string().describe('A detailed long-form story about Sharif’s life, formatted for English learning.'),
  comprehensionQuestions: z.array(z.string()).describe('An array of 5-8 comprehension questions.'),
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
This curriculum tells the TRUE and HARROWING story of Sharif, a man who studied for 22 years and faced unimaginable hardships.

CONTEXT FOR THE SAGA:
- Sharif: Studied for 22 years, national service, English courses.
- Family: Father has 4 wives. Mother and younger sisters wait for him. Brothers did not help him.
- The 6 Women of Sharif's Life:
  1. Namariq: Deep love, but married for money/abroad proposal.
  2. Muzdalifa: Felt unappreciated, married her ex-lover.
  3. Arafa: Cheated/left for a man with money.
  4. Sara: Very strict family customs. She is "strict" herself—refused to send her photo for 2 years. Still patient but distant.
  5. Kawthar: Still waiting far away, separated by distance.
  6. Makarem: A very kind and loving girl. They loved each other deeply. Tribal closure/bigotry (forced marriage to a cousin from Kuwait) separated them. She lost consciousness and became a medical case due to grief. She still checks on him occasionally. She sent her photo after 4 years of knowing him.
- Immigration: 4 failed attempts. 4th attempt: fell into a 6m hole, knee injury.
- The Sea: 12m rubber boat, 71 passengers (3 women/children), engine explosion, 6 hours in the ocean.
- Prison: 3 months, illness, no sleep.
- Work: 16 hours/day for 24 months, salary $120/month.
- Supporters: Only his friends Fath Al-Rahman (childhood friend), Mohammed Ibrahim, Nour El-Din, Abdel-Hamid.

Your goal is to create an IMMERSIVE and LONG story (800-1500 words) about a specific part of this saga: '{{{topic}}}'.

Requirements:
- Difficulty '{{{difficulty}}}': Adjust vocabulary and sentence structure.
- Focus: Maintain a serious, emotional, and educational tone.
- Grammar: Include a deep dive into a relevant grammar point.

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
