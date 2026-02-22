import { Lesson } from './types';

export const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Sharif: The 22-Year Academic Marathon',
    topic: 'Education & Resilience',
    difficulty: 'beginner',
    story: `Sharif's journey began with a relentless pursuit of knowledge. For twenty-two long years, he dedicated his life to studying, moving from one classroom to another, driven by a dream that seemed to grow more distant with time. After completing his formal education, he didn't stop. He enrolled in intensive English courses, hoping that mastering a new language would be the key to unlocking a better future. However, the path was never smooth. 

During this time, he also fulfilled his national service, a period of discipline and duty that tested his physical and mental limits. In his home, life was complex. His father had married four wives, creating a large and bustling household. Amidst the many brothers and sisters, Sharif felt the heavy weight of expectation. His mother, the woman who had nurtured him with prayers and hope, waited patiently for the day her son would become the pillar she could lean on. His younger sisters also looked up to him, their eyes reflecting the same hope. 

Despite the long years of study and the certificates he earned, the reality of the job market was cold. Sharif realized that his academic achievements were not enough in a world where opportunities were scarce. Yet, he remained steadfast. He knew that his story was just beginning, and the lessons he learned in those twenty-two years were the foundation for the challenges that lay ahead.`,
    grammarPoint: 'Past Simple & Duration',
    grammarExplanation: 'Use the Past Simple to describe completed actions in the past. To emphasize how long something lasted, we use time expressions. Example: "Sharif studied for 22 years."',
    imageSeed: 'sharif-study',
    questions: [
      { id: 'q1', text: 'How many years did Sharif spend studying?', options: ['10 years', '15 years', '22 years', '5 years'], correctAnswer: '22 years', type: 'multiple-choice' },
      { id: 'q2', text: 'Describe the family situation of Sharif.', correctAnswer: 'His father has four wives, and his mother and sisters depend on him.', type: 'short-answer' },
      { id: 'q3', text: 'What was Sharif’s mother waiting for?', correctAnswer: 'She was waiting for him to succeed so she could rely on him.', type: 'short-answer' }
    ]
  },
  {
    id: '4',
    title: 'The Heart of Makarem: Tribalism and the Broken Promise',
    topic: 'Tribal Traditions & Heartbreak',
    difficulty: 'intermediate',
    story: `Among the many women who crossed Sharif's path, Makarem occupied a sanctuary of her own. She was defined by her kindness—a soul so gentle that she seemed to carry the weight of Sharif’s struggles as her own. Their love was deep, built on years of shared understanding and silent support. However, they lived in a world where the heart’s desires are often crushed by the iron fist of tribal closure and bigotry.

The tragedy of Makarem was not a lack of love, but the presence of a rigid tradition. Her family, bound by ancestral customs that forbade marriage outside the inner circle, made a decision that shattered two lives. They forced her into a marriage with her cousin, a man from Kuwait, simply because of his status and tribal alignment. The impact on Makarem was catastrophic. Upon hearing the news, she collapsed into a state of unconsciousness, a physical manifestation of a broken spirit. She became a medical case, her health failing as her heart was forcibly removed from the one she truly loved.

Even now, years later, Makarem remains a shadow in Sharif’s life, occasionally checking on him with the same tenderness that once defined them. Her kindness stands in stark contrast to Sara, another woman in Sharif's life. While Makarem eventually sent her photo after four years of knowing him, Sara remained strict and guarded, refusing to share even a glimpse of her face for two full years. Sara was a woman of principles and sternness, but Makarem was the embodiment of unconditional, though tragic, love. Sharif remains caught between these memories, a man whose romantic life was a battlefield of traditions, money, and distance.`,
    grammarPoint: 'Used to vs. Would',
    grammarExplanation: 'Use "Used to" for past states or habits. Use "Would" for repeated actions in the past. Example: "Makarem used to check on Sharif every day before her life changed."',
    imageSeed: 'makarem-heart',
    questions: [
      { id: 'q1', text: 'Why was Makarem forced to marry her cousin?', options: ['She didn\'t love Sharif', 'Tribal customs and family closure', 'For financial reasons only', 'She wanted to move to Kuwait'], correctAnswer: 'Tribal customs and family closure', type: 'multiple-choice' },
      { id: 'q2', text: 'How did Makarem’s body react to the news of her forced marriage?', correctAnswer: 'She lost consciousness and her condition became a serious medical case.', type: 'short-answer' },
      { id: 'q3', text: 'Compare Sara and Makarem’s willingness to share their photos.', correctAnswer: 'Sara refused for 2 years, while Makarem shared hers after 4 years.', type: 'short-answer' }
    ]
  },
  {
    id: '2',
    title: 'The Shadows of Namariq and the Five Promises',
    topic: 'Love, Loss & Social Reality',
    difficulty: 'intermediate',
    story: `As Sharif struggled to build his life, his heart was also engaged in a battle of its own. He sought love and stability, but the shadows of fate were long. There were five women who marked his journey: Namariq, Muzdalifa, Arafa, Sara, and Kawthar. Each story was a chapter of hope followed by a painful conclusion.

Namariq was a deep love, but when a man from abroad proposed with promises of wealth, she chose the path of gold over the path of Sharif's struggling heart. Arafa followed a similar path; despite their shared moments, the allure of money was too strong, and she left him for a man whose pockets were full. Muzdalifa's story was different; she felt a lack of appreciation and attention from Sharif, who was consumed by his struggles. Eventually, she returned to her former lover and married him. 

Through all these failures, Sharif learned a bitter lesson: in a world of hardship, love is often sacrificed at the altar of security and tradition. His brothers, many in number, did not offer a helping hand. It was his loyal friends—Fath Al-Rahman, Mohammed Ibrahim, Nour El-Din, and Abdel-Hamid—who stood by him like a wall of stone. Fath Al-Rahman, his childhood companion, remained his greatest supporter, a light in the dark tunnel of his romantic and financial failures.`,
    grammarPoint: 'Contrast & Reasons (Because / Although)',
    grammarExplanation: 'Use "Although" to show contrast and "Because" to show reason. Example: "Although Sharif loved Namariq, she married a wealthy man because she wanted security."',
    imageSeed: 'sharif-love',
    questions: [
      { id: 'q1', text: 'Why did Namariq leave Sharif?', options: ['She didn\'t love him', 'She married a wealthy man from abroad', 'She moved to Europe', 'They had an argument'], correctAnswer: 'She married a wealthy man from abroad', type: 'multiple-choice' },
      { id: 'q2', text: 'Who is Sharif\'s most loyal friend since childhood?', correctAnswer: 'Fath Al-Rahman.', type: 'short-answer' }
    ]
  },
  {
    id: '3',
    title: 'The 12-Meter Coffin: Survival in the Great Blue',
    topic: 'Survival & Immigration',
    difficulty: 'advanced',
    story: `The quest for a better life led Sharif to the most dangerous decision of his life: the crossing to Europe. He tried and failed four times, each attempt a brush with death. The fourth attempt was the most harrowing. While running from the immigration police, Sharif fell into a hidden pit, a dark hole six meters deep. He lay there, his knees shattered and his spirit bruised, as the sounds of the chase faded above him.

But the worst was yet to come. He found himself on a 12-meter rubber boat, a fragile vessel crowded with 71 souls, including three women and several children. In the middle of the vast, indifferent ocean, the boat's engine exploded. Within minutes, the rubber turned into a sinking coffin. Sharif spent six agonizing hours in the freezing water, surrounded by the screams of the desperate and the silence of the deep. He survived, only to be captured and thrown into prison for three months. 

In that prison, time lost all meaning. He suffered from illnesses that clawed at his body, and sleep was a luxury he could not afford. After his release, the struggle continued. For twenty-four months, he worked like a ghost, sixteen hours every single day. His salary? A mere 120 dollars a month. It was modern-day slavery, but he had no choice. 

Today, Sharif still waits. He has faced the pit, the explosion, the ocean, and the prison. He has been broken, but he is not defeated. He continues to gamble with fate, hoping that one day, the luck that has avoided him for so long will finally guide him home.`,
    grammarPoint: 'Past Perfect & Passive Voice',
    grammarExplanation: 'The Past Perfect (had + past participle) describes actions before a specific time in the past. The Passive Voice focuses on the person experiencing the action. Example: "The boat had exploded (Past Perfect) before they were rescued (Passive)."',
    imageSeed: 'sharif-ocean',
    questions: [
      { id: 'q1', text: 'How many people were on the rubber boat?', options: ['50', '71', '100', '12'], correctAnswer: '71', type: 'multiple-choice' },
      { id: 'q2', text: 'What happened during the fourth attempt to escape?', correctAnswer: 'He fell into a 6-meter deep hole and was chased by police.', type: 'short-answer' },
      { id: 'q3', text: 'Describe the working conditions Sharif faced for 24 months.', correctAnswer: 'He worked 16 hours a day for a salary of only 120 dollars per month.', type: 'short-answer' }
    ]
  }
];
