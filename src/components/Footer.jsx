import { Link } from 'react-router-dom'
import { Instagram, Linkedin, Youtube } from 'lucide-react'
import Newsletter from './Newsletter'
import Logo from './Logo'
import { CATEGORY_LINKS, PRIMARY } from './navLinks'

const HELP = [
  { label: 'Delivery', to: '/contact' }, { label: 'Samples', to: '/contact' },
  { label: 'Warranty', to: '/contact' }, { label: 'Trade terms', to: '/contact' },
]
const SOCIAL = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/' },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-void">
      <div className="b-shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="b-body mt-6 max-w-xs">
              Engineered surfaces, structural boards and precision hardware.
              Held in Bengaluru, supplied nationally since 2009.
            </p>
            <div className="mt-8 flex gap-px">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`BASALT on ${label}`}
                  className="grid h-10 w-10 place-items-center bg-panel text-concrete transition-colors duration-400 hover:bg-signal hover:text-void">
                  <Icon size={15} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <Column title="Index" links={CATEGORY_LINKS} />
            <Column title="Studio" links={PRIMARY} />
            <Column title="Support" links={HELP} />
          </div>

          <div className="lg:col-span-3">
            <Newsletter />
            <div className="mt-10 space-y-1.5 border-t border-line pt-7 font-mono text-[12px]">
              <a href="tel:+918042009000" className="block text-concrete transition-colors hover:text-chalk">+91 80 4200 9000</a>
              <a href="mailto:desk@basalt.co.in" className="block text-concrete transition-colors hover:text-chalk">desk@basalt.co.in</a>
              <p className="pt-1 leading-relaxed text-steel">4 Lavelle Road, Bengaluru 560001</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-steel">© {new Date().getFullYear()} Basalt Materials Pvt. Ltd.</p>
          <div className="flex flex-wrap gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((t) => (
              <Link key={t} to="/contact" className="b-wipe font-mono text-[11px] text-steel transition-colors hover:text-concrete">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function Column({ title, links }) {
  return (
    <div>
      <p className="b-meta mb-5">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="b-wipe font-mono text-[12px] uppercase tracking-wide2 text-concrete transition-colors duration-300 hover:text-chalk">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
