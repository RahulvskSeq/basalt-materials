import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, X, Truck, ShieldCheck, RotateCcw } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import SectionHead from '../components/SectionHead'
import { useStore, FREE_DELIVERY_THRESHOLD } from '../context/StoreContext'
import { formatINR, bestsellers } from '../data/products'
import { img } from '../data/images'

const HARD = [0.65, 0, 0.35, 1]

export default function Cart() {
  useDocumentTitle('Cart')
  const { lines, subtotal, savings, count, setQty, removeFromCart, clearCart, freeDeliveryGap, deliveryProgress } = useStore()
  const delivery = freeDeliveryGap > 0 && subtotal > 0 ? 750 : 0
  const total = subtotal + delivery

  return (
    <PageTransition>
      <section className="bg-void pb-10 pt-14 md:pb-14 md:pt-20">
        <div className="b-shell">
          <SectionHead label={count === 0 ? 'Nothing selected yet' : `${count} ${count === 1 ? 'item' : 'items'}`} title="Your cart" />
        </div>
      </section>

      {lines.length === 0 ? (
        <>
          <section className="bg-void pb-16">
            <div className="b-shell">
              <div className="bg-panel px-8 py-16 text-center md:py-24">
                <p className="b-h2 mx-auto max-w-md text-chalk">Your cart is empty — the catalogue is not.</p>
                <p className="b-body mx-auto mt-5 max-w-md">Add a few surfaces to compare pricing, or order free A4 samples first.</p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button to="/shop" variant="solid" size="lg">Browse the catalogue</Button>
                  <Button to="/wishlist" variant="outline" size="lg">View saved</Button>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-void pb-24">
            <div className="b-shell">
              <p className="b-meta mb-10">Start with a favourite</p>
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
                {bestsellers.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-void pb-20 md:pb-28">
          <div className="b-shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="b-meta">Item</span>
                  <button type="button" onClick={clearCart} className="font-sans text-[10.5px] uppercase tracking-wide2 text-steel transition-colors hover:text-chalk">Empty cart</button>
                </div>
                <ul>
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li key={line.id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.45, ease: HARD }}
                        className="overflow-hidden border-b border-line">
                        <div className="flex gap-5 py-7 md:gap-7">
                          <Link to={`/product/${line.product.id}`} className="aspect-[4/5] w-24 shrink-0 overflow-hidden bg-panel p-2.5 md:w-32">
                            <img src={img(line.product.images[0], 300)} alt={line.product.name} className="h-full w-full object-cover" />
                          </Link>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="b-meta">{line.product.code} · {line.product.category}</p>
                                <Link to={`/product/${line.product.id}`} className="b-wipe mt-2 block font-display text-[22px] font-medium uppercase text-chalk md:text-[26px]">{line.product.name}</Link>
                                <p className="mt-2 font-mono text-[11px] font-light text-steel">{line.product.finish} · {line.product.thickness} · {line.product.unit}</p>
                              </div>
                              <button type="button" onClick={() => removeFromCart(line.id)} aria-label={`Remove ${line.product.name}`}
                                className="shrink-0 p-1 text-steel transition-colors hover:text-chalk"><X size={17} strokeWidth={1.4} /></button>
                            </div>
                            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                              <div className="flex items-center border border-line">
                                <button type="button" onClick={() => setQty(line.id, line.qty - 1)} aria-label="Decrease quantity"
                                  className="grid h-10 w-10 place-items-center transition-colors duration-300 hover:bg-panel"><Minus size={13} strokeWidth={1.6} /></button>
                                <span className="w-9 text-center font-sans text-sm tabular-nums">{line.qty}</span>
                                <button type="button" onClick={() => setQty(line.id, line.qty + 1)} aria-label="Increase quantity"
                                  className="grid h-10 w-10 place-items-center transition-colors duration-300 hover:bg-panel"><Plus size={13} strokeWidth={1.6} /></button>
                              </div>
                              <div className="text-right">
                                <p className="font-display text-[22px] font-light text-chalk">{formatINR(line.lineTotal)}</p>
                                {line.lineMrp > line.lineTotal && <p className="font-mono text-[11px] font-light text-steel line-through">{formatINR(line.lineMrp)}</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <Link to="/shop" className="b-wipe mt-8 inline-block font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk">Keep browsing</Link>
              </div>

              <aside className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-32 bg-panel p-7 md:p-8">
                  <p className="b-meta mb-7">Summary</p>
                  <dl className="space-y-3.5 border-b border-line pb-6">
                    <Row label={`Subtotal (${count} items)`} value={formatINR(subtotal)} />
                    {savings > 0 && <Row label="Discount applied" value={`− ${formatINR(savings)}`} accent />}
                    <Row label="Delivery" value={delivery === 0 ? 'Free' : formatINR(delivery)} accent={delivery === 0} />
                  </dl>
                  <div className="flex items-baseline justify-between pb-7 pt-6">
                    <span className="b-meta">Total</span>
                    <span className="font-display text-[30px] font-semibold tabular-nums leading-none text-chalk">{formatINR(total)}</span>
                  </div>
                  <div className="border-t border-line pt-6">
                    <div className="mb-3 flex items-center gap-2.5">
                      <Truck size={14} strokeWidth={1.4} className="text-signal" />
                      <p className="font-sans text-[11.5px] font-light text-concrete">
                        {freeDeliveryGap > 0
                          ? <>Add <strong className="font-medium text-chalk">{formatINR(freeDeliveryGap)}</strong> more for free delivery</>
                          : <span className="uppercase tracking-wide2 text-signal">Free delivery unlocked</span>}
                      </p>
                    </div>
                    <div className="h-1 w-full overflow-hidden bg-line">
                      <motion.div className="h-full bg-signal" initial={false} animate={{ width: `${deliveryProgress}%` }} transition={{ duration: 0.7, ease: HARD }} />
                    </div>
                    <p className="mt-2 font-sans text-[10.5px] uppercase tracking-wide2 text-steel">Free above {formatINR(FREE_DELIVERY_THRESHOLD)}</p>
                  </div>
                  <Button to="/contact?intent=quote" variant="solid" size="lg" className="mt-7 w-full">Request a quote</Button>
                  <p className="mt-4 text-center font-sans text-[11.5px] font-light leading-relaxed text-steel">Demonstration checkout — your cart routes to our team as an enquiry.</p>
                  <ul className="mt-7 space-y-3 border-t border-line pt-6">
                    {[[Truck, 'Dispatch in 3–5 working days, 90 cities'], [ShieldCheck, 'Manufacturer warranty on every reference'], [RotateCcw, '7-day replacement on transit damage']].map(([Icon, t]) => (
                      <li key={t} className="flex gap-3">
                        <Icon size={14} strokeWidth={1.4} className="mt-0.5 shrink-0 text-signal" />
                        <span className="font-mono text-[11px] font-light leading-snug text-concrete">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <dt className="font-sans text-[13px] font-light text-concrete">{label}</dt>
      <dd className={`font-sans text-[14px] ${accent ? 'text-signal' : 'text-chalk'}`}>{value}</dd>
    </div>
  )
}
