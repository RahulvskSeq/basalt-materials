import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductCard from '../components/ProductCard'
import SectionHead from '../components/SectionHead'
import Button from '../components/Button'
import Price from '../components/Price'
import { useStore } from '../context/StoreContext'
import { img } from '../data/images'
import { bestsellers } from '../data/products'

const HARD = [0.65, 0, 0.35, 1]

export default function Wishlist() {
  useDocumentTitle('Saved')
  const { wishlistProducts, removeFromWishlist, moveToCart } = useStore()

  return (
    <PageTransition>
      <section className="bg-void pb-10 pt-14 md:pb-14 md:pt-20">
        <div className="b-shell">
          <SectionHead
            label={wishlistProducts.length === 0 ? 'Nothing saved yet' : `${wishlistProducts.length} saved`}
            title="Saved materials" />
        </div>
      </section>

      {wishlistProducts.length === 0 ? (
        <>
          <section className="bg-void pb-16">
            <div className="b-shell">
              <div className="flex flex-col items-center bg-panel px-8 py-16 text-center md:py-24">
                <span className="grid h-14 w-14 place-items-center border border-line text-steel"><Heart size={20} strokeWidth={1.4} /></span>
                <p className="b-h2 mt-7 max-w-md text-chalk">Save what you like as you browse.</p>
                <p className="b-body mt-4 max-w-md">Tap the heart on any product to keep it here. Your list lives on this device, so it survives a refresh.</p>
                <div className="mt-9"><Button to="/shop" variant="solid" size="lg">Browse the catalogue</Button></div>
              </div>
            </div>
          </section>
          <section className="bg-void pb-24">
            <div className="b-shell">
              <p className="b-meta mb-10">Popular right now</p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
                {bestsellers.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-void pb-20 md:pb-28">
          <div className="b-shell">
            <ul className="border-t border-line">
              <AnimatePresence initial={false}>
                {wishlistProducts.map((p) => (
                  <motion.li key={p.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.45, ease: HARD }}
                    className="overflow-hidden border-b border-line">
                    <div className="flex flex-col gap-5 py-7 sm:flex-row sm:gap-7">
                      <Link to={`/product/${p.id}`} className="aspect-[4/5] w-28 shrink-0 overflow-hidden bg-panel p-3 sm:w-36">
                        <img src={img(p.images[0], 300)} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 ease-hard hover:scale-105" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="b-meta">{p.code} · {p.category}</p>
                            <Link to={`/product/${p.id}`} className="b-wipe mt-2 block font-display text-[22px] font-medium uppercase text-chalk md:text-[28px]">{p.name}</Link>
                            <p className="mt-2 font-mono text-[11px] font-light text-steel">{p.finish} · {p.color}</p>
                          </div>
                          <button type="button" onClick={() => removeFromWishlist(p.id)} aria-label={`Remove ${p.name} from saved`}
                            className="shrink-0 p-1 text-steel transition-colors hover:text-chalk"><X size={17} strokeWidth={1.4} /></button>
                        </div>
                        <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-6">
                          <Price product={p} />
                          <div className="flex gap-2.5">
                            <Button variant="solid" size="sm" onClick={() => moveToCart(p.id)}>
                              <ShoppingBag size={13} strokeWidth={1.5} /> Move to cart
                            </Button>
                            <Button variant="outline" size="sm" to={`/product/${p.id}`}>Details</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/shop" variant="outline">Keep browsing</Button>
              <Button to="/cart" variant="solid">Go to cart</Button>
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
