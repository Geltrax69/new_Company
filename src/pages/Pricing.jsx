import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import PricingCard from '../components/PricingCard.jsx'
import Reveal from '../components/Reveal.jsx'
import FaqItem from '../components/FaqItem.jsx'
import Section from '../components/Section.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

const PLANS = [
  {
    name: 'Light', blurb: 'For startups needing flexible, ongoing design support.',
    monthly: 1495, annually: 1196,
    features: ['Social media creatives', 'Banners & ads', 'Packaging & merch', 'Email design', 'Brochures & flyers', 'Photo editing'],
  },
  {
    name: 'Pro', blurb: 'For teams that want product design and brand work too.',
    monthly: 2995, annually: 2396, featured: true,
    features: ['All Light tasks', 'UI/UX design', 'Logo & brand identity', 'Custom illustration', 'Motion design', 'Priority queue'],
  },
  {
    name: 'Super', blurb: 'A full creative + dev team on demand.',
    monthly: 4995, annually: 3996,
    features: ['All Pro tasks', 'Quality assurance', 'Copywriting', 'Web development', 'Dedicated manager', 'Same-day drafts'],
  },
]

const FAQS = [
  ['Can I switch plans later?', 'Yes — upgrade, downgrade, pause or cancel from your dashboard at any time. Changes apply to the next cycle.'],
  ['How does the annual discount work?', 'Pay yearly and save ~20% versus month-to-month. The per-month price shown reflects the discount.'],
  ['What counts as one task?', 'Anything you can brief in a card: a landing page, a set of banners, a logo concept. Queue as many as you like.'],
]

export default function Pricing() {
  const [period, setPeriod] = useState('monthly')
  useDocumentTitle('Pricing', 'Flexible monthly plans for unlimited design and development tasks. Pause anytime.')
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Plans, flexible, any task" subtitle="Pick a plan, queue unlimited tasks, pause anytime. No contracts." />

      <Reveal as="div" className="price-toggle">
        <button className={period === 'monthly' ? 'active' : ''} onClick={() => setPeriod('monthly')}>Monthly</button>
        <button className={period === 'annually' ? 'active' : ''} onClick={() => setPeriod('annually')}>Annually <span className="save">save 20%</span></button>
      </Reveal>

      <Section className="price-grid">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <PricingCard {...p} price={p[period]} period={period} />
          </Reveal>
        ))}
      </Section>

      <Section className="faq">
        <Reveal><h2 className="heading center">Pricing questions</h2></Reveal>
        <Reveal className="accordion">
          {FAQS.map(([q, a]) => <FaqItem key={q} q={q}>{a}</FaqItem>)}
        </Reveal>
      </Section>
    </>
  )
}
