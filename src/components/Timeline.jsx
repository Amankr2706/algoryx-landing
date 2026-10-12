import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from './Section'
import Terminal from './Terminal'
import cx from '../lib/cx'
import { SITE } from '../config/site'

const steps = [
  {
    title: 'Understand',
    text:  'We read the brief, the users and the constraints before touching code.',
  },
  {
    title: 'Design',
    text:  'Architecture and interface decisions, agreed with you on paper first.',
  },
  {
    title: 'Build',
    text:  'Weekly releases, tested code and a clean repository.',
  },
  {
    title: 'Deploy',
    text:  'Live URL, documentation and a handover your team can run.',
  },
]

export default function Timeline() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <Section
      id="process"
      eyebrow="04 · How we work"
      title="How a project moves from brief to live."
      tint
    >
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <div ref={ref} className="relative ml-3">
            <motion.div
              aria-hidden
              style={{ scaleY }}
              className={cx(
                'absolute left-0 top-0 z-[1] h-full w-0.5 origin-top',
                'bg-brand dark:bg-brand-light'
              )}
            />

            <ol className="relative border-l-2 border-brand/30 dark:border-brand-light/30">
              {steps.map(({ title, text }) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="mb-10 ml-8 last:mb-0"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={cx(
                      'absolute -left-[9px] z-[2] mt-1.5 h-4 w-4 rounded-full',
                      'border-4 border-brand-ice bg-brand',
                      'dark:border-[#170B36] dark:bg-brand-light'
                    )}
                  />
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-1 max-w-lg">{text}</p>
                </motion.li>
              ))}
            </ol>
          </div>

          <a
            href={SITE.startProject}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              'mt-10 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3',
              'font-bold text-white transition hover:bg-brand-deep'
            )}
          >
            Start a project <ArrowUpRight size={18} />
          </a>
        </div>

        <Terminal />
      </div>
    </Section>
  )
}
