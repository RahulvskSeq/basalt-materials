import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 16, suffix: '', label: 'Years operating' },
  { value: 1020, suffix: '', label: 'References held' },
  { value: 640, suffix: '+', label: 'Projects supplied' },
  { value: 110, suffix: '', label: 'Cities served' },
]

function useCountUp(to, active, duration = 1400) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setV(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, active, duration])
  return v
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <section ref={ref} className="bg-panel">
      <div className="b-shell">
        <div className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {STATS.map((s, i) => <Stat key={s.label} {...s} active={inView} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function Stat({ value, suffix, label, active, index }) {
  const n = useCountUp(value, active)
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }} className={`py-10 md:px-8 md:py-14 ${index === 0 ? 'md:pl-0' : ''}`}>
      <p className="font-display font-semibold tabular-nums leading-none text-chalk" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}>
        {n.toLocaleString('en-IN')}<span className="text-signal">{suffix}</span>
      </p>
      <p className="b-meta mt-3">{label}</p>
    </motion.div>
  )
}
