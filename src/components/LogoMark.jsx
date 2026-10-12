import { motion } from 'framer-motion'

// Corner points of a hexagon with radius `r`, centred in a 200x200 box.
const hexPoints = (r) =>
  Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`
  }).join(' ')

const VARIANTS = {
  full: {
    viewBox:    '0 0 200 200',
    rings:      [90, 64, 38],
    ringStroke: 1.5,
    markStroke: 5,
  },
  compact: {
    viewBox:    '34 34 132 132',
    rings:      [60],
    ringStroke: 5,
    markStroke: 10,
  },
}

const A_PATH = 'M72 128 100 70 128 128M83 108h34'
const X_PATH = 'M78 82 122 124M122 82 78 124'

// The animated Algoryx mark: rotating hexagon rings with a drawn "A" and "X".
// The ring colour comes from the caller's `text-*` class; the mark colour from `onDark`.
export default function LogoMark({
  compact = false,
  onDark = false,
  className = '',
  style,
  ...rest
}) {
  const { viewBox, rings, ringStroke, markStroke } = VARIANTS[compact ? 'compact' : 'full']
  const markColor = onDark ? 'text-brand-light' : 'text-brand dark:text-brand-light'

  return (
    <motion.svg
      viewBox={viewBox}
      aria-hidden
      className={className}
      style={style}
      {...rest}
    >
      {rings.map((r, i) => (
        <motion.polygon
          key={r}
          points={hexPoints(r)}
          fill="none"
          stroke="currentColor"
          strokeWidth={ringStroke}
          strokeLinejoin="round"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: 50 + i * 25, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={markStroke}
        className={`animate-glow ${markColor}`}
      >
        <motion.path
          d={A_PATH}
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.8 }}
        />
        <motion.path
          d={X_PATH}
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 1.7 }}
        />
      </g>
    </motion.svg>
  )
}
