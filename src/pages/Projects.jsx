import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProjectCard from '../components/ProjectCard'
import SectionHead from '../components/SectionHead'
import Button from '../components/Button'
import { projects, projectCategories } from '../data/projects'

export default function Projects() {
  useDocumentTitle('Projects')
  const [filter, setFilter] = useState('All')
  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter])

  return (
    <PageTransition>
      <section className="bg-void pb-10 pt-14 md:pb-14 md:pt-20">
        <div className="b-shell">
          <SectionHead label="Selected work" title="Rooms our materials went into"
            intro="A small selection of the projects our surfaces, boards and fittings were specified for — credited to the studios who drew them." />
        </div>
      </section>

      <div className="sticky top-[68px] z-[60] border-y border-line bg-void/95 backdrop-blur-md md:top-[76px]">
        <div className="b-shell no-bar flex justify-center gap-2 overflow-x-auto py-3">
          {projectCategories.map((c) => (
            <button key={c} type="button" onClick={() => setFilter(c)}
              className={`shrink-0 whitespace-nowrap px-5 py-2 font-mono text-[10.5px] font-medium uppercase tracking-wide2 transition-colors duration-300 ${filter === c ? 'bg-chalk text-void' : 'text-concrete hover:bg-panel hover:text-chalk'}`}>
              {c}
              <span className="ml-2 opacity-60">{c === 'All' ? projects.length : projects.filter((p) => p.category === c).length}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="bg-void py-16 md:py-20">
        <div className="b-shell">
          <motion.div layout className="grid gap-14 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.28 } }}
                  className={i % 3 === 0 ? 'md:col-span-2' : ''}>
                  <ProjectCard project={p} index={i} wide={i % 3 === 0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="bg-panel py-16 md:py-20">
        <div className="b-shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="b-h2 max-w-xl text-chalk">Working on something? Send us the drawings.</p>
          <Button to="/contact" variant="solid" size="lg" className="shrink-0">Talk to us</Button>
        </div>
      </section>
    </PageTransition>
  )
}
