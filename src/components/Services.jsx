import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Box, ShieldCheck, Layers, Terminal, Globe, BarChart3, ArrowRight } from 'lucide-react'
import Section from './Section'
import cx from '../lib/cx'

const items = [
  {
    Icon:    Box,
    title:   '3D Engine',
    summary: 'A 12-stage WebGL and 3D asset optimization pipeline.',
    details: 'Draco compression, LOD 0-3 mesh generation, WebP posters and '
           + 'multi-profile optimization.',
  },
  {
    Icon:    ShieldCheck,
    title:   'Breakpoint',
    summary: 'Security analysis built for speed.',
    details: 'Scans dependencies, flags vulnerabilities and protects your network.',
  },
  {
    Icon:    Layers,
    title:   'UI Integrations',
    summary: 'Plug into the frameworks you already use.',
    details: 'Works with current frontend frameworks, design systems and '
           + 'component libraries.',
  },
  {
    Icon:    Terminal,
    title:   'Developer Tools',
    summary: 'CLI tools and browser extensions.',
    details: 'Built to speed up your local workflow and save you time every day.',
  },
  {
    Icon:    Globe,
    title:   'Web & Mobile Development',
    summary: 'Fast, accessible apps for every screen.',
    details: 'Full-stack SaaS platforms and browser-based 3D applications.',
  },
  {
    Icon:    BarChart3,
    title:   'Data & Cloud',
    summary: 'Pipelines and infrastructure that scale.',
    details: 'Data engineering, analytics, cloud solutions and DevOps.',
  },
]

const SPRING = { stiffness: 200, damping: 20 }

function Card({ index, item, isOpen, onToggle, onInquire }) {
  const { Icon, title, summary, details } = item

  // Pointer position inside the card (-0.5 to 0.5) drives the 3D tilt.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [9, -9]), SPRING)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), SPRING)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.12, duration: 0.6 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -6 }}
      className={cx(
        'relative rounded-2xl border p-6 transition-colors',
        isOpen
          ? 'border-brand bg-brand text-white'
          : 'border-brand/20 bg-brand-ice dark:border-white/10 dark:bg-white/5'
      )}
    >
      <motion.div
        animate={isOpen ? { rotate: [0, -12, 12, 0], scale: 1.15 } : { rotate: 0, scale: 1 }}
        className="w-fit"
      >
        <Icon size={30} className={isOpen ? 'text-white' : 'text-brand dark:text-brand-light'} />
      </motion.div>

      <h3 className={cx('mt-4 text-xl font-bold', isOpen && '!text-white')}>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="text-left after:absolute after:inset-0 after:rounded-2xl"
        >
          {title}
        </button>
      </h3>

      <p className="mt-2">{summary}</p>
      <span className="mt-3 inline-block text-sm font-bold">
        {isOpen ? 'Show less' : 'Show details'}
      </span>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 border-t border-white/30 pt-3 text-sm"
        >
          <p>{details}</p>
          <a
            href="#contact"
            onClick={() => onInquire(title)}
            className={cx(
              'relative z-10 mt-3 inline-flex items-center gap-1 rounded-lg',
              'bg-white px-3 py-1.5 font-bold text-brand hover:bg-brand-ice'
            )}
          >
            Ask about this <ArrowRight size={14} />
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Services({ onInquire }) {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <Section
      id="services"
      eyebrow="02 · What we build"
      title="Products and services from one software lab."
      intro="Select a card to see what we deliver."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Card
            key={item.title}
            index={i}
            item={item}
            isOpen={activeIndex === i}
            onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
            onInquire={onInquire}
          />
        ))}
      </div>
    </Section>
  )
}
