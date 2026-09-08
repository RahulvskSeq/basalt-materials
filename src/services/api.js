import { products, productById, relatedTo, facets, priceBounds } from '../data/products'
import { categories, categoryById } from '../data/categories'
import { collections } from '../data/collections'
import { projects, projectById } from '../data/projects'
import { journal, journalById } from '../data/journal'

/**
 * Demo data access layer.
 *
 * Everything resolves from local data files, but the surface is promise-based
 * and mirrors what a real catalogue API would expose — so swapping in a live
 * backend later is a change in this file only.
 */
const latency = 0
const resolve = (value) =>
  latency ? new Promise((r) => setTimeout(() => r(value), latency)) : Promise.resolve(value)

const norm = (s) => String(s ?? '').toLowerCase().trim()

/** Free-text search across name, code, finish, colour, collection and category. */
export function searchProducts(query, list = products) {
  const q = norm(query)
  if (!q) return list
  const terms = q.split(/\s+/)
  return list.filter((p) => {
    const haystack = norm(
      [p.name, p.code, p.category, p.collection, p.finish, p.color, p.material, p.brand]
        .concat(p.tags ?? [])
        .join(' ')
    )
    return terms.every((t) => haystack.includes(t))
  })
}

export const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
]

const sorters = {
  featured: (a, b) =>
    Number(b.featured) - Number(a.featured) ||
    Number(b.bestseller) - Number(a.bestseller) ||
    b.rating - a.rating,
  newest: (a, b) => Number(b.isNew) - Number(a.isNew) || b.reviews - a.reviews,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
}

/**
 * Filter + sort in one pass.
 * `filters` values are arrays; an empty array means "no constraint".
 */
export function queryProducts({
  query = '',
  category = [],
  brand = [],
  finish = [],
  color = [],
  material = [],
  thickness = [],
  availability = [],
  maxPrice = priceBounds.max,
  sort = 'featured',
} = {}) {
  const matches = (list, value) => list.length === 0 || list.includes(value)

  const result = searchProducts(query).filter(
    (p) =>
      matches(category, p.category) &&
      matches(brand, p.brand) &&
      matches(finish, p.finish) &&
      matches(color, p.color) &&
      matches(material, p.material) &&
      matches(thickness, p.thickness) &&
      matches(availability, p.availability) &&
      p.price <= maxPrice
  )

  return [...result].sort(sorters[sort] ?? sorters.featured)
}

/* ---------------- Promise-shaped reads ---------------- */
export const getProducts = () => resolve(products)
export const getProduct = (id) => resolve(productById[id] ?? null)
export const getRelated = (product, limit) => resolve(relatedTo(product, limit))
export const getCategories = () => resolve(categories)
export const getCategory = (id) => resolve(categoryById[id] ?? null)
export const getCollections = () => resolve(collections)
export const getProjects = () => resolve(projects)
export const getProject = (id) => resolve(projectById[id] ?? null)
export const getJournal = () => resolve(journal)
export const getArticle = (id) => resolve(journalById[id] ?? null)

/** Demo form handler — resolves with a reference number, never posts anywhere. */
export const submitEnquiry = (payload) =>
  new Promise((r) =>
    setTimeout(
      () =>
        r({
          ok: true,
          reference: 'ARV-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
          received: payload,
        }),
      900
    )
  )

export { facets, priceBounds }
