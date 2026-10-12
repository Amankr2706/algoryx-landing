import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import cx from '../lib/cx'

const STATEMENT =
  'Software should ship fast, read clean and scale quietly. '
  + 'We build the tools that make that the default.'

const WORDS = STATEMENT.split(' ')

// Each word fades from dim to bright as the reader scrolls past it.
function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])

  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative overflow-hidden border-y border-white/10 bg-[#0B0B12] py-24 md:py-32"
    >
      <div className="dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5">
        <p
          className={cx(
            'mb-6 flex items-center gap-3 font-display text-sm font-bold uppercase',
            'tracking-[0.2em] text-brand-light'
          )}
        >
          <span className="h-px w-8 bg-current" />
          Our manifesto
        </p>

        <p
          className={cx(
            'max-w-4xl font-display text-3xl font-extrabold leading-tight',
            'text-white md:text-5xl'
          )}
        >
          {WORDS.map((word, i) => {
            const start = i / WORDS.length
            const end = start + 1.5 / WORDS.length

            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start, Math.min(end, 1)]}
              />
            )
          })}
        </p>
      </div>
    </section>
  )
}
