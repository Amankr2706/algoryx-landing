import { useEffect, useState } from 'react'
import { ArrowUp, ExternalLink } from 'lucide-react'
import { Logo } from './Navbar'
import cx from '../lib/cx'
import { SITE } from '../config/site'

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'About',    href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Impact',   href: '#impact' },
      { label: 'Process',  href: '#process' },
      { label: 'FAQ',      href: '#faq' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Contact us',       href: '#contact' },
      { label: 'Official website', href: SITE.website,   external: true },
      { label: 'Dashboard',        href: SITE.dashboard, external: true },
      { label: 'Email support',    href: `mailto:${SITE.email}` },
    ],
  },
]

const linkClass = 'text-slate-300 hover:text-white hover:underline'

const backToTopClass = cx(
  'fixed bottom-6 right-6 z-40 rounded-full bg-brand p-3 text-white',
  'shadow-lg hover:bg-brand-deep'
)

function FooterLink({ label, href, external }) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a href={href} {...externalProps} className={cx(linkClass, 'inline-flex items-center gap-1')}>
      {label}
      {external && <ExternalLink size={12} />}
    </a>
  )
}

export default function Footer({ openAuth }) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="bg-[#07030F] text-sm text-slate-300">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
          <div>
            <Logo onDark />
            <p className="mt-4">
              An independent software company building developer tools, SaaS
              platforms and WebGL experiences.
            </p>
            <p className="mt-3">{SITE.hours}</p>
          </div>

          {columns.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="mb-3 font-bold !text-white">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-3 font-bold !text-white">Account</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => openAuth('login')} className={linkClass}>
                  Log in
                </button>
              </li>
              <li>
                <button onClick={() => openAuth('signup')} className={linkClass}>
                  Sign up
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center">
          © 2026 Algoryx Technologies
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className={backToTopClass}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  )
}
