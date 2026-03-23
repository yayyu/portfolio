import { useRef, useState, useEffect } from 'react'
import Home from './pages/Home'
import Work from './pages/Work'
import Principles from './pages/Principles'
import About from './pages/About'
import Contact from './pages/Contact'
import Deserto from './pages/Deserto'
import PaperBalls from './components/PaperBalls'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const repelRef = useRef(null);
  const [page, setPage] = useState(() =>
    window.location.pathname === '/deserto' ? 'deserto' : 'home'
  );

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setPage(path === '/deserto' ? 'deserto' : 'home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePop = () => {
      setPage(window.location.pathname === '/deserto' ? 'deserto' : 'home');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  if (page === 'deserto') {
    return (
      <div style={{ overflowX: 'hidden', position: 'relative' }}>
        <Navbar />
        <div style={{ paddingTop: 80 }}>
          <Deserto onBack={() => navigate('/')} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
      <PaperBalls onMount={fn => { repelRef.current = fn; }} />
      <Home onTextEnter={rect => repelRef.current?.(rect)} />
      <Work onNavigate={navigate} />
      <Principles />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
