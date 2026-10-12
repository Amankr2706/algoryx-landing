import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import cx from '../lib/cx'

const LINES = [
  { tone: 'cmd', text: '$ algoryx init your-project' },
  { tone: 'ok',  text: '✓ brief, users and constraints understood' },
  { tone: 'ok',  text: '✓ architecture agreed on paper' },
  { tone: 'ok',  text: '✓ weekly releases, tests passing' },
  { tone: 'ok',  text: '✓ deployed: docs and handover ready' },
  { tone: 'cmd', text: '$ project shipped' },
]

const TONE_CLASS = {
  cmd: 'text-brand-light',
  ok:  'text-emerald-400',
}

const CURSOR_CLASS = [
  'ml-0.5 inline-block h-4 w-2 translate-y-0.5',
  'animate-pulse bg-brand-light',
].join(' ')

const TOTAL_CHARS = LINES.reduce((sum, line) => sum + line.text.length, 0)
const TYPE_MS = 28
const PAUSE_TICKS = 120 // how long the finished log stays before it replays

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Splits the typed character count across the lines, top to bottom.
function visibleText(typed) {
  let remaining = typed

  return LINES.map((line) => {
    const shown = Math.max(0, Math.min(line.text.length, remaining))
    remaining -= line.text.length
    return { ...line, text: line.text.slice(0, shown), started: shown > 0 }
  })
}

export default function Terminal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (prefersReducedMotion()) {
      setTyped(TOTAL_CHARS)
      return
    }

    const timer = setInterval(() => {
      setTyped((t) => (t >= TOTAL_CHARS + PAUSE_TICKS ? 0 : t + 1))
    }, TYPE_MS)

    return () => clearInterval(timer)
  }, [inView])

  const lines = visibleText(typed)
  const lastStarted = lines.filter((l) => l.started).length - 1

  return (
    <div
      ref={ref}
      aria-label="Example of a project shipping with Algoryx"
      className={cx(
        'overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B12]',
        'shadow-2xl shadow-brand/20'
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-slate-400">ship.log</span>
      </div>

      <pre className="min-h-[15rem] overflow-x-auto p-5 font-mono text-sm leading-7">
        {lines.map((line, i) => (
          <div key={i} className={cx('min-h-[1.75rem]', TONE_CLASS[line.tone])}>
            {line.text}
            {i === lastStarted && (
              <span className={CURSOR_CLASS} />
            )}
          </div>
        ))}
      </pre>
    </div>
  )
}
