import { Link } from 'react-router-dom'

const base =
  'group/b inline-flex items-center justify-center gap-2.5 whitespace-nowrap border font-mono ' +
  'font-medium uppercase tracking-wide2 transition-colors duration-400 ease-hard ' +
  'disabled:cursor-not-allowed disabled:opacity-40'

const sizes = { sm: 'px-5 py-2.5 text-[10px]', md: 'px-7 py-3.5 text-[10.5px]', lg: 'px-8 py-4 text-[11px]' }

const variants = {
  solid: 'border-chalk bg-chalk text-void hover:border-signal hover:bg-signal hover:text-void',
  signal: 'border-signal bg-signal text-void hover:border-chalk hover:bg-chalk hover:text-void',
  outline: 'border-line text-chalk hover:border-chalk',
  ghost: 'border-transparent px-0 text-concrete hover:text-chalk',
}

export default function Button({ as, to, href, variant = 'solid', size = 'md', className = '', children, ...props }) {
  const cls = [base, sizes[size], variants[variant], className].join(' ')
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>
  if (href) return <a href={href} className={cls} {...props}>{children}</a>
  const Tag = as || 'button'
  return <Tag className={cls} {...props}>{children}</Tag>
}
