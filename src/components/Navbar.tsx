import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Sparkles, Calculator, Library, Newspaper, Info, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    label: 'Plataforma',
    href: '#beneficios',
    isAnchor: true,
    children: [
      { label: 'Beneficios', href: '#beneficios', isAnchor: true },
      { label: 'Plataforma', href: '#plataforma', isAnchor: true },
      { label: 'Testimonios', href: '#testimonios', isAnchor: true },
      { label: 'Precios', href: '#precios', isAnchor: true },
      { label: 'FAQ', href: '#faq', isAnchor: true },
    ],
  },
  { label: 'Cursos', href: '#/cursos', icon: Library },
  { label: 'Matemáticas', href: '#/matematicas', icon: Calculator },
  { label: 'Recursos', href: '#/recursos', icon: Library },
  { label: 'Blog', href: '#/blog', icon: Newspaper },
  { label: 'Nosotros', href: '#/about', icon: Info },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-black/[0.03]'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" onClick={handleNavClick} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow duration-300">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-surface-900">Study</span>
                <span className="text-gradient">mind</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                if ('children' in link && link.children) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button className="px-3 py-2 text-sm font-medium text-surface-600 hover:text-primary-600 rounded-lg hover:bg-primary-50/60 transition-all duration-300 flex items-center gap-1">
                        {link.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-surface-100 py-2 min-w-[180px] z-50"
                          >
                            {link.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={handleNavClick}
                                className="block px-4 py-2.5 text-sm text-surface-600 hover:text-primary-600 hover:bg-primary-50/60 transition-all"
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleNavClick}
                    className="px-3 py-2 text-sm font-medium text-surface-600 hover:text-primary-600 rounded-lg hover:bg-primary-50/60 transition-all duration-300"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#/registro"
                className="text-sm font-medium text-surface-600 hover:text-primary-600 transition-colors px-4 py-2"
              >
                Iniciar Sesión
              </a>
              <a
                href="#/matematicas"
                className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Practicar Gratis
                </span>
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-surface-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-20">
                {/* Main page links */}
                <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-3 px-4">Páginas</p>
                <div className="space-y-0.5 mb-6">
                  {[
                    { label: '🏠 Inicio', href: '#' },
                    { label: '📚 Cursos', href: '#/cursos' },
                    { label: '🧮 Matemáticas', href: '#/matematicas' },
                    { label: '📖 Recursos', href: '#/recursos' },
                    { label: '✍️ Blog', href: '#/blog' },
                    { label: 'ℹ️ Nosotros', href: '#/about' },
                  ].map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      onClick={handleNavClick}
                      className="block px-4 py-3 text-base font-medium text-surface-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                {/* Section links */}
                <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-3 px-4">Secciones</p>
                <div className="space-y-0.5 mb-8">
                  {[
                    { label: 'Beneficios', href: '#beneficios' },
                    { label: 'Plataforma', href: '#plataforma' },
                    { label: 'Testimonios', href: '#testimonios' },
                    { label: 'Precios', href: '#precios' },
                    { label: 'FAQ', href: '#faq' },
                  ].map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      onClick={handleNavClick}
                      className="block px-4 py-2.5 text-sm text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div className="space-y-3">
                  <a
                    href="#/matematicas"
                    onClick={handleNavClick}
                    className="btn-primary block text-center text-base"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Practicar Matemáticas
                    </span>
                  </a>
                  <a
                    href="#/registro"
                    onClick={handleNavClick}
                    className="btn-secondary block text-center text-base"
                  >
                    Iniciar Sesión
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
