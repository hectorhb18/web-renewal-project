import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, GraduationCap, Globe } from 'lucide-react';

const stats = [
  { icon: Users, value: '25,000+', label: 'Estudiantes activos' },
  { icon: Star, value: '4.9/5', label: 'Calificación promedio' },
  { icon: GraduationCap, value: '95%', label: 'Tasa de aprobación' },
  { icon: Globe, value: '12', label: 'Países con acceso' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Ambient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-[15%] w-72 h-72 md:w-96 md:h-96 bg-primary-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-[10%] w-64 h-64 md:w-80 md:h-80 bg-accent-400/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 shadow-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-surface-700">
              🇵🇪 Diseñado para estudiantes peruanos
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-primary-500" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
          >
            <span className="text-surface-900">Educación de </span>
            <span className="text-gradient-hero">clase mundial</span>
            <br />
            <span className="text-surface-900">al alcance de </span>
            <span className="text-gradient-hero">todo el Perú</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 md:mt-8 text-lg md:text-xl text-surface-600 max-w-3xl mx-auto leading-relaxed"
          >
            Studymind te brinda acceso a la misma calidad educativa que disfrutan los estudiantes en Europa. 
            Cursos personalizados con IA, tutores expertos y una plataforma que se adapta a tu ritmo 
            — <span className="text-primary-600 font-semibold">sin importar dónde estés en el Perú</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#/matematicas" className="btn-primary text-base md:text-lg !px-8 !py-4 w-full sm:w-auto">
              <span className="flex items-center justify-center gap-2">
                Practicar Matemáticas Gratis
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>
            <a href="#/recursos" className="btn-secondary text-base md:text-lg !px-8 !py-4 w-full sm:w-auto flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-primary-600 ml-0.5" />
              </div>
              Explorar Recursos
            </a>
          </motion.div>

          {/* Trust Signal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-sm text-surface-500"
          >
            ✨ Sin tarjeta de crédito · Cancela cuando quieras · 14 días gratis
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="glass-card rounded-2xl p-5 md:p-6 card-hover cursor-default"
              >
                <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-surface-900">{stat.value}</div>
                <div className="text-sm text-surface-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
