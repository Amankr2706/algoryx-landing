import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import LogoMark from './LogoMark'
import cx from '../lib/cx'

const links = [
  { label: 'About',    id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Impact',   id: 'impact' },
  { label: 'Process',  id: 'process' },
  { label: 'Voices',   id: 'testimonials' },
  { label: 'FAQ',      id: 'faq' },
  { label: 'Contact',  id: 'contact' },
]

const ghostButton = cx(
  'rounded-lg px-4 py-2 text-sm font-bold',
  'hover:bg-brand-ice dark:hover:bg-white/10'
)

const solidButton = cx(
  'rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white',
  'hover:bg-brand-deep'
)

export function Logo({ onDark = false }) {
  return (
    <a
      href="#home"
      aria-label="Algoryx home"
      className={cx(
        'flex items-center gap-2.5 font-display text-xl font-extrabold tracking-wide',
        onDark ? 'text-white' : 'text-ink dark:text-white'
      )}
    >
      <LogoMark
        compact
        onDark={onDark}
        className={cx(
          'h-8 w-8 overflow-visible',
          onDark ? 'text-brand-light' : 'text-brand dark:text-brand-light'
        )}
        whileHover={{ scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 200 }}
      />

      <span className="flex">
        {'ALGORYX'.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.06 }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </a>
  )
}

function AuthButtons({ user, onLogin, onSignup, onLogout }) {
  if (user) {
    return (
      <>
        <span className="hidden items-center gap-2 text-sm font-bold xl:flex">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
            {user.name[0].toUpperCase()}
          </span>
          {user.name}
        </span>
        <button onClick={onLogout} className={ghostButton}>
          Log out
        </button>
      </>
    )
  }

  return (
    <>
      <button onClick={onLogin} className={ghostButton}>
        Log in
      </button>
      <button onClick={onSignup} className={solidButton}>
        Sign up
      </button>
    </>
  )
}

export default function Navbar({ dark, toggle, user, openAuth, logout }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  //Highlight the link for the section in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const showAuth = (mode) => {
    setOpen(false)
    openAuth(mode)
  }

  const authButtons = (
    <AuthButtons
      user={user}
      onLogin={() => showAuth('login')}
      onSignup={() => showAuth('signup')}
      onLogout={logout}
    />
  )

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b border-brand/10',
        'bg-white/80 backdrop-blur dark:bg-[#0E0720]/80'
      )}
    >
      <motion.div
        style={{ scaleX }}
        className="absolute left-0 top-0 h-1 w-full origin-left bg-brand-light"
      />

      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
      >
        <Logo />

        <ul className="hidden gap-5 lg:flex">
          {links.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={cx(
                  'text-sm font-medium transition-colors',
                  'hover:text-brand dark:hover:text-brand-light',
                  active === id && 'text-brand dark:text-brand-light'
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full p-2 hover:bg-brand-ice dark:hover:bg-white/10"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="hidden items-center gap-1 lg:flex">{authButtons}</div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-full p-2 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 pb-4 lg:hidden"
        >
          <ul>
            {links.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-medium"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">{authButtons}</div>
        </motion.div>
      )}
    </motion.header>
  )
}
