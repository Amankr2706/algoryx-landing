import { useCallback, useState } from 'react'
import useTheme from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Manifesto from './components/Manifesto'
import About from './components/About'
import Services from './components/Services'
import Counters from './components/Counters'
import Timeline from './components/Timeline'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

const USER_KEY = 'algoryx_user'

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export default function App() {
  const [dark, toggleTheme] = useTheme()
  const [authMode, setAuthMode] = useState(null)
  const [topic, setTopic] = useState('')
  const [user, setUser] = useState(readStoredUser)

  const closeAuth = useCallback(() => setAuthMode(null), [])

  const handleAuth = (nextUser) => {
    setUser(nextUser)
    setAuthMode(null)
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    } catch {
      // Storage blocked: the session just will not persist.
    }
  }

  const handleLogout = () => {
    setUser(null)
    try {
      localStorage.removeItem(USER_KEY)
    } catch {
      // Nothing to clean up if storage is blocked.
    }
  }

  return (
    <>
      <Navbar
        dark={dark}
        toggle={toggleTheme}
        user={user}
        openAuth={setAuthMode}
        logout={handleLogout}
      />

      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <About />
        <Services onInquire={setTopic} />
        <Counters />
        <Timeline />
        <Testimonials />
        <FAQ />
        <Contact topic={topic} />
      </main>

      <Footer openAuth={setAuthMode} />

      {authMode && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={closeAuth}
          onAuth={handleAuth}
        />
      )}
    </>
  )
}
