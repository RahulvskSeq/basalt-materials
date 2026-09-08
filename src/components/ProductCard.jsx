import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Maximize2 } from 'lucide-react'
import { img } from '../data/images'
import { useStore } from '../context/StoreContext'
import WishlistButton from './WishlistButton'
import Price from './Price'

const HARD = [0.65, 0, 0.35, 1]

/** A bordered spec tile: square image, mono data rows, no soft edges. */
export default function ProductCard({ product, index = 0 }) {
  const { addToCart, setQuickView } = useStore()
  const [primary, secondary] = product.images

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: Math.min(index, 5) * 0.045, ease: HARD }}
      className="group b-card flex h-full flex-col"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-raised"
        aria-label={`${product.code} — ${product.name}`}>
        <img src={img(primary, 700)} alt={`${product.name} surface`} loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-hard group-hover:scale-[1.04]" />
        {secondary && (
          <img src={img(secondary, 700)} alt="" aria-hidden="true" loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-hard group-hover:opacity-100" />
        )}

        <span className="absolute left-0 top-0 bg-void/85 px-2.5 py-1.5 font-mono text-[9.5px] font-medium uppercase tracking-wide2 text-chalk backdrop-blur-sm">
          {product.code}
        </span>
        {(product.isNew || product.bestseller) && (
          <span className="absolute left-0 top-[26px] bg-signal px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-wide2 text-void">
            {product.isNew ? 'New' : 'Core'}
          </span>
        )}
        <span className="absolute right-0 top-0"><WishlistButton id={product.id} label={product.name} /></span>

        <div className="absolute inset-x-0 bottom-0 flex opacity-100 transition-all duration-500 ease-hard md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button type="button" onClick={(e) => { e.preventDefault(); setQuickView(product) }}
            aria-label={`Quick view ${product.name}`}
            className="flex flex-1 items-center justify-center gap-2 border-r border-void/40 bg-chalk/95 py-3 font-mono text-[9.5px] font-medium uppercase tracking-wide2 text-void transition-colors duration-300 hover:bg-signal">
            <Maximize2 size={12} strokeWidth={1.8} /><span className="hidden sm:inline">View</span>
          </button>
          <button type="button" onClick={(e) => { e.preventDefault(); addToCart(product.id, 1) }}
            aria-label={`Add ${product.name} to cart`}
            className="flex flex-1 items-center justify-center gap-2 bg-void/95 py-3 font-mono text-[9.5px] font-medium uppercase tracking-wide2 text-chalk backdrop-blur-sm transition-colors duration-300 hover:bg-signal hover:text-void">
            <Plus size={12} strokeWidth={2} /><span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="b-h3 text-chalk">
          <Link to={`/product/${product.id}`} className="b-wipe">{product.name}</Link>
        </h3>
        <dl className="mt-3 space-y-1 border-t border-line pt-3 font-mono text-[10.5px] uppercase tracking-wide2">
          <Row k="Finish" v={product.finish} />
          <Row k="Spec" v={product.thickness} />
        </dl>
        <Price product={product} className="mt-3.5" />
      </div>
    </motion.article>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-steel">{k}</dt>
      <dd className="truncate text-right text-concrete">{v}</dd>
    </div>
  )
}
