// ─── Studymind Platform Store ─────────────────────────────────────────────────
// All state persisted in localStorage

export interface UserData {
  name: string;
  email: string;
  joinedAt: string;
  avatar?: string;      // data URL or emoji
  colegio?: string;
  grado?: string;
  pais?: string;
  metas?: string;
}

export interface LessonProgress {
  completedAt: string;
  score: number; // 0-100
}

export interface CourseProgress {
  [lessonId: string]: LessonProgress;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'tarea' | 'recordatorio' | 'ia' | 'curso' | 'anuncio';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface StudyPlanTask {
  day: number;
  date: string;
  title: string;
  minutes: number;
  type: 'repaso' | 'teoria' | 'ejercicios' | 'simulacro' | 'descanso';
  done: boolean;
}

export interface StudyPlan {
  id: string;
  goal: string;         // "Tengo examen de mate en 10 días"
  days: number;
  createdAt: string;
  tasks: StudyPlanTask[];
  priorities: string[];
}

export interface Settings {
  darkMode: boolean;
  language: 'es' | 'en' | 'qu';
  notifications: boolean;
  emailUpdates: boolean;
  publicProfile: boolean;
}

export type ExamId = 'sat' | 'toefl';

export interface ExamAttempt {
  id: string;
  exam: ExamId;
  section: string;        // 'reading-writing' | 'math' | 'reading' | 'listening' | 'speaking' | 'writing'
  mode: 'practica' | 'simulacro';
  score: number;          // 0-100 (porcentaje o score normalizado)
  scaledScore?: number;   // 400-1600 SAT / 0-120 TOEFL
  correct?: number;
  total?: number;
  minutes: number;
  date: string;
}

export interface StoreState {
  user: UserData | null;
  progress: { [courseId: string]: CourseProgress };
  xp: number;
  streak: number;
  lastStudyDate: string;
  chatHistory: ChatMessage[];
  notifications: Notification[];
  studyPlans: StudyPlan[];
  examAttempts: ExamAttempt[];
  settings: Settings;
}

const STORAGE_KEY = 'studymind_state';

const defaultState: StoreState = {
  user: null,
  progress: {},
  xp: 0,
  streak: 0,
  lastStudyDate: '',
  chatHistory: [
    {
      role: 'ai',
      text: '¡Hola! Soy tu asistente de estudio IA. Puedo ayudarte con Matemáticas, Física, Química, Historia, Comunicación e Inglés. ¿Qué tema quieres repasar hoy?',
      timestamp: new Date().toISOString(),
    },
  ],
  notifications: [
    {
      id: 'welcome',
      type: 'anuncio',
      title: '¡Bienvenido a Studymind!',
      body: 'Explora tus cursos, crea un plan de estudio inteligente y desbloquea logros.',
      createdAt: new Date().toISOString(),
      read: false,
    },
  ],
  studyPlans: [],
  settings: {
    darkMode: false,
    language: 'es',
    notifications: true,
    emailUpdates: true,
    publicProfile: false,
  },
};

export function loadState(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    // Backfill missing fields for older users
    const merged: StoreState = {
      ...defaultState,
      ...parsed,
      settings: { ...defaultState.settings, ...(parsed.settings || {}) },
      chatHistory: parsed.chatHistory && parsed.chatHistory.length > 0 ? parsed.chatHistory : defaultState.chatHistory,
      notifications: parsed.notifications || defaultState.notifications,
      studyPlans: parsed.studyPlans || [],
    };
    return merged;
  } catch {
    return defaultState;
  }
}

export function saveState(state: StoreState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function saveUser(name: string, email: string): void {
  const state = loadState();
  state.user = {
    ...(state.user || { joinedAt: new Date().toISOString() }),
    name,
    email,
    joinedAt: state.user?.joinedAt || new Date().toISOString(),
  };
  const today = new Date().toDateString();
  if (state.lastStudyDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    state.streak = state.lastStudyDate === yesterday ? state.streak + 1 : 1;
    state.lastStudyDate = today;
  }
  saveState(state);
}

export function updateUser(patch: Partial<UserData>): StoreState {
  const state = loadState();
  state.user = {
    ...(state.user || { name: '', email: '', joinedAt: new Date().toISOString() }),
    ...patch,
  };
  saveState(state);
  return state;
}

export function updateSettings(patch: Partial<Settings>): StoreState {
  const state = loadState();
  state.settings = { ...state.settings, ...patch };
  saveState(state);
  return state;
}

export function addNotification(n: Omit<Notification, 'id' | 'createdAt' | 'read'>): StoreState {
  const state = loadState();
  state.notifications = [
    { ...n, id: Math.random().toString(36).slice(2), createdAt: new Date().toISOString(), read: false },
    ...state.notifications,
  ].slice(0, 50);
  saveState(state);
  return state;
}

export function markNotificationRead(id: string): StoreState {
  const state = loadState();
  state.notifications = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
  saveState(state);
  return state;
}

export function markAllNotificationsRead(): StoreState {
  const state = loadState();
  state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
  saveState(state);
  return state;
}

export function saveStudyPlan(plan: StudyPlan): StoreState {
  const state = loadState();
  state.studyPlans = [plan, ...state.studyPlans].slice(0, 10);
  saveState(state);
  return state;
}

export function toggleStudyPlanTask(planId: string, day: number, title: string): StoreState {
  const state = loadState();
  state.studyPlans = state.studyPlans.map((p) =>
    p.id !== planId
      ? p
      : {
          ...p,
          tasks: p.tasks.map((t) => (t.day === day && t.title === title ? { ...t, done: !t.done } : t)),
        }
  );
  saveState(state);
  return state;
}

export function deleteStudyPlan(planId: string): StoreState {
  const state = loadState();
  state.studyPlans = state.studyPlans.filter((p) => p.id !== planId);
  saveState(state);
  return state;
}

export function exportData(): string {
  return JSON.stringify(loadState(), null, 2);
}

export function deleteAccount(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('sm_darkmode');
  } catch {}
}

