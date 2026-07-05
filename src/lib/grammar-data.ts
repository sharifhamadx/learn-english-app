
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
    explanationEn: "Used for habits, daily routines, and permanent facts.",
    explanationAr: "يستخدم للتعبير عن العادات، الروتين اليومي، والحقائق الثابتة.",
    formulationEn: "Positive: S + Verb(s/es for he/she/it). Negative: S + don't/doesn't + Verb.",
    formulationAr: "الإثبات: فاعل + فعل (إضافة s مع المفرد). النفي: فاعل + don't/doesn't + فعل مجرد.",
    stories: [
      {
        title: "Sharif's Routine",
        content: "Sharif wakes up every day at 5 AM. He prays and then studies his English notes. He works 16 hours a day in a difficult job. He loves his mother and always sends her money. He does not stop dreaming about a better future."
      }
    ],
    examples: [
      "I study English every morning.",
      "Sharif works very hard.",
      "The sun rises in the east.",
      "She speaks Arabic and English.",
      "They visit their family on Fridays.",
      "Water boils at 100 degrees.",
      "He doesn't like cold weather.",
      "Do you know Fath Al-Rahman?",
      "Does Namariq live abroad now?",
      "We always help our friends.",
      "My sisters wait for my return.",
      "It rains a lot in winter.",
      "I don't smoke or drink alcohol.",
      "Birds fly south in autumn.",
      "The train leaves at 9 PM."
    ],
    quiz: [
      { question: "Sharif ___ to the gym every day.", options: ["go", "goes", "going"], correct: "goes" },
      { question: "They ___ not like betrayal.", options: ["do", "does", "are"], correct: "do" }
    ]
  },
  {
    id: "past-simple",
    titleEn: "Past Simple",
    titleAr: "الماضي البسيط",
    explanationEn: "Used for finished actions in the past.",
    explanationAr: "يستخدم للأفعال التي بدأت وانتهت في وقت محدد في الماضي.",
    formulationEn: "Positive: S + Verb (ed / Irregular). Negative: S + didn't + Verb.",
    formulationAr: "الإثبات: فاعل + التصريف الثاني. النفي: فاعل + didn't + فعل مجرد.",
    stories: [
      {
        title: "The Explosion",
        content: "In 2022, Sharif crossed the ocean. Suddenly, the engine exploded. He stayed in the water for six hours. He felt terrified but he survived. He reached the shore and thanked God for his life."
      }
    ],
    examples: [
      "I studied for 22 years.",
      "Sharif fell into a deep pit.",
      "Namariq married a rich man.",
      "They lived in Khartoum before.",
      "She sent her photo after 2 years.",
      "The boat broke in the ocean.",
      "I saw Makarem in my dreams.",
      "We finished the lesson yesterday.",
      "Did you see the police?",
      "I didn't lose hope that day.",
      "He broke his leg in the hole.",
      "They were happy in the past.",
      "I went to the hospital alone.",
      "She didn't answer my call.",
      "We arrived late last night."
    ],
    quiz: [
      { question: "Sharif ___ the ocean in 2022.", options: ["cross", "crossed", "crosses"], correct: "crossed" },
      { question: "___ you finish your homework?", options: ["Do", "Did", "Was"], correct: "Did" }
    ]
  },
  {
    id: "future-simple",
    titleEn: "Future Simple",
    titleAr: "المستقبل البسيط",
    explanationEn: "Used for promises, predictions, and future decisions.",
    explanationAr: "يستخدم للتعبير عن الوعود، التوقعات، والقرارات المستقبلية.",
    formulationEn: "S + will + Verb (base).",
    formulationAr: "فاعل + will + فعل مجرد.",
    stories: [
      {
        title: "The Dream",
        content: "Sharif will become a great leader one day. He will return to his family with success. He will build a school for the poor. His mother will cry with joy when she sees him. He will never forget his difficult days."
      }
    ],
    examples: [
      "I will study hard tonight.",
      "Sharif will win his fight.",
      "It will rain tomorrow morning.",
      "They will visit us next week.",
      "She will marry the right man.",
      "I will send you the photo soon.",
      "We will not give up easily.",
      "Will you help me with this?",
      "The sun will rise again.",
      "I will buy a house for my mom.",
      "He will travel to London soon.",
      "They will not find me here.",
      "Will she wait for him?",
      "I will be a better person.",
      "Everything will be okay."
    ],
    quiz: [
      { question: "I ___ always love my family.", options: ["will", "am", "going"], correct: "will" },
      { question: "Sharif ___ not lose his dream.", options: ["do", "will", "is"], correct: "will" }
    ]
  },
  {
    id: "present-continuous",
    titleEn: "Present Continuous",
    titleAr: "المضارع المستمر",
    explanationEn: "Used for actions happening exactly now.",
    explanationAr: "يستخدم للأفعال التي تحدث الآن في هذه اللحظة.",
    formulationEn: "S + am/is/are + Verb-ing.",
    formulationAr: "فاعل + am/is/are + فعل مضاف له ing.",
    stories: [
      {
        title: "Current Struggle",
        content: "Right now, Sharif is working in a factory. He is carrying heavy boxes. His muscles are aching, but he is thinking about his sisters. He is saving every dollar for his family. He is fighting for his dignity."
      }
    ],
    examples: [
      "I am studying English now.",
      "Sharif is working hard.",
      "The sun is shining bright.",
      "She is crying in her room.",
      "They are waiting for the bus.",
      "Look! It is raining outside.",
      "Why are you looking at me?",
      "I am not playing games today.",
      "He is dreaming about home.",
      "We are building a new life.",
      "The engine is making noise.",
      "Is she sending the photo now?",
      "They are not helping us.",
      "I am trying to understand.",
      "Listen! Someone is calling."
    ],
    quiz: [
      { question: "Sharif ___ carrying a heavy box.", options: ["am", "is", "are"], correct: "is" },
      { question: "They ___ not listening to me.", options: ["is", "am", "are"], correct: "are" }
    ]
  },
  {
    id: "present-perfect",
    titleEn: "Present Perfect",
    titleAr: "المضارع التام",
    explanationEn: "Used for past actions with a result in the present, or life experiences.",
    explanationAr: "يستخدم لأفعال حدثت في الماضي ولها أثر في الحاضر، أو لخبرات الحياة.",
    formulationEn: "S + have/has + Verb (V3 / Past Participle).",
    formulationAr: "فاعل + have/has + التصريف الثالث للفعل.",
    stories: [
      {
        title: "The Experience",
        content: "Sharif has studied for 22 years. He has seen the death in the ocean. He has worked for 16 hours a day. He has lost his first love, but he has found his strength. He has never stopped believing in God."
      }
    ],
    examples: [
      "I have finished my lesson.",
      "Sharif has never given up.",
      "Have you ever seen a boat?",
      "She has lived abroad for years.",
      "They have already eaten lunch.",
      "We haven't seen Namariq yet.",
      "He has broken his leg once.",
      "I have lost my house keys.",
      "The train has just left.",
      "How long have you known him?",
      "They have built a new school.",
      "She has worked there since 2020.",
      "I have never been to Kuwait.",
      "Have they arrived at the port?",
      "We have studied these rules."
    ],
    quiz: [
      { question: "Sharif ___ survived the sea.", options: ["have", "has", "is"], correct: "has" },
      { question: "I have ___ my dream.", options: ["find", "found", "finding"], correct: "found" }
    ]
  },
  {
    id: "past-continuous",
    titleEn: "Past Continuous",
    titleAr: "الماضي المستمر",
    explanationEn: "Used for actions that were in progress at a specific time in the past.",
    explanationAr: "يستخدم لأفعال كانت مستمرة في وقت معين في الماضي.",
    formulationEn: "S + was/were + Verb-ing.",
    formulationAr: "فاعل + was/were + فعل مضاف له ing.",
    stories: [
      {
        title: "The Storm",
        content: "The wind was blowing hard. The waves were hitting the small boat. Sharif was praying for his life. The other passengers were screaming in fear. Everyone was waiting for a miracle in the middle of the dark night."
      }
    ],
    examples: [
      "I was studying at 10 PM.",
      "Sharif was working yesterday.",
      "The sun was setting behind clouds.",
      "She was crying when I called.",
      "They were waiting for hours.",
      "It was raining all day.",
      "Were you sleeping at noon?",
      "I was not looking at her.",
      "He was dreaming about Sudan.",
      "We were building the house.",
      "The engine was making a sound.",
      "Was she sending a message?",
      "They were not helping him.",
      "I was trying to escape.",
      "Everyone was fighting to live."
    ],
    quiz: [
      { question: "Sharif ___ praying in the boat.", options: ["was", "were", "is"], correct: "was" },
      { question: "They ___ not helping Sharif.", options: ["was", "were", "wasn't"], correct: "were" }
    ]
  },
  {
    id: "passive-voice",
    titleEn: "Passive Voice",
    titleAr: "المبني للمجهول",
    explanationEn: "Used when the action is more important than the person who did it.",
    explanationAr: "يستخدم عندما يكون الفعل أهم من الشخص الذي قام به.",
    formulationEn: "Object + (be) + Verb (V3 / Past Participle).",
    formulationAr: "المفعول به + فعل (be) مناسب + التصريف الثالث للفعل.",
    stories: [
      {
        title: "The Injustice",
        content: "Sharif was betrayed by his brothers. The money was taken by a rich man. The heart of Namariq was won by gold. The life of Sharif was tested by fire and water. But his story is being written by his own hands now."
      }
    ],
    examples: [
      "The lesson is studied daily.",
      "The boat was destroyed.",
      "Sharif was chased by police.",
      "English is spoken here.",
      "The money was stolen.",
      "The photo was sent yesterday.",
      "He was born in Sudan.",
      "The door was locked firmly.",
      "The car was fixed by him.",
      "Dinner is being cooked now.",
      "The house was built in 1990.",
      "The rules are respected.",
      "I was told the truth.",
      "The book was written in 2022.",
      "The ocean was crossed safely."
    ],
    quiz: [
      { question: "The boat ___ destroyed by waves.", options: ["is", "was", "were"], correct: "was" },
      { question: "English ___ spoken globally.", options: ["is", "are", "am"], correct: "is" }
    ]
  },
  {
    id: "conditionals-type-1",
    titleEn: "First Conditional",
    titleAr: "الحالة الشرطية الأولى",
    explanationEn: "Used for real possibilities in the future.",
    explanationAr: "تستخدم للتعبير عن أشياء من الممكن جداً حدوثها في المستقبل.",
    formulationEn: "If + Present Simple, will + Verb (base).",
    formulationAr: "If + مضارع بسيط، سـ (will) + فعل مجرد.",
    stories: [
      {
        title: "The Promise",
        content: "If Sharif masters English, he will find a great job. If he finds a job, he will help his sisters. If he helps his sisters, his mother will be happy. If he returns home, he will celebrate with Fath Al-Rahman."
      }
    ],
    examples: [
      "If it rains, I will stay home.",
      "If you study, you will pass.",
      "If Sharif wins, he will cry.",
      "I will call if I have time.",
      "She will marry if she loves.",
      "If they help, we will finish.",
      "I will go if you go with me.",
      "If you lose, don't give up.",
      "If he sees her, he will smile.",
      "The boat will sink if it breaks.",
      "I will send money if I work.",
      "If she calls, I will answer.",
      "If we fight, we will survive.",
      "You will see if you look.",
      "If God wills, we will win."
    ],
    quiz: [
      { question: "If Sharif ___ hard, he will win.", options: ["work", "works", "worked"], correct: "works" },
      { question: "I will call you if I ___ time.", options: ["have", "has", "had"], correct: "have" }
    ]
  },
  {
    id: "modals-ability-permission",
    titleEn: "Modals (Can / Could)",
    titleAr: "الأفعال المساعدة (القدرة والإذن)",
    explanationEn: "Can is for present ability. Could is for past ability or polite requests.",
    explanationAr: "Can للقدرة في الحاضر. Could للقدرة في الماضي أو الطلبات المهذبة.",
    formulationEn: "S + can/could + Verb (base).",
    formulationAr: "فاعل + can/could + فعل مجرد.",
    stories: [
      {
        title: "The Strength",
        content: "Sharif can speak three languages. When he was young, he could run for miles. He can carry heavy boxes now. He could not swim well in the ocean, but he fought. He can overcome any challenge because his heart is strong."
      }
    ],
    examples: [
      "I can speak English now.",
      "Sharif can work for 16 hours.",
      "Could you help me, please?",
      "I couldn't swim in 2022.",
      "She can marry anyone she wants.",
      "They could not find the way.",
      "Can I see your photo?",
      "He can play the guitar well.",
      "We could see the shore far away.",
      "I can't forget my first love.",
      "Could they save the boat?",
      "She can't speak Arabic fluently.",
      "I can do this for you.",
      "They can't stop my dreams.",
      "Could you speak louder?"
    ],
    quiz: [
      { question: "Sharif ___ work for long hours.", options: ["can", "is", "does"], correct: "can" },
      { question: "When he was a child, he ___ run fast.", options: ["can", "could", "is"], correct: "could" }
    ]
  },
  {
    id: "modals-obligation",
    titleEn: "Modals (Must / Should)",
    titleAr: "الأفعال المساعدة (الإلزام والنصيحة)",
    explanationEn: "Must is for strong obligation. Should is for advice.",
    explanationAr: "Must للالتزام القوي والضرورة. Should للنصيحة.",
    formulationEn: "S + must/should + Verb (base).",
    formulationAr: "فاعل + must/should + فعل مجرد.",
    stories: [
      {
        title: "The Duty",
        content: "Sharif must help his mother. He must earn money for his sisters. He should study every day to master English. He should not listen to his brothers. He must stay strong because he is the pillar of the family."
      }
    ],
    examples: [
      "I must study for the exam.",
      "Sharif must work every day.",
      "You should eat healthy food.",
      "We must respect our parents.",
      "She should send her photo.",
      "They must pay the rent now.",
      "I should call my mother.",
      "He must not lose his hope.",
      "Should I go or stay?",
      "You must be very tired.",
      "We should help the poor.",
      "It must be a difficult life.",
      "Should Sharif return home?",
      "I must find a solution.",
      "You should listen to Fath."
    ],
    quiz: [
      { question: "You ___ study if you want to win.", options: ["must", "is", "are"], correct: "must" },
      { question: "Sharif ___ not listen to haters.", options: ["should", "is", "am"], correct: "should" }
    ]
  },
  {
    id: "comparisons",
    titleEn: "Comparisons",
    titleAr: "المقارنات والتفضيل",
    explanationEn: "Used to compare two or more things.",
    explanationAr: "تستخدم للمقارنة بين شيئين أو أكثر.",
    formulationEn: "Adj-er + than / The + Adj-est.",
    formulationAr: "الصفة + er + than (للمقارنة) / The + الصفة + est (للتفضيل).",
    stories: [
      {
        title: "The Evaluation",
        content: "Arafa was richer than Namariq. But Makarem was the kindest girl in the world. Sharif's life is more difficult than yours. The ocean is bigger than the boat. The love of a mother is the strongest force on earth."
      }
    ],
    examples: [
      "I am taller than my brother.",
      "Sharif is stronger than me.",
      "The sun is hotter than fire.",
      "She is the most beautiful girl.",
      "They are richer than us.",
      "This lesson is the easiest.",
      "English is harder than Arabic.",
      "He is the oldest son.",
      "I am happier now than before.",
      "Gold is more expensive than silver.",
      "The pit was deeper than expected.",
      "She was the saddest girl.",
      "Sudan is bigger than Kuwait.",
      "It is the worst day of my life.",
      "You are the best friend."
    ],
    quiz: [
      { question: "Sharif is ___ than his brothers.", options: ["strong", "stronger", "strongest"], correct: "stronger" },
      { question: "Makarem is the ___ girl he knew.", options: ["kind", "kinder", "kindest"], correct: "kindest" }
    ]
  },
  {
    id: "relative-clauses",
    titleEn: "Relative Clauses",
    titleAr: "جمل الوصل",
    explanationEn: "Used to provide more information about a person or thing.",
    explanationAr: "تستخدم لإعطاء معلومات إضافية عن الشخص أو الشيء باستخدام (الذي/التي).",
    formulationEn: "Who (for people), Which (for things), That (both).",
    formulationAr: "Who (للعاقل)، Which (لغير العاقل)، That (للاثنين).",
    stories: [
      {
        title: "The Connections",
        content: "Fath Al-Rahman is the friend who supported Sharif. The boat which exploded was very small. The story that you are reading is true. The women who left Sharif were seeking money. The goal which he has is very noble."
      }
    ],
    examples: [
      "The man who is working is Sharif.",
      "The book which I read is good.",
      "The girl who left me was Namariq.",
      "The boat that sank was rubber.",
      "Fath is the one who helps me.",
      "The job which is hard pays less.",
      "The photo which was sent is old.",
      "The people who were screaming died.",
      "The dream that I have is big.",
      "The hole which he fell in was 6m.",
      "The woman who stayed is Kawthar.",
      "The rules which we study are easy.",
      "The man who married her is rich.",
      "The ocean which I crossed is deep.",
      "The friends who visited him are loyal."
    ],
    quiz: [
      { question: "The man ___ helps me is Fath.", options: ["who", "which", "whose"], correct: "who" },
      { question: "The boat ___ exploded was small.", options: ["who", "which", "where"], correct: "which" }
    ]
  }
];
