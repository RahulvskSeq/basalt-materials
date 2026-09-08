import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { img } from '../data/images'

const HARD = [0.65, 0, 0.35, 1]

export default function JournalCard({ article, index = 0, layout = 'stack' }) {
  if (layout === 'row') {
    return (
      <motion.article initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: Math.min(index, 4) * 0.05, ease: HARD }} className="group border-b border-line">
        <Link to={`/journal/${article.id}`} className="flex items-center gap-6 py-7 md:gap-10">
          <span className="font-mono text-[11px] text-signal">{String(index + 1).padStart(2, '0')}</span>
          <div className="min-w-0 flex-1">
            <p className="b-meta mb-2.5">{article.category} — {article.readTime}</p>
            <h3 className="b-h2 text-chalk"><span className="b-wipe">{article.title}</span></h3>
            <p className="mt-3 max-w-2xl font-sans text-[13.5px] font-light leading-relaxed text-concrete">{article.excerpt}</p>
          </div>
          <div className="hidden h-24 w-32 shrink-0 overflow-hidden bg-panel opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block">
            <img src={img(article.image, 400)} alt="" aria-hidden="true" className="h-full w-full object-cover" />
          </div>
          <ArrowRight size={16} strokeWidth={1.6} className="shrink-0 text-steel transition-all duration-400 ease-hard group-hover:translate-x-1 group-hover:text-chalk" />
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: Math.min(index, 4) * 0.05, ease: HARD }} className="group">
      <Link to={`/journal/${article.id}`} className="block">
        <div className="b-frame aspect-[4/3]">
          <img src={img(article.image, 800)} alt={article.title} loading="lazy"
            className="opacity-85 transition-all duration-[1100ms] ease-hard group-hover:scale-[1.04] group-hover:opacity-100" />
        </div>
        <p className="b-meta mb-2.5 mt-5">{article.category} — {article.readTime}</p>
        <h3 className="b-h3 text-chalk"><span className="b-wipe">{article.title}</span></h3>
        <p className="mt-3 font-sans text-[13px] font-light leading-relaxed text-concrete">{article.excerpt}</p>
      </Link>
    </motion.article>
  )
}
