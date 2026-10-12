import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import cx from '../lib/cx'
import { SITE } from '../config/site'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EMPTY_FORM = { name: '', email: '', password: '', confirm: '' }

const inputClass = cx(
  'mt-1 w-full rounded-lg border border-brand/25 bg-white px-4 py-2.5',
  'dark:border-white/20 dark:bg-white/5'
)

const linkButton = 'font-bold text-brand hover:underline dark:text-brand-light'

function getFields(signup) {
  return [
    ...(signup ? [{ key: 'name', label: 'Name', type: 'text' }] : []),
    { key: 'email',    label: 'Email',    type: 'email' },
    { key: 'password', label: 'Password', type: 'password' },
    ...(signup ? [{ key: 'confirm', label: 'Confirm password', type: 'password' }] : []),
  ]
}

function getAutoComplete(key, signup) {
  if (key === 'email') return 'email'
  if (key === 'password') return signup ? 'new-password' : 'current-password'
  return 'off'
}

function validate(values, signup) {
  const errors = {}

  if (signup && values.name.trim().length < 2) {
    errors.name = 'Enter your name.'
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Enter a valid email, like name@company.com.'
  }
  if (values.password.length < 8) {
    errors.password = 'Use at least 8 characters.'
  }
  if (signup && values.confirm !== values.password) {
    errors.confirm = 'Passwords do not match.'
  }

  return errors
}

export default function AuthModal({ mode, setMode, onClose, onAuth }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const signup = mode === 'signup'

  // Close on Escape and lock page scrolling while the modal is open.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleChange = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value })
    setErrors({ ...errors, [key]: undefined })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate(values, signup)
    setErrors(found)

    if (Object.keys(found).length > 0) return

    onAuth({
      name:  signup ? values.name.trim() : values.email.split('@')[0],
      email: values.email,
    })
  }

  return (
    <div
      onClick={onClose}
      className={cx(
        'fixed inset-0 z-[60] flex items-center justify-center',
        'bg-black/50 p-4 backdrop-blur-sm'
      )}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={signup ? 'Sign up' : 'Log in'}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cx(
          'relative max-h-full w-full max-w-md overflow-y-auto rounded-2xl',
          'bg-white p-7 shadow-2xl dark:bg-[#170B36]'
        )}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className={cx(
            'absolute right-4 top-4 rounded-full p-2',
            'hover:bg-brand-ice dark:hover:bg-white/10'
          )}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-extrabold">
          {signup ? 'Create your account' : 'Log in to Algoryx'}
        </h2>
        <p className="mt-1 text-sm">
          {signup
            ? 'Join to follow new products and updates.'
            : 'Welcome back. Access your workspace.'}
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          {getFields(signup).map(({ key, label, type }) => (
            <label key={key} className="block text-sm font-medium">
              {label}
              <input
                type={type}
                value={values[key]}
                onChange={handleChange(key)}
                autoComplete={getAutoComplete(key, signup)}
                aria-invalid={!!errors[key]}
                className={inputClass}
              />
              {errors[key] && (
                <span
                  role="alert"
                  className="mt-1 block text-xs text-red-600 dark:text-red-400"
                >
                  {errors[key]}
                </span>
              )}
            </label>
          ))}

          <button
            className={cx(
              'w-full rounded-lg bg-gradient-to-r from-brand to-blue-600 py-3',
              'font-bold text-white hover:opacity-90'
            )}
          >
            {signup ? 'Sign up' : 'Log in'}
          </button>
        </form>

        <a
          href={SITE.login}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(linkButton, 'mt-4 flex items-center justify-center gap-1 text-sm')}
        >
          Use the official Algoryx login <ExternalLink size={14} />
        </a>

        <p className="mt-4 text-center text-sm">
          {signup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setMode(signup ? 'login' : 'signup')} className={linkButton}>
            {signup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
