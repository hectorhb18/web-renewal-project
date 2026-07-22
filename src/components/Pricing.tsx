import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    icon: Zap,
    description: 'Perfecto para empezar tu viaje de aprendizaje',
    monthlyPrice: 29,
    yearlyPrice: 19,
    currency: 'S/',
    popular: false,
    color: 'primary',
    features: [
      'Acceso a 500+ lecciones',
      'IA personalizada básica',
      '5 horas de clases en vivo/mes',
      'Ejercicios adaptativos',
      'App móvil con modo offline',
      'Comunidad de estudiantes',
      '1 certificación incluida',
    ],
    cta: 'Empezar Gratis',
  },
  {
    name: 'Pro',
    icon: Sparkles,
    description: 'Para estudiantes comprometidos con la excelencia',
    monthlyPrice: 69,
    yearlyPrice: 49,
    currency: 'S/',
    popular: true,
    color: 'gradient',
    features: [
      'Todo lo del plan Básico',
      'Acceso ilimitado a todo el contenido',
      'IA avanzada con tutor virtual 24/7',
      'Clases en vivo ilimitadas',
      'Tutorías 1-a-1 (4 sesiones/mes)',
      'Preparación SAT/GRE/IELTS',
      'Certificaciones ilimitadas',
      'Analíticas avanzadas',
      'Asesoría de becas',
    ],
    cta: 'Comenzar 14 días gratis',
  },
  {
    name: 'Premium',
    icon: Crown,
    description: 'Máximo potencial con mentoría personalizada',
    monthlyPrice: 129,
    yearlyPrice: 89,
    currency: 'S/',
    popular: false,
    color: 'dark',
    features: [
      'Todo lo del plan Pro',
      'Mentor personal dedicado',
      'Tutorías 1-a-1 ilimitadas',
      'Acceso a red de ex-alumnos global',
      'Preparación para becas internacionales',
      'Revisión de CV y portafolio',
      'Simulacros de entrevistas',
      'Prioridad en soporte',
      'Acceso anticipado a nuevos cursos',
      'Línea directa con tutores europeos',
    ],
    cta: 'Hablar con un Asesor',
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="precios" ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Precios Accesibles
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900">
            Invierte en tu futuro,{' '}
            <span className="text-gradient">al precio justo</span>
          </h2>
          <p className="mt-5 text-lg text-surface-500 leading-relaxed">
            Educación de clase mundial a precios diseñados para el estudiante peruano. 
            Cada plan incluye 14 días de prueba gratis.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={`text-sm font-medium ${!annual ? 'text-surface-900' : 'text-surface-400'}`}>
            Mensual
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              annual ? 'bg-primary-600' : 'bg-surface-300'
            }`}
            aria-label="Toggle annual pricing"
          >
            <motion.div
              layout
              className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
              style={{ left: annual ? 'calc(100% - 24px)' : '4px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-surface-900' : 'text-surface-400'}`}>
            Anual
          </span>
          {annual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full"
            >
              Ahorra 30%
            </motion.span>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const price = annual ? plan.yearlyPrice : plan.monthlyPrice;
            const isPro = plan.popular;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`relative rounded-2xl md:rounded-3xl p-[1px] ${
                  isPro
                    ? 'bg-gradient-to-b from-primary-400 via-accent-400 to-emerald-400 md:scale-105 md:-my-4'
                    : 'bg-surface-200'
                } card-hover`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      ⭐ Más Popular
                    </div>
                  </div>
                )}
                <div className={`h-full rounded-2xl md:rounded-3xl p-6 md:p-8 ${
                  isPro ? 'bg-white' : 'bg-white'
                }`}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isPro
                        ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white'
                        : plan.color === 'dark'
                        ? 'bg-surface-900 text-white'
                        : 'bg-primary-50 text-primary-600'
                    }`}>
                      <plan.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-surface-900">{plan.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-surface-500 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={annual ? 'yearly' : 'monthly'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-baseline gap-1"
                      >
                        <span className="text-sm font-medium text-surface-500">{plan.currency}</span>
                        <span className="text-4xl md:text-5xl font-extrabold text-surface-900">{price}</span>
                        <span className="text-sm text-surface-400">/mes</span>
                      </motion.div>
                    </AnimatePresence>
                    {annual && (
                      <p className="text-xs text-surface-400 mt-1">
                        Facturado anualmente ({plan.currency}{price * 12}/año)
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <button className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    isPro
                      ? 'btn-primary !rounded-xl'
                      : plan.color === 'dark'
                      ? 'bg-surface-900 text-white hover:bg-surface-800 shadow-lg shadow-surface-900/20'
                      : 'btn-secondary !rounded-xl'
                  }`}>
                    <span className="flex items-center gap-2">
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Features */}
                  <ul className="mt-6 pt-6 border-t border-surface-100 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          isPro ? 'text-primary-500' : 'text-emerald-500'
                        }`} />
                        <span className="text-sm text-surface-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-2xl">🛡️</span>
            <div className="text-left">
              <p className="text-sm font-bold text-emerald-800">Garantía de satisfacción de 30 días</p>
              <p className="text-xs text-emerald-600">Si no estás satisfecho, te devolvemos el 100% de tu dinero. Sin preguntas.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
