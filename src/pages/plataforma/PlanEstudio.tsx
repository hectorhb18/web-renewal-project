import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Target, CheckCircle2, Trash2, Loader2, Wand2, Clock } from 'lucide-react';
import { StudyPlan, StudyPlanTask, loadState, saveStudyPlan, toggleStudyPlanTask, deleteStudyPlan, addNotification } from '../../lib/store';
import { getAIResponse } from '../../lib/aiEngine';

interface Props {
  onStateChange: () => void;
}

const TYPE_META: Record<StudyPlanTask['type'], { color: string; label: string }> = {
  teoria:     { color: 'bg-blue-100 text-blue-700',     label: 'Teoría' },
  repaso:     { color: 'bg-amber-100 text-amber-700',   label: 'Repaso' },
  ejercicios: { color: 'bg-emerald-100 text-emerald-700', label: 'Ejercicios' },
  simulacro:  { color: 'bg-purple-100 text-purple-700', label: 'Simulacro' },
  descanso:   { color: 'bg-surface-100 text-surface-600', label: 'Descanso' },
};

const PROMPTS = [
  'Tengo examen de matemáticas en 10 días',
  'Quiero prepararme para el examen de admisión en 3 semanas',
  'Repasar química orgánica en 7 días',
  'Estudiar historia del Perú en 5 días',
];

function buildFallbackPlan(goal: string, days: number): StudyPlan {
  const now = new Date();
  const tasks: StudyPlanTask[] = [];
  for (let i = 1; i <= days; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + (i - 1));
    const type: StudyPlanTask['type'] =
      i === days ? 'simulacro' : i % 4 === 0 ? 'repaso' : i % 3 === 0 ? 'ejercicios' : 'teoria';
    tasks.push({
      day: i,
      date: d.toISOString().slice(0, 10),
      title: `Día ${i}: ${type === 'simulacro' ? 'Simulacro final' : type === 'repaso' ? 'Repaso general' : type === 'ejercicios' ? 'Práctica intensiva' : 'Nueva teoría'}`,
      minutes: type === 'simulacro' ? 90 : 60,
      type,
      done: false,
    });
  }
  return {
    id: Math.random().toString(36).slice(2),
    goal,
    days,
    createdAt: new Date().toISOString(),
    tasks,
    priorities: ['Teoría base', 'Ejercicios variados', 'Simulacros cronometrados', 'Repaso activo'],
  };
}

async function generateWithAI(goal: string): Promise<StudyPlan> {
  const daysMatch = goal.match(/(\d+)\s*(d[ií]as?|semanas?)/i);
  let days = 7;
  if (daysMatch) {
    const n = parseInt(daysMatch[1], 10);
    days = /semana/i.test(daysMatch[2]) ? n * 7 : n;
  }
  days = Math.max(2, Math.min(30, days));

  const prompt = `Actúa como un tutor experto. El estudiante dice: "${goal}".
Genera un plan de estudio de exactamente ${days} días.
Responde SOLO con JSON válido (sin markdown ni texto extra) con esta estructura:
{
  "priorities": ["prioridad 1", "prioridad 2", "prioridad 3", "prioridad 4"],
  "tasks": [
    {"day": 1, "title": "...", "minutes": 60, "type": "teoria|repaso|ejercicios|simulacro|descanso"}
  ]
}
Incluye ${days} tareas (una por día). Alterna teoría, ejercicios y repaso. El último día debe ser un simulacro.`;

  try {
    const response = await getAIResponse(prompt);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('no json');
    const parsed = JSON.parse(jsonMatch[0]);
    const now = new Date();
    const tasks: StudyPlanTask[] = (parsed.tasks || []).slice(0, days).map((t: any, i: number) => {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      return {
        day: t.day || i + 1,
        date: d.toISOString().slice(0, 10),
        title: String(t.title || `Día ${i + 1}`),
        minutes: Number(t.minutes) || 60,
        type: (['teoria', 'repaso', 'ejercicios', 'simulacro', 'descanso'].includes(t.type) ? t.type : 'teoria') as StudyPlanTask['type'],
        done: false,
      };
    });
    if (tasks.length === 0) throw new Error('empty');
    return {
      id: Math.random().toString(36).slice(2),
      goal,
      days: tasks.length,
      createdAt: new Date().toISOString(),
      tasks,
      priorities: (parsed.priorities || []).slice(0, 5).map(String),
    };
  } catch {
    return buildFallbackPlan(goal, days);
  }
}

