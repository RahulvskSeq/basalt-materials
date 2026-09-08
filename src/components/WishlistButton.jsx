import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function WishlistButton({ id, label, size = 15, className = '' }) {
  const { inWishlist, toggleWishlist } = useStore()
  const active = inWishlist(id)
  return (
    <button type="button" aria-pressed={active}
      aria-label={active ? `Remove ${label ?? 'item'} from wishlist` : `Add ${label ?? 'item'} to wishlist`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(id) }}
      className={`grid h-9 w-9 place-items-center border border-line bg-void/80 text-chalk backdrop-blur-sm transition-colors duration-300 hover:border-chalk ${className}`}>
      <motion.span animate={active ? { scale: [1, 1.25, 1] } : { scale: 1 }} transition={{ duration: 0.35 }} className="flex">
        <Bookmark size={size} strokeWidth={1.5} className={active ? 'fill-signal text-signal' : ''} />
      </motion.span>
    </button>
  )
}
