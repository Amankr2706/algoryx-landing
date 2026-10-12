import { motion } from 'framer-motion'
import cx from '../lib/cx'

export function Reveal({ children, delay = 0, x = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: x ? 0 : 28, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

function Words({ text }) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    </span>
  ))
}

const DEFAULT_PAD = 'py-16 md:py-20'

export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tint,
  deco,
  pad = DEFAULT_PAD,
}) {
  return (
    <section
      id={id}
      className={cx(
        'relative overflow-hidden',
        pad,
        tint && 'bg-brand-ice dark:bg-[#170B36]'
      )}
    >
      {deco}
      <div className="relative mx-auto max-w-6xl px-5">
        {eyebrow && (
          <Reveal>
            <p
              className={cx(
                'mb-4 flex items-center gap-3 font-display text-sm font-bold uppercase',
                'tracking-[0.2em] text-brand dark:text-brand-light'
              )}
            >
              <span className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
          </Reveal>
        )}
        <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl">
          <Words text={title} />
        </h2>
        {intro && (
          <Reveal delay={0.3}>
            <p className="mt-4 max-w-xl text-lg md:text-xl">{intro}</p>
          </Reveal>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
