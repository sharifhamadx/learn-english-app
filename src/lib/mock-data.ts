import { Lesson } from './types';

const BASE_STORIES = [
  {
    id: 'lesson-1',
    title: 'The 22-Year Academic Marathon',
    topic: 'Education & Resilience',
    difficulty: 'beginner' as const,
    grammarPoint: 'Past Simple & Duration',
    imageSeed: 'study-1',
    story: `Sharif's journey began with a relentless pursuit of knowledge that spanned over two decades. For twenty-two long years, he dedicated his life to studying, moving from one classroom to another, driven by a dream that seemed to grow more distant with time. After completing his formal education, he didn't stop. He enrolled in intensive English courses, hoping that mastering a new language would be the key to unlocking a better future. However, the path was never smooth. During this time, he also fulfilled his national service, a period of discipline and duty that tested his physical and mental limits. In his home, life was complex. His father had married four wives, creating a large and bustling household. Amidst the many brothers and sisters, Sharif felt the heavy weight of expectation. His mother, the woman who had nurtured him with prayers and hope, waited patiently for the day her son would become the pillar she could lean on. His younger sisters also looked up to him, their eyes reflecting the same hope. Despite the long years of study and the certificates he earned, the reality of the job market was cold. Sharif realized that his academic achievements were not enough in a world where opportunities were scarce. Yet, he remained steadfast. He knew that his story was just beginning, and the lessons he learned in those twenty-two years were the foundation for the challenges that lay ahead.`,
    grammarExplanation: 'Use the Past Simple to describe completed actions in the past. Example: "Sharif studied for 22 years."',
    questions: [
      { id: 'q1', text: 'How many years did Sharif spend studying?', options: ['10 years', '15 years', '22 years', '5 years'], correctAnswer: '22 years', type: 'multiple-choice' },
      { id: 'q2', text: 'Why did Sharif study English?', correctAnswer: 'To unlock a better future.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-namariq',
    title: 'Namariq: The Price of a Golden Proposal',
    topic: 'Heartbreak & Social Status',
    difficulty: 'intermediate' as const,
    grammarPoint: 'Relative Clauses',
    imageSeed: 'gold-1',
    story: `Namariq was the first deep love in Sharif's life. They shared dreams and promises, and for a long time, she was the beacon of hope that kept him going through his long years of study. Their connection was profound, built on mutual understanding and a shared vision of a future together. Sharif poured his heart into this relationship, believing that love would be enough to overcome the financial hardships he faced. However, the reality of their society was harsh. When a wealthy man from abroad proposed to Namariq, the promise of a stable life, financial security, and an immediate escape from poverty proved too alluring. Despite the immense love they shared, Namariq chose the "golden proposal." She left Sharif for the man with money, proving that in a world of struggle, the heart is often defeated by the pocket. Sharif was left shattered, realizing for the first time that his dedication and study might not be enough to hold onto the people he loved if he couldn't provide the security they craved. Wealth won the battle against the heart's true devotion.`,
    grammarExplanation: 'Use "who" or "that" to define the person. Example: "Namariq was the woman who chose wealth."',
    questions: [
      { id: 'q1', text: 'Why did Namariq leave?', options: ['She hated him', 'She married a wealthy man from abroad', 'She moved to America', 'She found a job'], correctAnswer: 'She married a wealthy man from abroad', type: 'multiple-choice' },
      { id: 'q2', text: 'What defeated the heart in this story?', correctAnswer: 'Wealth/Money', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-makarem',
    title: 'Makarem: The Tragic Victim of Tribalism',
    topic: 'Social Injustice & Deep Love',
    difficulty: 'advanced' as const,
    grammarPoint: 'Passive Voice (Advanced)',
    imageSeed: 'tragedy-1',
    story: `Makarem was perhaps the kindest and most loving girl Sharif ever knew. Their love was deep, mutual, and pure. However, they were destroyed by "tribal closure" and deep-seated bigotry. Makarem’s family was rigid, and they forced her into a marriage with her cousin from Kuwait, a man chosen solely for his tribal alignment and perceived status. The news of this forced marriage was so devastating that Makarem lost consciousness. Her grief was so profound that it became a serious medical case; she was hospitalized, her body reacting to the death of her dreams. It took five long years of knowing Sharif before she finally felt safe enough to send him her photo, a testament to her gentle and cautious nature. Even now, trapped in a marriage she never wanted, she occasionally checks on Sharif. She remains the "kindest" woman in his story, a tragic victim of a society that values tribal lines over human hearts. Her story is a haunting reminder of the lives ruined by outdated traditions. While sara took 2 years to send a photo, Makarem took 4 years, showing the immense pressure she was under.`,
    grammarExplanation: 'Use the passive voice to emphasize the person affected. Example: "Makarem was forced into marriage."',
    questions: [
      { id: 'q1', text: 'Why was Makarem forced to marry her cousin?', options: ['She loved him', 'Due to tribal closure and bigotry', 'Money only', 'Status'], correctAnswer: 'Due to tribal closure and bigotry', type: 'multiple-choice' },
      { id: 'q2', text: 'How long did it take Makarem to send her photo?', correctAnswer: '4 years', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-ocean',
    title: 'The 12-Meter Coffin: 6 Hours in the Deep',
    topic: 'Extreme Survival',
    difficulty: 'advanced' as const,
    grammarPoint: 'Past Perfect Continuous',
    imageSeed: 'ocean-1',
    story: `The most harrowing chapter of Sharif's life occurred during his fourth attempt to reach Europe. He found himself on a 12-meter rubber boat, a fragile vessel designed for a fraction of the people it carried. There were 71 passengers crowded together, including three women and several children. In the middle of the vast, indifferent ocean, the engine exploded. The boat became a sinking coffin. Sharif spent six agonizing hours in the freezing water, surrounded by the screams of the desperate and the silence of the deep. He watched as the hope of 71 souls nearly vanished in the waves. He had to fight for every breath, haunted by the thought of his mother and sisters who were waiting for his return. Miraculously, he survived, but the trauma of those six hours changed him forever. He learned the true meaning of mortality and the sheer, desperate will to live that surfaces when everything else is lost.`,
    grammarExplanation: 'Use this for actions happening for a duration before another past action.',
    questions: [
      { id: 'q1', text: 'How many passengers were on the boat?', options: ['20', '50', '71', '100'], correctAnswer: '71', type: 'multiple-choice' },
      { id: 'q2', text: 'How long did Sharif spend in the water?', correctAnswer: '6 hours', type: 'short-answer' }
    ]
  }
];

// Generate 300 lessons programmatically to fill the catalog
const generateLessons = (): Lesson[] => {
  const lessons: Lesson[] = [...BASE_STORIES as any];
  
  const levels: ("beginner" | "intermediate" | "advanced")[] = ["beginner", "intermediate", "advanced"];
  const topics = ["Family Struggles", "Love & Betrayal", "Migration", "Prison Life", "Academic Marathon", "Friendship"];
  
  for (let i = lessons.length + 1; i <= 300; i++) {
    const level = levels[(i - 1) % 3];
    const topic = topics[(i - 1) % topics.length];
    
    lessons.push({
      id: `lesson-${i}`,
      title: `Chapter ${i}: ${topic} - Part ${Math.ceil(i/6)}`,
      topic: topic,
      difficulty: level,
      imageSeed: `chapter-${i}`,
      story: `This is the continuation of the Sharif Saga, focusing on the intricate details of his ${topic} experience. In this chapter ${i}, we explore deeper into the emotional and social challenges faced by Sharif during his 22-year struggle. The narrative follows his interactions with his family, particularly his mother who remains his source of strength, and his sisters who wait for his success. We also delve into the lack of support from his brothers and the unwavering loyalty of Fath Al-Rahman. The story continues to describe the 16-hour work days and the dream that keeps him moving forward despite the $120 salary and the memories of the ocean explosion.`,
      grammarPoint: `Grammar Point ${i}`,
      grammarExplanation: `Explanation for the grammar point tested in Chapter ${i}. Focus on practical usage in sentences like 'Sharif has been working for 16 hours'.`,
      questions: [
        { id: `q${i}-1`, text: `In Chapter ${i}, what is the main focus?`, options: [topic, 'Something else', 'None', 'All'], correctAnswer: topic, type: 'multiple-choice' },
        { id: `q${i}-2`, text: `How many hours did Sharif work daily?`, correctAnswer: '16 hours', type: 'short-answer' }
      ]
    });
  }
  
  return lessons;
};

export const MOCK_LESSONS: Lesson[] = generateLessons();
