import { BookOpen, Heart, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Plataforma: [
    { label: 'Cursos', href: '#/cursos' },
    { label: 'Matemáticas', href: '#/matematicas' },
    { label: 'Recursos', href: '#/recursos' },
    { label: 'Precios', href: '#precios' },
    { label: 'Blog', href: '#/blog' },
  ],
  'Recursos Externos': [
    { label: 'Khan Academy', href: 'https://es.khanacademy.org/', external: true },
    { label: 'MIT OpenCourseWare', href: 'https://ocw.mit.edu/', external: true },
    { label: 'Wolfram Alpha', href: 'https://www.wolframalpha.com/', external: true },
    { label: 'GeoGebra', href: 'https://www.geogebra.org/', external: true },
    { label: 'PRONABEC', href: 'https://www.pronabec.gob.pe/', external: true },
  ],
  Empresa: [
    { label: 'Sobre Nosotros', href: '#/about' },
    { label: 'Equipo', href: '#/about' },
    { label: 'Carreras', href: '#/about', badge: '🔥 Hiring' },
    { label: 'Contacto', href: 'mailto:hola@studymind.pe', external: true },
    { label: 'Prensa', href: '#/about' },
  ],
  'Becas y Oportunidades': [
    { label: 'PRONABEC Perú', href: 'https://www.pronabec.gob.pe/', external: true },
    { label: 'DAAD Alemania', href: 'https://www.daad.de/es/', external: true },
    { label: 'Chevening UK', href: 'https://www.chevening.org/', external: true },
    { label: 'Fulbright Perú', href: 'https://www.fulbright.pe/', external: true },
  ],
};

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
  { label: 'Instagram', href: 'https://instagram.com', icon: '📸' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
  { label: 'YouTube', href: 'https://youtube.com', icon: '▶️' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: '🎵' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-950 text-white relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick nav */}
        <div className="py-8 border-b border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: '🏠 Inicio', href: '#' },
              { label: '📚 Cursos', href: '#/cursos' },
              { label: '🧮 Matemáticas', href: '#/matematicas' },
              { label: '📖 Recursos', href: '#/recursos' },
              { label: '✍️ Blog', href: '#/blog' },
              { label: 'ℹ️ Nosotros', href: '#/about' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-surface-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-16 md:py-20 grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-6">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Study<span className="text-primary-400">mind</span>
              </span>
            </a>
            <p className="text-sm text-surface-400 leading-relaxed max-w-xs mb-6">
              Democratizando la educación de clase mundial para cada estudiante peruano, 
              sin importar su ubicación o recursos.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center text-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-surface-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      {link.label}
                      {'badge' in link && link.badge && (
                        <span className="text-[10px] font-bold bg-primary-500/20 text-primary-300 px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                      {'external' in link && link.external && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-500">
            © {new Date().getFullYear()} Studymind. Todos los derechos reservados. Hecho con{' '}
            <Heart className="w-3 h-3 inline text-red-400 fill-red-400" /> en Perú 🇵🇪
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-surface-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Todos los sistemas operativos
            </span>
            <span className="text-xs text-surface-600">|</span>
            <span className="text-xs text-surface-500">🇵🇪 Lima, Perú</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
