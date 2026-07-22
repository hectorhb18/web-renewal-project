import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Mail, Lock, User, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

const benefits = [
  'Acceso a +200 cursos universitarios',
  'IA que se adapta a tu nivel',
  'Tutores expertos disponibles 24/7',
  'Cancela cuando quieras',
];

export default function Registro() {
  const [step, setStep] = useState<'email' | 'name'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Ingresa un correo válido');
      return;
    }
    setEmailError('');
    setStep('name');
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    // Save to localStorage first, then go to platform
    import('../lib/store').then(({ saveUser }) => {
      saveUser(name.trim(), email.trim());
      setTimeout(() => {
        window.location.hash = '#/plataforma?name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email);
      }, 800);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50/30 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Benefits panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <a href="#" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-surface-900">Study</span>
              <span className="text-gradient">mind</span>
            </span>
          </a>

          <h2 className="text-4xl font-bold text-surface-900 mb-4 leading-tight">
            Empieza a estudiar<br />
            <span className="text-gradient">como los mejores</span>
          </h2>
          <p className="text-surface-500 text-lg mb-10">
            Únete a más de 45,000 estudiantes peruanos que ya mejoraron sus notas con Studymind.
          </p>

          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-surface-700 font-medium">{b}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 p-5 rounded-2xl bg-white border border-surface-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex-shrink-0" />
              <div>
                <p className="text-surface-700 text-sm italic mb-1">
                  "Gracias a Studymind pasé de desaprobar Cálculo a sacar 18. En 3 meses. Increíble."
                </p>
                <p className="text-surface-400 text-xs font-semibold">— Camila R., UNI Lima</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full"
        >
          <div className="bg-white rounded-3xl shadow-2xl shadow-primary-100/50 border border-surface-100 p-8 md:p-10">

            {/* Logo mobile */}
            <a href="#" className="flex items-center gap-2.5 mb-8 lg:hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-surface-900">Study</span>
                <span className="text-gradient">mind</span>
              </span>
            </a>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === 'email' || step === 'name' ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-400'}`}>1</div>
              <div className={`flex-1 h-0.5 rounded-full transition-all ${step === 'name' ? 'bg-primary-400' : 'bg-surface-100'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === 'name' ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-400'}`}>2</div>
              <div className="flex-1 h-0.5 rounded-full bg-surface-100" />
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-surface-100 text-surface-400">3</div>
            </div>

            {step === 'email' && (
              <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4">
                    <Sparkles className="w-3 h-3" /> 14 días gratis · Sin tarjeta
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-surface-900 mb-2">Crea tu cuenta gratis</h1>
                <p className="text-surface-500 mb-8">Empieza con tu correo electrónico</p>

                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                        placeholder="tucorreo@ejemplo.com"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-xl border text-surface-900 placeholder-surface-400 outline-none transition-all text-sm font-medium ${
                          emailError
                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-surface-200 bg-surface-50 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:bg-white'
                        }`}
                        autoFocus
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{emailError}</p>
                    )}
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center text-sm !py-3.5">
                    <span className="flex items-center justify-center gap-2">
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-surface-100 text-center">
                  <p className="text-surface-500 text-sm">
                    ¿Ya tienes cuenta?{' '}
                    <a href="#/pago" className="text-primary-600 font-semibold hover:underline">
                      Inicia sesión
                    </a>
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'name' && (
              <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-2xl font-bold text-surface-900 mb-2">¿Cómo te llamas?</h1>
                <p className="text-surface-500 mb-8">Registrando: <span className="text-primary-600 font-semibold">{email}</span></p>

                <form onSubmit={handleNameSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">
                      Tu nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Carlos Mendoza"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder-surface-400 outline-none transition-all text-sm font-medium focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:bg-white"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">
                      Crea una contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                      <input
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder-surface-400 outline-none transition-all text-sm font-medium focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !name.trim()}
                    className="btn-primary w-full justify-center text-sm !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                          Creando tu cuenta...
                        </>
                      ) : (
                        <>
                          Continuar
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="w-full text-center text-sm text-surface-400 hover:text-surface-600 transition-colors py-1"
                  >
                    ← Cambiar correo
                  </button>
                </form>
              </motion.div>
            )}

            {/* Trust badges */}
            <div className="mt-8 flex items-center justify-center gap-6 text-surface-400">
              <div className="flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Datos seguros
              </div>
              <div className="w-px h-4 bg-surface-200" />
              <div className="flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Sin spam
              </div>
              <div className="w-px h-4 bg-surface-200" />
              <div className="flex items-center gap-1.5 text-xs">
                <Lock className="w-3 h-3 text-emerald-500" />
                SSL 256-bit
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
