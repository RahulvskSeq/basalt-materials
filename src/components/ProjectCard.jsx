import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { img } from '../data/images'

const HARD = [0.65, 0, 0.35, 1]

export default function ProjectCard({ project, index = 0, wide = false }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: Math.min(index, 4) * 0.05, ease: HARD }}
      className="group">
      <Link to={`/projects/${project.id}`} className="block">
        <div className={`b-frame ${wide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <img src={img(project.image, wide ? 1500 : 900)} alt={`${project.name}, ${project.location}`} loading="lazy"
            className="opacity-85 transition-all duration-[1100ms] ease-hard group-hover:scale-[1.04] group-hover:opacity-100" />
          <span className="absolute left-0 top-0 bg-void/85 px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-wide2 text-chalk backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        <div className="flex items-start justify-between gap-6 border-t border-line pt-5">
          <div className="min-w-0">
            <h3 className="b-h2 text-chalk"><span className="b-wipe">{project.name}</span></h3>
            <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-wide2 text-steel">
              {project.location} — {project.area} — {project.year}
            </p>
            <p className="mt-3.5 max-w-xl font-sans text-[13.5px] font-light leading-relaxed text-concrete">{project.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-px">
              {project.materials.map((m) => (
                <li key={m} className="bg-panel px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-wide2 text-concrete">{m}</li>
              ))}
            </ul>
          </div>
          <ArrowUpRight size={18} strokeWidth={1.6} className="mt-1 shrink-0 text-steel transition-all duration-400 ease-hard group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
        </div>
      </Link>
    </motion.article>
  )
}
