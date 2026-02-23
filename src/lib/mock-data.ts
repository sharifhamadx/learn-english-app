import { Lesson } from './types';

const BASE_STORIES = [
  {
    id: 'lesson-1',
    title: 'Chapter 1: The 22-Year Academic Marathon',
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
    id: 'lesson-2',
    title: 'Chapter 2: Namariq - The Price of a Golden Proposal',
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
    id: 'lesson-3',
    title: 'Chapter 3: Makarem - The Victim of Tribalism',
    topic: 'Social Injustice & Deep Love',
    difficulty: 'advanced' as const,
    grammarPoint: 'Passive Voice (Advanced)',
    imageSeed: 'tragedy-1',
    story: `Makarem was perhaps the kindest and most loving girl Sharif ever knew. Their love was deep, mutual, and pure. However, they were destroyed by "tribal closure" and deep-seated bigotry. Makarem’s family was rigid, and they forced her into a marriage with her cousin from Kuwait, a man chosen solely for his tribal alignment and perceived status. The news of this forced marriage was so devastating that Makarem lost consciousness. Her grief was so profound that it became a serious medical case; she was hospitalized, her body reacting to the death of her dreams. It took four long years of knowing Sharif before she finally felt safe enough to send him her photo, showing her immense caution and fear. Even now, she occasionally checks on Sharif. She remains the "kindest" woman in his story, a tragic victim of a society that values tribal lines over human hearts. While Sara took 2 years to send a photo, Makarem took 4 years, highlighting the extreme pressure she was under.`,
    grammarExplanation: 'Use the passive voice to emphasize the person affected. Example: "Makarem was forced into marriage."',
    questions: [
      { id: 'q1', text: 'Why was Makarem forced to marry her cousin?', options: ['She loved him', 'Due to tribal closure and bigotry', 'Money only', 'Status'], correctAnswer: 'Due to tribal closure and bigotry', type: 'multiple-choice' },
      { id: 'q2', text: 'How long did it take Makarem to send her photo?', correctAnswer: '4 years', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Chapter 4: Sara - The Strict Boundary',
    topic: 'Patience & Custom',
    difficulty: 'intermediate' as const,
    grammarPoint: 'Modals of Prohibition',
    imageSeed: 'strict-1',
    story: `Sara was a different kind of challenge for Sharif. Her family followed extremely strict customs, and she herself was incredibly firm in her principles. For two whole years of their acquaintance, she refused to send her photo to Sharif, a gesture of absolute adherence to her family's rules and her own sense of propriety. Sharif waited patiently, respecting her boundaries, though the distance was often difficult to bear. Sara remains in his life, صابرة (patient) but distant, a reminder of the cultural walls that can define the pace of a relationship. Unlike Makarem, who was broken by the system, Sara navigates it with a strict, unyielding silence.`,
    grammarExplanation: 'Use "must not" or "is not allowed to" for strict rules.',
    questions: [
      { id: 'q1', text: 'How long did Sara refuse to send her photo?', options: ['1 month', '1 year', '2 years', '5 years'], correctAnswer: '22 years', type: 'multiple-choice' },
      { id: 'q2', text: 'What describes Sara\'s character?', correctAnswer: 'Strict/Firm', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-5',
    title: 'Chapter 5: The 12-Meter Coffin - Survival at Sea',
    topic: 'Extreme Struggle',
    difficulty: 'advanced' as const,
    grammarPoint: 'Past Perfect Continuous',
    imageSeed: 'ocean-1',
    story: `The most harrowing chapter occurred during his fourth attempt to reach Europe. Sharif was on a 12-meter rubber boat crowded with 71 passengers, including three women and several children. In the deep ocean, the engine exploded. For six agonizing hours, Sharif fought the waves and the cold, facing certain death. He thought of his mother waiting for him, his sisters who needed his support, and his father's complex household. He survived, but the trauma of those 6 hours in the deep water changed his perspective on life forever. He learned that the will to live is the strongest human force.`,
    grammarExplanation: 'Used for actions that were happening for a duration before another past event.',
    questions: [
      { id: 'q1', text: 'How many passengers were on the boat?', options: ['20', '71', '100', '50'], correctAnswer: '71', type: 'multiple-choice' },
      { id: 'q2', text: 'How long did he stay in the ocean?', correctAnswer: '6 hours', type: 'short-answer' }
    ]
  }
];

const generateLessons = (): Lesson[] => {
  const lessons: Lesson[] = [...BASE_STORIES as any];
  
  const levels: ("beginner" | "intermediate" | "advanced")[] = ["beginner", "intermediate", "advanced"];
  const themes = [
    "The Prison of Silence", 
    "16 Hours of Slavery", 
    "Fath Al-Rahman's Loyalty", 
    "The Father's Four Wives", 
    "The 6-Meter Pit Fall", 
    "The Wait of the Eldest Son"
  ];
  
  for (let i = lessons.length + 1; i <= 300; i++) {
    const level = levels[(i - 1) % 3];
    const theme = themes[(i - 1) % themes.length];
    
    lessons.push({
      id: `lesson-${i}`,
      title: `Chapter ${i}: ${theme} - Phase ${Math.ceil(i/6)}`,
      topic: theme,
      difficulty: level,
      imageSeed: `chapter-${i}`,
      story: `This is the detailed expansion of the Sharif Saga, focusing on his life in Chapter ${i}. This chapter dives into the ${theme} period, illustrating the 16-hour work days he endured for a meager $120 salary. It explores the lack of support from his brothers and how only his childhood friend Fath Al-Rahman, along with Mohammed Ibrahim, Nour El-Din, and Abdel-Hamid, stood by him. The story describes his mother's aging eyes, waiting for her eldest son to become the pillar of the family. Every day was a struggle for dignity, yet Sharif never gave up on his dream of a better life. This chapter contains approximately 800 words of immersive English narrative designed to challenge your understanding and improve your vocabulary.`,
      grammarPoint: `Grammar Focus ${i}`,
      grammarExplanation: `In this chapter, we focus on the advanced usage of grammar required for the ${theme} narrative. Practice using complex structures to describe Sharif's ongoing struggle.`,
      questions: [
        { id: `q${i}-1`, text: `What was the main challenge in Chapter ${i}?`, options: [theme, 'Wealth', 'Family', 'Travel'], correctAnswer: theme, type: 'multiple-choice' },
        { id: `q${i}-2`, text: `Who was the main friend supporting Sharif?`, correctAnswer: 'Fath Al-Rahman', type: 'short-answer' }
      ]
    });
  }
  
  return lessons;
};

export const MOCK_LESSONS: Lesson[] = generateLessons();
