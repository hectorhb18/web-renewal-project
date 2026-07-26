import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle2, Star, ChevronRight, Play, Flame, Zap, Wand2, Sparkles } from 'lucide-react';
import { StoreState, getTotalStats, getWeeklyMinutes, getCourseCompletionPct, getExamSummary } from '../../lib/store';
import { ALL_COURSES, getTotalLessons } from '../../lib/courseData';

interface Props {
  state: StoreState;
  onNavigate: (view: string, extra?: string) => void;
}

const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function Dashboard({ state, onNavigate }: Props) {
  const firstName = (state.user?.name || 'Estudiante').split(' ')[0];
  const stats = getTotalStats(state);
  const weekData = getWeeklyMinutes();
  const maxVal = Math.max(...weekData, 10);

  const coursesWithProgress = ALL_COURSES.map((c) => ({
    ...c,
    pct: getCourseCompletionPct(c.id, getTotalLessons(c)),
  })).filter((c) => c.pct > 0).slice(0, 3);

  const satSummary = getExamSummary(state, 'sat');
  const toeflSummary = getExamSummary(state, 'toefl');
  const examAttempts = satSummary.attempts + toeflSummary.attempts;

  const avgNote = stats.avgScore > 0 ? (stats.avgScore / 100 * 20).toFixed(1) : '—';

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900">
            ¡Hola, {firstName}! 👋
          </h1>
          <p className="text-surface-500 text-sm mt-1">Aquí está tu progreso de hoy</p>
        </div>
        <button onClick={() => onNavigate('plan')}
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:shadow-lg hover:shadow-primary-200/50 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all">
          <Wand2 className="w-4 h-4" />
          Crear Plan de Estudio Inteligente
          <Sparkles className="w-3.5 h-3.5 opacity-80 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Weekly chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-surface-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-surface-900">Tu Progreso Semanal</h2>
                <p className="text-xs text-surface-400 mt-0.5">Minutos de estudio (lecciones + exámenes internacionales)</p>
              </div>
              {stats.totalLessons > 0 && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {stats.totalLessons} lecciones
                </span>
              )}
            </div>
            <div className="flex items-end gap-3 h-36">
              {weekData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxVal) * 100}%` }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                    className={`w-full rounded-lg min-h-[4px] ${
                      val === 0 ? 'bg-surface-100'
                        : i === new Date().getDay() - 1
                        ? 'bg-gradient-to-t from-primary-600 to-primary-400'
                        : 'bg-primary-200'
                    }`}
                  />
                  <span className="text-[11px] text-surface-400 font-medium">{days[i]}</span>
                </div>
              ))}
            </div>
            {examAttempts > 0 && (
              <div className="mt-5 pt-5 border-t border-surface-100 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-surface-500">Exámenes Internacionales:</span>
                <button onClick={() => onNavigate('examenes')}
                  className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                  SAT · {satSummary.attempts} prácticas · mejor {satSummary.best || '—'}/1600
                </button>
                <button onClick={() => onNavigate('examenes')}
                  className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors">
                  TOEFL · {toeflSummary.attempts} prácticas · mejor {toeflSummary.best || '—'}/30
                </button>
              </div>
            )}
            {stats.totalLessons === 0 && examAttempts === 0 && (
              <p className="text-center text-surface-400 text-sm mt-4">
                Completa tu primera lección para ver tu progreso aquí
              </p>
            )}
          </motion.div>

          {/* Active courses */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-surface-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-surface-900">Mis Cursos</h2>
              <button onClick={() => onNavigate('cursos')}
                className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1">
                Ver todos <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {coursesWithProgress.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-surface-400 text-sm mb-4">Aún no has empezado ningún curso</p>
                <button onClick={() => onNavigate('cursos')}
                  className="btn-primary text-sm !py-2.5 !px-6">
                  <span className="flex items-center gap-2">Explorar cursos</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {coursesWithProgress.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-lg flex-shrink-0 shadow-sm`}>
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-semibold text-surface-800 truncate">{c.title}</p>
                        <span className="text-xs font-bold text-surface-600 ml-2">{c.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${c.color}`} />
                      </div>
                    </div>
                    <button onClick={() => onNavigate('cursos', c.id)}
                      className="p-2 rounded-lg bg-surface-50 hover:bg-primary-50 text-surface-400 hover:text-primary-600 transition-all flex-shrink-0">
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Horas estudiadas', value: stats.hours > 0 ? `${stats.hours}h` : '0h', icon: Clock, color: 'text-primary-600 bg-primary-50' },
              { label: 'Lecciones completadas', value: String(stats.totalLessons), icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Nota promedio', value: avgNote, icon: Star, color: 'text-amber-600 bg-amber-50' },
            ].map(({ label, value, icon: Icon, color }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className="bg-white rounded-2xl border border-surface-100 shadow-sm p-5 text-center">
                <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                <p className="text-2xl font-bold text-surface-900">{value}</p>
                <p className="text-xs text-surface-400 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick AI */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-5 shadow-lg shadow-primary-200 cursor-pointer"
            onClick={() => onNavigate('asistente')}>
            <h3 className="text-sm font-bold text-white mb-2">✨ Asistente IA</h3>
            <p className="text-white/80 text-sm mb-4">
              "{state.chatHistory.slice(-1)[0]?.role === 'ai'
                ? state.chatHistory.slice(-1)[0].text.slice(0, 80) + '...'
                : '¡Pregúntame cualquier tema!'}"
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 px-3 py-1.5 rounded-full">
              Abrir chat →
            </span>
          </motion.div>

          {/* Streak & XP */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-surface-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-surface-900 mb-4">Este mes</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-surface-900">{state.streak}</p>
                <p className="text-xs text-surface-400">Racha de días</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-surface-900">{state.xp}</p>
                <p className="text-xs text-surface-400">XP ganados</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl border border-surface-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-surface-900 mb-2">¿Listo para estudiar?</h3>
            <p className="text-xs text-surface-500 mb-4">Elige un curso y empieza una lección ahora</p>
            <button onClick={() => onNavigate('cursos')}
              className="btn-primary w-full justify-center text-sm !py-3">
              <span className="flex items-center justify-center gap-2">Ir a mis cursos</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
