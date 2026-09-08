import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import JournalCard from '../components/JournalCard'
import Newsletter from '../components/Newsletter'
import { Reveal, RevealImage } from '../components/Reveal'
import { journalById, journal } from '../data/journal'
import { img } from '../data/images'

export default function Article() {
  const { id } = useParams()
  const article = journalById[id]
  useDocumentTitle(article ? article.title : 'Journal')
  if (!article) return <Navigate to="/journal" replace />
  const more = journal.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <PageTransition>
      <article className="bg-void pt-12 md:pt-16">
        <div className="b-shell">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wide2 text-steel">
            <Link to="/" className="transition-colors hover:text-chalk">Home</Link><span className="opacity-50">/</span>
            <Link to="/journal" className="transition-colors hover:text-chalk">Journal</Link><span className="opacity-50">/</span>
            <span className="text-chalk">{article.category}</span>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <Reveal y={10}><p className="b-meta mb-5">{article.category} · {article.readTime}</p></Reveal>
            <Reveal y={18}><h1 className="b-h1 text-chalk">{article.title}</h1></Reveal>
            <Reveal y={14} delay={0.1}>
              <p className="mt-6 font-sans text-[12px] uppercase tracking-wide2 text-steel">{article.author} · {article.date}</p>
            </Reveal>
          </div>

          <div className="mt-12">
            <RevealImage src={img(article.image, 1800)} alt={article.title} className="aspect-[16/9]" />
          </div>

          <div className="mx-auto mt-14 max-w-reading">
            <Reveal>
              <p className="font-display text-[22px] font-light leading-[1.5] text-chalk md:text-[26px]">{article.excerpt}</p>
            </Reveal>
            <div className="mt-9 space-y-6">
              {article.body.map((para, i) => (
                <Reveal key={i} y={14} delay={Math.min(i, 4) * 0.03}>
                  <p className="font-sans text-[16px] font-light leading-[1.9] text-concrete md:text-[17px]">{para}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-14 border-t border-line pt-8">
              <Link to="/journal" className="group inline-flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk">
                <ArrowLeft size={14} strokeWidth={1.4} className="transition-transform duration-500 ease-hard group-hover:-translate-x-1" />
                <span className="b-wipe">Back to the journal</span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-panel py-16 md:py-20">
        <div className="b-shell">
          <p className="b-meta mb-10">Keep reading</p>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {more.map((a, i) => <JournalCard key={a.id} article={a} index={i} />)}
          </div>
        </div>
      </section>

      <section className="bg-void py-16"><div className="b-shell max-w-4xl"><Newsletter /></div></section>
    </PageTransition>
  )
}
