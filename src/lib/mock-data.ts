import { Lesson } from './types';

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'lesson-1-academic',
    title: 'The 22-Year Academic Marathon',
    topic: 'Education & Resilience',
    difficulty: 'beginner',
    story: `Sharif's journey began with a relentless pursuit of knowledge that spanned over two decades. For twenty-two long years, he dedicated his life to studying, moving from one classroom to another, driven by a dream that seemed to grow more distant with time. After completing his formal education, he didn't stop. He enrolled in intensive English courses, hoping that mastering a new language would be the key to unlocking a better future. However, the path was never smooth. 

During this time, he also fulfilled his national service, a period of discipline and duty that tested his physical and mental limits. In his home, life was complex. His father had married four wives, creating a large and bustling household. Amidst the many brothers and sisters, Sharif felt the heavy weight of expectation. His mother, the woman who had nurtured him with prayers and hope, waited patiently for the day her son would become the pillar she could lean on. His younger sisters also looked up to him, their eyes reflecting the same hope. 

Despite the long years of study and the certificates he earned, the reality of the job market was cold. Sharif realized that his academic achievements were not enough in a world where opportunities were scarce. Yet, he remained steadfast. He knew that his story was just beginning, and the lessons he learned in those twenty-two years were the foundation for the challenges that lay ahead. He was the eldest son of a complex family structure, where support from brothers was non-existent, leaving him to carry the burden of his sisters' futures alone.`,
    grammarPoint: 'Past Simple & Duration',
    grammarExplanation: 'Use the Past Simple to describe completed actions in the past. To emphasize how long something lasted, we use time expressions. Example: "Sharif studied for 22 years."',
    imageSeed: 'sharif-study',
    questions: [
      { id: 'q1', text: 'How many years did Sharif spend studying?', options: ['10 years', '15 years', '22 years', '5 years'], correctAnswer: '22 years', type: 'multiple-choice' },
      { id: 'q2', text: 'Describe the family situation of Sharif.', correctAnswer: 'His father has four wives, and his mother and sisters depend on him.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-namariq',
    title: 'Namariq: The Price of a Golden Proposal',
    topic: 'Heartbreak & Social Status',
    difficulty: 'intermediate',
    story: `Namariq was the first deep love in Sharif's life. They shared dreams and promises, and for a long time, she was the beacon of hope that kept him going through his long years of study. Their connection was profound, built on mutual understanding and a shared vision of a future together. Sharif poured his heart into this relationship, believing that love would be enough to overcome the financial hardships he faced.

However, the reality of their society was harsh. When a wealthy man from abroad proposed to Namariq, the promise of a stable life, financial security, and an immediate escape from poverty proved too alluring. Despite the immense love they shared, Namariq chose the "golden proposal." She left Sharif for the man with money, proving that in a world of struggle, the heart is often defeated by the pocket. Sharif was left shattered, realizing for the first time that his dedication and study might not be enough to hold onto the people he loved if he couldn't provide the security they craved. This lesson in loss marked the beginning of a cynical understanding of social reality. Wealth won the battle against the heart's true devotion.`,
    grammarPoint: 'Relative Clauses',
    grammarExplanation: 'Use "who" or "that" to define the person you are talking about. Example: "Namariq was the woman who chose wealth over love."',
    imageSeed: 'namariq-gold',
    questions: [
      { id: 'q1', text: 'Why did Namariq leave Sharif?', options: ['She hated him', 'She married a wealthy man from abroad', 'She moved to America alone', 'She wanted to continue her studies'], correctAnswer: 'She married a wealthy man from abroad', type: 'multiple-choice' },
      { id: 'q2', text: 'What did Sharif realize after this relationship?', correctAnswer: 'He realized that love can be defeated by financial security in his society.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-muzdalifa',
    title: 'Muzdalifa: The Silence of Neglect',
    topic: 'Relationships & Communication',
    difficulty: 'intermediate',
    story: `Muzdalifa entered Sharif's life during one of his most stressful periods. He was consumed by his 22-year academic marathon and the pressure to succeed for his family. While he cared for her, his mind was often elsewhere—buried in books or worrying about the future. Muzdalifa, on the other hand, was a woman who required presence and emotional affirmation.

She began to feel unappreciated and invisible in the shadow of Sharif’s grand ambitions. The lack of attention and the constant delay of their future together eroded her patience. Feeling neglected and unprioritized, she began to drift away. She felt that Sharif's studies were his only true love. Eventually, she sought comfort in the familiarity of her past. She returned to an ex-lover, someone who offered her the immediate appreciation and presence she felt Sharif could not give. They married, leaving Sharif to reflect on the high cost of his single-minded focus. He learned that a relationship cannot survive on "future promises" alone; it needs the oxygen of daily attention and shared time.`,
    grammarPoint: 'Present Perfect Continuous',
    grammarExplanation: 'Use this for actions that started in the past and are still continuing or have just stopped. Example: "Muzdalifa had been feeling neglected for a long time."',
    imageSeed: 'muzdalifa-neglect',
    questions: [
      { id: 'q1', text: 'What was the main reason Muzdalifa left?', options: ['Sharif was poor', 'She felt unappreciated', 'She moved away', 'She found a job abroad'], correctAnswer: 'She felt unappreciated', type: 'multiple-choice' },
      { id: 'q2', text: 'Who did Muzdalifa eventually marry?', correctAnswer: 'She married her ex-lover.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-arafa',
    title: 'Arafa: The Betrayal for "Full Pockets"',
    topic: 'Betrayal & Materialism',
    difficulty: 'intermediate',
    story: `Arafa's story is perhaps the most painful instance of betrayal in Sharif's saga. Unlike others who left due to circumstance or neglect, Arafa's departure was calculated and cruel. She was with Sharif during some of his most vulnerable moments, sharing his space and his secrets. However, her loyalty was tied to the size of a man's wallet.

The allure of a man with "full pockets" proved irresistible to her. She didn't just leave; she cheated on Sharif first, showing a complete lack of respect for their history. She eventually left him for a man whose only merit was his wealth. This betrayal was a direct blow to Sharif’s self-esteem. He was working 16-hour days and studying relentlessly, yet he was being replaced by someone who hadn't sacrificed anything but simply possessed money. Arafa’s actions reinforced the bitter truth that some people value material gain over history, sacrifice, and loyalty. It was a lesson that hardened Sharif’s heart against the superficiality of certain societal norms.`,
    grammarPoint: 'Conditionals (Type 2)',
    grammarExplanation: 'Use "If + past, would + verb" for hypothetical situations. Example: "If Sharif had more money, Arafa would have stayed."',
    imageSeed: 'arafa-betrayal',
    questions: [
      { id: 'q1', text: 'How did Arafa betray Sharif?', options: ['She told his secrets', 'She cheated and left him for a wealthy man', 'She stole his money', 'She ignored him'], correctAnswer: 'She cheated and left him for a wealthy man', type: 'multiple-choice' },
      { id: 'q2', text: 'What did Arafa value more than loyalty?', correctAnswer: 'Material wealth and "full pockets".', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-sara',
    title: 'Sara: The Strict Guardian of Tradition',
    topic: 'Culture & Patience',
    difficulty: 'advanced',
    story: `Sara represented a different kind of challenge for Sharif. She was a woman of strong principles, bound by the strict customs of her family. These traditions dictated every aspect of her life, including how she interacted with men. Sara herself was incredibly strict—she refused to send her photograph to Sharif for two full years, despite their deep connection and ongoing communication.

This was a ultimate test of Sharif's patience and commitment. In an age of instant digital gratification, waiting two years just to see the face of the woman you care about was an extraordinary feat of endurance. Sara's refusal wasn't about a lack of love, but a deep-seated respect for her family’s rules and her own sense of modesty. She remains patient, yet distant, a symbol of the cultural barriers that often complicate modern relationships in their world. For Sharif, Sara was a lesson in the power of boundaries and the slow, deliberate pace of traditional courtship. She is still waiting, but the distance imposed by her customs remains a significant hurdle.`,
    grammarPoint: 'Modals of Deduction',
    grammarExplanation: 'Use "must have", "could have", or "can\'t have" to make guesses about the past. Example: "Sara must have been very committed to her traditions."',
    imageSeed: 'sara-tradition',
    questions: [
      { id: 'q1', text: 'How long did Sara refuse to send her photo?', options: ['6 months', '1 year', '2 years', '5 years'], correctAnswer: '2 years', type: 'multiple-choice' },
      { id: 'q2', text: 'What governed Sara’s behavior?', correctAnswer: 'Strict family customs and traditional rules.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-kawthar',
    title: 'Kawthar: The Eternal Wait Across Borders',
    topic: 'Distance & Hope',
    difficulty: 'intermediate',
    story: `Kawthar is the embodiment of enduring hope in Sharif's life. Separated by vast distances, their relationship exists primarily in the digital realm and the world of long-distance communication. Kawthar is still waiting for Sharif, despite the years and the numerous obstacles that separate them. 

The struggle for Kawthar and Sharif is one of physical absence and geographical separation. They are connected by soul but divided by borders that are difficult to cross. This distance creates a unique kind of pain—the longing for a shared physical space that never comes. Yet, Kawthar remains steadfast, waiting far away, hoping that Sharif's journey will eventually lead him back to her or to a place where they can finally be together. For Sharif, Kawthar is a reminder that somewhere in the world, someone is still holding a candle for him, providing a flicker of warmth in his otherwise cold and difficult struggle for a better life.`,
    grammarPoint: 'Future Continuous',
    grammarExplanation: 'Use "will be + -ing" for actions that will be in progress at a time in the future. Example: "Kawthar will be waiting for him when he arrives."',
    imageSeed: 'kawthar-distance',
    questions: [
      { id: 'q1', text: 'What is the main obstacle for Kawthar and Sharif?', options: ['Money', 'Geographical distance', 'Family', 'Tradition'], correctAnswer: 'Geographical distance', type: 'multiple-choice' },
      { id: 'q2', text: 'Is Kawthar still waiting for Sharif?', correctAnswer: 'Yes, she is still waiting far away.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-makarem',
    title: 'Makarem: The Tragic Victim of Tribalism',
    topic: 'Social Injustice & Deep Love',
    difficulty: 'advanced',
    story: `Makarem was perhaps the kindest and most loving girl Sharif ever knew. Their love was deep, mutual, and pure. However, they were destroyed by "tribal closure" and deep-seated bigotry. Makarem’s family was rigid, and they forced her into a marriage with her cousin from Kuwait, a man chosen solely for his tribal alignment and perceived status.

The news of this forced marriage was so devastating that Makarem lost consciousness. Her grief was so profound that it became a serious medical case; she was hospitalized, her body reacting to the death of her dreams. It took five long years of knowing Sharif before she finally felt safe enough to send him her photo, a testament to her gentle and cautious nature. Even now, trapped in a marriage she never wanted, she occasionally checks on Sharif. She remains the "kindest" woman in his story, a tragic victim of a society that values tribal lines over human hearts. Her story is a haunting reminder of the lives ruined by outdated traditions. Sharif had to wait 4 years before she finally shared her image, such was the weight of her situation.`,
    grammarPoint: 'Passive Voice (Advanced)',
    grammarExplanation: 'Use the passive voice to emphasize the person affected by an action. Example: "Makarem was forced into a marriage she didn\'t want."',
    imageSeed: 'makarem-tragedy',
    questions: [
      { id: 'q1', text: 'Why did Makarem’s family force her to marry her cousin?', options: ['She loved him', 'Because of wealth only', 'Tribal closure and bigotry', 'They wanted to move to Kuwait'], correctAnswer: 'Tribal closure and bigotry', type: 'multiple-choice' },
      { id: 'q2', text: 'What happened to Makarem’s health after the forced marriage?', correctAnswer: 'She lost consciousness and became a serious medical case due to grief.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-friends',
    title: 'The Wall of Loyalty: Fath Al-Rahman',
    topic: 'Friendship & Loyalty',
    difficulty: 'intermediate',
    story: `In the darkest hours of Sharif's 22-year struggle, when his own blood brothers offered no help or support, a group of loyal friends stood by him like a wall of stone. Chief among them was Fath Al-Rahman, his childhood friend. Fath Al-Rahman didn't just offer words; he offered his presence, his heart, and his unwavering belief in Sharif’s future.

Alongside Fath Al-Rahman were Mohammed Ibrahim, Nour El-Din, and Abdel-Hamid. These men provided the emotional and sometimes financial support that Sharif's large family could not or would not provide. They witnessed his four failed immigration attempts, his knee injury in the 6-meter pit, and his return from the engine-exploded boat in the ocean. Fath Al-Rahman, in particular, remains the pillar of Sharif's hope. As long as his childhood friend is by his side, Sharif believes that his dream is still achievable. This lesson celebrates the family we choose, proving that blood is not always thicker than the water of shared struggle. Fath Al-Rahman's support is the reason Sharif continues to fight.`,
    grammarPoint: 'Idioms & Phrasal Verbs',
    grammarExplanation: 'Use "Stand by" to mean support someone during a difficult time. Example: "Fath Al-Rahman stood by Sharif for 22 years."',
    imageSeed: 'sharif-friends',
    questions: [
      { id: 'q1', text: 'Who is Sharif’s childhood friend?', options: ['Mohammed Ibrahim', 'Fath Al-Rahman', 'Nour El-Din', 'Abdel-Hamid'], correctAnswer: 'Fath Al-Rahman', type: 'multiple-choice' },
      { id: 'q2', text: 'Did Sharif’s brothers help him reach his goals?', correctAnswer: 'No, his brothers did not help him; only his friends did.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-ocean-survival',
    title: 'The 12-Meter Coffin: 6 Hours in the Deep',
    topic: 'Extreme Survival',
    difficulty: 'advanced',
    story: `The most harrowing chapter of Sharif's life occurred during his fourth attempt to reach Europe. He found himself on a 12-meter rubber boat, a fragile vessel designed for a fraction of the people it carried. There were 71 passengers crowded together, including three women and several children. In the middle of the vast, indifferent ocean, the engine exploded.

The boat became a sinking coffin. Sharif spent six agonizing hours in the freezing water, surrounded by the screams of the desperate and the silence of the deep. He watched as the hope of 71 souls nearly vanished in the waves. He had to fight for every breath, haunted by the thought of his mother and sisters who were waiting for his return. Miraculously, he survived, but the trauma of those six hours changed him forever. He learned the true meaning of mortality and the sheer, desperate will to live that surfaces when everything else is lost. He emerged from the water not just as a survivor, but as a man who had stared into the abyss and refused to yield.`,
    grammarPoint: 'Past Perfect Continuous',
    grammarExplanation: 'Use this for actions that were happening for a duration before another past action. Example: "They had been sailing for hours before the engine exploded."',
    imageSeed: 'sharif-ocean-survival',
    questions: [
      { id: 'q1', text: 'How many people were on the 12-meter boat?', options: ['20', '50', '71', '100'], correctAnswer: '71', type: 'multiple-choice' },
      { id: 'q2', text: 'How long did Sharif spend in the ocean after the explosion?', correctAnswer: 'He spent 6 hours in the ocean.', type: 'short-answer' }
    ]
  },
  {
    id: 'lesson-labor-prison',
    title: 'Prison, Illness, and the 16-Hour Day',
    topic: 'Hardship & Modern Slavery',
    difficulty: 'advanced',
    story: `After surviving the ocean, Sharif’s "reward" was three months in a harsh prison. There, he faced illnesses that clawed at his body and a lack of sleep that blurred the lines between reality and nightmare. The prison was a place of deep suffering, where the dignity of a man who had studied for 22 years was stripped away. He lay on the cold floor, dreaming of the day he would finally be free to help his family.

Following his release, the struggle only intensified. For twenty-four months, Sharif worked like a ghost, toiling for 16 hours every single day. His salary was a mere $120 a month—a wage that barely covered the cost of survival. This period of modern-day slavery was the ultimate test of his spirit. He worked in conditions that would break most men, all while knowing that his mother and sisters were waiting for him to succeed. He even suffered a severe knee injury after falling into a 6-meter pit while being chased by immigration police during a failed attempt. Yet, his endurance during these 24 months is a testament to his love for his family and his refusal to be defeated by a world that seemed determined to crush him. He still waits for his fate, hoping for a stroke of luck to reclaim his life.`,
    grammarPoint: 'Used to vs. Get used to',
    grammarExplanation: 'Use "Used to" for past habits. Use "Get used to" for the process of becoming accustomed to something. Example: "Sharif had to get used to working 16 hours a day."',
    imageSeed: 'sharif-labor',
    questions: [
      { id: 'q1', text: 'How much was Sharif’s monthly salary during his 24 months of work?', options: ['$500', '$120', '$50', '$1000'], correctAnswer: '$120', type: 'multiple-choice' },
      { id: 'q2', text: 'What happened to Sharif during the police chase?', correctAnswer: 'He fell into a 6-meter pit and injured his knee.', type: 'short-answer' }
    ]
  }
];
