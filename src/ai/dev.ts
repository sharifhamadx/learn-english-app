import { config } from 'dotenv';
config();

import '@/ai/flows/generate-lesson-content.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/translate-word.ts';
