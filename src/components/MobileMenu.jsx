import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { PRIMARY, CATEGORY_LINKS } from './navLinks'
import { useScrollLock } from '../hooks/useScrollLock'
import Logo from './Logo'

const HARD = [0.65, 0, 0.35, 1]

export default function MobileMenu({ open, onClose }) {
  useScrollLock(open)
  return (
    <AnimatePresence>
      {open && (
        <motion.div key="menu" className="fixed inset-0 z-[90] flex flex-col bg-void"
          initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.55, ease: HARD }}>
          <div className="flex items-center justify-between border-b border-line px-5 py-5 sm:px-8">
            <Logo onClick={onClose} />
            <button type="button" onClick={onClose} aria-label="Close menu"
              className="grid h-10 w-10 place-items-center border border-line transition-colors duration-300 hover:border-chalk">
              <X size={18} strokeWidth={1.6} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul>
              {PRIMARY.map((l, i) => (
                <li key={l.label} className="border-b border-line">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.12 + i * 0.05, ease: HARD }}>
                    <Link to={l.to} onClick={onClose} className="flex items-baseline justify-between px-5 py-5 sm:px-8">
                      <span className="b-h2 text-chalk">{l.label}</span>
                      <span className="font-mono text-[11px] text-signal">{l.code}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="px-5 py-8 sm:px-8">
              <p className="b-meta mb-5">Index by material</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {CATEGORY_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} onClick={onClose}
                      className="font-mono text-[12px] font-light uppercase tracking-wide2 text-concrete transition-colors duration-300 hover:text-chalk">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-t border-line pt-7">
                <p className="b-meta mb-3">Bengaluru</p>
                <p className="font-display text-lg font-medium uppercase leading-snug text-chalk">
                  4 Lavelle Road<br />Bengaluru 560001
                </p>
                <a href="tel:+918042009000" className="mt-4 inline-block font-mono text-[12px] text-signal">+91 80 4200 9000</a>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
