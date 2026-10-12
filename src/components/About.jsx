import { Target, Wrench } from 'lucide-react'
import Section, { Reveal } from './Section'
import cx from '../lib/cx'

const cards = [
  {
    Icon:  Target,
    title: 'Our mission',
    text:  'Build fast, accessible and reliable digital products: developer tools, '
         + 'SaaS platforms and interactive browser-based graphics using WebGL, '
         + 'Three.js and modern full-stack architecture.',
  },
  {
    Icon:  Wrench,
    title: 'Engineering culture',
    text:  'Clean code, rapid iteration, quick load times, semantic accessibility '
         + 'and modular systems. Every tool we release is held to the same standard.',
  },
]

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="01 · Who we are"
      title="We write code that scales."
      intro={
        'Software has gotten too complicated. We build clean, modular tools '
        + 'that let engineers get back to coding.'
      }
      tint
    >
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map(({ Icon, title, text }, i) => (
          <Reveal
            key={title}
            delay={i * 0.1}
            x={i ? 60 : -60}
            className={cx(
              'rounded-2xl border border-brand/20 bg-white p-7',
              'dark:border-white/10 dark:bg-white/5'
            )}
          >
            <Icon className="text-brand dark:text-brand-light" size={28} />
            <h3 className="mt-4 text-xl font-bold">{title}</h3>
            <p className="mt-2">{text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6 rounded-2xl bg-white/70 p-6 italic dark:bg-white/5">
        Our philosophy is simple: write fast code, document everything, and ship
        early. If it doesn't solve a real problem, we don't build it.
      </Reveal>
    </Section>
  )
}
