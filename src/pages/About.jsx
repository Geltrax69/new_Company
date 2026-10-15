import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import StatBlock from '../components/StatBlock.jsx'
import Section from '../components/Section.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

const VALUES = [
  ['Born in education', 'We started by helping schools go digital — EduConnect, our school management system, is our flagship.'],
  ['Less manual. More impact.', 'Every product we ship exists to remove repetitive, paper-driven work.'],
  ['Expanding fields', 'From sports federations to local marketplaces — if it runs on paperwork, we can build software for it.'],
  ['Built in-house', 'Design, engineering and support live under one roof at Simpedu LLP.'],
]

const STATS = [
  ['3', 'products deployed'],
  ['100%', 'built in-house'],
  ['2+', 'fields and counting'],
  ['More', 'on the way'],
]

export default function About() {
  useDocumentTitle('About us', 'Simpedu LLP is a software company born in education — building school management systems, sports portals and live scoring platforms.')
  return (
    <>
      <PageHeader eyebrow="About us" title="Less manual. More impact." subtitle="Simpedu LLP is a software company that grew up in education and now builds across fields — shipping products that cut the manual work." />

      <Section className="about-stats">
        {STATS.map(([num, label], i) => (
          <Reveal key={num} delay={i * 0.06}><StatBlock num={num} label={label} /></Reveal>
        ))}
      </Section>

      <Section className="about-values">
        <Reveal><h2 className="heading center">What we believe</h2></Reveal>
        <div className="values-grid">
          {VALUES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="value-card">
                <h3 className="heading-sm">{t}</h3>
                <p className="body">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
