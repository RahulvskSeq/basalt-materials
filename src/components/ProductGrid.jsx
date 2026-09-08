import ProductCard from './ProductCard'

export default function ProductGrid({ products, columns = 'default', className = '' }) {
  const cols = columns === 'wide'
    ? 'grid-cols-2 md:grid-cols-3 2xl:grid-cols-4'
    : 'grid-cols-2 md:grid-cols-3'
  return (
    <div className={`grid gap-px bg-line ${cols} ${className}`}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
    </div>
  )
}
