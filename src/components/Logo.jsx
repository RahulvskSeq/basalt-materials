import { Link } from 'react-router-dom'

export default function Logo({ onClick, vertical = false, className = '' }) {
  return (
    <Link to="/" onClick={onClick} aria-label="BASALT — home"
      className={`group inline-flex items-center gap-2.5 ${vertical ? 'flex-col' : ''} ${className}`}>
      <span className="grid h-[18px] w-[18px] shrink-0 place-items-center border-2 border-signal transition-colors duration-500 group-hover:border-chalk">
        <span className="h-[5px] w-[5px] bg-chalk transition-colors duration-500 group-hover:bg-signal" />
      </span>
      <span
        className="font-display text-[17px] font-semibold uppercase leading-none tracking-[0.22em] text-chalk"
        style={vertical ? { writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.3em' } : undefined}
      >
        Basalt
      </span>
    </Link>
  )
}
