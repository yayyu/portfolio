import { useRef } from 'react'
import Home from './pages/Home'
import Work from './pages/Work'
import Principles from './pages/Principles'
import About from './pages/About'
import Contact from './pages/Contact'
import PaperBalls from './components/PaperBalls'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const repelRef = useRef(null);

  return (
    <div style={{ overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
      <PaperBalls onMount={fn => { repelRef.current = fn; }} />
      <Home onTextEnter={rect => repelRef.current?.(rect)} />
      <Work />
      <Principles />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
