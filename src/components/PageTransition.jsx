import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Subtle cross-fade + lift between routes. Deliberately understated. */
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.main>
  )
}
