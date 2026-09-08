import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'

/** Numbered, hairline-ruled section header — reads like a drawing sheet. */
export default function SectionHead({ index, label, title, intro, linkTo, linkLabel, className = '' }) {
  return (
    <div className={className}>
      <div className="b-hair mb-6" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-3xl">
          <Reveal y={10}>
            <p className="b-meta mb-5">
              {index && <span className="text-signal">{index}</span>} {index && '/ '}{label}
            </p>
          </Reveal>
          <Reveal y={16} delay={0.05}><h2 className="b-h1 text-chalk">{title}</h2></Reveal>
        </div>
        {(intro || linkTo) && (
          <div className="max-w-sm lg:pb-2">
            {intro && <Reveal y={14} delay={0.1}><p className="b-body">{intro}</p></Reveal>}
            {linkTo && (
              <Reveal y={12} delay={0.16}>
                <Link to={linkTo} className="group mt-6 inline-flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk">
                  <span className="b-wipe">{linkLabel}</span>
                  <ArrowRight size={14} strokeWidth={1.6} className="text-signal transition-transform duration-400 ease-hard group-hover:translate-x-1" />
                </Link>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
