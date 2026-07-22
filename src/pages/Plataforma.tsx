import { useState, useEffect } from 'react';
import {
  BookOpen, BarChart3, Sparkles, Calendar, Award,
  Menu, X, Settings, ChevronRight, LogOut, LibraryBig, Zap,
  Moon, Sun, FlaskConical, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadState, saveState, saveUser, type StoreState } from '../lib/store';
import Dashboard from './plataforma/Dashboard';
import MisCursos from './plataforma/MisCursos';
import CursoViewer from './plataforma/CursoViewer';
import AsistenteIA from './plataforma/AsistenteIA';
import Horario from './plataforma/Horario';
import Logros from './plataforma/Logros';
import BancoPreguntas from './plataforma/BancoPreguntas';
import TacticasCiencia from './plataforma/TacticasCiencia';
import CopilotoInvestigacion from './plataforma/CopilotoInvestigacion';

type View = 'dashboard' | 'cursos' | 'curso-detail' | 'asistente' | 'horario' | 'logros' | 'banco' | 'tacticas' | 'copiloto';

function getParam(key: string) {
  try {
    const hash = window.location.hash;
    const query = hash.includes('?') ? hash.split('?')[1] : '';
    return new URLSearchParams(query).get(key) || '';
  } catch { return ''; }
}

function loadDarkMode(): boolean {
  try { return localStorage.getItem('sm_darkmode') === '1'; } catch { return false; }
}
function saveDarkMode(v: boolean) {
  try { localStorage.setItem('sm_darkmode', v ? '1' : '0'); } catch {}
}

const NAV = [
  { id: 'dashboard' as View, label: 'Mi Progreso',             icon: BarChart3 },
  { id: 'cursos'    as View, label: 'Mis Cursos',               icon: BookOpen },
  { id: 'banco'     as View, label: 'Banco de Preguntas',       icon: LibraryBig },
  { id: 'tacticas'  as View, label: 'Tácticas de Ciencia',      icon: Zap },
  { id: 'copiloto'  as View, label: 'Copiloto IB',              icon: FlaskConical },
  { id: 'asistente' as View, label: 'Asistente IA',             icon: Sparkles },
  { id: 'horario'   as View, label: 'Horario',                  icon: Calendar },
  { id: 'logros'    as View, label: 'Logros',                   icon: Award },
];

