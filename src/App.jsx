import Home from './pages/Home'
import Principles from './pages/Principles'
import PaperBalls from './components/PaperBalls'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'visible' }}>
        <PaperBalls />
        <Home />
        <Principles />
      </div>
    </>
  )
}

export default App
