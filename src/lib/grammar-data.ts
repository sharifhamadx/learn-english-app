
export interface GrammarTopic {
  id: string;
  titleEn: string;
  titleAr: string;
  explanationEn: string;
  explanationAr: string;
  stories: {
    titleEn: string;
    contentEn: string;
    titleAr: string;
    contentAr: string;
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
    explanationEn: "Used to describe habits, general truths, and fixed arrangements. Add -s/-es for he, she, it.",
    explanationAr: "يستخدم لوصف العادات، الحقائق العامة، والمواعيد الثابتة. نضيف -s للفعل مع المفرد الغائب.",
    stories: [
      {
        titleEn: "Sharif's Routine",
        contentEn: "Every morning, Sharif wakes up at 5 AM. He prays, drinks a cup of coffee, and then walks to the English center. He studies for six hours daily. His friends, like Fath Al-Rahman, often visit him. They discuss the future and share their dreams. Sharif works hard because he wants to succeed.",
        titleAr: "روتين شريف",
        contentAr: "كل صباح، يستيقظ شريف في الخامسة فجراً. يصلي، يشرب كوباً من القهوة، ثم يمشي إلى مركز اللغة الإنجليزية. يذاكر لمدة ست ساعات يومياً. أصدقاؤه، مثل فتح الرحمن، يزورونه غالباً. يناقشون المستقبل ويشاركون أحلامهم. شريف يعمل بجد لأنه يريد النجاح."
      },
      {
        titleEn: "Namariq's New Life",
        contentEn: "Namariq lives in a beautiful house abroad. She speaks English fluently now. Every weekend, she calls her family. She misses her home, but she enjoys the stability. Her husband works in a large company. Life seems perfect on the outside, but she sometimes remembers the old days in Sudan.",
        titleAr: "حياة نمارق الجديدة",
        contentAr: "تعيش نمارق في منزل جميل في الخارج. تتحدث الإنجليزية بطلاقة الآن. كل عطلة نهاية أسبوع، تتصل بعائلتها. تشتاق لمنزلها، لكنها تستمتع بالاستقرار. زوجها يعمل في شركة كبيرة. تبدو الحياة مثالية من الخارج، لكنها تتذكر أحياناً الأيام الخوالي في السودان."
      }
    ],
    examples: [
      "I study English every day.",
      "Sharif works 16 hours a day.",
      "The sun rises in the east.",
      "Water boils at 100 degrees Celsius.",
      "He speaks three languages.",
      "We live in Khartoum.",
      "They visit their mother every Friday.",
      "She loves classical music.",
      "My brother works as a doctor.",
      "Cats catch mice.",
      "It rains a lot in winter.",
      "I don't like cold weather.",
      "Does he speak English?",
      "The train leaves at 8 PM.",
      "Birds fly in the sky."
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
    explanationEn: "Used for actions that started and finished in the past. Regular verbs end in -ed.",
    explanationAr: "يستخدم للأفعال التي بدأت وانتهت في الماضي. الأفعال المنتظمة تنتهي بـ -ed.",
    stories: [
      {
        titleEn: "The Sea Journey",
        contentEn: "In 2022, Sharif crossed the ocean in a rubber boat. The engine exploded suddenly. He fought the waves for six hours. He felt terrified, but he never gave up. Finally, a rescue ship arrived and saved everyone. That day changed his life forever.",
        titleAr: "رحلة البحر",
        contentAr: "في عام 2022، عبر شريف المحيط في قارب مطاطي. انفجر المحرك فجأة. صارع الأمواج لمدة ست ساعات. شعر بالرعب، لكنه لم يستسلم أبداً. أخيراً، وصلت سفينة إنقاذ وأنقذت الجميع. ذلك اليوم غير حياته للأبد."
      },
      {
        titleEn: "Makarem's Wedding",
        contentEn: "Makarem cried when her father told her the news. She lost consciousness because of grief. Her family forced her to marry a man she didn't love. She stayed in the hospital for two weeks. She sent her photo to Sharif after four years of waiting. It was a tragic day for both of them.",
        titleAr: "زفاف مكارم",
        contentAr: "بكت مكارم عندما أخبرها والدها بالخبر. فقدت وعيها بسبب الحزن. أجبرتها عائلتها على الزواج من رجل لا تحبه. بقيت في المستشفى لمدة أسبوعين. أرسلت صورتها لشريف بعد أربع سنوات من الانتظار. كان يوماً مأساوياً لكليهما."
      }
    ],
    examples: [
      "I studied for 22 years.",
      "Sharif fell into a 6-meter hole.",
      "They lived in Sudan for a long time.",
      "Namariq married a wealthy man.",
      "The boat stayed in the water for six hours.",
      "He saw his mother yesterday.",
      "We went to the market.",
      "She sent him a message last night.",
      "It didn't rain last week.",
      "Did you finish your lesson?",
      "I graduated in 2018.",
      "The police chased the immigrants.",
      "He broke his leg during the trip.",
      "They were very happy together.",
      "I bought a new book."
    ],
    quiz: [
      { question: "Sharif ___ the ocean in 2022.", options: ["cross", "crossed", "crosses"], correct: "crossed" },
      { question: "Makarem ___ her photo after 4 years.", options: ["send", "sends", "sent"], correct: "sent" },
      { question: "___ you see the news?", options: ["Do", "Did", "Was"], correct: "Did" }
    ]
  }
];
