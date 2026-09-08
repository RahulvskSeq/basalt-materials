import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter({ className = '' }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <div className={className}>
      <p className="b-meta mb-4">Technical notes</p>
      <p className="b-h3 mb-6 text-chalk">Test data, new references and detail notes. Monthly, no marketing.</p>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.p key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center gap-2.5 py-3 font-mono text-[11px] uppercase tracking-wide2 text-signal">
            <Check size={15} strokeWidth={2} /> Subscribed
          </motion.p>
        ) : (
          <motion.form key="f" exit={{ opacity: 0 }}
            onSubmit={(e) => { e.preventDefault(); if (email.trim()) setDone(true) }}
            className="flex items-center gap-3 border-b border-line pb-3 focus-within:border-chalk">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com" aria-label="Email address"
              className="w-full bg-transparent font-mono text-[13.5px] font-light text-chalk outline-none placeholder:text-steel" />
            <button type="submit" aria-label="Subscribe"
              className="group flex shrink-0 items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-wide2 text-chalk">
              Subscribe
              <ArrowRight size={13} strokeWidth={1.8} className="text-signal transition-transform duration-400 group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
