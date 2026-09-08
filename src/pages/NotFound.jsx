import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Button from '../components/Button'
import { img, IMG } from '../data/images'

export default function NotFound() {
  useDocumentTitle('Not found')
  return (
    <PageTransition>
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-void">
        <img src={img(IMG.facadeBlue, 1800)} alt="" aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/40" />
        <div className="b-shell relative">
          <p className="b-meta mb-6"><span className="text-signal">ERR</span> / 404</p>
          <h1 className="b-display text-chalk">404</h1>
          <p className="b-body mt-7 max-w-md">
            No reference at this address. It has been moved, renamed, or never entered the index.
          </p>
          <div className="mt-9 flex flex-col gap-2.5 sm:flex-row">
            <Button to="/" variant="solid" size="lg">Return to home</Button>
            <Button to="/shop" variant="outline" size="lg">Open the index</Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
