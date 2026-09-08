import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { img, IMG } from '../data/images'
import Button from './Button'

const HARD = [0.65, 0, 0.35, 1]
const LINES = ['Surface.', 'Structure.', 'Precision.']

const SPEC = [
  ['Decors', '740'],
  ['Board grades', '52'],
  ['Hardware refs', '226'],
  ['Cycle rating', '80,000'],
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-void">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <motion.img src={img(IMG.barDark, 2200)} alt="A dark timber-ribbed interior"
          className="h-full w-full object-cover opacity-70"
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: HARD }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-void/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-transparent to-transparent" />

      <motion.div className="relative b-shell pb-10 md:pb-14" style={{ opacity: fade }}>
        <motion.p className="b-meta mb-7"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: HARD }}>
          <span className="text-signal">EST 2009</span> — Engineered interior materials
        </motion.p>

        <h1 className="b-display text-chalk">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.09, ease: HARD }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p className="max-w-md font-sans text-[15px] font-light leading-relaxed text-concrete md:text-base"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease: HARD }}>
            Laminates, structural boards and precision hardware — specified by test data,
            held in stock, and supplied to the studios who draw to a millimetre.
          </motion.p>
          <motion.div className="flex flex-col gap-2.5 sm:flex-row"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85, ease: HARD }}>
            <Button to="/shop" variant="solid" size="lg">Open the index</Button>
            <Button to="/projects" variant="outline" size="lg">Selected work</Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Spec strip — the data band that anchors the whole direction */}
      <motion.div className="relative border-t border-line bg-void/80 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1 }}>
        <div className="b-shell grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {SPEC.map(([k, v], i) => (
            <div key={k} className={`py-5 md:px-6 ${i === 0 ? 'md:pl-0' : ''}`}>
              <p className="font-mono text-[10px] uppercase tracking-wide2 text-steel">{k}</p>
              <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-chalk md:text-[28px]">{v}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
