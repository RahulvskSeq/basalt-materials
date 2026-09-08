import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Truck } from 'lucide-react'
import { useStore, FREE_DELIVERY_THRESHOLD } from '../context/StoreContext'
import { useScrollLock } from '../hooks/useScrollLock'
import { formatINR } from '../data/products'
import { img } from '../data/images'
import Button from './Button'

const HARD = [0.65, 0, 0.35, 1]

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, savings, count, setQty, removeFromCart, freeDeliveryGap, deliveryProgress } = useStore()
  useScrollLock(cartOpen)
  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cartOpen, setCartOpen])

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div className="fixed inset-0 z-[95]" initial="hidden" animate="visible" exit="hidden">
          <motion.button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-void/70"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.4 }} />
          <motion.aside role="dialog" aria-label="Shopping cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-void"
            variants={{ hidden: { x: '100%' }, visible: { x: 0 } }} transition={{ duration: 0.6, ease: HARD }}>

            <div className="flex items-center justify-between border-b border-line px-7 py-6">
              <div>
                <p className="b-meta">Your basket</p>
                <p className="mt-1 font-display text-2xl font-medium uppercase">{count} {count === 1 ? 'item' : 'items'}</p>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"
                className="grid h-10 w-10 place-items-center border border-line transition-colors duration-300 hover:bg-panel">
                <X size={17} strokeWidth={1.4} />
              </button>
            </div>

            <div className="border-b border-line bg-panel px-7 py-5">
              <div className="mb-3 flex items-center gap-2.5">
                <Truck size={15} strokeWidth={1.4} className="text-signal" />
                <p className="font-sans text-[12px] font-light text-concrete">
                  {freeDeliveryGap > 0
                    ? <>Add <strong className="font-medium text-chalk">{formatINR(freeDeliveryGap)}</strong> more for free delivery</>
                    : <span className="uppercase tracking-wide2 text-signal">Free delivery unlocked</span>}
                </p>
              </div>
              <div className="h-1 w-full overflow-hidden bg-line">
                <motion.div className="h-full bg-signal" initial={false}
                  animate={{ width: `${deliveryProgress}%` }} transition={{ duration: 0.7, ease: HARD }} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-7">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
                  <p className="b-h3 text-chalk">Nothing here yet</p>
                  <p className="b-body max-w-xs">Add a few surfaces and compare them side by side.</p>
                  <Button to="/shop" variant="solid" size="sm" onClick={() => setCartOpen(false)}>Browse the catalogue</Button>
                </div>
              ) : (
                <ul>
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li key={line.id} layout
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.32 } }}
                        transition={{ duration: 0.45, ease: HARD }}
                        className="overflow-hidden border-b border-line last:border-b-0">
                        <div className="flex gap-4 py-5">
                          <Link to={`/product/${line.product.id}`} onClick={() => setCartOpen(false)}
                            className="h-24 w-20 shrink-0 overflow-hidden bg-panel p-2">
                            <img src={img(line.product.images[0], 240)} alt={line.product.name} className="h-full w-full object-cover" />
                          </Link>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="b-meta">{line.product.code}</p>
                                <Link to={`/product/${line.product.id}`} onClick={() => setCartOpen(false)}
                                  className="b-wipe mt-1 block truncate font-display text-lg font-medium uppercase text-chalk">
                                  {line.product.name}
                                </Link>
                                <p className="mt-0.5 font-sans text-[11.5px] font-light text-steel">{line.product.finish} · {line.product.unit}</p>
                              </div>
                              <button type="button" onClick={() => removeFromCart(line.id)}
                                aria-label={`Remove ${line.product.name} from cart`}
                                className="shrink-0 p-1 text-steel transition-colors hover:text-chalk">
                                <X size={15} strokeWidth={1.4} />
                              </button>
                            </div>
                            <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                              <div className="flex items-center border border-line">
                                <Qty onClick={() => setQty(line.id, line.qty - 1)} label={`Decrease quantity of ${line.product.name}`}><Minus size={13} strokeWidth={1.6} /></Qty>
                                <span className="w-8 text-center font-sans text-[13px] tabular-nums">{line.qty}</span>
                                <Qty onClick={() => setQty(line.id, line.qty + 1)} label={`Increase quantity of ${line.product.name}`}><Plus size={13} strokeWidth={1.6} /></Qty>
                              </div>
                              <p className="font-display text-[17px] text-chalk">{formatINR(line.lineTotal)}</p>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-line px-7 py-6">
                <div className="flex items-baseline justify-between">
                  <span className="b-meta">Subtotal</span>
                  <span className="font-display text-[30px] font-semibold leading-none">{formatINR(subtotal)}</span>
                </div>
                {savings > 0 && <p className="mt-2 text-right font-sans text-[11.5px] uppercase tracking-wide2 text-signal">You save {formatINR(savings)}</p>}
                <p className="mt-4 b-body">Taxes at checkout. Dispatch in 3–5 working days across 90 cities.</p>
                <Button to="/cart" variant="solid" size="lg" className="mt-5 w-full" onClick={() => setCartOpen(false)}>View basket</Button>
                <button type="button" onClick={() => setCartOpen(false)}
                  className="mt-3.5 w-full font-sans text-[10.5px] uppercase tracking-wide2 text-steel transition-colors hover:text-chalk">
                  Keep browsing
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Qty({ children, onClick, label }) {
  return (
    <button type="button" onClick={onClick} aria-label={label}
      className="grid h-9 w-9 place-items-center text-concrete transition-colors duration-300 hover:bg-signal hover:text-void">
      {children}
    </button>
  )
}
