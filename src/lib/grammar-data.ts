
export interface GrammarTopic {
  id: string;
  titleEn: string;
  titleAr: string;
  explanationEn: string;
  explanationAr: string;
  formulationEn: string;
  formulationAr: string;
  stories: {
    title: string;
    content: string;
  }[];
  examples: string[];
  quiz: {
    question: string;
    options: string[];
    correct: string;
  }[];
}

export const GRAMMAR_DATA: GrammarTopic[] = [
  {
    id: "present-simple",
    titleEn: "Present Simple",
    titleAr: "المضارع البسيط",
    explanationEn: "Used to describe habits, general truths, and fixed arrangements.",
    explanationAr: "يستخدم لوصف العادات، الحقائق العامة، والمواعيد الثابتة.",
    formulationEn: "Positive: Subject + Verb (s/es with he/she/it). Negative: Subject + do/does + not + Verb. Question: Do/Does + Subject + Verb?",
    formulationAr: "الإثبات: فاعل + فعل (إضافة s مع المفرد). النفي: فاعل + do/does + not + فعل مجرد. السؤال: Do/Does + فاعل + فعل مجرد؟",
    stories: [
      {
        title: "Sharif's Routine",
        content: "Every morning, Sharif wakes up at 5 AM. He prays, drinks a cup of coffee, and then walks to the English center. He studies for six hours daily. His friends, like Fath Al-Rahman, often visit him. They discuss the future and share their dreams. Sharif works hard because he wants to succeed."
      },
      {
        title: "Namariq's New Life",
        content: "Namariq lives in a beautiful house abroad. She speaks English fluently now. Every weekend, she calls her family. She misses her home, but she enjoys the stability. Her husband works in a large company. Life seems perfect on the outside."
      }
    ],
    examples: [
      "I study English every day.",
      "Sharif works 16 hours a day.",
      "The sun rises in the east.",
      "Water boils at 100 degrees Celsius.",
      "He speaks three languages fluently.",
      "We live in a complex world.",
      "They visit their mother every Friday.",
      "She loves classical English literature.",
      "My brother works as a digital designer.",
      "Cats catch mice instinctively.",
      "It rains a lot in winter seasons.",
      "I don't like cold weather at all.",
      "Does he speak English well?",
      "The train leaves at 8 PM sharp.",
      "Birds fly high in the blue sky."
    ],
    quiz: [
      { question: "Sharif ___ to the center every morning.", options: ["walk", "walks", "walking"], correct: "walks" },
      { question: "They ___ about their dreams.", options: ["talks", "talking", "talk"], correct: "talk" },
      { question: "___ she live abroad?", options: ["Do", "Does", "Is"], correct: "Does" }
    ]
  },
  {
    id: "past-simple",
    titleEn: "Past Simple",
    titleAr: "الماضي البسيط",
    explanationEn: "Used for actions that started and finished in the past.",
    explanationAr: "يستخدم للأفعال التي بدأت وانتهت في الماضي.",
    formulationEn: "Positive: Subject + Verb (Past Form / -ed). Negative: Subject + did + not + Verb (base). Question: Did + Subject + Verb (base)?",
    formulationAr: "الإثبات: فاعل + التصريف الثاني للفعل. النفي: فاعل + did + not + فعل مجرد. السؤال: Did + فاعل + فعل مجرد؟",
    stories: [
      {
        title: "The Sea Journey",
        content: "In 2022, Sharif crossed the ocean in a rubber boat. The engine exploded suddenly. He fought the waves for six hours. He felt terrified, but he never gave up. Finally, a rescue ship arrived and saved everyone. That day changed his life forever."
      },
      {
        title: "Makarem's Wedding",
        content: "Makarem cried when her father told her the news. She lost consciousness because of grief. Her family forced her to marry a man she didn't love. She stayed in the hospital for two weeks. It was a tragic day for both of them."
      }
    ],
    examples: [
      "I studied for 22 years before traveling.",
      "Sharif fell into a 6-meter hole.",
      "They lived in Sudan for a long time.",
      "Namariq married a wealthy man abroad.",
      "The boat stayed in water for six hours.",
      "He saw his mother yesterday morning.",
      "We went to the market to buy food.",
      "She sent him a message last night.",
      "It didn't rain last week at all.",
      "Did you finish your lesson today?",
      "I graduated in 2018 from university.",
      "The police chased the immigrants fast.",
      "He broke his leg during the trip.",
      "They were very happy together once.",
      "I bought a new English book yesterday."
    ],
    quiz: [
      { question: "Sharif ___ the ocean in 2022.", options: ["cross", "crossed", "crosses"], correct: "crossed" },
      { question: "Makarem ___ her photo after 4 years.", options: ["send", "sends", "sent"], correct: "sent" },
      { question: "___ you see the news?", options: ["Do", "Did", "Was"], correct: "Did" }
    ]
  },
  {
    id: "future-simple",
    titleEn: "Future Simple",
    titleAr: "المستقبل البسيط",
    explanationEn: "Used to talk about future plans, predictions, or promises.",
    explanationAr: "يستخدم للحديث عن خطط المستقبل، التوقعات، أو الوعود.",
    formulationEn: "Positive: Subject + will + Verb (base). Negative: Subject + will + not + Verb (base). Question: Will + Subject + Verb (base)?",
    formulationAr: "الإثبات: فاعل + will + فعل مجرد. النفي: فاعل + will + not + فعل مجرد. السؤال: Will + فاعل + فعل مجرد؟",
    stories: [
      {
        title: "The Hope of Return",
        content: "One day, Sharif will return to his family. He will build a big house for his mother. He is going to start his own English school. His sisters will be proud of him. He knows the journey is long, but he will succeed. The future will be brighter than the past."
      },
      {
        title: "Namariq's Regret",
        content: "Namariq will probably visit Sudan next summer. She will see the changes in her old neighborhood. She will wonder about Sharif and his life. She is going to bring gifts for her family. Perhaps she will find the peace she left behind."
      }
    ],
    examples: [
      "I will call you tomorrow morning.",
      "Sharif will study medicine later.",
      "It will rain in the evening today.",
      "We will win the game surely.",
      "They will travel to London soon.",
      "I promise I will help you now.",
      "She will be a great doctor one day.",
      "Will you help me with my work?",
      "The sun will rise at 6 AM tomorrow.",
      "He will not quit his dream ever.",
      "I think I will stay home tonight.",
      "We will have a big party next week.",
      "They will buy a new car soon.",
      "I'm sure everything will be fine.",
      "What will you do this weekend?"
    ],
    quiz: [
      { question: "I ___ you tomorrow.", options: ["call", "will call", "called"], correct: "will call" },
      { question: "He ___ proud of his success.", options: ["is", "will be", "was"], correct: "will be" },
      { question: "___ you be at the party?", options: ["Will", "Do", "Are"], correct: "Will" }
    ]
  },
  {
    id: "present-perfect",
    titleEn: "Present Perfect",
    titleAr: "المضارع التام",
    explanationEn: "Connects the past to the present. Used for experiences or unspecified times.",
    explanationAr: "يربط الماضي بالحاضر. يستخدم للخبرات أو الأوقات غير المحددة.",
    formulationEn: "Positive: Subject + have/has + Verb (V3/Past Participle). Negative: Subject + have/has + not + Verb (V3). Question: Have/Has + Subject + Verb (V3)?",
    formulationAr: "الإثبات: فاعل + have/has + التصريف الثالث للفعل. النفي: فاعل + have/has + not + التصريف الثالث. السؤال: Have/Has + فاعل + التصريف الثالث؟",
    stories: [
      {
        title: "The Survivor",
        content: "Sharif has survived many challenges. He has seen the dark side of the ocean. He has worked for 16 hours a day in difficult conditions. He has never lost his faith. These experiences have made him stronger. He has learned that resilience is the only way forward."
      },
      {
        title: "The Traveler",
        content: "Namariq has lived abroad for several years. She has visited many famous landmarks. She has forgotten some of her old habits. However, she has always kept a photo of her family. She has achieved stability, but she hasn't found true happiness yet."
      }
    ],
    examples: [
      "I have finished my lesson now.",
      "Sharif has never given up his hope.",
      "Have you ever seen a rubber boat?",
      "They have lived here since 2010.",
      "She has already eaten her breakfast.",
      "We haven't seen that movie yet.",
      "He has broken his leg once before.",
      "I have lost my house keys.",
      "The train has just left the station.",
      "How long have you known Sharif?",
      "They have built a new hospital here.",
      "She has worked there for five years.",
      "I have never been to Kuwait before.",
      "Have they arrived at the airport yet?",
      "We have studied these rules together."
    ],
    quiz: [
      { question: "Sharif ___ many challenges.", options: ["has survived", "survive", "survives"], correct: "has survived" },
      { question: "I have ___ my lesson.", options: ["finish", "finished", "finishing"], correct: "finished" },
      { question: "___ you ever seen a boat?", options: ["Do", "Has", "Have"], correct: "Have" }
    ]
  },
  {
    id: "modals",
    titleEn: "Modal Verbs",
    titleAr: "الأفعال المساعدة",
    explanationEn: "Used to express ability, necessity, or permission (can, must, should).",
    explanationAr: "تستخدم للتعبير عن القدرة، الضرورة، أو الإذن (يمكن، يجب، ينبغي).",
    formulationEn: "Structure: Subject + Modal (can/must/should) + Verb (base).",
    formulationAr: "القاعدة: فاعل + فعل مساعد + فعل مجرد.",
    stories: [
      {
        title: "The Immigrant's Rules",
        content: "An immigrant must be very patient. He can face many dangers on his way. He should keep his documents safe. He must not trust everyone he meets. He can learn a new language to survive. He should never forget his roots."
      },
      {
        title: "The Student's Duty",
        content: "A student should study every day. He can achieve his dreams through education. He must listen to his teachers. He shouldn't waste his time on useless things. He can ask for help when he feels stuck. He must believe in himself."
      }
    ],
    examples: [
      "I can speak English fluently.",
      "You must wear a seatbelt always.",
      "He should study harder for exams.",
      "We can't go out tonight sadly.",
      "They must not enter this room.",
      "Should I call him right now?",
      "She can play the piano well.",
      "You must finish work before 5 PM.",
      "He shouldn't smoke in this area.",
      "Can you help me with this task?",
      "We must respect our parents always.",
      "They can swim across the river.",
      "I should drink more water daily.",
      "You can stay here if you want.",
      "Everything must be ready by tomorrow."
    ],
    quiz: [
      { question: "He ___ study harder.", options: ["can", "should", "must not"], correct: "should" },
      { question: "I ___ speak three languages.", options: ["can", "should", "must"], correct: "can" },
      { question: "You ___ not enter.", options: ["must", "can", "should"], correct: "must" }
    ]
  }
];
