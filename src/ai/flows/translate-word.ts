'use server';
/**
 * @fileOverview A flow to translate a specific word from a story context.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateWordInputSchema = z.object({
  word: z.string().describe('The English word to translate.'),
  context: z.string().describe('The sentence or context where the word appears.'),
});

const TranslateWordOutputSchema = z.object({
  arabicTranslation: z.string().describe('The Arabic meaning of the word.'),
  phonetic: z.string().optional().describe('Phonetic pronunciation.'),
});

export async function translateWord(input: { word: string; context: string }) {
  return translateWordFlow(input);
}

const translateWordFlow = ai.defineFlow(
  {
    name: 'translateWordFlow',
    inputSchema: TranslateWordInputSchema,
    outputSchema: TranslateWordOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      prompt: `Translate the English word "${input.word}" to Arabic. 
      Context: "${input.context}"
      Provide only the most accurate Arabic meaning for this context.`,
      output: { schema: TranslateWordOutputSchema }
    });
    return output!;
  }
);
