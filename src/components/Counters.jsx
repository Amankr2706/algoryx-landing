import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import Section from './Section'
import cx from '../lib/cx'

const stats = [
  { value: 12, suffix: '', label: 'Stages in the 3D engine pipeline',      href: '#services' },
  { value: 4,  suffix: '', label: 'Levels of detail (LOD 0-3)',            href: '#services' },
  { value: 6,  suffix: '', label: 'Product and service areas',             href: '#services' },
  { value: 1,  suffix: '', label: 'Free custom 3D asset for new partners', href: '#contact' },
]

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return

    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })

    return () => controls.stop()
  }, [inView, to, suffix])

  return <span ref={ref}>0{suffix}</span>
}

// Large background text that slides sideways as the section scrolls past.
function Marquee() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['15%', '-55%'])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none"
    >
      <motion.p
        style={{ x }}
        className={
          'whitespace-nowrap font-display text-[8rem] font-extrabold uppercase '
          + 'leading-none text-brand/10 dark:text-white/5 md:text-[14rem]'
        }
      >
        Build · Innovate · Deliver · Impact · Build · Innovate
      </motion.p>
    </div>
  )
}

function Stat({ stat, index }) {
  const { value, suffix, label, href } = stat

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className={
        'group block rounded-2xl border border-brand/15 bg-white/80 p-6 shadow-sm '
        + 'backdrop-blur dark:border-white/10 dark:bg-white/5'
      }
    >
      <p
        className={cx(
          'font-display text-5xl font-extrabold md:text-6xl',
          'text-brand dark:text-brand-light'
        )}
      >
        <Counter to={value} suffix={suffix} />
      </p>
      <p className="mt-3 text-base font-medium group-hover:underline md:text-lg">{label}</p>
    </motion.a>
  )
}

export default function Counters() {
  return (
    <Section
      id="impact"
      eyebrow="03 · By the numbers"
      title="The platform in numbers."
      tint
      deco={<Marquee />}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Stat key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </Section>
  )
}
