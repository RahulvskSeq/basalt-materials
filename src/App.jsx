import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Nav from './components/Nav'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import QuickView from './components/QuickView'
import SearchOverlay from './components/SearchOverlay'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

const Shop = lazy(() => import('./pages/Shop'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Journal = lazy(() => import('./pages/Journal'))
const Article = lazy(() => import('./pages/Article'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col bg-void">
      <ScrollToTop />
      <Nav />
      {/* Content clears the fixed rail at xl and above */}
      <div className="b-page flex flex-1 flex-col">
        <Suspense fallback={<div className="min-h-[70svh] bg-void" aria-hidden="true" />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:id" element={<Article />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
      </div>
      <CartDrawer />
      <QuickView />
      <SearchOverlay />
    </div>
  )
}
