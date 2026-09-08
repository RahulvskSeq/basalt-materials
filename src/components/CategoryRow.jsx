import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { img } from '../data/images'

const HARD = [0.65, 0, 0.35, 1]

/**
 * Categories as an index table: a numbered row that reveals its plate on
 * hover. Deliberately not a card grid.
 */
export default function CategoryRow({ category, index = 0 }) {
  const to = ['kitchen', 'wardrobe'].includes(category.id)
    ? `/shop?q=${category.id}`
    : `/shop?category=${encodeURIComponent(category.name)}`

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.05, ease: HARD }}
      className="group border-b border-line"
    >
      <Link to={to} className="relative flex items-center gap-6 py-7 md:gap-10 md:py-9">
        <span className="font-mono text-[11px] text-signal">{category.code}</span>

        <div className="min-w-0 flex-1 md:flex md:items-baseline md:gap-10">
          <h3 className="b-h2 shrink-0 text-chalk transition-colors duration-400 group-hover:text-signal md:w-[280px]">
            {category.name}
          </h3>
          <p className="mt-2 font-sans text-[13.5px] font-light text-concrete md:mt-0 md:flex-1">{category.blurb}</p>
        </div>

        {/* Plate appears alongside on wide screens */}
        <div className="hidden h-24 w-40 shrink-0 overflow-hidden bg-panel opacity-0 transition-opacity duration-500 ease-hard group-hover:opacity-100 lg:block">
          <img src={img(category.image, 500)} alt="" aria-hidden="true" loading="lazy"
            className="h-full w-full object-cover" />
        </div>

        <span className="hidden shrink-0 font-mono text-[10.5px] uppercase tracking-wide2 text-steel md:block">{category.spec}</span>
        <ArrowRight size={16} strokeWidth={1.6} className="shrink-0 text-steel transition-all duration-400 ease-hard group-hover:translate-x-1 group-hover:text-chalk" />
      </Link>
    </motion.li>
  )
}
