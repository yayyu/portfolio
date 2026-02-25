import Home from './pages/Home'
import Principles from './pages/Principles'
import PaperBalls from './components/PaperBalls'
import Navbar from './components/Navbar'

function App() {
  return (
    <div style={{ overflowX: 'hidden', position: 'relative' }}>
      <Navbar />
      <PaperBalls />
      <Home />
      <Principles />
    </div>
  )
}

export default App
