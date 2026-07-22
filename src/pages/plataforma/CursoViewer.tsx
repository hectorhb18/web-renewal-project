import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle, Trophy, BookOpen, Play } from 'lucide-react';
import { getCourse, getTotalLessons, type Lesson } from '../../lib/courseData';
import { completeLesson, getCourseCompletionPct, loadState } from '../../lib/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  courseId: string;
  onBack: () => void;
  onStateChange: () => void;
}

type Stage = 'course' | 'lesson' | 'quiz' | 'result';

export default function CursoViewer({ courseId, onBack, onStateChange }: Props) {
  const course = getCourse(courseId);
  const [stage, setStage] = useState<Stage>('course');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!course) return <div className="text-surface-400">Curso no encontrado</div>;

  const totalLessons = getTotalLessons(course);
  const pct = getCourseCompletionPct(courseId, totalLessons);

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setStage('lesson');
    setQuizAnswers([]);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startQuiz = () => {
    setStage('quiz');
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizAnswers([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const answers = [...quizAnswers, selectedAnswer];
    setQuizAnswers(answers);
    if (currentQ < (activeLesson?.exercises.length ?? 0) - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Calculate score
      const correct = answers.filter(
        (a, i) => a === activeLesson!.exercises[i].correct
      ).length;
      const score = Math.round((correct / answers.length) * 100);
      setQuizScore(score);
      completeLesson(courseId, activeLesson!.id, score);
      onStateChange();
      setStage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ─── Course overview ───────────────────────────────────────────────────────
  if (stage === 'course') {
    return (
      <div className="space-y-6">
        <button onClick={onBack}
          className="flex items-center gap-2 text-surface-500 hover:text-primary-600 transition-colors text-sm font-medium">
          <ChevronLeft className="w-4 h-4" /> Volver a cursos
        </button>

        <div className={`bg-gradient-to-br ${course.color} rounded-2xl p-8 text-white`}>
          <div className="text-5xl mb-4">{course.icon}</div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-white/80 mb-6">{course.description}</p>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {course.modules.length} módulos</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {totalLessons} lecciones</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> {pct}% completado</span>
          </div>
        </div>

        {/* Modules */}
        {course.modules.map((mod, mi) => (
          <div key={mod.id} className="bg-white rounded-2xl border border-surface-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-50 bg-surface-50/50">
              <h3 className="font-bold text-surface-900">{mod.title}</h3>
              <p className="text-xs text-surface-400 mt-0.5">{mod.lessons.length} lecciones</p>
            </div>
            <div className="divide-y divide-surface-50">
              {mod.lessons.map((lesson, li) => {
                const currentState = loadState();
                const done = !!(currentState.progress[courseId]?.[lesson.id]);
                const score = currentState.progress[courseId]?.[lesson.id]?.score;

                return (
                  <motion.button
                    key={lesson.id}
                    whileHover={{ backgroundColor: '#f8faff' }}
                    onClick={() => startLesson(lesson)}
                    className="w-full flex items-center gap-4 px-6 py-4 text-left transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      done ? 'bg-emerald-100 text-emerald-600' : 'bg-primary-50 text-primary-600'
                    }`}>
                      {done ? <CheckCircle2 className="w-5 h-5" /> : `${mi + 1}.${li + 1}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-900">{lesson.title}</p>
                      <p className="text-xs text-surface-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {lesson.duration}
                        {lesson.exercises.length > 0 && ` · ${lesson.exercises.length} ejercicios`}
                      </p>
                    </div>
                    {done && score !== undefined && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        score >= 80 ? 'bg-emerald-50 text-emerald-700' :
                        score >= 60 ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-700'
                      }`}>{score}/100</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-surface-300 flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ─── Lesson content ────────────────────────────────────────────────────────
  if (stage === 'lesson' && activeLesson) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => setStage('course')}
          className="flex items-center gap-2 text-surface-500 hover:text-primary-600 transition-colors text-sm font-medium">
          <ChevronLeft className="w-4 h-4" /> Volver al curso
        </button>

        <div className="bg-white rounded-2xl border border-surface-100 shadow-sm p-8">
          <div className="flex items-center gap-2 text-xs text-surface-400 mb-4">
            <Clock className="w-3.5 h-3.5" /> {activeLesson.duration}
            <span className="mx-2">·</span>
            <BookOpen className="w-3.5 h-3.5" /> {activeLesson.exercises.length} ejercicios
          </div>

          {/* Content rendered as styled markdown */}
          <div className="prose-content space-y-1">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-2xl font-bold text-surface-900 mt-6 mb-3">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold text-surface-900 mt-6 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold text-surface-800 mt-5 mb-2">{children}</h3>,
                p: ({ children }) => <p className="text-surface-700 leading-relaxed my-2">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-surface-900">{children}</strong>,
                em: ({ children }) => <em className="italic text-surface-700">{children}</em>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  return isBlock
                    ? <code className="block bg-surface-100 rounded-xl px-4 py-3 text-sm font-mono text-surface-800 my-3 overflow-x-auto">{children}</code>
                    : <code className="bg-surface-100 px-1.5 py-0.5 rounded text-xs font-mono text-surface-800">{children}</code>;
                },
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary-400 bg-primary-50 rounded-r-xl pl-4 pr-4 py-3 my-3">
                    <div className="text-primary-800 font-mono text-sm">{children}</div>
                  </blockquote>
                ),
                ul: ({ children }) => <ul className="space-y-1.5 my-3 pl-1">{children}</ul>,
                ol: ({ children }) => <ol className="space-y-1.5 my-3 pl-4 list-decimal">{children}</ol>,
                li: ({ children }) => (
                  <li className="flex items-start gap-2 text-surface-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                    <span>{children}</span>
                  </li>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto rounded-xl border border-surface-100 my-4">
                    <table className="w-full text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-surface-50">{children}</thead>,
                th: ({ children }) => <th className="px-4 py-3 text-left font-semibold text-surface-700">{children}</th>,
                td: ({ children }) => <td className="px-4 py-3 text-surface-600 border-t border-surface-50">{children}</td>,
                hr: () => <hr className="border-surface-100 my-4" />,
              }}
            >
              {activeLesson.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => setStage('course')}
            className="btn-secondary text-sm !py-3 !px-6 flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Volver
          </button>
          {activeLesson.exercises.length > 0 && (
            <button onClick={startQuiz}
              className="btn-primary text-sm !py-3 !px-8 flex items-center gap-2">
              <span className="flex items-center gap-2">
                Hacer ejercicios ({activeLesson.exercises.length})
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── Quiz ──────────────────────────────────────────────────────────────────
  if (stage === 'quiz' && activeLesson) {
    const q = activeLesson.exercises[currentQ];
    const isCorrect = selectedAnswer === q.correct;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setStage('lesson')}
            className="flex items-center gap-2 text-surface-500 hover:text-primary-600 text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Volver a la lección
          </button>
          <span className="text-sm font-semibold text-surface-500">
            {currentQ + 1} / {activeLesson.exercises.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-surface-100 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentQ) / activeLesson.exercises.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            className="bg-white rounded-2xl border border-surface-100 shadow-sm p-8">

            <p className="text-lg font-bold text-surface-900 mb-6">{q.question}</p>

            <div className="space-y-3 mb-6">
              {q.options.map((opt, idx) => {
                let style = 'border-surface-200 bg-white hover:border-primary-300 hover:bg-primary-50';
                if (selectedAnswer !== null) {
                  if (idx === q.correct) style = 'border-emerald-400 bg-emerald-50';
                  else if (idx === selectedAnswer && !isCorrect) style = 'border-red-400 bg-red-50';
                  else style = 'border-surface-100 bg-surface-50 opacity-60';
                }

                return (
                  <button key={idx} onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${style}`}>
                    <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      selectedAnswer !== null && idx === q.correct ? 'border-emerald-500 bg-emerald-500 text-white' :
                      selectedAnswer === idx && !isCorrect ? 'border-red-500 bg-red-500 text-white' :
                      'border-surface-300 text-surface-500'
                    }`}>
                      {selectedAnswer !== null && idx === q.correct ? '✓' :
                       selectedAnswer === idx && !isCorrect ? '✗' :
                       String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-medium text-surface-800">{opt}</span>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-start gap-2">
                  {isCorrect
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-emerald-800' : 'text-red-800'}`}>
                      {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
                    </p>
                    <p className="text-sm text-surface-700">{q.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedAnswer !== null && (
              <button onClick={nextQuestion} className="btn-primary w-full justify-center text-sm !py-3">
                <span className="flex items-center justify-center gap-2">
                  {currentQ < activeLesson.exercises.length - 1 ? 'Siguiente pregunta' : 'Ver resultado'}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ─── Result ────────────────────────────────────────────────────────────────
  if (stage === 'result' && activeLesson) {
    const correct = quizAnswers.filter((a, i) => a === activeLesson.exercises[i].correct).length;

    return (
      <div className="max-w-md mx-auto text-center py-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}>
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            quizScore >= 80 ? 'bg-emerald-100' : quizScore >= 60 ? 'bg-amber-100' : 'bg-red-100'
          }`}>
            <Trophy className={`w-12 h-12 ${
              quizScore >= 80 ? 'text-emerald-600' : quizScore >= 60 ? 'text-amber-600' : 'text-red-600'
            }`} />
          </div>

          <h2 className="text-3xl font-bold text-surface-900 mb-2">
            {quizScore >= 80 ? '¡Excelente!' : quizScore >= 60 ? '¡Buen trabajo!' : 'Sigue practicando'}
          </h2>
          <p className="text-surface-500 mb-6">{activeLesson.title}</p>

          <div className="bg-white rounded-2xl border border-surface-100 shadow-sm p-6 mb-6">
            <div className="text-5xl font-bold text-primary-600 mb-2">{quizScore}/100</div>
            <p className="text-surface-500 text-sm">{correct} de {activeLesson.exercises.length} correctas</p>
            <p className="text-emerald-600 text-sm font-semibold mt-2">+{Math.round(50 + quizScore * 0.5)} XP ganados</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStage('course')}
              className="btn-secondary flex-1 justify-center text-sm !py-3">
              Volver al curso
            </button>
            <button onClick={() => startQuiz()}
              className="btn-primary flex-1 justify-center text-sm !py-3">
              <span className="flex items-center justify-center gap-2">Repetir</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
