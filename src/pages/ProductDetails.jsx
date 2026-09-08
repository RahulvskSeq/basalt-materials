import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Truck, ShieldCheck, Ruler } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductCard from '../components/ProductCard'
import WishlistButton from '../components/WishlistButton'
import StarRating from '../components/StarRating'
import SectionHead from '../components/SectionHead'
import Button from '../components/Button'
import { Reveal } from '../components/Reveal'
import { productById, relatedTo, formatINR } from '../data/products'
import { img } from '../data/images'
import { useStore } from '../context/StoreContext'

const HARD = [0.65, 0, 0.35, 1]
const TABS = ['Description', 'Specifications', 'Application', 'Care']

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = productById[id]
  const { addToCart } = useStore()
  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('Description')

  useDocumentTitle(product ? `${product.code} — ${product.name}` : 'Product')
  useEffect(() => { setActive(0); setQty(1); setTab('Description') }, [id])
  const related = useMemo(() => (product ? relatedTo(product, 4) : []), [product])

  if (!product) return <Navigate to="/shop" replace />

  return (
    <PageTransition>
      <div className="bg-void pt-10 md:pt-14">
        <div className="b-shell">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wide2 text-steel">
            <Link to="/" className="transition-colors hover:text-chalk">Home</Link><span className="opacity-50">/</span>
            <Link to="/shop" className="transition-colors hover:text-chalk">Shop</Link><span className="opacity-50">/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="transition-colors hover:text-chalk">{product.category}</Link>
            <span className="opacity-50">/</span><span className="text-chalk">{product.code}</span>
          </nav>
        </div>
      </div>

      <section className="bg-void py-10 md:py-14">
        <div className="b-shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Gallery */}
            <div className="min-w-0 lg:col-span-7">
              <div className="hidden gap-5 md:flex">
                <div className="flex w-20 shrink-0 flex-col gap-3">
                  {product.images.map((im, i) => (
                    <button key={im} type="button" onClick={() => setActive(i)} aria-label={`View image ${i + 1} of ${product.images.length}`}
                      className={`aspect-[4/5] overflow-hidden border bg-panel p-1.5 transition-all duration-400 ${i === active ? 'border-chalk' : 'border-transparent opacity-60 hover:opacity-90'}`}>
                      <img src={img(im, 200)} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="b-frame relative aspect-[4/5] flex-1 p-6">
                  <span className="relative block h-full w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img key={active} src={img(product.images[active], 1200)} alt={`${product.name} — view ${active + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: HARD }} />
                    </AnimatePresence>
                  </span>
                  {(product.isNew || product.bestseller) && (
                    <span className="absolute left-5 top-5 bg-void/90 px-3 py-1 font-sans text-[9px] font-medium uppercase tracking-wide2 text-concrete">
                      {product.isNew ? 'New' : 'Favourite'}
                    </span>
                  )}
                </div>
              </div>

              <div className="md:hidden">
                <div className="no-bar snap-row -mx-6 flex w-[calc(100%+3rem)] gap-3 overflow-x-auto px-6 scroll-pl-6">
                  {product.images.map((im, i) => (
                    <div key={im} className="snap-cell b-frame aspect-[4/5] w-[80vw] shrink-0 p-4">
                      <img src={img(im, 900)} alt={`${product.name} — view ${i + 1}`} className="" />
                    </div>
                  ))}
                </div>
                <p className="b-meta mt-4">Swipe · {product.images.length} images</p>
              </div>
            </div>

            {/* Buy box */}
            <div className="min-w-0 lg:col-span-5">
              <Reveal y={16}>
                <p className="b-meta">{product.brand} · {product.code}</p>
                <h1 className="b-h1 mt-3 text-chalk">{product.name}</h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2.5">
                  <StarRating value={product.rating} reviews={product.reviews} showValue />
                  <span className={`font-sans text-[10.5px] uppercase tracking-wide2 ${product.availability === 'In Stock' ? 'text-signal' : 'text-steel'}`}>{product.availability}</span>
                </div>

                <div className="mt-8 bg-panel px-6 py-6">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="font-display text-[34px] font-semibold tabular-nums leading-none text-chalk">{formatINR(product.price)}</span>
                    <span className="font-sans text-[15px] font-light text-steel line-through">{formatINR(product.mrp)}</span>
                    <span className="bg-signal px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-wide2 text-void">{product.discount}% off</span>
                  </div>
                  <p className="mt-3 font-mono text-[11px] font-light text-steel">{product.unit} · inclusive of all taxes</p>
                </div>

                <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6">
                  {[['Finish', product.finish], ['Colour', product.color], ['Thickness', product.thickness],
                    ['Size', product.size], ['Material', product.material], ['Collection', product.collection]].map(([k, v]) => (
                    <div key={k}>
                      <dt className="b-meta">{k}</dt>
                      <dd className="mt-2 font-sans text-[13.5px] font-light leading-snug text-chalk">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-9 flex items-center gap-4">
                  <div className="flex items-center border border-line">
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"
                      className="grid h-12 w-12 place-items-center transition-colors duration-300 hover:bg-panel"><Minus size={15} strokeWidth={1.6} /></button>
                    <span className="w-10 text-center font-sans text-[15px] tabular-nums">{qty}</span>
                    <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity"
                      className="grid h-12 w-12 place-items-center transition-colors duration-300 hover:bg-panel"><Plus size={15} strokeWidth={1.6} /></button>
                  </div>
                  <p className="font-sans text-[12.5px] font-light text-steel">Total <span className="text-chalk">{formatINR(product.price * qty)}</span></p>
                </div>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  <Button variant="solid" size="lg" onClick={() => addToCart(product.id, qty)}>Add to cart</Button>
                  <Button variant="clay" size="lg" onClick={() => { addToCart(product.id, qty, { open: false }); navigate('/cart') }}>Buy now</Button>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <WishlistButton id={product.id} label={product.name} size={16} className="h-11 w-11 border border-line bg-transparent hover:bg-panel" />
                  <span className="b-meta">Save for later</span>
                </div>

                <ul className="mt-9 grid gap-4 border-t border-line pt-7 sm:grid-cols-3">
                  {[[Truck, 'Free delivery', 'Over ₹12,000'], [ShieldCheck, product.specs?.Warranty ?? '10 Years', 'Manufacturer warranty'], [Ruler, 'Free samples', 'A4 swatch, 3–4 days']].map(([Icon, t, s]) => (
                    <li key={t} className="flex gap-3">
                      <Icon size={16} strokeWidth={1.4} className="mt-0.5 shrink-0 text-signal" />
                      <div>
                        <p className="font-sans text-[11px] font-medium uppercase tracking-wide2 text-chalk">{t}</p>
                        <p className="mt-1 font-sans text-[11px] font-light leading-snug text-steel">{s}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-panel py-14 md:py-20">
        <div className="b-shell">
          <div className="no-bar -mx-6 flex gap-3 overflow-x-auto px-6 sm:mx-0 sm:px-0">
            {TABS.map((t) => (
              <button key={t} type="button" onClick={() => setTab(t)}
                className={`shrink-0 whitespace-nowrap px-5 py-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide2 transition-colors duration-300 ${tab === t ? 'bg-chalk text-void' : 'bg-void text-concrete hover:text-chalk'}`}>
                {t}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.38, ease: HARD }} className="pt-10 md:pt-12">
              {tab === 'Description' && (
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <p className="b-body lg:col-span-7 lg:text-[18px]">{product.description}</p>
                  <div className="lg:col-span-5">
                    <p className="b-meta mb-5">At a glance</p>
                    <ul className="space-y-3">
                      {[`${product.finish} finish in ${product.color.toLowerCase()}`, `${product.thickness} · ${product.size}`,
                        `${product.specs?.Warranty ?? '10 Years'} manufacturer warranty`, `${product.availability} · dispatch in 3–5 working days`].map((l) => (
                        <li key={l} className="flex gap-3 font-sans text-[13px] font-light text-concrete">
                          <span className="mt-[9px] h-1 w-1 shrink-0 bg-signal" />{l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {tab === 'Specifications' && (
                <dl className="grid gap-x-16 sm:grid-cols-2">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                      <dt className="font-mono text-[11px] uppercase tracking-wide2 text-steel">{k}</dt>
                      <dd className="text-right font-sans text-[13px] font-light text-chalk">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === 'Application' && (
                <ul className="grid gap-x-16 sm:grid-cols-2">
                  {product.applications.map((a, i) => (
                    <li key={a} className="flex items-baseline gap-5 border-b border-line py-5">
                      <span className="font-display text-lg font-medium uppercase text-signal">0{i + 1}</span>
                      <span className="font-sans text-[14.5px] font-light text-concrete">{a}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === 'Care' && (
                <ul className="grid gap-x-16 lg:grid-cols-2">
                  {product.care.map((c, i) => (
                    <li key={c} className="flex items-baseline gap-5 border-b border-line py-5">
                      <span className="font-sans text-[11px] tabular-nums text-steel">0{i + 1}</span>
                      <span className="font-sans text-[14px] font-light leading-relaxed text-concrete">{c}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-void py-20 md:py-24">
        <div className="b-shell">
          <SectionHead label="Goes well with" title="You may also like" linkTo="/shop" linkLabel="All products" />
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-8">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
