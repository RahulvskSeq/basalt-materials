import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import SectionHead from '../components/SectionHead'
import Stats from '../components/Stats'
import Button from '../components/Button'
import { Reveal, RevealImage } from '../components/Reveal'
import { img, IMG } from '../data/images'

const PRINCIPLES = [
  ['01', 'Test, then stock', 'Every batch is pulled from the line for immersion, screw-withdrawal and calibration before it enters the index. Failures are returned, not discounted.'],
  ['02', 'Publish the numbers', 'Load ratings, cycle counts and EN 438 classes appear on every reference. If we will not print a figure, we will not claim it.'],
  ['03', 'Hold the detail', 'We keep the specification from tender to snagging, so the schedule that leaves the studio is the schedule that arrives on site.'],
]

const TIMELINE = [
  ['2009', 'Founded', 'A trade counter on Lavelle Road supplying four architecture practices who were tired of being sold on finish alone.'],
  ['2013', 'Test bench', 'We stop taking supplier datasheets on trust and start running our own immersion and withdrawal tests in house.'],
  ['2017', 'Motion division', 'Hinges, runners and lift systems added, specified and catalogued by load rating rather than by finish family.'],
  ['2021', 'National stock', 'Warehousing in five cities brings dispatch anywhere in India to three to five working days.'],
  ['2025', 'The index', 'One thousand and twenty references, each with published test data and a named substrate.'],
]

export default function About() {
  useDocumentTitle('Studio')
  return (
    <PageTransition>
      <section className="bg-void pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="b-shell">
          <SectionHead index="01" label="Since 2009" title="A materials supplier that behaves like an engineer"
            intro="BASALT exists because specification in this industry is mostly done on finish. We think it should be done on numbers, and we publish ours." />
          <div className="mt-12">
            <RevealImage src={img(IMG.facadeDark, 1800)} alt="A dark timber and glass facade at dusk" className="aspect-[21/9]" />
          </div>
        </div>
      </section>

      <section className="bg-panel py-16 md:py-24">
        <div className="b-shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHead index="02" label="Position" title="Basalt is the most common rock on earth" />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <p className="b-body">
                  It is also among the most durable — dense, fine-grained, and formed under pressure.
                  Nobody specifies it for glamour. They specify it because it holds.
                </p>
                <p className="b-body mt-5">
                  That is the position we take on interior materials. Our index is organised by what a
                  material has to do rather than by what it looks like, and every reference carries the
                  test data that justifies its place in it. If a board cannot show a screw-withdrawal
                  figure, it does not go in.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-line md:grid-cols-3">
            {PRINCIPLES.map(([n, title, body], i) => (
              <Reveal key={n} delay={i * 0.06}>
                <div className="h-full bg-panel p-8">
                  <p className="font-mono text-[11px] text-signal">{n}</p>
                  <h3 className="b-h3 mt-4 text-chalk">{title}</h3>
                  <p className="mt-3.5 font-sans text-[13.5px] font-light leading-relaxed text-concrete">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <section className="bg-void py-16 md:py-24">
        <div className="b-shell">
          <SectionHead index="03" label="Record" title="Sixteen years" />
          <ol className="mt-12 border-t border-line">
            {TIMELINE.map(([year, title, body], i) => (
              <Reveal key={year} y={14} delay={Math.min(i, 4) * 0.04}>
                <li className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8">
                  <span className="font-mono text-[13px] text-signal md:col-span-2">{year}</span>
                  <h3 className="b-h3 text-chalk md:col-span-4">{title}</h3>
                  <p className="font-sans text-[13.5px] font-light leading-relaxed text-concrete md:col-span-6">{body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-panel py-16 md:py-24">
        <div className="b-shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <RevealImage src={img(IMG.drawings, 1400)} alt="Joinery drawings under review" className="aspect-[4/3]" />
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <p className="b-meta mb-5"><span className="text-signal">04</span> / Counter</p>
                <h2 className="b-h1 text-chalk">Bring the drawings, not the moodboard.</h2>
                <p className="b-body mt-7 max-w-md">
                  The Lavelle Road counter holds a full sample library, a working carcass rig and the
                  test bench. We would rather review a section drawing than a Pinterest board.
                </p>
                <div className="mt-9 flex flex-col gap-2.5 sm:flex-row">
                  <Button to="/contact" variant="signal">Book the counter</Button>
                  <Button to="/projects" variant="outline">Selected work</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
