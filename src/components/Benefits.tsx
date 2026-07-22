import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, ArrowRight, GraduationCap, Globe, Lightbulb } from 'lucide-react';

const benefitBlocks = [
  {
    tag: 'Accesibilidad',
    tagIcon: Globe,
    tagColor: 'bg-accent-500/10 text-accent-600',
    title: 'La misma educación que Europa, desde cualquier rincón del Perú',
    description: 'No importa si estás en Lima, Cusco, Arequipa o Iquitos. Con Studymind accedes a contenido, metodologías y estándares educativos europeos sin moverte de tu ciudad.',
    points: [
      'Contenido adaptado al currículo peruano con estándares europeos',
      'Acceso offline para zonas con conectividad limitada',
      'Interfaz en español con soporte en quechua y aimara',
      'Compatible con cualquier dispositivo, incluso de gama baja',
    ],
    visual: 'map' as const,
    link: '#/recursos',
    linkText: 'Ver todos los recursos',
  },
  {
    tag: 'Metodología',
    tagIcon: Lightbulb,
    tagColor: 'bg-amber-500/10 text-amber-600',
    title: 'Aprendizaje activo respaldado por ciencia cognitiva',
    description: 'Nuestra metodología está basada en las últimas investigaciones en neurociencia del aprendizaje, combinando repetición espaciada, práctica deliberada y feedback inmediato.',
    points: [
      'Repetición espaciada inteligente para máxima retención',
      'Práctica con problemas adaptativos según tu nivel',
      'Feedback inmediato con explicaciones paso a paso',
      'Gamificación que mantiene tu motivación al máximo',
    ],
    visual: 'method' as const,
    link: '#/matematicas',
    linkText: 'Practicar ahora',
  },
  {
    tag: 'Oportunidades',
    tagIcon: GraduationCap,
    tagColor: 'bg-emerald-500/10 text-emerald-600',
    title: 'Abre puertas a universidades y becas internacionales',
    description: 'Studymind no solo mejora tus notas, te prepara para competir a nivel global. Accede a programas de becas, intercambios y oportunidades laborales internacionales.',
    points: [
      'Preparación para exámenes internacionales (SAT, GRE, IELTS)',
      'Red de ex-alumnos en universidades de Europa y EEUU',
      'Asesoría personalizada para aplicar a becas',
      'Certificaciones reconocidas por empleadores globales',
    ],
    visual: 'opportunity' as const,
    link: '#/recursos',
    linkText: 'Ver becas disponibles',
  },
];

function BenefitVisual({ type }: { type: 'map' | 'method' | 'opportunity' }) {
  if (type === 'map') {
    return (
      <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative space-y-4 w-full max-w-xs">
          {[
            { city: 'Lima', students: '8,340' },
            { city: 'Cusco', students: '3,210' },
            { city: 'Arequipa', students: '4,150' },
            { city: 'Iquitos', students: '1,870' },
            { city: 'Trujillo', students: '2,960' },
          ].map((item, i) => (
            <motion.div
              key={item.city}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-white/60"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white text-xs">📍</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-surface-900">{item.city}</p>
                <p className="text-xs text-surface-500">{item.students}+ estudiantes</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'method') {
    return (
      <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 flex items-center justify-center overflow-hidden">
        <div className="relative space-y-3 w-full max-w-xs">
          {[
            { step: '1', label: 'Aprende', desc: 'Video + lectura interactiva', icon: '📚', progress: 100 },
            { step: '2', label: 'Practica', desc: 'Ejercicios adaptativos', icon: '✍️', progress: 75 },
            { step: '3', label: 'Repasa', desc: 'Repetición espaciada', icon: '🧠', progress: 50 },
            { step: '4', label: 'Domina', desc: 'Evaluación y certificación', icon: '🏆', progress: 25 },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-white/60"
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-surface-900">{item.label}</p>
                <p className="text-xs text-surface-500">{item.desc}</p>
              </div>
              <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 flex items-center justify-center overflow-hidden">
      <div className="relative space-y-3 w-full max-w-xs">
        {[
          { uni: 'MIT', country: '🇺🇸', scholarships: '3 becas disponibles' },
          { uni: 'Oxford', country: '🇬🇧', scholarships: '2 becas disponibles' },
          { uni: 'TU München', country: '🇩🇪', scholarships: '5 becas disponibles' },
          { uni: 'Sorbonne', country: '🇫🇷', scholarships: '4 becas disponibles' },
        ].map((item, i) => (
          <motion.div
            key={item.uni}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-white/60"
          >
            <span className="text-2xl">{item.country}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-surface-900">{item.uni}</p>
              <p className="text-xs text-emerald-600 font-medium">{item.scholarships}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BenefitBlock({
  block,
  index,
}: {
  block: typeof benefitBlocks[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16 ${
        index > 0 ? 'mt-20 md:mt-32' : ''
      }`}
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="flex-1"
      >
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${block.tagColor} text-sm font-semibold mb-5`}>
          <block.tagIcon className="w-4 h-4" />
          {block.tag}
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-surface-900 leading-tight">
          {block.title}
        </h3>
        <p className="mt-4 text-base md:text-lg text-surface-500 leading-relaxed">
          {block.description}
        </p>
        <ul className="mt-6 space-y-3">
          {block.points.map((point, pi) => (
            <motion.li
              key={pi}
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + pi * 0.08 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm md:text-base text-surface-600">{point}</span>
            </motion.li>
          ))}
        </ul>
        <motion.a
          href={block.link}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 mt-8 text-primary-600 font-semibold hover:text-primary-700 group transition-colors"
        >
          {block.linkText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex-1 w-full"
      >
        <BenefitVisual type={block.visual} />
      </motion.div>
    </div>
  );
}

export default function Benefits() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {benefitBlocks.map((block, index) => (
          <BenefitBlock key={block.tag} block={block} index={index} />
        ))}
      </div>
    </section>
  );
}
