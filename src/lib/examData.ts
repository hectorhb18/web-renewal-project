// ─── Bancos de preguntas para Exámenes Internacionales ───────────────────────

export interface ExamQuestion {
  id: string;
  prompt: string;
  passage?: string;
  options: string[];
  answer: number; // índice correcto
  explanation: string;
}

export interface ExamSection {
  id: string;
  label: string;
  /** duración real de la sección en el examen oficial (minutos) */
  realMinutes: number;
  questions: ExamQuestion[];
}

// ─── SAT ─────────────────────────────────────────────────────────────────────
export const SAT_SECTIONS: ExamSection[] = [
  {
    id: 'reading-writing',
    label: 'Reading & Writing',
    realMinutes: 64,
    questions: [
      {
        id: 'rw1',
        passage:
          'The Andean condor, one of the largest flying birds in the world, can glide for hours without flapping its wings. Researchers tracking the birds found that they spend only about one percent of their flight time flapping.',
        prompt: 'As used in the text, the word "glide" most nearly means:',
        options: ['to fall quickly', 'to move smoothly through the air', 'to hunt from above', 'to rest on a cliff'],
        answer: 1,
        explanation: 'El contexto ("without flapping its wings", "flight time") indica desplazamiento suave en el aire.',
      },
      {
        id: 'rw2',
        passage:
          'Although the experiment produced unexpected results, the team did not discard the data; instead, they repeated the trial three more times.',
        prompt: 'Which choice best describes the function of the underlined portion ("instead, they repeated the trial")?',
        options: [
          'It offers a contrast to the previous action.',
          'It provides an example of the unexpected results.',
          'It summarizes the conclusion of the study.',
          'It questions the validity of the experiment.',
        ],
        answer: 0,
        explanation: '"Instead" introduce la acción alternativa, contrastando con descartar los datos.',
      },
      {
        id: 'rw3',
        prompt: 'The committee members, along with the director, ______ agreed on the final budget.',
        options: ['has', 'have', 'having', 'is'],
        answer: 1,
        explanation: 'El sujeto es "members" (plural); "along with the director" es una frase intermedia y no cambia el número.',
      },
      {
        id: 'rw4',
        prompt: 'Choose the option that best maintains logical transition: The city invested heavily in bike lanes; ______, cycling rates doubled in two years.',
        options: ['however', 'consequently', 'nevertheless', 'similarly'],
        answer: 1,
        explanation: 'Hay una relación causa–efecto, por lo que corresponde un conector consecutivo.',
      },
      {
        id: 'rw5',
        passage:
          'Scholar María Rostworowski argued that Andean economies were organized around reciprocity rather than markets.',
        prompt: 'Which finding would most directly support Rostworowski\'s claim?',
        options: [
          'Evidence of large coin hoards in coastal cities',
          'Records of labor exchanged between ayllus without currency',
          'Maps showing long-distance trade routes',
          'Descriptions of Inca military campaigns',
        ],
        answer: 1,
        explanation: 'El intercambio de trabajo sin moneda es evidencia directa de reciprocidad.',
      },
      {
        id: 'rw6',
        prompt: 'Which choice completes the text with the most logical and precise word? The results were ______: every trial produced the same value.',
        options: ['ambiguous', 'consistent', 'tentative', 'controversial'],
        answer: 1,
        explanation: 'Si todos los ensayos dan el mismo valor, los resultados son consistentes.',
      },
    ],
  },
  {
    id: 'math',
    label: 'Math',
    realMinutes: 70,
    questions: [
      {
        id: 'm1',
        prompt: 'If 3x + 7 = 25, what is the value of 6x - 4?',
        options: ['26', '32', '30', '20'],
        answer: 1,
        explanation: '3x = 18 → x = 6. Entonces 6(6) − 4 = 32.',
      },
      {
        id: 'm2',
        prompt: 'A line passes through (2, 3) and (6, 11). What is its slope?',
        options: ['1/2', '2', '4', '8'],
        answer: 1,
        explanation: 'm = (11 − 3)/(6 − 2) = 8/4 = 2.',
      },
      {
        id: 'm3',
        prompt: 'If f(x) = x² − 4x + 3, what are the zeros of f?',
        options: ['1 y 3', '−1 y −3', '2 y 3', '0 y 4'],
        answer: 0,
        explanation: 'x² − 4x + 3 = (x − 1)(x − 3) → x = 1, x = 3.',
      },
      {
        id: 'm4',
        prompt: 'A shirt costs S/80 after a 20% discount. What was the original price?',
        options: ['S/96', 'S/100', 'S/90', 'S/120'],
        answer: 1,
        explanation: '0.8p = 80 → p = 100.',
      },
      {
        id: 'm5',
        prompt: 'The circle x² + y² = 49 has a radius of:',
        options: ['7', '49', '14', '√7'],
        answer: 0,
        explanation: 'r² = 49 → r = 7.',
      },
      {
        id: 'm6',
        prompt: 'If 2^(x+1) = 32, what is x?',
        options: ['3', '4', '5', '6'],
        answer: 1,
        explanation: '32 = 2⁵ → x + 1 = 5 → x = 4.',
      },
    ],
  },
];

