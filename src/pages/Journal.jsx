import { useMemo, useState } from 'react'
import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import JournalCard from '../components/JournalCard'
import SectionHead from '../components/SectionHead'
import Newsletter from '../components/Newsletter'
import { journal } from '../data/journal'

const CATS = ['All', 'Surfaces', 'Substrate', 'Motion', 'Method']

export default function Journal() {
  useDocumentTitle('Journal')
  const [filter, setFilter] = useState('All')
  const visible = useMemo(() => (filter === 'All' ? journal : journal.filter((a) => a.category === filter)), [filter])
  const [lead, ...rest] = visible

  return (
    <PageTransition>
      <section className="bg-void pb-10 pt-14 md:pb-14 md:pt-20">
        <div className="b-shell">
          <SectionHead label="The journal" title="Notes on getting it right"
            intro="Practical writing on surfaces, boards and fittings, from the people who specify them every day." />
        </div>
      </section>

      <div className="border-y border-line bg-void">
        <div className="b-shell no-bar flex justify-center gap-2 overflow-x-auto py-3">
          {CATS.map((c) => (
            <button key={c} type="button" onClick={() => setFilter(c)}
              className={`shrink-0 whitespace-nowrap px-5 py-2 font-mono text-[10.5px] font-medium uppercase tracking-wide2 transition-colors duration-300 ${filter === c ? 'bg-chalk text-void' : 'text-concrete hover:bg-panel hover:text-chalk'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {lead && (
        <section className="bg-void py-14 md:py-20">
          <div className="b-shell"><JournalCard article={lead} layout="lead" /></div>
        </section>
      )}

      <section className="bg-panel py-14 md:py-20">
        <div className="b-shell">
          {rest.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {rest.map((a, i) => <JournalCard key={a.id} article={a} index={i} />)}
            </div>
          ) : (
            <p className="b-body text-center">No further articles in this category yet.</p>
          )}
        </div>
      </section>

      <section className="bg-void py-16 md:py-20">
        <div className="b-shell max-w-4xl"><Newsletter /></div>
      </section>
    </PageTransition>
  )
}