export function completeLesson(
  courseId: string,
  lessonId: string,
  score: number
): StoreState {
  const state = loadState();
  if (!state.progress[courseId]) state.progress[courseId] = {};
  const alreadyDone = !!state.progress[courseId][lessonId];
  state.progress[courseId][lessonId] = {
    completedAt: new Date().toISOString(),
    score,
  };
  if (!alreadyDone) {
    const gained = Math.round(50 + score * 0.5);
    state.xp += gained;
  }
  const today = new Date().toDateString();
  if (state.lastStudyDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    state.streak = state.lastStudyDate === yesterday ? state.streak + 1 : 1;
    state.lastStudyDate = today;
  }
  saveState(state);
  return state;
}

export function saveChatMessage(msg: ChatMessage): void {
  const state = loadState();
  state.chatHistory = [...(state.chatHistory || []), msg];
  if (state.chatHistory.length > 100) {
    state.chatHistory = state.chatHistory.slice(-100);
  }
  saveState(state);
}

export function getCourseCompletionPct(
  courseId: string,
  totalLessons: number
): number {
  const state = loadState();
  const done = Object.keys(state.progress[courseId] || {}).length;
  return totalLessons === 0 ? 0 : Math.round((done / totalLessons) * 100);
}

export function getWeeklyMinutes(): number[] {
  const state = loadState();
  const buckets = [0, 0, 0, 0, 0, 0, 0];
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  Object.values(state.progress).forEach((cp) => {
    Object.values(cp).forEach((lp) => {
      const d = new Date(lp.completedAt);
      const diffDays = Math.floor(
        (d.getTime() - monday.getTime()) / 86400000
      );
      if (diffDays >= 0 && diffDays < 7) {
        buckets[diffDays] += 15;
      }
    });
  });
  return buckets;
}

export function getTotalStats(state: StoreState) {
  let totalLessons = 0;
  let totalScore = 0;
  Object.values(state.progress).forEach((cp) => {
    const lessons = Object.values(cp);
    totalLessons += lessons.length;
    lessons.forEach((l) => (totalScore += l.score));
  });
  const avgScore =
    totalLessons > 0 ? Math.round(totalScore / totalLessons) : 0;
  const hours = Math.round((totalLessons * 15) / 60);
  return { totalLessons, avgScore, hours };
}

// ─── Achievements ─────────────────────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  check: (state: StoreState) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'Primer Paso',
    description: 'Completa tu primera lección',
    icon: '🎯',
    xpReward: 100,
    check: (s) =>
      Object.values(s.progress).some((cp) => Object.keys(cp).length > 0),
  },
  {
    id: 'streak_3',
    title: 'Constancia',
    description: 'Estudia 3 días seguidos',
    icon: '🔥',
    xpReward: 150,
    check: (s) => s.streak >= 3,
  },
  {
    id: 'streak_7',
    title: 'Semana Perfecta',
    description: 'Estudia 7 días seguidos',
    icon: '⚡',
    xpReward: 300,
    check: (s) => s.streak >= 7,
  },
  {
    id: 'xp_500',
    title: 'Acumulador',
    description: 'Gana 500 XP',
    icon: '💎',
    xpReward: 200,
    check: (s) => s.xp >= 500,
  },
  {
    id: 'xp_1000',
    title: 'Experto',
    description: 'Gana 1000 XP',
    icon: '🏆',
    xpReward: 500,
    check: (s) => s.xp >= 1000,
  },
  {
    id: 'perfect_score',
    title: 'Perfeccionista',
    description: 'Saca 100/100 en un ejercicio',
    icon: '⭐',
    xpReward: 200,
    check: (s) =>
      Object.values(s.progress).some((cp) =>
        Object.values(cp).some((l) => l.score === 100)
      ),
  },
  {
    id: 'five_lessons',
    title: 'Estudiante Aplicado',
    description: 'Completa 5 lecciones',
    icon: '📚',
    xpReward: 250,
    check: (s) =>
      Object.values(s.progress).reduce(
        (acc, cp) => acc + Object.keys(cp).length,
        0
      ) >= 5,
  },
  {
    id: 'two_courses',
    title: 'Multidisciplinario',
    description: 'Empieza 2 cursos distintos',
    icon: '🌟',
    xpReward: 300,
    check: (s) =>
      Object.values(s.progress).filter((cp) => Object.keys(cp).length > 0)
        .length >= 2,
  },
  {
    id: 'plan_created',
    title: 'Estratega',
    description: 'Crea tu primer plan de estudio inteligente',
    icon: '🧠',
    xpReward: 150,
    check: (s) => s.studyPlans.length > 0,
  },
];

export function getUnlockedAchievements(state: StoreState): string[] {
  return ACHIEVEMENTS.filter((a) => a.check(state)).map((a) => a.id);
}

export function addXP(amount: number): StoreState {
  const state = loadState();
  state.xp += amount;
  const today = new Date().toDateString();
  if (state.lastStudyDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    state.streak = state.lastStudyDate === yesterday ? state.streak + 1 : 1;
    state.lastStudyDate = today;
  }
  saveState(state);
  return state;
}
