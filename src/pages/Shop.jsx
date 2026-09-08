import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProductGrid from '../components/ProductGrid'
import FilterPanel from '../components/FilterPanel'
import Button from '../components/Button'
import { Reveal } from '../components/Reveal'
import { useScrollLock } from '../hooks/useScrollLock'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { queryProducts, SORTS, facets, priceBounds, searchProducts } from '../services/api'
import { products } from '../data/products'

const FILTER_KEYS = ['category', 'brand', 'finish', 'color', 'material', 'thickness', 'availability']
const HARD = [0.65, 0, 0.35, 1]
const empty = () => Object.fromEntries(FILTER_KEYS.map((k) => [k, []]))

export default function Shop() {
  useDocumentTitle('Index')
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [sort, setSort] = useState(params.get('sort') ?? 'featured')
  const [maxPrice, setMaxPrice] = useState(priceBounds.max)
  const [filters, setFilters] = useState(() => {
    const f = empty()
    const c = params.get('category')
    if (c && facets.category.includes(c)) f.category = [c]
    return f
  })
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  useEffect(() => { if (isDesktop) setDrawerOpen(false) }, [isDesktop])
  useScrollLock(drawerOpen && !isDesktop)

  useEffect(() => {
    const next = new URLSearchParams()
    if (query.trim()) next.set('q', query.trim())
    if (filters.category.length === 1) next.set('category', filters.category[0])
    if (sort !== 'featured') next.set('sort', sort)
    setParams(next, { replace: true })
  }, [query, filters.category, sort, setParams])

  useEffect(() => {
    const c = params.get('category')
    const q = params.get('q') ?? ''
    setFilters((f) => (c && facets.category.includes(c) && !f.category.includes(c) ? { ...f, category: [c] } : f))
    setQuery((prev) => (params.get('q') !== null && q !== prev ? q : prev))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('category'), params.get('q')])

  const results = useMemo(() => queryProducts({ query, ...filters, maxPrice, sort }), [query, filters, maxPrice, sort])

  const counts = useMemo(() => {
    const pool = searchProducts(query, products)
    const out = {}
    for (const k of FILTER_KEYS) {
      out[k] = {}
      for (const v of facets[k]) out[k][v] = pool.filter((p) => p[k] === v).length
    }
    return out
  }, [query])

  const activeCount = FILTER_KEYS.reduce((n, k) => n + filters[k].length, 0) + (maxPrice < priceBounds.max ? 1 : 0)
  const toggle = (key, value) => setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }))
  const reset = () => { setFilters(empty()); setMaxPrice(priceBounds.max); setQuery('') }

  const panel = <FilterPanel filters={filters} onToggle={toggle} maxPrice={maxPrice} onPrice={setMaxPrice} counts={counts} />

  return (
    <PageTransition>
      <section className="bg-void pb-10 pt-14 md:pb-14 md:pt-20">
        <div className="b-shell">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal y={10}><p className="b-meta mb-5">{products.length} references — full technical index</p></Reveal>
            <Reveal y={16}><h1 className="b-h1 text-chalk">The catalogue</h1></Reveal>
          </div>

          <Reveal y={14} delay={0.1}>
            <div className="mx-auto mt-10 flex max-w-xl items-center gap-3.5 border border-line bg-panel px-6 py-3.5 transition-colors duration-300 focus-within:border-chalk">
              <Search size={18} strokeWidth={1.4} className="shrink-0 text-steel" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search products"
                placeholder="Search by name, code, finish or colour"
                className="w-full bg-transparent font-sans text-[14.5px] font-light text-chalk outline-none placeholder:text-steel" />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="shrink-0 text-steel transition-colors hover:text-chalk">
                  <X size={16} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="sticky top-[68px] z-[60] border-y border-line bg-void/95 backdrop-blur-md md:top-[76px]">
        <div className="b-shell flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk lg:hidden">
              <SlidersHorizontal size={14} strokeWidth={1.5} /> Filters
              {activeCount > 0 && <span className="grid h-4 min-w-4 place-items-center bg-signal px-1 text-[9px] leading-none text-void">{activeCount}</span>}
            </button>
            <p className="font-sans text-[11.5px] font-light text-steel">
              {results.length} {results.length === 1 ? 'product' : 'products'}
              {activeCount > 0 && (
                <button type="button" onClick={reset} className="ml-4 hidden uppercase tracking-wide2 text-chalk underline-offset-4 hover:underline lg:inline">Clear all</button>
              )}
            </p>
          </div>

          <div className="relative">
            <button type="button" onClick={() => setSortOpen((o) => !o)} aria-expanded={sortOpen}
              className="flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk">
              <span className="hidden text-steel sm:inline">Sort:</span>
              {SORTS.find((s) => s.id === sort)?.label}
              <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-400 ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <>
                  <button type="button" aria-label="Close sort menu" onClick={() => setSortOpen(false)} className="fixed inset-0 z-10 cursor-default" />
                  <motion.ul initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: HARD }}
                    className="absolute right-0 top-full z-20 mt-3 w-56 overflow-hidden border border-line bg-void py-1.5 shadow-[0_20px_50px_-25px_rgba(42,37,33,0.5)]">
                    {SORTS.map((s) => (
                      <li key={s.id}>
                        <button type="button" onClick={() => { setSort(s.id); setSortOpen(false) }}
                          className="flex w-full items-center justify-between px-5 py-2.5 text-left font-sans text-[12.5px] font-light text-concrete transition-colors duration-200 hover:bg-panel hover:text-chalk">
                          {s.label}
                          {sort === s.id && <Check size={13} strokeWidth={1.8} className="text-signal" />}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <section className="bg-void py-12 md:py-16">
        <div className="b-shell">
          <div className="flex gap-12 xl:gap-16">
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-[140px] max-h-[calc(100svh-180px)] overflow-y-auto pr-2">
                <div className="mb-5 flex items-baseline justify-between">
                  <p className="b-meta">Refine</p>
                  {activeCount > 0 && (
                    <button type="button" onClick={reset} className="font-mono text-[10px] uppercase tracking-wide2 text-steel transition-colors hover:text-chalk">Reset</button>
                  )}
                </div>
                {panel}
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              {results.length === 0 ? (
                <div className="flex flex-col items-start gap-5 py-20">
                  <p className="b-h2 text-chalk">Nothing matches those filters.</p>
                  <p className="b-body max-w-md">Try widening the price range, or clear the filters to see the full catalogue.</p>
                  <Button variant="solid" size="sm" onClick={reset}>Clear all filters</Button>
                </div>
              ) : <ProductGrid products={results} columns="wide" />}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div className="fixed inset-0 z-[92] lg:hidden" initial="hidden" animate="visible" exit="hidden">
            <motion.button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-void/70"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: 0.35 }} />
            <motion.div className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col bg-void"
              variants={{ hidden: { y: '100%' }, visible: { y: 0 } }} transition={{ duration: 0.55, ease: HARD }}>
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <p className="font-display text-2xl font-medium uppercase">Filters</p>
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close filters"
                  className="grid h-10 w-10 place-items-center border border-line"><X size={17} strokeWidth={1.4} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 pb-4">{panel}</div>
              <div className="flex gap-3 border-t border-line px-6 py-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={reset}>Reset</Button>
                <Button variant="solid" size="sm" className="flex-1" onClick={() => setDrawerOpen(false)}>Show {results.length} results</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