export default function PlanEstudio({ onStateChange }: Props) {
  const [state, setState] = useState(loadState);
  const [goal, setGoal] = useState('');
  const [generating, setGenerating] = useState(false);
  const [activePlanId, setActivePlanId] = useState<string | null>(state.studyPlans[0]?.id || null);

  const refresh = () => { const s = loadState(); setState(s); onStateChange(); };

  const create = async () => {
    if (!goal.trim() || generating) return;
    setGenerating(true);
    const plan = await generateWithAI(goal.trim());
    saveStudyPlan(plan);
    addNotification({
      type: 'ia',
      title: '✨ Plan de estudio creado',
      body: `${plan.days} días · ${plan.tasks.length} tareas generadas`,
    });
    setActivePlanId(plan.id);
    setGoal('');
    setGenerating(false);
    refresh();
  };

  const toggle = (planId: string, day: number, title: string) => {
    toggleStudyPlanTask(planId, day, title);
    refresh();
  };

  const remove = (id: string) => {
    if (!confirm('¿Eliminar este plan?')) return;
    deleteStudyPlan(id);
    const remaining = loadState().studyPlans;
    setActivePlanId(remaining[0]?.id || null);
    refresh();
  };

  const activePlan = state.studyPlans.find((p) => p.id === activePlanId) || state.studyPlans[0];
  const doneCount = activePlan?.tasks.filter((t) => t.done).length || 0;
  const totalCount = activePlan?.tasks.length || 0;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-surface-900 flex items-center gap-2">
          <Wand2 className="w-7 h-7 text-primary-600" /> Plan de Estudio Inteligente
        </h1>
        <p className="text-surface-500 text-sm mt-1">
          Cuéntale a la IA tu meta y genera un plan con horario, prioridades, repasos y simulacros.
        </p>
      </div>

      {/* Generator */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-6 shadow-lg shadow-primary-200/40">
        <div className="flex items-center gap-2 text-white/90 text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4" /> ¿Cuál es tu meta?
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && create()}
            disabled={generating}
            placeholder='Ej. "Tengo examen de matemáticas en 10 días"'
            className="flex-1 bg-white/95 rounded-xl px-4 py-3 text-sm text-surface-900 placeholder-surface-400 outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={create}
            disabled={!goal.trim() || generating}
            className="bg-white text-primary-700 hover:bg-white/90 font-bold text-sm px-6 py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generando…</> : <><Wand2 className="w-4 h-4" /> Crear plan</>}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {PROMPTS.map((p) => (
            <button key={p} onClick={() => setGoal(p)}
              className="text-xs bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full transition-all">
              {p}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Existing plans tabs */}
      {state.studyPlans.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {state.studyPlans.map((p) => (
            <button key={p.id} onClick={() => setActivePlanId(p.id)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
                p.id === activePlan?.id
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-surface-600 border-surface-200 hover:border-primary-300'
              }`}>
              {p.goal.slice(0, 40)}{p.goal.length > 40 ? '…' : ''}
            </button>
          ))}
        </div>
      )}

      {/* Active plan */}
      <AnimatePresence mode="wait">
        {activePlan ? (
          <motion.div key={activePlan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="grid lg:grid-cols-3 gap-6">
            {/* Left: overview */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-surface-100 shadow-sm p-5">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <p className="text-xs text-surface-400 font-semibold uppercase tracking-wider">Meta</p>
                    <p className="text-sm font-bold text-surface-900 mt-1">{activePlan.goal}</p>
                  </div>
                  <button onClick={() => remove(activePlan.id)} className="text-surface-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="p-2 rounded-lg bg-primary-50">
                    <p className="text-lg font-bold text-primary-700">{activePlan.days}</p>
                    <p className="text-[10px] text-primary-500">Días</p>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50">
                    <p className="text-lg font-bold text-emerald-700">{doneCount}/{totalCount}</p>
                    <p className="text-[10px] text-emerald-500">Hechas</p>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50">
                    <p className="text-lg font-bold text-amber-700">{pct}%</p>
                    <p className="text-[10px] text-amber-500">Avance</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-surface-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-surface-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary-600" /> Prioridades
                </h3>
                <ul className="space-y-2">
                  {activePlan.priorities.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-surface-700">
                      <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: schedule */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-surface-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-surface-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-600" /> Horario detallado
              </h3>
              <div className="space-y-2">
                {activePlan.tasks.map((t, i) => {
                  const meta = TYPE_META[t.type];
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        t.done ? 'bg-emerald-50/50 border-emerald-100' : 'bg-surface-50/50 border-surface-100 hover:border-primary-200'
                      }`}>
                      <button onClick={() => toggle(activePlan.id, t.day, t.title)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          t.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-surface-300 hover:border-primary-400'
                        }`}>
                        {t.done && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <div className="w-10 text-center flex-shrink-0">
                        <p className="text-[10px] text-surface-400 uppercase">Día</p>
                        <p className="text-sm font-bold text-surface-900">{t.day}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${t.done ? 'text-surface-400 line-through' : 'text-surface-800'}`}>
                          {t.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.color}`}>{meta.label}</span>
                          <span className="text-[10px] text-surface-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {t.minutes} min</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-dashed border-surface-200 p-12 text-center">
            <Wand2 className="w-10 h-10 text-surface-300 mx-auto mb-3" />
            <p className="text-sm text-surface-500">Aún no tienes planes. Escribe tu meta arriba para generar uno.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