export default function Plataforma() {
  const [view, setView]             = useState<View>('dashboard');
  const [activeCourse, setActiveCourse] = useState<string>('');
  const [state, setState]           = useState<StoreState>(loadState);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode]     = useState<boolean>(loadDarkMode);
  const [showSettings, setShowSettings] = useState(false);
  const [editName, setEditName]     = useState('');

  // Apply / remove dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    saveDarkMode(darkMode);
  }, [darkMode]);

  // Save user from URL params on first load
  useEffect(() => {
    const urlName  = getParam('name');
    const urlEmail = getParam('email');
    const current  = loadState();
    if (urlName && !current.user) {
      saveUser(urlName, urlEmail);
      setState(loadState());
    } else {
      setState(current);
    }
  }, []);

  const refreshState = () => setState(loadState());

  const navigate = (v: string, extra?: string) => {
    if (v === 'cursos' && extra) {
      setActiveCourse(extra);
      setView('curso-detail');
    } else {
      setView(v as View);
      if (v !== 'curso-detail') setActiveCourse('');
    }
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const firstName = (state.user?.name || 'Estudiante').split(' ')[0];
  const initials  = firstName.charAt(0).toUpperCase();

  const openSettings = () => {
    setEditName(state.user?.name || '');
    setShowSettings(true);
    setMobileOpen(false);
  };

  const saveSettings = () => {
    if (editName.trim()) {
      const s = loadState();
      if (s.user) {
        s.user.name = editName.trim();
        saveState(s);
        setState(loadState());
      } else {
        saveUser(editName.trim(), '');
        setState(loadState());
      }
    }
    setShowSettings(false);
  };

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full pt-6 pb-8 px-4`}>
      {/* Logo */}
      <a href="#" className="flex items-center gap-2.5 px-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          <span className="text-surface-900 dark:text-white">Study</span>
          <span className="text-gradient">mind</span>
        </span>
        {mobile && (
          <button onClick={() => setMobileOpen(false)} className="ml-auto p-1">
            <X className="w-5 h-5 text-surface-400" />
          </button>
        )}
      </a>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {NAV.map(({ id, label, icon: Icon }) => {
          const isActive = view === id || (id === 'cursos' && view === 'curso-detail');
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                  : 'text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800'
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {label}
              {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary-400" />}
            </button>
          );
        })}
      </nav>

      {/* User card + settings */}
      <div className="mt-auto space-y-2">
        <button
          onClick={() => { window.location.hash = '#'; }}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-all"
        >
          <LogOut className="w-4 h-4" /> Salir de la plataforma
        </button>
        <button
          onClick={openSettings}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0 text-left">
            <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{firstName}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">{state.xp} XP · {state.streak}🔥</p>
          </div>
          <Settings className="w-4 h-4 text-surface-400 dark:text-surface-500 group-hover:text-primary-500 transition-colors ml-auto flex-shrink-0" />
        </button>
      </div>
    </div>
  );

  // ── Views ──────────────────────────────────────────────────────────────────
  const renderView = () => {
    switch (view) {
      case 'dashboard':    return <Dashboard state={state} onNavigate={navigate} />;
      case 'cursos':       return <MisCursos state={state} onSelectCourse={(id) => navigate('cursos', id)} />;
      case 'curso-detail': return (
        <CursoViewer courseId={activeCourse} onBack={() => setView('cursos')} onStateChange={refreshState} />
      );
      case 'asistente':    return <AsistenteIA />;
      case 'horario':      return <Horario />;
      case 'logros':       return <Logros state={state} />;
      case 'banco':        return <BancoPreguntas />;
      case 'tacticas':     return <TacticasCiencia onStateChange={refreshState} />;
      case 'copiloto':     return <CopilotoInvestigacion />;
      default:             return <Dashboard state={state} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex transition-colors duration-300">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-surface-900 border-r border-surface-100 dark:border-surface-800 fixed top-0 left-0 h-full z-30 transition-colors duration-300">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-surface-900 shadow-2xl"
            >
              <Sidebar mobile />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 bg-white dark:bg-surface-900 border-b border-surface-100 dark:border-surface-800 sticky top-0 z-20 transition-colors duration-300">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800">
            <Menu className="w-5 h-5 text-surface-700 dark:text-surface-300" />
          </button>
          <span className="font-bold text-surface-900 dark:text-white">
            {NAV.find((n) => n.id === view || (n.id === 'cursos' && view === 'curso-detail'))?.label || 'Plataforma'}
          </span>
          <button onClick={openSettings} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
            {initials}
          </button>
        </div>

        <div className="px-4 md:px-8 py-8">
          {renderView()}
        </div>
      </div>

      {/* ── Settings modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-surface-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-surface-100 dark:border-surface-800"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-surface-900 dark:text-white text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary-600" /> Configuración
                </h3>
                <button onClick={() => setShowSettings(false)}>
                  <X className="w-5 h-5 text-surface-400 hover:text-surface-600 transition-colors" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Dark mode toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800">
                  <div className="flex items-center gap-3">
                    {darkMode
                      ? <Moon className="w-5 h-5 text-primary-400" />
                      : <Sun className="w-5 h-5 text-amber-500" />
                    }
                    <div>
                      <p className="font-semibold text-sm text-surface-900 dark:text-white">Modo oscuro</p>
                      <p className="text-xs text-surface-400 dark:text-surface-500">{darkMode ? 'Activado' : 'Desactivado'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                      darkMode ? 'bg-primary-500' : 'bg-surface-200 dark:bg-surface-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: darkMode ? 24 : 2 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>

                {/* Edit name */}
                <div>
                  <label className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2 flex items-center gap-2 block">
                    <User className="w-4 h-4" /> Nombre de perfil
                  </label>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveSettings()}
                    placeholder="Tu nombre"
                    className="w-full border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-800 dark:text-surface-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 placeholder:text-surface-400"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 text-center">
                    <p className="text-xl font-bold text-primary-700 dark:text-primary-300">{state.xp}</p>
                    <p className="text-xs text-primary-500 dark:text-primary-400">XP total</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 text-center">
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-300">{state.streak} 🔥</p>
                    <p className="text-xs text-amber-500 dark:text-amber-400">Racha de días</p>
                  </div>
                </div>

                <button onClick={saveSettings} className="btn-primary w-full justify-center text-sm !py-3.5">
                  <span className="flex items-center justify-center gap-2">Guardar cambios</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
