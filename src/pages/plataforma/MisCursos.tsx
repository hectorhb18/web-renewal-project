import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { StoreState, getCourseCompletionPct } from '../../lib/store';
import { ALL_COURSES, getTotalLessons } from '../../lib/courseData';

interface Props {
  state: StoreState;
  onSelectCourse: (courseId: string) => void;
}

export default function MisCursos({ state, onSelectCourse }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Mis Cursos</h1>
        <p className="text-surface-500 text-sm mt-1">6 materias completas para dominar</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {ALL_COURSES.map((course, i) => {
          const total = getTotalLessons(course);
          const pct = getCourseCompletionPct(course.id, total);
          const done = Math.round((pct / 100) * total);

          return (
            <motion.button
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
              onClick={() => onSelectCourse(course.id)}
              className="text-left bg-white rounded-2xl border border-surface-100 shadow-sm p-6 transition-all"
            >
              {/* Header */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                {course.icon}
              </div>

              <h3 className="text-base font-bold text-surface-900 mb-1">{course.title}</h3>
              <p className="text-xs text-surface-500 mb-4 leading-relaxed">{course.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-surface-500">{done}/{total} lecciones</span>
                  <span className="text-xs font-bold text-surface-700">{pct}%</span>
                </div>
                <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                    className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                  />
                </div>
              </div>

              {/* Modules count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-surface-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  {course.modules.length} módulos
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary-600">
                  {pct === 100 ? (
                    <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Completado</>
                  ) : pct > 0 ? (
                    <>Continuar <ChevronRight className="w-3.5 h-3.5" /></>
                  ) : (
                    <>Empezar <ChevronRight className="w-3.5 h-3.5" /></>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
