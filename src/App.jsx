import { Characters } from './components/Characters.jsx'
import { Footer } from './components/Footer.jsx'
import './style.css'

export function App() {
  return (
    <>
      <main className='container'>
        <h1 className='title'>
          DragonBall<span>Z</span> APP
        </h1>
        <Characters />
      </main>
      <Footer />
    </>
  )
}