// ─── TOEFL ───────────────────────────────────────────────────────────────────
export const TOEFL_QUIZ_SECTIONS: ExamSection[] = [
  {
    id: 'reading',
    label: 'Reading',
    realMinutes: 35,
    questions: [
      {
        id: 'tr1',
        passage:
          'Coral reefs occupy less than one percent of the ocean floor, yet they support roughly a quarter of all marine species. Rising sea temperatures cause corals to expel the algae living in their tissues, a process known as bleaching.',
        prompt: 'According to the passage, bleaching occurs when:',
        options: [
          'corals expand across the ocean floor',
          'corals expel the algae in their tissues',
          'marine species migrate away from reefs',
          'sea levels drop significantly',
        ],
        answer: 1,
        explanation: 'El texto define bleaching como la expulsión de las algas.',
      },
      {
        id: 'tr2',
        passage:
          'Urban planners increasingly rely on "green corridors" — connected strips of vegetation — to reduce heat and allow wildlife to move between parks.',
        prompt: 'The author mentions green corridors mainly to:',
        options: [
          'criticize modern urban design',
          'illustrate a planning strategy with multiple benefits',
          'compare parks in different cities',
          'explain how wildlife reproduces',
        ],
        answer: 1,
        explanation: 'Se presentan como estrategia con beneficios múltiples (calor + fauna).',
      },
      {
        id: 'tr3',
        prompt: 'The word "rely on" in the passage is closest in meaning to:',
        options: ['depend on', 'object to', 'give up', 'look for'],
        answer: 0,
        explanation: '"Rely on" = depender de.',
      },
    ],
  },
  {
    id: 'listening',
    label: 'Listening',
    realMinutes: 36,
    questions: [
      {
        id: 'tl1',
        passage:
          'Transcripción (lecture): "Today we will look at photosynthesis efficiency. Only about 3 to 6 percent of the sunlight that reaches a leaf is converted into chemical energy — far less than most people assume."',
        prompt: 'What is the main point of the lecture excerpt?',
        options: [
          'Plants absorb all available sunlight.',
          'Photosynthesis is less efficient than commonly believed.',
          'Leaves reflect most sunlight as heat.',
          'Chemical energy is stored in the soil.',
        ],
        answer: 1,
        explanation: 'El profesor enfatiza "far less than most people assume".',
      },
      {
        id: 'tl2',
        passage:
          'Transcripción (conversation): Student: "I missed the lab session." Advisor: "You can make it up on Friday, but you must email the instructor first."',
        prompt: 'What does the advisor suggest the student do first?',
        options: ['Attend Friday\'s lab', 'Email the instructor', 'Drop the course', 'Write a report'],
        answer: 1,
        explanation: '"You must email the instructor first".',
      },
      {
        id: 'tl3',
        passage: 'Transcripción: "…and that, more than anything, explains why the migration happens at night."',
        prompt: 'What is the speaker\'s attitude toward the explanation?',
        options: ['Doubtful', 'Confident', 'Indifferent', 'Amused'],
        answer: 1,
        explanation: '"More than anything" indica seguridad.',
      },
    ],
  },
];

export interface ProductiveTask {
  id: string;
  skill: 'speaking' | 'writing';
  type: string;
  title: string;
  prompt: string;
  prepSeconds: number;
  responseSeconds: number;
  minWords?: number;
}

export const TOEFL_TASKS: ProductiveTask[] = [
  {
    id: 'sp1',
    skill: 'speaking',
    type: 'Task 1 — Independent',
    title: 'Preferencia personal',
    prompt:
      'Some students prefer to study alone; others prefer to study in groups. Which do you prefer and why? Use specific reasons and examples.',
    prepSeconds: 15,
    responseSeconds: 45,
  },
  {
    id: 'sp2',
    skill: 'speaking',
    type: 'Task 2 — Integrated (Campus)',
    title: 'Anuncio del campus',
    prompt:
      'The university announced it will close the library at 9 p.m. instead of midnight. Summarize the announcement and explain the student\'s opinion about it.',
    prepSeconds: 30,
    responseSeconds: 60,
  },
  {
    id: 'wr1',
    skill: 'writing',
    type: 'Integrated Writing',
    title: 'Lectura + Conferencia',
    prompt:
      'The reading claims that remote work increases productivity. The lecturer disagrees, arguing that collaboration suffers. Summarize the lecture points and explain how they challenge the reading.',
    prepSeconds: 0,
    responseSeconds: 20 * 60,
    minWords: 150,
  },
  {
    id: 'wr2',
    skill: 'writing',
    type: 'Writing for an Academic Discussion',
    title: 'Discusión académica',
    prompt:
      'Professor: "Should governments invest more in public transportation or in building new roads?" Write a response contributing to the discussion with your own view and support.',
    prepSeconds: 0,
    responseSeconds: 10 * 60,
    minWords: 100,
  },
];

/** Duraciones oficiales aproximadas para el modo simulacro */
export const REAL_DURATIONS: Record<string, number> = {
  'reading-writing': 64,
  math: 70,
  reading: 35,
  listening: 36,
};
