import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bookmark, ShoppingBag, Menu } from 'lucide-react'
import { PRIMARY } from './navLinks'
import { useStore } from '../context/StoreContext'
import { useMediaQuery } from '../hooks/useMediaQuery'
import MobileMenu from './MobileMenu'
import Logo from './Logo'

/**
 * Two navigations for one site: a fixed vertical rail at xl and above — the
 * defining move of this direction — and a conventional top bar below it.
 */
export default function Nav() {
  const { pathname, search } = useLocation()
  const { count, wishlist, setSearchOpen, setCartOpen, pulse } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const isWide = useMediaQuery('(min-width: 1280px)')
  useEffect(() => { if (isWide) setMenuOpen(false) }, [isWide])
  useEffect(() => { setMenuOpen(false) }, [pathname, search])

  const utilities = (
    <>
      <IconButton label="Search products" onClick={() => setSearchOpen(true)}><Search size={17} strokeWidth={1.6} /></IconButton>
      <IconLink to="/wishlist" label={`Wishlist, ${wishlist.length} items`} badge={wishlist.length}>
        <Bookmark size={17} strokeWidth={1.6} />
      </IconLink>
      <IconButton label={`Open cart, ${count} items`} onClick={() => setCartOpen(true)} badge={count}>
        <motion.span key={pulse} initial={pulse ? { scale: 0.8 } : false} animate={{ scale: 1 }}
          transition={{ duration: 0.35 }} className="flex"><ShoppingBag size={17} strokeWidth={1.6} /></motion.span>
      </IconButton>
    </>
  )

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-[80] hidden w-rail flex-col items-center justify-between border-r border-line bg-void py-7 xl:flex">
        <Logo vertical />
        <nav>
          <ul className="flex flex-col items-center gap-7">
            {PRIMARY.map((l) => (
              <li key={l.label}>
                <NavLink to={l.to} className={({ isActive }) =>
                  `group flex flex-col items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wide2 transition-colors duration-300 ${isActive ? 'text-chalk' : 'text-steel hover:text-chalk'}`}>
                  <span className="text-[9px] text-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100">{l.code}</span>
                  <span style={{ writingMode: 'vertical-rl' }}>{l.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col items-center gap-1">{utilities}</div>
      </aside>

      {/* Mobile / tablet bar */}
      <header className="sticky top-0 z-[80] border-b border-line bg-void/95 backdrop-blur-md xl:hidden">
        <div className="b-shell flex items-center justify-between py-4">
          <Logo />
          <div className="flex items-center gap-1">
            {utilities}
            <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"
              className="ml-1 grid h-10 w-10 place-items-center text-chalk transition-colors duration-300 hover:text-signal">
              <Menu size={19} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function IconButton({ children, onClick, label, badge }) {
  return (
    <button type="button" onClick={onClick} aria-label={label}
      className="relative grid h-10 w-10 place-items-center text-chalk transition-colors duration-300 hover:text-signal">
      {children}
      <Badge value={badge} />
    </button>
  )
}

function IconLink({ children, to, label, badge }) {
  return (
    <Link to={to} aria-label={label}
      className="relative grid h-10 w-10 place-items-center text-chalk transition-colors duration-300 hover:text-signal">
      {children}
      <Badge value={badge} />
    </Link>
  )
}

function Badge({ value }) {
  return (
    <AnimatePresence>
      {value > 0 && (
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.25 }}
          className="absolute right-0.5 top-1 grid h-[15px] min-w-[15px] place-items-center bg-signal px-1 font-mono text-[9px] font-medium leading-none text-void">
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
