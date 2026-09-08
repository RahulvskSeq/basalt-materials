import { formatINR } from '../data/products'

export default function Price({ product, size = 'md', className = '' }) {
  const s = size === 'lg'
    ? { now: 'text-[26px] md:text-[32px]', was: 'text-[13px]', off: 'text-[10.5px]' }
    : { now: 'text-[16px]', was: 'text-[11.5px]', off: 'text-[10px]' }
  return (
    <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <span className={`font-mono font-medium tabular-nums text-chalk ${s.now}`}>{formatINR(product.price)}</span>
      <span className={`font-mono font-light tabular-nums text-steel line-through ${s.was}`}>{formatINR(product.mrp)}</span>
      <span className={`font-mono font-medium uppercase tracking-wide2 text-signal ${s.off}`}>−{product.discount}%</span>
    </div>
  )
}
