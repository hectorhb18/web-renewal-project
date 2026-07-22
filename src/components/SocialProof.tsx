import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const logos = [
  { name: 'Universidad de Lima', abbr: 'ULima' },
  { name: 'PUCP', abbr: 'PUCP' },
  { name: 'UNI', abbr: 'UNI' },
  { name: 'UNMSM', abbr: 'UNMSM' },
  { name: 'ESAN', abbr: 'ESAN' },
  { name: 'UP', abbr: 'UPacífico' },
  { name: 'USIL', abbr: 'USIL' },
  { name: 'UPC', abbr: 'UPC' },
];

export default function SocialProof() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-surface-400 mb-8">
            Estudiantes de las mejores universidades del Perú confían en Studymind
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-surface-50 hover:bg-primary-50 border border-surface-100 hover:border-primary-200 transition-all duration-300 cursor-default"
            >
              <span className="text-sm md:text-base font-bold text-surface-400 hover:text-primary-600 transition-colors tracking-wide">
                {logo.abbr}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-6 md:gap-8 flex-wrap"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                'bg-gradient-to-br from-primary-400 to-primary-600',
                'bg-gradient-to-br from-accent-400 to-accent-600',
                'bg-gradient-to-br from-emerald-400 to-emerald-600',
                'bg-gradient-to-br from-amber-400 to-amber-500',
              ].map((bg, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                  {['MR', 'AC', 'LG', 'JP'][i]}
                </div>
              ))}
            </div>
            <span className="text-sm text-surface-500">
              <span className="font-semibold text-surface-700">+2,847</span> se unieron este mes
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm font-semibold text-surface-700 ml-1">4.9</span>
            <span className="text-sm text-surface-500">(3,200+ reseñas)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
