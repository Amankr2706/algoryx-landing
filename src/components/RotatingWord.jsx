import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import cx from '../lib/cx'

const WORDS = [
  'developer tools',
  'SaaS platforms',
  '3D web experiences',
  'secure systems',
]

const INTERVAL_MS = 2600

export default function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <p
      className={cx(
        'flex flex-wrap items-center gap-x-3 font-display text-2xl font-bold',
        'text-ink dark:text-white md:text-3xl'
      )}
    >
      We engineer
      <span
        aria-live="polite"
        className="relative inline-flex h-11 items-center overflow-hidden md:h-12"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[index]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="shimmer whitespace-nowrap pb-1"
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  )
}
