import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { facets, priceBounds } from '../services/api'
import { formatINR } from '../data/products'

const GROUPS = [
  { key: 'category', label: 'Material' },
  { key: 'finish', label: 'Finish' },
  { key: 'color', label: 'Colour' },
  { key: 'brand', label: 'Range' },
  { key: 'thickness', label: 'Thickness' },
  { key: 'availability', label: 'Stock' },
]

export default function FilterPanel({ filters, onToggle, maxPrice, onPrice, counts }) {
  const [open, setOpen] = useState({ category: true, finish: true })
  return (
    <div className="divide-y divide-line border-y border-line">
      <Group label="Price" open={open.price ?? true} onToggle={() => setOpen((o) => ({ ...o, price: !(o.price ?? true) }))}
        active={maxPrice < priceBounds.max ? 1 : 0}>
        <input type="range" min={300} max={priceBounds.max} step={100} value={maxPrice}
          onChange={(e) => onPrice(Number(e.target.value))} aria-label="Maximum price"
          className="h-1 w-full cursor-pointer appearance-none bg-line accent-signal" />
        <div className="mt-3 flex justify-between font-sans text-[11.5px] font-light text-steel">
          <span>{formatINR(300)}</span><span className="text-chalk">Up to {formatINR(maxPrice)}</span>
        </div>
      </Group>

      {GROUPS.map((g) => (
        <Group key={g.key} label={g.label} open={open[g.key] ?? false}
          onToggle={() => setOpen((o) => ({ ...o, [g.key]: !o[g.key] }))} active={filters[g.key].length}>
          <ul className="space-y-2.5">
            {facets[g.key].map((value) => {
              const checked = filters[g.key].includes(value)
              const n = counts?.[g.key]?.[value] ?? null
              return (
                <li key={value}>
                  <label className="group/f flex cursor-pointer items-center gap-3">
                    <span className={`grid h-[16px] w-[16px] shrink-0 place-items-center border transition-colors duration-300 ${checked ? 'border-chalk bg-chalk' : 'border-line group-hover/f:border-chalk'}`}>
                      {checked && <span className="h-[6px] w-[6px] bg-void" />}
                    </span>
                    <input type="checkbox" className="sr-only" checked={checked} onChange={() => onToggle(g.key, value)} />
                    <span className={`flex-1 font-sans text-[13px] font-light transition-colors duration-300 ${checked ? 'text-chalk' : 'text-concrete group-hover/f:text-chalk'}`}>{value}</span>
                    {n != null && <span className="font-sans text-[11px] font-light tabular-nums text-steel">{n}</span>}
                  </label>
                </li>
              )
            })}
          </ul>
        </Group>
      ))}
    </div>
  )
}

function Group({ label, open, onToggle, children, active }) {
  return (
    <div className="py-5">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between text-left">
        <span className="flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk">
          {label}
          {active > 0 && <span className="grid h-4 min-w-4 place-items-center bg-signal px-1 font-sans text-[9px] leading-none text-void">{active}</span>}
        </span>
        <span className="text-steel">{open ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
