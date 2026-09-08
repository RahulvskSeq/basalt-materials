import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Hero from '../components/Hero'
import SectionHead from '../components/SectionHead'
import CategoryRow from '../components/CategoryRow'
import ProductCard from '../components/ProductCard'
import ProjectCard from '../components/ProjectCard'
import JournalCard from '../components/JournalCard'
import Stats from '../components/Stats'
import Button from '../components/Button'
import { Reveal, RevealImage } from '../components/Reveal'
import { categories } from '../data/categories'
import { collections } from '../data/collections'
import { bestsellers } from '../data/products'
import { projects } from '../data/projects'
import { journal } from '../data/journal'
import { img, IMG } from '../data/images'

export default function Home() {
  useDocumentTitle(null)
  return (
    <PageTransition>
      <Hero />

      {/* Index of materials, as a table */}
      <section id="index" className="scroll-mt-20 bg-void py-16 md:py-24">
        <div className="b-shell">
          <SectionHead index="01" label="Index" title="Six material families"
            intro="Everything a fit-out needs, specified to the same standard and held under one roof."
            linkTo="/shop" linkLabel="Open the full index" />
          <ul className="mt-12 border-t border-line">
            {categories.map((c, i) => <CategoryRow key={c.id} category={c} index={i} />)}
          </ul>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-panel py-16 md:py-24">
        <div className="b-shell">
          <SectionHead index="02" label="Collections" title="Six surface programmes"
            linkTo="/shop" linkLabel="Browse surfaces" />
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c, i) => (
              <Reveal key={c.id} y={16} delay={Math.min(i, 5) * 0.05}>
                <article className="group h-full bg-void">
                  <div className="b-frame aspect-[4/3]">
                    <img src={img(c.image, 800)} alt={`${c.name} collection`} loading="lazy"
                      className="opacity-80 transition-all duration-[1100ms] ease-hard group-hover:scale-105 group-hover:opacity-100" />
                    <span className="absolute left-0 top-0 bg-void/85 px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-wide2 text-signal backdrop-blur-sm">
                      {c.index}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="b-h3 text-chalk">{c.name}</h3>
                      <span className="font-mono text-[10px] uppercase tracking-wide2 text-steel">{c.count}</span>
                    </div>
                    <p className="mt-3 font-sans text-[13px] font-light leading-relaxed text-concrete">{c.note}</p>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-wide2 text-steel">{c.finish}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="bg-void py-16 md:py-24">
        <div className="b-shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead index="03" label="Method" title="Specified by data, not by mood" />
              <Reveal y={14} delay={0.1}>
                <p className="b-body mt-8 max-w-md">
                  Every board is pulled from the line for a boil test, a screw-withdrawal test and a
                  calibration pass. Every hardware reference is cycle-tested before it enters the index.
                  What fails does not reach the warehouse.
                </p>
              </Reveal>
              <Reveal y={14} delay={0.18}>
                <dl className="mt-10 grid grid-cols-2 gap-px bg-line">
                  {[['72 hrs', 'Boil test, IS 710'], ['80,000', 'Hardware cycles'],
                    ['0.2 mm', 'Emboss registration'], ['3–5 d', 'Dispatch, 110 cities']].map(([n, l]) => (
                    <div key={n} className="bg-void p-5">
                      <dt className="font-display text-[26px] font-semibold tabular-nums text-chalk">{n}</dt>
                      <dd className="mt-2 font-mono text-[10px] uppercase tracking-wide2 text-steel">{l}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <div className="grid h-fit grid-cols-2 gap-px self-start bg-line lg:col-span-7">
              <RevealImage src={img(IMG.surfaceBlack, 800)} alt="Detail of a deep matt black surface" className="aspect-[3/4]" />
              <RevealImage src={img(IMG.drawings, 800)} alt="Joinery drawings on a studio desk" className="aspect-[3/4]" delay={0.08} />
            </div>
          </div>
        </div>
      </section>

      {/* Core references */}
      <section className="bg-panel py-16 md:py-24">
        <div className="b-shell">
          <SectionHead index="04" label="Core references" title="What gets specified most"
            linkTo="/shop" linkLabel="All references" />
          <div className="mt-12 md:hidden">
            <div className="no-bar snap-row -mx-5 flex gap-px overflow-x-auto px-5 scroll-pl-5">
              {bestsellers.map((p, i) => (
                <div key={p.id} className="snap-cell w-[62vw] shrink-0"><ProductCard product={p} index={i} /></div>
              ))}
              <div className="w-1 shrink-0" aria-hidden="true" />
            </div>
            <p className="b-meta mt-6">Swipe →</p>
          </div>
          <div className="mt-12 hidden gap-px bg-line md:grid md:grid-cols-3 2xl:grid-cols-4">
            {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      <Stats />

      {/* Work */}
      <section className="bg-void py-16 md:py-24">
        <div className="b-shell">
          <SectionHead index="05" label="Selected work" title="Where it was specified"
            linkTo="/projects" linkLabel="All work" />
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
            {projects.slice(0, 3).map((p, i) => (
              <div key={p.id} className={i === 0 ? 'md:col-span-2' : ''}>
                <ProjectCard project={p} index={i} wide={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="bg-panel py-16 md:py-24">
        <div className="b-shell">
          <SectionHead index="06" label="Technical notes" title="Written for people who draw"
            linkTo="/journal" linkLabel="All notes" />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {journal.slice(0, 3).map((a, i) => <JournalCard key={a.id} article={a} index={i} />)}
          </div>
        </div>
      </section>

      {/* Trade CTA */}
      <section className="border-y border-line bg-void py-16 md:py-20">
        <div className="b-shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="b-meta mb-5"><span className="text-signal">07</span> / Specification desk</p>
            <h2 className="b-h1 max-w-2xl text-chalk">Send us the drawings, get a material schedule.</h2>
          </div>
          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
            <Button to="/contact?intent=quote" variant="signal" size="lg">Request pricing</Button>
            <Button href="tel:+918042009000" variant="outline" size="lg">+91 80 4200 9000</Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
