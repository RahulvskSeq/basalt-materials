import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ArrowRight, Minus, Plus } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useScrollLock } from '../hooks/useScrollLock'
import { img } from '../data/images'
import Price from './Price'
import StarRating from './StarRating'
import WishlistButton from './WishlistButton'
import Button from './Button'

const HARD = [0.65, 0, 0.35, 1]

export default function QuickView() {
  const { quickView, setQuickView, addToCart } = useStore()
  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)
  const open = Boolean(quickView)
  useScrollLock(open)

  useEffect(() => { if (open) { setActive(0); setQty(1) } }, [open, quickView?.id])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setQuickView(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setQuickView])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6"
          initial="hidden" animate="visible" exit="hidden">
          <motion.button type="button" aria-label="Close quick view" onClick={() => setQuickView(null)}
            className="absolute inset-0 h-full w-full cursor-default bg-void/75"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.35 }} />
          <motion.div role="dialog" aria-label={`${quickView.name} quick view`}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-void shadow-[0_40px_100px_-40px_rgba(42,37,33,0.5)]"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: HARD }}>
            <button type="button" onClick={() => setQuickView(null)} aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center bg-void/90 text-chalk backdrop-blur transition-colors duration-300 hover:bg-panel">
              <X size={17} strokeWidth={1.4} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="bg-panel p-6 md:p-9">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img key={active} src={img(quickView.images[active], 900)} alt={quickView.name}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
                  </AnimatePresence>
                </div>
                <div className="mt-4 flex gap-2">
                  {quickView.images.map((im, i) => (
                    <button key={im} type="button" onClick={() => setActive(i)} aria-label={`View image ${i + 1}`}
                      className={`h-14 w-12 overflow-hidden border transition-all duration-300 ${i === active ? 'border-chalk' : 'border-transparent opacity-60 hover:opacity-90'}`}>
                      <img src={img(im, 120)} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-7 md:p-10">
                <p className="b-meta">{quickView.category} · {quickView.code}</p>
                <h2 className="b-h1 mt-3 text-chalk">{quickView.name}</h2>
                <StarRating value={quickView.rating} reviews={quickView.reviews} showValue className="mt-4" />
                <Price product={quickView} size="lg" className="mt-5" />
                <p className="b-body mt-5 line-clamp-4">{quickView.description}</p>

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-6">
                  {[['Finish', quickView.finish], ['Colour', quickView.color], ['Thickness', quickView.thickness], ['Stock', quickView.availability]].map(([k, v]) => (
                    <div key={k}>
                      <dt className="b-meta">{k}</dt>
                      <dd className="mt-1.5 font-sans text-[13px] font-light text-chalk">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center border border-line">
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"
                      className="grid h-11 w-11 place-items-center transition-colors duration-300 hover:bg-panel"><Minus size={14} strokeWidth={1.6} /></button>
                    <span className="w-9 text-center font-sans text-sm tabular-nums">{qty}</span>
                    <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity"
                      className="grid h-11 w-11 place-items-center transition-colors duration-300 hover:bg-panel"><Plus size={14} strokeWidth={1.6} /></button>
                  </div>
                  <WishlistButton id={quickView.id} label={quickView.name} size={16} className="h-11 w-11 border border-line bg-transparent hover:bg-panel" />
                </div>

                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <Button variant="solid" className="flex-1" onClick={() => { addToCart(quickView.id, qty); setQuickView(null) }}>Add to basket</Button>
                  <Button variant="outline" className="flex-1" to={`/product/${quickView.id}`} onClick={() => setQuickView(null)}>
                    Full details <ArrowRight size={14} strokeWidth={1.4} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
