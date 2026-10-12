import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from './Section'
import cx from '../lib/cx'
import { SITE } from '../config/site'

const faqs = [
  {
    question: 'What does Algoryx build?',
    answer:   'Developer tools, SaaS platforms, web technologies and open-source '
            + 'software, plus interactive browser-based 3D experiences.',
  },
  {
    question: 'What is the 3D Engine?',
    answer:   'A 12-stage asset pipeline with automated Draco compression, LOD 0-3 '
            + 'mesh generation, WebP posters and multi-profile optimization.',
  },
  {
    question: 'What is Breakpoint?',
    answer:   'A fast security analysis tool that scans dependencies, flags '
            + 'vulnerabilities and helps protect your network.',
  },
  {
    question: 'Do new partners get a 3D asset?',
    answer:   'Yes. Partners receive their first custom 3D asset for free.',
  },
  {
    question: 'How can I get in touch?',
    answer:   `Use the contact form below or email ${SITE.email}, ${SITE.hours}.`,
  },
]

const SECTION_PAD = 'pt-6 pb-16 md:pt-8 md:pb-20'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section
      id="faq"
      eyebrow="06 · Good to know"
      title="Questions, answered."
      pad={SECTION_PAD}
    >
      <div
        className={cx(
          'max-w-2xl divide-y divide-brand/15 rounded-2xl border border-brand/15',
          'dark:divide-white/10 dark:border-white/10'
        )}
      >
        {faqs.map(({ question, answer }, i) => {
          const isOpen = openIndex === i

          return (
            <div key={question}>
              <h3>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={cx(
                    'flex w-full items-center justify-between gap-4',
                    'px-5 py-4 text-left text-lg font-bold'
                  )}
                >
                  {question}
                  <ChevronDown
                    className={cx('shrink-0 transition-transform', isOpen && 'rotate-180')}
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-5 pb-4"
                  >
                    {answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
