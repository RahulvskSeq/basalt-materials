import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { X, Search, ArrowRight } from 'lucide-react'
import { searchProducts } from '../services/api'
import { products, formatINR } from '../data/products'
import { img } from '../data/images'
import { useStore } from '../context/StoreContext'
import { useScrollLock } from '../hooks/useScrollLock'

const HARD = [0.65, 0, 0.35, 1]
const HINTS = ['Ash', 'Stone', 'Oak', 'Hinge', 'Marine ply', 'Brass']

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  useScrollLock(searchOpen)

  useEffect(() => {
    if (!searchOpen) return
    setQuery('')
    const t = setTimeout(() => inputRef.current?.focus(), 300)
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [searchOpen, setSearchOpen])

  const results = useMemo(() => (query.trim() ? searchProducts(query, products).slice(0, 6) : []), [query])

  const submit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setSearchOpen(false)
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div className="fixed inset-0 z-[95]" initial="hidden" animate="visible" exit="hidden">
          <motion.button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-void/70 backdrop-blur-sm"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.4 }} />
          <motion.div className="relative mx-auto max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-b-xs bg-void px-6 pb-9 pt-8 sm:px-10"
            variants={{ hidden: { y: '-100%' }, visible: { y: 0 } }} transition={{ duration: 0.6, ease: HARD }}>
            <div className="flex items-start justify-between gap-5">
              <form onSubmit={submit} className="flex-1">
                <label htmlFor="site-search" className="b-meta mb-4 block">Search the catalogue</label>
                <div className="flex items-center gap-3.5 border-b border-line pb-3 focus-within:border-chalk">
                  <Search size={19} strokeWidth={1.4} className="shrink-0 text-steel" />
                  <input id="site-search" ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try “ash”, “KN 220” or “hinge”" autoComplete="off"
                    className="w-full bg-transparent font-display text-2xl font-medium uppercase text-chalk outline-none placeholder:text-steel md:text-3xl" />
                </div>
              </form>
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search"
                className="mt-7 grid h-10 w-10 shrink-0 place-items-center border border-line transition-colors duration-300 hover:bg-panel">
                <X size={17} strokeWidth={1.4} />
              </button>
            </div>

            {!query.trim() && (
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="b-meta mr-2">Try</span>
                {HINTS.map((h) => (
                  <button key={h} type="button" onClick={() => setQuery(h)}
                    className="border border-line px-4 py-1.5 font-sans text-[12px] font-light text-concrete transition-colors duration-300 hover:border-chalk hover:bg-panel hover:text-chalk">
                    {h}
                  </button>
                ))}
              </div>
            )}

            {query.trim() && (
              <div className="mt-8">
                {results.length === 0 ? (
                  <p className="b-body">Nothing matches “{query}”. Try a finish, a colour or a product code.</p>
                ) : (
                  <>
                    <ul className="divide-y divide-line">
                      {results.map((p) => (
                        <li key={p.id}>
                          <Link to={`/product/${p.id}`} onClick={() => setSearchOpen(false)} className="group flex items-center gap-4 py-3.5">
                            <div className="h-14 w-12 shrink-0 overflow-hidden bg-panel p-1.5">
                              <img src={img(p.images[0], 200)} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-hard group-hover:scale-105" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="b-meta">{p.code} · {p.category}</p>
                              <p className="truncate font-display text-lg font-medium uppercase text-chalk">{p.name}</p>
                            </div>
                            <span className="shrink-0 font-sans text-[13.5px] text-chalk">{formatINR(p.price)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <button type="button" onClick={submit}
                      className="group mt-7 inline-flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk">
                      <span className="b-wipe">All results</span>
                      <ArrowRight size={14} strokeWidth={1.4} className="transition-transform duration-500 ease-hard group-hover:translate-x-1" />
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
