import { useRef } from 'react'
import Home from './pages/Home'
import Principles from './pages/Principles'
import Work from './pages/Work'
import PaperBalls from './components/PaperBalls'
import Navbar from './components/Navbar'

function App() {
  const repelRef = useRef(null);

  return (
    <div style={{ overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
      <PaperBalls onMount={fn => { repelRef.current = fn; }} />
      <Home onTextEnter={rect => repelRef.current?.(rect)} />
      <Principles />
      <Work />
    </div>
  )
}

export default App
