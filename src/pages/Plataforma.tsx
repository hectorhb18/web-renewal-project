import { useState, useEffect } from 'react';
import { BookOpen, ChartBar as BarChart3, Sparkles, Calendar, Award, Menu, X, Settings, ChevronRight, LogOut, LibraryBig, Zap, FlaskConical, User, Wand as Wand2, Bell, Globe, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadState, saveUser, type StoreState } from '../lib/store';
import Dashboard from './plataforma/Dashboard';
import MisCursos from './plataforma/MisCursos';
import CursoViewer from './plataforma/CursoViewer';
import AsistenteIA from './plataforma/AsistenteIA';
import Horario from './plataforma/Horario';
import Logros from './plataforma/Logros';
import BancoPreguntas from './plataforma/BancoPreguntas';
import TacticasCiencia from './plataforma/TacticasCiencia';
import CopilotoInvestigacion from './plataforma/CopilotoInvestigacion';
import ExamenesInternacionales from './plataforma/ExamenesInternacionales';
import PlanEstudio from './plataforma/PlanEstudio';
import Perfil from './plataforma/Perfil';
import Configuracion from './plataforma/Configuracion';
import Notificaciones from './plataforma/Notificaciones';
import Carreras from './plataforma/Carreras';

type View =
  | 'dashboard' | 'cursos' | 'curso-detail' | 'plan' | 'asistente'
  | 'horario' | 'banco' | 'tacticas' | 'copiloto' | 'examenes' | 'logros'
  | 'carreras' | 'notif' | 'perfil' | 'config';

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

const NAV_MAIN: { id: View; label: string; icon: any }[] = [
  { id: 'dashboard', label: 'Mi Progreso',       icon: BarChart3 },
  { id: 'plan',      label: 'Plan Inteligente',  icon: Wand2 },
  { id: 'cursos',    label: 'Mis Cursos',        icon: BookOpen },
  { id: 'banco',     label: 'Banco de Preguntas', icon: LibraryBig },
  { id: 'tacticas',  label: 'Tácticas de Ciencia', icon: Zap },
  { id: 'copiloto',  label: 'Copiloto IB',       icon: FlaskConical },
  { id: 'examenes',  label: 'Exámenes Internacionales', icon: Globe },
  { id: 'carreras',  label: 'Carreras',          icon: Compass },
  { id: 'asistente', label: 'Asistente IA',      icon: Sparkles },
  { id: 'horario',   label: 'Horario',           icon: Calendar },
  { id: 'logros',    label: 'Logros',            icon: Award },
];

const NAV_SECONDARY: { id: View; label: string; icon: any }[] = [
  { id: 'notif',  label: 'Notificaciones', icon: Bell },
  { id: 'perfil', label: 'Mi Perfil',      icon: User },
  { id: 'config', label: 'Configuración',  icon: Settings },
];

const ALL_NAV = [...NAV_MAIN, ...NAV_SECONDARY];

export default function Plataforma() {
  const [view, setView]             = useState<View>('dashboard');
  const [activeCourse, setActiveCourse] = useState<string>('');
  const [state, setState]           = useState<StoreState>(loadState);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode]     = useState<boolean>(loadDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    saveDarkMode(darkMode);
  }, [darkMode]);

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
  const unreadCount = state.notifications.filter((n) => !n.read).length;
  const avatarNode = state.user?.avatar
    ? (state.user.avatar.length <= 4
        ? <span className="text-lg">{state.user.avatar}</span>
        : <img src={state.user.avatar} alt="avatar" className="w-full h-full object-cover" />)
    : initials;

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full pt-6 pb-8 px-4">
      <a href="#" className="flex items-center gap-2.5 px-2 mb-8">
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

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {NAV_MAIN.map(({ id, label, icon: Icon }) => {
          const isActive = view === id || (id === 'cursos' && view === 'curso-detail');
          return (
            <button key={id} onClick={() => navigate(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                  : 'text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800'
              }`}>
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {label}
              {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary-400" />}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-surface-100 dark:border-surface-800 space-y-1">
          {NAV_SECONDARY.map(({ id, label, icon: Icon }) => {
            const isActive = view === id;
            return (
              <button key={id} onClick={() => navigate(id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                    : 'text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 hover:bg-surface-50 dark:hover:bg-surface-800'
                }`}>
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                {label}
                {id === 'notif' && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mt-4 space-y-2">
        <button onClick={() => { window.location.hash = '#'; }}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-all">
          <LogOut className="w-4 h-4" /> Salir de la plataforma
        </button>
        <button onClick={() => navigate('perfil')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 transition-all group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden">
            {avatarNode}
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

  const renderView = () => {
    switch (view) {
      case 'dashboard':    return <Dashboard state={state} onNavigate={navigate} />;
      case 'cursos':       return <MisCursos state={state} onSelectCourse={(id) => navigate('cursos', id)} />;
      case 'curso-detail': return <CursoViewer courseId={activeCourse} onBack={() => setView('cursos')} onStateChange={refreshState} />;
      case 'plan':         return <PlanEstudio onStateChange={refreshState} />;
      case 'asistente':    return <AsistenteIA />;
      case 'horario':      return <Horario />;
      case 'logros':       return <Logros state={state} />;
      case 'banco':        return <BancoPreguntas />;
      case 'tacticas':     return <TacticasCiencia onStateChange={refreshState} />;
      case 'copiloto':     return <CopilotoInvestigacion />;
      case 'examenes':     return <ExamenesInternacionales state={state} onStateChange={refreshState} />;
      case 'carreras':     return <Carreras state={state} onStateChange={refreshState} />;
      case 'notif':        return <Notificaciones onStateChange={refreshState} />;
      case 'perfil':       return <Perfil onStateChange={refreshState} />;
      case 'config':       return <Configuracion darkMode={darkMode} onDarkModeChange={setDarkMode} onStateChange={refreshState} />;
      default:             return <Dashboard state={state} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex transition-colors duration-300">
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-surface-900 border-r border-surface-100 dark:border-surface-800 fixed top-0 left-0 h-full z-30 transition-colors duration-300">
        <Sidebar />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-surface-900 shadow-2xl">
              <Sidebar mobile />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-64">
        <div className="lg:hidden flex items-center justify-between px-4 py-4 bg-white dark:bg-surface-900 border-b border-surface-100 dark:border-surface-800 sticky top-0 z-20 transition-colors duration-300">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800">
            <Menu className="w-5 h-5 text-surface-700 dark:text-surface-300" />
          </button>
          <span className="font-bold text-surface-900 dark:text-white">
            {ALL_NAV.find((n) => n.id === view || (n.id === 'cursos' && view === 'curso-detail'))?.label || 'Plataforma'}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => navigate('notif')} className="relative p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800">
              <Bell className="w-5 h-5 text-surface-700 dark:text-surface-300" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
            </button>
            <button onClick={() => navigate('perfil')} className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
              {avatarNode}
            </button>
          </div>
        </div>

        <div className="px-4 md:px-8 py-8">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
