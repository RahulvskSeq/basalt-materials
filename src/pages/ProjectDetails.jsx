import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProjectCard from '../components/ProjectCard'
import Button from '../components/Button'
import { Reveal, RevealImage } from '../components/Reveal'
import { projectById, projects } from '../data/projects'
import { img } from '../data/images'

export default function ProjectDetails() {
  const { id } = useParams()
  const project = projectById[id]
  useDocumentTitle(project ? project.name : 'Project')
  if (!project) return <Navigate to="/projects" replace />

  const same = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 2)
  const more = same.length ? same : projects.filter((p) => p.id !== project.id).slice(0, 2)

  return (
    <PageTransition>
      <section className="bg-void pt-12 md:pt-16">
        <div className="b-shell">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wide2 text-steel">
            <Link to="/" className="transition-colors hover:text-chalk">Home</Link><span className="opacity-50">/</span>
            <Link to="/projects" className="transition-colors hover:text-chalk">Projects</Link><span className="opacity-50">/</span>
            <span className="text-chalk">{project.name}</span>
          </nav>
          <div className="max-w-3xl">
            <Reveal y={10}><p className="b-meta mb-5">{project.category} · {project.year}</p></Reveal>
            <Reveal y={18}><h1 className="b-h1 text-chalk">{project.name}</h1></Reveal>
            <Reveal y={16} delay={0.1}><p className="b-body mt-6">{project.summary}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-void py-12 md:py-16">
        <div className="b-shell">
          <RevealImage src={img(project.image, 1800)} alt={project.name} className="aspect-[16/9]" />
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 border-y border-line py-10 md:grid-cols-4">
            {[['Location', project.location], ['Area', project.area], ['Studio', project.studio], ['Completed', project.year]].map(([k, v]) => (
              <div key={k}>
                <dt className="b-meta mb-2.5">{k}</dt>
                <dd className="b-h3 text-chalk">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="b-h2 text-chalk">The approach</h2>
                <p className="b-body mt-6">{project.summary}</p>
                <p className="b-body mt-5">
                  Material selection ran alongside the joinery drawings rather than after them, so every
                  shutter size, edge condition and hardware clearance was resolved before the first sheet
                  was cut. We held the schedule from tender through to snagging.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="b-meta mb-5">Materials specified</p>
                <ul className="border-t border-line">
                  {project.materials.map((m) => (
                    <li key={m} className="border-b border-line py-4">
                      <Link to={`/shop?q=${encodeURIComponent(m.split(' ').slice(0, 2).join(' '))}`} className="group flex items-center justify-between gap-4">
                        <span className="font-sans text-[14px] font-light text-concrete transition-colors group-hover:text-chalk">{m}</span>
                        <ArrowRight size={14} strokeWidth={1.4} className="shrink-0 text-steel transition-transform duration-500 ease-hard group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-12 md:gap-7">
            <RevealImage src={img(project.gallery[0], 1200)} alt={`${project.name} interior`} className="aspect-[4/3] md:col-span-7" />
            <RevealImage src={img(project.gallery[1], 900)} alt={`${project.name} detail`} className="aspect-[3/4] md:col-span-5 md:mt-12" delay={0.08} />
            <RevealImage src={img(project.gallery[2], 1400)} alt={`${project.name} secondary space`} className="aspect-[16/9] md:col-span-12" delay={0.04} />
          </div>
        </div>
      </section>

      <section className="bg-panel py-16 md:py-24">
        <div className="b-shell">
          <div className="mb-12 flex items-end justify-between gap-8">
            <h2 className="b-h2 text-chalk">More projects</h2>
            <Link to="/projects" className="group inline-flex shrink-0 items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk">
              <ArrowLeft size={14} strokeWidth={1.4} className="transition-transform duration-500 ease-hard group-hover:-translate-x-1" />
              <span className="b-wipe">All projects</span>
            </Link>
          </div>
          <div className="grid gap-14 md:grid-cols-2 md:gap-8">
            {more.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      <section className="bg-void py-16">
        <div className="b-shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="b-h2 max-w-xl text-chalk">Something similar in mind?</p>
          <Button to="/contact" variant="solid" size="lg" className="shrink-0">Start a conversation</Button>
        </div>
      </section>
    </PageTransition>
  )
}
