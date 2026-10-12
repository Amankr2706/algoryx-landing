import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Particles from './Particles'
import LogoMark from './LogoMark'
import RotatingWord from './RotatingWord'
import cx from '../lib/cx'

const wordVariant = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const titleVariant = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
}

function Word({ children, className = '' }) {
  return (
    <motion.span variants={wordVariant} className={`mr-[0.25em] inline-block ${className}`}>
      {children}
    </motion.span>
  )
}

const primaryButton = cx(
  'rounded-lg bg-gradient-to-r from-brand to-blue-600 px-6 py-3',
  'font-bold text-white shadow-lg shadow-brand/30 transition hover:opacity-90'
)

const outlineButton = cx(
  'rounded-lg border border-brand px-6 py-3 font-bold text-brand transition',
  'hover:bg-brand-ice dark:border-brand-light dark:text-brand-light',
  'dark:hover:bg-white/10'
)

export default function Hero() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const hexY = useTransform(scrollYProgress, [0, 1], [0, -90])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <Particles />

      <motion.div
        style={{ y: glowY }}
        className={cx(
          'absolute -right-40 top-10 h-[34rem] w-[34rem]',
          'rounded-full bg-brand-light/25 blur-3xl'
        )}
      />

      <LogoMark
        style={{ y: hexY }}
        className={cx(
          'absolute -right-24 top-28 w-96 text-brand/40',
          'dark:text-brand-light/50 md:right-10 md:w-[30rem]'
        )}
      />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.15 }}
        className="relative mx-auto w-full max-w-6xl px-5"
      >
        <motion.p
          variants={wordVariant}
          className={cx(
            'mb-6 inline-flex items-center gap-2 rounded-full border border-brand/30',
            'px-4 py-1.5 text-sm font-bold text-brand',
            'dark:border-brand-light/40 dark:text-brand-light'
          )}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={cx(
                'absolute inline-flex h-full w-full animate-ping rounded-full',
                'bg-brand-light opacity-75'
              )}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
         Software Tech Company · Hyderabad
        </motion.p>

        <motion.h1
          variants={titleVariant}
          className="max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-7xl"
        >
          <Word>Build</Word>
          <Word className="shimmer">boldly.</Word>
          <Word>Ship</Word>
          <Word className="shimmer">cleanly.</Word>
        </motion.h1>

        <motion.div variants={wordVariant} className="mt-6">
          <RotatingWord />
        </motion.div>

        <motion.p variants={wordVariant} className="mt-4 max-w-xl text-lg">
          Algoryx Technologies is an independent Indian software company. We turn ideas into
          fast, accessible products, engineered for scale and simplicity.
        </motion.p>

        <motion.div variants={wordVariant} className="mt-9 flex flex-wrap gap-4">
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={primaryButton}
          >
            Current products
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={outlineButton}
          >
            Contact us
          </motion.a>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand dark:text-brand-light"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="block"
        >
          <ChevronDown size={28} />
        </motion.span>
      </a>
    </section>
  )
}
