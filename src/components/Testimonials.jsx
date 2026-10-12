import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Section from './Section'
import cx from '../lib/cx'

const quotes = [
  {
    text:   'Our dashboard went from slow spreadsheets to a live product in weeks.',
    author: 'Operations lead, logistics firm',
  },
  {
    text:   'The handover docs were so clear that our team shipped the next feature alone.',
    author: 'CTO, fintech startup',
  },
  {
    text:   'Security fixes landed before our audit, not after it.',
    author: 'Head of IT, retail group',
  },
]

const AUTO_ADVANCE_MS = 7000

// Tight bottom padding: the FAQ section right below has its own top padding.
const SECTION_PAD = 'pt-16 pb-6 md:pt-20 md:pb-8'

const arrowButton = cx(
  'rounded-full border border-brand/30 p-2',
  'hover:bg-brand-ice dark:hover:bg-white/10'
)

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  const go = (step) => setIndex((i) => (i + step + quotes.length) % quotes.length)

  // Restarts whenever the slide changes, so manual clicks reset the timer.
  useEffect(() => {
    const timer = setInterval(() => go(1), AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [index])

  const current = quotes[index]

  return (
    <Section
      id="testimonials"
      eyebrow="05 · Client voices"
      title="What clients say after launch."
      pad={SECTION_PAD}
    >
      <div className="max-w-2xl">
        <div className="min-h-[9rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote
                className={cx(
                  'font-display text-2xl font-bold md:text-3xl',
                  'text-ink dark:text-white'
                )}
              >
                {current.text}
              </blockquote>
              <figcaption className="mt-4">{current.author}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className={arrowButton}>
            <ChevronLeft />
          </button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className={arrowButton}>
            <ChevronRight />
          </button>

          <div className="ml-3 flex items-center gap-2">
            {quotes.map((_, dot) => (
              <button
                key={dot}
                onClick={() => setIndex(dot)}
                aria-label={`Show testimonial ${dot + 1}`}
                className={cx(
                  'h-2.5 rounded-full transition-all',
                  dot === index ? 'w-6 bg-brand' : 'w-2.5 bg-brand/30'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
