
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
        title: "Sharif's Daily Fight",
        content: "Every single day, Sharif wakes up early before the sun rises. He drinks his coffee alone and thinks about his family. He works for 16 hours to earn a small salary. He doesn't complain, but he feels the pain of modern slavery. His friends often visit him to give him strength."
      },
      {
        title: "Namariq's Routine Abroad",
        content: "Namariq lives in a cold country now. She speaks English every day at work. She calls her mother every Friday evening. She misses the heat of Sudan, but she enjoys the stability of her new life. Her husband works hard to provide for them."
      }
    ],
    examples: [
      "I study English every morning.",
      "Sharif works 16 hours a day.",
      "The sun rises in the east.",
      "She speaks English fluently.",
      "They visit us every weekend.",
      "He doesn't like cold weather.",
      "Do you know Fath Al-Rahman?",
      "Water boils at 100 degrees.",
      "The train leaves at 8 PM.",
      "My sisters wait for me at home.",
      "We live in a difficult world.",
      "It rains a lot in London.",
      "Does she send her photo?",
      "I don't play football often.",
      "Birds fly south in winter."
    ],
    quiz: [
      { question: "Sharif ___ hard every day.", options: ["work", "works", "working"], correct: "works" },
      { question: "They ___ about the future.", options: ["talks", "talk", "talking"], correct: "talk" },
      { question: "___ she live in Sudan?", options: ["Do", "Does", "Is"], correct: "Does" },
      { question: "I ___ not like betrayal.", options: ["do", "does", "am"], correct: "do" },
      { question: "The cat ___ its milk quickly.", options: ["drink", "drinks", "drank"], correct: "drinks" }
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
        title: "The Ocean of Death",
        content: "In 2022, Sharif jumped into a 12-meter rubber boat. The engine exploded suddenly in the middle of the ocean. He fought the waves for six long hours. He felt the cold water in his bones. Finally, he survived, but he lost his sense of safety that day."
      },
      {
        title: "Makarem's Forced Marriage",
        content: "Makarem cried for three days when her father told her the news. Her family forced her to marry a cousin she never loved. She lost consciousness due to grief. She sent her photo to Sharif after four years of knowing him. It was a tragic end to a pure love story."
      }
    ],
    examples: [
      "I studied for 22 years.",
      "Sharif fell into a deep hole.",
      "The boat stayed in water for 6 hours.",
      "Namariq married a wealthy man.",
      "They lived in Khartoum once.",
      "She sent him a message last night.",
      "He broke his leg during the trip.",
      "We went to the hospital together.",
      "Did you see the engine explode?",
      "I didn't quit my studies.",
      "Makarem stayed in the hospital.",
      "The police chased the immigrants.",
      "He saw his mother yesterday.",
      "They were very happy before.",
      "I bought a new book last week."
    ],
    quiz: [
      { question: "Sharif ___ the ocean in 2022.", options: ["cross", "crossed", "crosses"], correct: "crossed" },
      { question: "Namariq ___ for money.", options: ["leave", "left", "leaves"], correct: "left" },
      { question: "___ you finish the lesson?", options: ["Do", "Did", "Was"], correct: "Did" },
      { question: "She ___ not send the photo for 2 years.", options: ["do", "did", "was"], correct: "did" },
      { question: "I ___ a doctor yesterday.", options: ["see", "saw", "seen"], correct: "saw" }
    ]
  },
  {
    id: "present-perfect",
    titleEn: "Present Perfect",
    titleAr: "المضارع التام",
    explanationEn: "Used for experiences or actions that happened at an unspecified time and still affect the present.",
    explanationAr: "يستخدم للخبرات أو الأفعال التي حدثت في وقت غير محدد ولا تزال تؤثر على الحاضر.",
    formulationEn: "Subject + have/has + Verb (V3/Past Participle).",
    formulationAr: "فاعل + have/has + التصريف الثالث للفعل.",
    stories: [
      {
        title: "The Veteran Student",
        content: "Sharif has studied for more than two decades. He has experienced many failures, but he has never lost hope. He has worked in difficult conditions to help his sisters. He has seen the worst of humanity, but he has also found the best friends."
      },
      {
        title: "The Distant Lover",
        content: "Kawthar has waited for Sharif for a long time. She has lived alone in a distant city. She has kept all his letters. She hasn't seen him for years, but her heart has stayed loyal. They have shared many dreams across the borders."
      }
    ],
    examples: [
      "I have finished my lesson.",
      "Sharif has never given up.",
      "Have you ever seen a rubber boat?",
      "She has lived abroad since 2022.",
      "They have already eaten dinner.",
      "We haven't seen Namariq yet.",
      "He has broken his leg once.",
      "I have lost my house keys.",
      "The train has just left.",
      "How long have you known him?",
      "They have built a new house.",
      "She has worked there for years.",
      "I have never been to Kuwait.",
      "Have they arrived at the airport?",
      "We have studied these rules."
    ],
    quiz: [
      { question: "Sharif ___ many challenges.", options: ["has survived", "survive", "survives"], correct: "has survived" },
      { question: "I have ___ my lesson.", options: ["finish", "finished", "finishing"], correct: "finished" },
      { question: "___ you ever seen a boat?", options: ["Do", "Has", "Have"], correct: "Have" },
      { question: "She ___ lived here for years.", options: ["has", "have", "is"], correct: "has" },
      { question: "We ___ not seen him yet.", options: ["has", "have", "are"], correct: "have" }
    ]
  }
];
