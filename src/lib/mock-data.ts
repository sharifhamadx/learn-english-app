import { Lesson } from './types';

export const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'The Echoes of Old London',
    topic: 'Daily Life & History',
    difficulty: 'beginner',
    story: `Sarah lives in the heart of London, a city where every cobblestone seems to whisper stories of the past. Every morning, precisely at 7 AM, her old-fashioned alarm clock rings, signaling the start of another busy day. She doesn't like to rush, so she spends a few minutes watching the sunlight dance across her small apartment's walls. 

After a quick breakfast of toast and tea, she heads outside. The air in London is often cool and misty in the early hours. She walks to the bus stop, passing the local bakery where the smell of fresh bread fills the air. She takes the iconic red double-decker bus to work. Sitting on the top deck, she watches the city wake up—businessmen in suits, tourists with cameras, and street cleaners finishing their shifts.

Sarah works in a large, modern office near the River Thames. Her job involves organizing schedules, but she dreams of becoming a writer. During her lunch break at noon, she usually meets her friends at a small park nearby. They eat sandwiches and talk about their plans for the weekend. "The city is so alive," she often tells them.

In the evening, the city changes. The bright lights of Piccadilly Circus start to glow, and the theaters prepare for their shows. Sarah travels home, feeling tired but satisfied. She spends her nights reading thick books by the window, often losing track of time. This is her routine, her life, and in this massive city of millions, she feels perfectly at home.`,
    grammarPoint: 'Present Simple',
    grammarExplanation: 'Use the Present Simple for habits, routines, and permanent situations. For he, she, and it, we add "-s" or "-es" to the verb. Example: "Sarah lives in London." (Habit/State). "The sun rises every morning." (Fact).',
    imageSeed: 'london-long',
    questions: [
      { id: 'q1', text: 'What is Sarah\'s dream job?', options: ['Baker', 'Writer', 'Bus Driver', 'Manager'], correctAnswer: 'Writer', type: 'multiple-choice' },
      { id: 'q2', text: 'Where does Sarah eat lunch?', correctAnswer: 'At a small park nearby', type: 'short-answer' },
      { id: 'q3', text: 'Describe the atmosphere of London in the morning according to the text.', correctAnswer: 'Cool and misty with the smell of fresh bread.', type: 'short-answer' }
    ]
  },
  {
    id: '2',
    title: 'The Enigma of the Golden Key',
    topic: 'Mystery & Adventure',
    difficulty: 'intermediate',
    story: `The afternoon sun was beginning to dip below the horizon, casting long, dramatic shadows across the central park when Mark stumbled upon something extraordinary. He was taking his usual shortcut through the wooded area, a path he had walked a thousand times before. However, today was different. A glint of metallic light caught his eye from beneath an overgrown oak bench.

Mark knelt down, brushing aside dry leaves and dirt. There it lay: a heavy, golden key with intricate engravings of stars and moons. It felt unexpectedly warm in his hand, as if it possessed a faint pulse of its own. Mark wasn't a man given to flights of fancy, but he couldn't shake the feeling that this key belonged to a story far larger than his own.

He sat on the bench for a long time, turning the key over in his fingers. Where could it lead? The park was surrounded by old Victorian houses, many of which had stood for over a century. He thought of the Old Library at the corner of the street—a crumbling stone building filled with forgotten manuscripts and dusty archives. The librarian, Mr. Henderson, was a man who seemed to know every secret the town held.

As the first stars began to appear in the sky, matching the patterns on the key, Mark made his decision. He wouldn't just leave it or hand it to the police. He would solve the mystery himself. The air grew colder, and the wind began to howl through the trees, sounding almost like a whispered invitation. He stood up, tucked the key safely into his inner pocket, and began to walk toward the library. Every step he took felt like he was leaving his ordinary life behind and stepping into a world of shadows and secrets. The adventure had only just begun.`,
    grammarPoint: 'Past Continuous & Past Simple',
    grammarExplanation: 'We use the Past Continuous (was/were + verb-ing) to describe an action that was in progress at a specific time in the past. We use the Past Simple to describe a completed action that interrupted it. Example: "Mark was walking (in progress) when he found (interruption) the key."',
    imageSeed: 'mystery-long',
    questions: [
      { id: 'q1', text: 'What patterns were on the key?', options: ['Flowers', 'Stars and Moons', 'Animals', 'Names'], correctAnswer: 'Stars and Moons', type: 'multiple-choice' },
      { id: 'q2', text: 'Why did Mark think of the librarian?', correctAnswer: 'Because he seemed to know every secret of the town.', type: 'short-answer' }
    ]
  },
  {
    id: '3',
    title: 'Chronicles of the Red Frontier',
    topic: 'Science Fiction',
    difficulty: 'advanced',
    story: `The descent had been harrowing, a violent symphony of rattling metal and roaring thrusters that seemed to last an eternity. But as the dust settled around the Ares VII landing module, a profound silence enveloped the crew. Humanity had finally achieved the impossible; we had reached the Red Frontier. Captain Elias Thorne was the first to step onto the surface, his pressurized boots sinking slightly into the fine, crimson silt that carpeted the floor of Jezero Crater.

The landscape before them was a desolate masterpiece of geological history. To the north, jagged peaks of obsidian rock tore at a salmon-colored sky, while to the south, the vast, empty riverbeds of an ancient era stretched toward the horizon. The atmosphere was thin, cold, and utterly indifferent to their presence. Every breath Elias took was a calculated effort, provided by the complex life-support systems humming rhythmically on his back.

"It's breathtaking," whispered Dr. Aris, the team's lead geologist, her voice crackling through the comms. She was already kneeling, her robotic arm beginning the delicate process of extracting a core sample from a layered rock formation. They were searching for the 'Holy Grail' of astrobiology: evidence of microbial life that might have thrived billions of years ago when Mars was a world of blue oceans and thick clouds.

Their mission was not merely one of exploration, but of survival and legacy. Back on Earth, the resources were dwindling, and the climate was increasingly hostile. Mars represented a second chance, a blank canvas upon which a new chapter of human civilization could be written. However, as Elias looked up at the tiny, pale blue dot that was his home, he felt a crushing sense of isolation. They were pioneers in a graveyard of a world, surrounded by the ghosts of a planetary evolution that had taken a different path. The silence of Mars was not just the absence of sound; it was the weight of billions of years of solitude. As they set up the first modular habitats, they knew that every discovery here would change the definition of life itself.`,
    grammarPoint: 'Past Perfect & Narrative Tenses',
    grammarExplanation: 'The Past Perfect (had + past participle) is essential for sophisticated storytelling. It allows the writer to jump back in time to events that happened before the main story began. Example: "The descent had been harrowing..." (happened before the landing).',
    imageSeed: 'mars-long',
    questions: [
      { id: 'q1', text: 'What is the "Holy Grail" mentioned in the text?', correctAnswer: 'Evidence of microbial life from billions of years ago.', type: 'short-answer' },
      { id: 'q2', text: 'How does the Captain feel when looking at Earth?', options: ['Excited', 'Angry', 'Isolated', 'Indifferent'], correctAnswer: 'Isolated', type: 'multiple-choice' }
    ]
  }
];
