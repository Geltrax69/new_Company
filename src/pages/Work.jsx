import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import DeviceShowcase from '../components/DeviceShowcase.jsx'
import CubesGrid from '../components/CubesGrid.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

import { PROJECTS as CASES } from '../data/projects.js'

export default function Work() {
  useDocumentTitle('Our work', 'Products built by Simpedu LLP — school management, sports federation CMS, live scoreboards and e-commerce.')
  return (
    <>
      <div className="page-header-wrap">
        <CubesGrid />
        <PageHeader eyebrow="Our work" title="Built by Simpedu, running today" subtitle="Real products, deployed and in use — from school ERP to live sports scoreboards." />
      </div>

      <Section className="case-list">
        {CASES.map((c, i) => (
          <Reveal key={c.title} as="article" className="case" delay={i * 0.04}>
            <span className="case-index">{String(i + 1).padStart(2, '0')}</span>
            <div className="case-visual">
              <DeviceShowcase images={c.images} kind={c.kind} glow={c.color} label={c.title} />
            </div>
            <div className="case-copy">
              <span className="case-year">{c.year}</span>
              <h2>{c.title}</h2>
              <p className="case-tag">{c.tag}</p>
              <p className="case-quote" style={{ '--case-accent': c.color }}>{c.quote}</p>
              <p className="case-desc">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </Section>

      <Section className="contact" id="contact">
        <Reveal><h2 className="heading center">Contact us</h2></Reveal>
        <div className="contact-grid">
          <Reveal className="contact-card" delay={0.04}>
            <h3>Email</h3>
            <a href="mailto:humanresource@simpedu.in">humanresource@simpedu.in</a>
            <p>We'll respond within 24 hours</p>
            <a href="mailto:support@simpedu.in" className="contact-sub">support@simpedu.in</a>
            <p>For demo requests & careers</p>
          </Reveal>
          <Reveal className="contact-card" delay={0.08}>
            <h3>Phone</h3>
            <a href="tel:+919053304303">+91 90533 04303</a>
            <p>Available Monday to Friday, 9 AM – 6 PM</p>
          </Reveal>
          <Reveal className="contact-card" delay={0.12}>
            <h3>Office</h3>
            <a href="https://maps.google.com/?q=D.R.M.+Sr.+Sec.+School+Rurkee+Rohtak+Haryana" target="_blank" rel="noreferrer">Near D.R.M. Sr. Sec. School</a>
            <p>V.P.O: Rurkee, Rohtak, Haryana</p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
