import Home from './pages/Home'
import Principles from './pages/Principles'
import Work from './pages/Work'
import PaperBalls from './components/PaperBalls'
import Navbar from './components/Navbar'

function App() {
  return (
    <div style={{ overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
      <PaperBalls />
      <Home />
      <Principles />
      <Work />
    </div>
  )
}

export default App
