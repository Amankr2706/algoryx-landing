import { useEffect, useRef } from 'react'

const TWO_PI = Math.PI * 2
const MOUSE_RADIUS_SQ = 15000 // squared distance within which particles flee the cursor

const createParticle = (w, h) => ({
  x:  Math.random() * w,
  y:  Math.random() * h,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  r:  Math.random() * 2 + 0.8,
})

export default function Particles() {
  const ref = useRef(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = ref.current
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let frame = 0
    let particles = []
    let mouse = { x: -999, y: -999 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio || 1, 2)

      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round((width * height) / 13000)
      particles = Array.from({ length: count }, () => createParticle(width, height))
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const wrap = (p) => {
      if (p.x < 0) p.x = width
      if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      if (p.y > height) p.y = 0
    }

    const pushAwayFromMouse = (p) => {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const distSq = dx * dx + dy * dy
      if (distSq >= MOUSE_RADIUS_SQ) return

      const force = (1 - distSq / MOUSE_RADIUS_SQ) * 2
      const dist = Math.sqrt(distSq) + 1
      p.x += (dx / dist) * force
      p.y += (dy / dist) * force
    }

    const tick = () => {
      const isDark = document.documentElement.classList.contains('dark')

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = isDark ? 'rgba(190, 150, 255, 0.7)' : 'rgba(109, 31, 242, 0.45)'

      for (const p of particles) {
        pushAwayFromMouse(p)
        p.x += p.vx
        p.y += p.vy
        wrap(p)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, TWO_PI)
        ctx.fill()
      }

      frame = requestAnimationFrame(tick)
    }

    resize()
    tick()
    addEventListener('resize', resize)
    addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('resize', resize)
      removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
