import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Check, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import SectionHead from '../components/SectionHead'
import Button from '../components/Button'
import { Reveal } from '../components/Reveal'
import { submitEnquiry } from '../services/api'

const NEEDS = ['Specification', 'Project pricing', 'Architect / studio', 'Trade account', 'Samples', 'Other']
const WHATSAPP = 'https://wa.me/918041002700?text=' + encodeURIComponent('Hello BASALT — I have a specification query.')

const DETAILS = [
  { Icon: Phone, label: 'Phone', value: '+91 80 4200 9000', href: 'tel:+918041002700', note: 'Mon–Sat, 10:00–19:00' },
  { Icon: Mail, label: 'Email', value: 'desk@basalt.co.in', href: 'mailto:desk@basalt.co.in', note: 'We reply within one working day' },
  { Icon: MapPin, label: 'Counter', value: '4 Lavelle Road, Bengaluru 560001', note: 'Counter and test bench on level 1' },
  { Icon: Clock, label: 'Hours', value: 'Monday to Saturday, 10:00 – 19:00', note: 'Closed on public holidays' },
]

export default function Contact() {
  useDocumentTitle('Contact')
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    need: params.get('intent') === 'quote' ? 'Project pricing' : '', message: '',
  })
  const [status, setStatus] = useState('idle')
  const [ref, setRef] = useState('')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const res = await submitEnquiry(form)
    setRef(res.reference)
    setStatus('sent')
  }

  return (
    <PageTransition>
      <section className="bg-void pb-12 pt-14 md:pb-16 md:pt-20">
        <div className="b-shell">
          <SectionHead label="Get in touch" title="Send the drawings"
            intro="We reply within one working day, with a material schedule and the test data behind it." />
        </div>
      </section>

      <section className="bg-void pb-20 md:pb-28">
        <div className="b-shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ul className="border-t border-line">
                {DETAILS.map(({ Icon, label, value, href, note }) => (
                  <li key={label} className="border-b border-line py-6">
                    <div className="flex gap-4">
                      <Icon size={16} strokeWidth={1.4} className="mt-1 shrink-0 text-signal" />
                      <div>
                        <p className="b-meta">{label}</p>
                        {href
                          ? <a href={href} className="b-wipe mt-2 inline-block font-display text-lg font-medium uppercase text-chalk">{value}</a>
                          : <p className="mt-2 font-display text-lg font-medium uppercase leading-snug text-chalk">{value}</p>}
                        <p className="mt-1.5 font-mono text-[11px] font-light text-steel">{note}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP} target="_blank" rel="noreferrer"
                className="group mt-8 flex items-center justify-between gap-4 border border-line px-6 py-4 transition-colors duration-500 ease-hard hover:border-chalk hover:bg-panel">
                <span className="flex items-center gap-3">
                  <MessageCircle size={17} strokeWidth={1.4} className="text-signal" />
                  <span className="font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk">Chat on WhatsApp</span>
                </span>
                <ArrowRight size={15} strokeWidth={1.4} className="text-steel transition-transform duration-500 ease-hard group-hover:translate-x-1" />
              </a>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div key="sent" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="bg-panel p-9 md:p-12">
                    <span className="grid h-12 w-12 place-items-center bg-signal text-void"><Check size={20} strokeWidth={1.6} /></span>
                    <h2 className="b-h1 mt-7 text-chalk">Thank you, {form.name.split(' ')[0] || 'there'}.</h2>
                    <p className="b-body mt-4 max-w-md">
                      Your enquiry is logged as <span className="font-medium text-chalk">{ref}</span>. Someone will
                      call you on {form.phone || 'the number provided'} within one working day.
                    </p>
                    <button type="button" onClick={() => { setStatus('idle'); setForm({ name: '', phone: '', email: '', need: '', message: '' }) }}
                      className="mt-8 font-mono text-[10.5px] font-medium uppercase tracking-wide2 text-chalk underline-offset-4 hover:underline">
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                      <Field label="Name" required value={form.name} onChange={set('name')} placeholder="Your full name" />
                      <Field label="Phone" required type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 00000 00000" />
                    </div>
                    <Field label="Email" required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
                    <div>
                      <p className="b-meta mb-4">Enquiry type</p>
                      <div className="flex flex-wrap gap-2">
                        {NEEDS.map((n) => (
                          <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, need: n }))}
                            className={`border px-5 py-2.5 font-mono text-[11px] font-light transition-all duration-400 ease-hard ${form.need === n ? 'border-chalk bg-chalk text-void' : 'border-line text-concrete hover:border-chalk hover:text-chalk'}`}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="b-meta mb-4 block">Message</label>
                      <textarea id="message" rows={5} value={form.message} onChange={set('message')}
                        placeholder="Scope, programme, and anything already specified. Attach drawings by email if easier."
                        className="w-full border border-line bg-panel p-4 font-sans text-[15px] font-light text-chalk outline-none transition-colors duration-300 placeholder:text-steel focus:border-chalk" />
                    </div>
                    <div className="flex flex-wrap items-center gap-6 pt-1">
                      <Button as="button" type="submit" variant="solid" size="lg" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                      </Button>
                      <p className="max-w-xs font-sans text-[11.5px] font-light leading-relaxed text-steel">
                        A demonstration form — nothing is transmitted or stored.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder, required }) {
  const id = label.toLowerCase()
  return (
    <div>
      <label htmlFor={id} className="b-meta mb-4 block">{label}{required && <span className="ml-1 text-signal">*</span>}</label>
      <input id={id} type={type} required={required} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full border border-line bg-panel px-4 py-3.5 font-sans text-[15px] font-light text-chalk outline-none transition-colors duration-300 placeholder:text-steel focus:border-chalk" />
    </div>
  )
}
