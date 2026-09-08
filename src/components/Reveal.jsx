import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/** Fades + lifts a block into view once, when it enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, className = '', once = true, amount = 0.25 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Editorial line-by-line text reveal: each child line rises out of a
 * clipping mask. Pass an array of strings via `lines`.
 */
export function RevealLines({ lines, className = '', lineClassName = '', delay = 0, stagger = 0.09 }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Image that un-masks upward and settles from a slight scale-up. */
export function RevealImage({ src, alt, className = '', imgClassName = '', delay = 0, sizes }) {
  return (
    <motion.div
      className={`b-frame ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.3, delay, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        sizes={sizes}
        className={`drag-none ${imgClassName}`}
        initial={{ scale: 1.16 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      />
    </motion.div>
  )
}

export default Reveal
