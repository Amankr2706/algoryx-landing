import { useEffect, useState } from 'react'
import { CheckCircle2, Mail, Clock, MapPin } from 'lucide-react'
import Section from './Section'
import cx from '../lib/cx'
import { SITE } from '../config/site'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EMPTY_FORM = { name: '', email: '', message: '' }

const textFields = [
  { key: 'name',  label: 'Name',  type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
]

const info = [
  { Icon: Mail,   label: 'Email',    text: SITE.email, href: `mailto:${SITE.email}` },
  { Icon: Clock,  label: 'Hours',    text: SITE.hours },
  { Icon: MapPin, label: 'Location', text: SITE.location },
]

const inputClass = cx(
  'mt-1 w-full rounded-lg border border-brand/25 bg-white px-4 py-3',
  'dark:border-white/20 dark:bg-white/5'
)

const errorClass = 'mt-1 block text-sm text-red-600 dark:text-red-400'

function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Enter your name (at least 2 characters).'
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Enter a valid email, like name@company.com.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Write at least 10 characters so we can help.'
  }

  return errors
}

export default function Contact({ topic }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!topic) return
    setValues((prev) => ({ ...prev, message: `I'd like to know more about ${topic}.` }))
    setSent(false)
    setErrors({})
  }, [topic])

  const handleChange = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value })
    if (errors[key]) setErrors({ ...errors, [key]: undefined })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length === 0) setSent(true)
  }

  const reset = () => {
    setValues(EMPTY_FORM)
    setSent(false)
  }

  return (
    <Section
      id="contact"
      eyebrow="07 · Contact us"
      title={sent ? 'Message sent.' : 'Tell us what you want to build.'}
      tint
    >
      <div className="grid gap-10 md:grid-cols-2">
        {sent ? (
          <div>
            <p className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="text-brand" />
              Thanks {values.name}, we will reply to {values.email}.
            </p>
            <button
              onClick={reset}
              className={cx(
                'mt-5 rounded-lg border border-brand px-5 py-2 font-bold text-brand',
                'hover:bg-white dark:border-brand-light dark:text-brand-light',
                'dark:hover:bg-white/10'
              )}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {textFields.map(({ key, label, type }) => (
              <label key={key} className="block font-medium">
                {label}
                <input
                  type={type}
                  value={values[key]}
                  onChange={handleChange(key)}
                  aria-invalid={!!errors[key]}
                  className={inputClass}
                />
                {errors[key] && (
                  <span role="alert" className={errorClass}>
                    {errors[key]}
                  </span>
                )}
              </label>
            ))}

            <label className="block font-medium">
              Message
              <textarea
                rows={4}
                value={values.message}
                onChange={handleChange('message')}
                aria-invalid={!!errors.message}
                className={inputClass}
              />
              {errors.message && (
                <span role="alert" className={errorClass}>
                  {errors.message}
                </span>
              )}
            </label>

            <button
              className={cx(
                'rounded-lg bg-brand px-6 py-3 font-bold text-white',
                'transition hover:bg-brand-deep'
              )}
            >
              Send message
            </button>
          </form>
        )}

        <ul className="space-y-4 self-start">
          {info.map(({ Icon, label, text, href }) => (
            <li
              key={label}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 dark:bg-white/5"
            >
              <Icon className="mt-1 text-brand dark:text-brand-light" />
              <div>
                <p className="text-sm">{label}</p>
                {href ? (
                  <a
                    href={href}
                    className="font-bold text-ink hover:underline dark:text-white"
                  >
                    {text}
                  </a>
                ) : (
                  <p className="font-bold text-ink dark:text-white">{text}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
