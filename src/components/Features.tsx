import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Brain,
  Users,
  BookOpenCheck,
  Video,
  BarChart3,
  Clock,
  Zap,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'IA Personalizada',
    description: 'Nuestro motor de IA analiza tu estilo de aprendizaje y crea un plan de estudios único adaptado a tus fortalezas y áreas de mejora.',
    color: 'from-primary-500 to-primary-700',
    bgLight: 'bg-primary-50',
  },
  {
    icon: Users,
    title: 'Tutores Europeos',
    description: 'Conecta en tiempo real con profesores de universidades top de Europa. Clases 1-a-1 y grupales con expertos en cada materia.',
    color: 'from-accent-500 to-accent-600',
    bgLight: 'bg-sky-50',
  },
  {
    icon: BookOpenCheck,
    title: 'Contenido Premium',
    description: 'Miles de lecciones interactivas, ejercicios prácticos y materiales actualizados siguiendo los estándares educativos europeos.',
    color: 'from-emerald-500 to-emerald-600',
    bgLight: 'bg-emerald-50',
  },
  {
    icon: Video,
    title: 'Clases en Vivo',
    description: 'Sesiones en vivo todos los días con grabaciones disponibles 24/7. Nunca te pierdas una clase, repasa cuando necesites.',
    color: 'from-rose-500 to-rose-600',
    bgLight: 'bg-rose-50',
  },
  {
    icon: BarChart3,
    title: 'Analíticas Avanzadas',
    description: 'Dashboard detallado con tu progreso, predicción de notas, identificación de temas débiles y recomendaciones personalizadas.',
    color: 'from-violet-500 to-violet-600',
    bgLight: 'bg-violet-50',
  },
  {
    icon: Clock,
    title: 'Aprende a tu Ritmo',
    description: 'Sin horarios fijos. Estudia a cualquier hora desde cualquier dispositivo. El contenido se adapta a tu disponibilidad.',
    color: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-50',
  },
  {
    icon: Zap,
    title: 'Resultados Rápidos',
    description: 'El 89% de nuestros estudiantes mejora sus notas en las primeras 4 semanas. Metodología probada y eficiente.',
    color: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: 'Certificaciones',
    description: 'Obtén certificados reconocidos internacionalmente al completar cada módulo. Suma valor real a tu CV profesional.',
    color: 'from-teal-500 to-teal-600',
    bgLight: 'bg-teal-50',
  },
];

export default function Features() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="beneficios" ref={ref} className="py-20 md:py-32 bg-white relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            Funcionalidades Premium
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900">
            Todo lo que necesitas para{' '}
            <span className="text-gradient">una educación de primer nivel</span>
          </h2>
          <p className="mt-5 text-lg text-surface-500 leading-relaxed">
            Cada herramienta está diseñada para cerrar la brecha educativa y darte las mismas 
            oportunidades que los estudiantes en las mejores universidades del mundo.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="group relative p-6 md:p-7 rounded-2xl bg-white border border-surface-100 card-hover hover:border-primary-200 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgLight} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: `var(--tw-gradient-from)` }} />
              </div>
              <h3 className="text-lg font-bold text-surface-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-surface-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/40 group-hover:to-accent-50/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Action links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <a
            href="#/matematicas"
            className="btn-primary text-sm flex items-center gap-2"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Practicar Matemáticas
            </span>
          </a>
          <a
            href="#/cursos"
            className="btn-secondary text-sm flex items-center gap-2"
          >
            Ver Todos los Cursos
          </a>
          <a
            href="#/recursos"
            className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1.5 group transition-colors"
          >
            Explorar Recursos
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
