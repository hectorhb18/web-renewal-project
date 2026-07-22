import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import MathPractice from './pages/MathPractice';
import Recursos from './pages/Recursos';
import Cursos from './pages/Cursos';
import Blog from './pages/Blog';
import About from './pages/About';
import Registro from './pages/Registro';
import Plataforma from './pages/Plataforma';
import Robot from './pages/Robot';

type Route = 'home' | 'matematicas' | 'recursos' | 'cursos' | 'blog' | 'about' | 'registro' | 'plataforma' | 'robot';

function getRoute(): Route {
  const hash = window.location.hash;
  if (hash.startsWith('#/matematicas')) return 'matematicas';
  if (hash.startsWith('#/recursos')) return 'recursos';
  if (hash.startsWith('#/cursos')) return 'cursos';
  if (hash.startsWith('#/blog')) return 'blog';
  if (hash.startsWith('#/about')) return 'about';
  if (hash.startsWith('#/registro')) return 'registro';
  if (hash.startsWith('#/plataforma')) return 'plataforma';
  if (hash.startsWith('#/robot')) return 'robot';
  return 'home';
}

// Routes that show their own full-page layout (no shared Navbar/Footer)
const STANDALONE_ROUTES: Route[] = ['registro', 'plataforma'];

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const handleHash = () => {
      const newRoute = getRoute();
      setRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const renderPage = () => {
    switch (route) {
      case 'matematicas': return <MathPractice />;
      case 'recursos':    return <Recursos />;
      case 'cursos':      return <Cursos />;
      case 'blog':        return <Blog />;
      case 'about':       return <About />;
      case 'registro':    return <Registro />;
      case 'plataforma':  return <Plataforma />;
      case 'robot':       return <Robot />;
      default:            return <Landing />;
    }
  };

  const isStandalone = STANDALONE_ROUTES.includes(route);

  if (isStandalone) {
    return <div className="min-h-screen bg-white">{renderPage()}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}
