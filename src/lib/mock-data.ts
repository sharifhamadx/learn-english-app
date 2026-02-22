import { Lesson } from './types';

export const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'A Busy Day in London',
    topic: 'Daily Life',
    difficulty: 'beginner',
    story: 'Sarah lives in London. Every morning, she wakes up at 7 AM. She takes the red bus to work. She works in a big office. At noon, she eats a sandwich with her friends. In the evening, she goes home and reads a book. She is happy.',
    grammarPoint: 'Present Simple',
    grammarExplanation: 'Use the Present Simple for habits and routines. Example: "She wakes up at 7 AM." Add "-s" for he, she, and it.',
    imageSeed: 'london',
    questions: [
      {
        id: 'q1',
        text: 'Where does Sarah live?',
        options: ['Paris', 'London', 'New York', 'Tokyo'],
        correctAnswer: 'London',
        type: 'multiple-choice'
      },
      {
        id: 'q2',
        text: 'What time does she wake up?',
        correctAnswer: '7 AM',
        type: 'short-answer'
      }
    ]
  },
  {
    id: '2',
    title: 'The Lost Key',
    topic: 'Mystery',
    difficulty: 'intermediate',
    story: 'Mark was walking in the park when he found a golden key. It was hidden under a bench. He wondered which door it opened. He decided to visit the old library at the corner of the street. Maybe the librarian knew something about it.',
    grammarPoint: 'Past Continuous',
    grammarExplanation: 'The Past Continuous is used to describe actions that were happening at a specific time in the past. Structure: was/were + verb-ing.',
    imageSeed: 'key',
    questions: [
      {
        id: 'q3',
        text: 'Where did Mark find the key?',
        options: ['In his house', 'Under a bench', 'At the library', 'In his pocket'],
        correctAnswer: 'Under a bench',
        type: 'multiple-choice'
      }
    ]
  },
  {
    id: '3',
    title: 'A Journey to Mars',
    topic: 'Space',
    difficulty: 'advanced',
    story: 'Humanity had finally reached the Red Planet. The landscape was a desolate expanse of crimson dust and jagged rocks. Astronauts were conducting experiments to determine if life ever existed in the ancient riverbeds. The silence was profound, broken only by the hum of their life-support systems.',
    grammarPoint: 'Past Perfect',
    grammarExplanation: 'The Past Perfect expresses an action that happened before another action in the past. Example: "Humanity had reached..." before they started experiments.',
    imageSeed: 'mars',
    questions: [
      {
        id: 'q4',
        text: 'What color is the dust on Mars?',
        options: ['Blue', 'Crimson', 'Yellow', 'Green'],
        correctAnswer: 'Crimson',
        type: 'multiple-choice'
      }
    ]
  }
];