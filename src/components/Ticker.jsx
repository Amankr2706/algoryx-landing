import cx from '../lib/cx'

const items = [
  'WebGL',
  'Three.js',
  'React',
  'Node.js',
  'SaaS platforms',
  'Open source',
  'Developer tools',
  '3D assets',
  'Security',
  'Cloud & DevOps',
]

export default function Ticker() {
  return (
    <div
      aria-label="Technologies we work with"
      className={cx(
        'group overflow-hidden border-y border-brand/15 bg-white py-4',
        'dark:border-white/10 dark:bg-transparent'
      )}
    >
      <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <a
            key={i}
            href="#services"
            className={cx(
              'flex items-center gap-10 whitespace-nowrap pr-10',
              'font-display text-xl font-bold text-ink/70 transition-colors',
              'hover:text-brand dark:text-white/70 dark:hover:text-brand-light'
            )}
          >
            {item}
            <span className="text-brand-light">✦</span>
          </a>
        ))}
      </div>
    </div>
  )
}
