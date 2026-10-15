import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import DeviceShowcase from '../components/DeviceShowcase.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

const img = (dir, kind, n) => Array.from({ length: n }, (_, i) => `/work/${dir}/${kind}-${i + 1}.webp`)

const CASES = [
  {
    year: '2025',
    title: 'Simpedu',
    tag: 'School Management System',
    quote: 'From morning attendance to year-end report cards — one login, zero paperwork.',
    desc: 'A complete digital OS for running a school: admissions, attendance, fees, exams, timetables and parent–teacher communication, built mobile-first for staff on the move.',
    kind: 'phone',
    images: img('school', 'phone', 8),
    color: '#6d28d9',
  },
  {
    year: '2025',
    title: 'Haryana Sepak Takraw Association',
    tag: 'Sepak Takraw CMS Platform',
    quote: 'Every athlete, every tournament, every result — one federation, one platform.',
    desc: "A content and management platform for Haryana's sepak takraw federation: athlete profiles, district affiliations, tournament listings and news, all editable without touching code.",
    kind: 'desktop',
    images: img('sepaktakraw', 'desktop', 4),
    color: '#1d4ed8',
  },
  {
    year: '2026',
    title: 'ScoreBoard Display',
    tag: 'Live match score control system',
    quote: 'The whole crowd sees it the instant the referee signals it.',
    desc: 'A live scoreboard system for sepak takraw matches — referees control the score from a courtside device while the venue display updates instantly, set by set.',
    kind: 'desktop',
    images: img('scoreboard', 'desktop', 8),
    color: '#16a34a',
  },
  {
    year: '2026',
    title: 'Uniminute',
    tag: 'E-commerce Platform',
    quote: 'Browse, cart, checkout — under a minute, start to finish.',
    desc: 'A fast, mobile-first e-commerce platform — product catalogue, cart, checkout and order tracking built for speed on every screen size.',
    kind: 'phone',
    images: img('uniminute', 'phone', 8),
    color: '#d97706',
  },
]

export default function Work() {
  useDocumentTitle('Our work', 'Products built by Simpedu LLP — school management, sports federation CMS, live scoreboards and e-commerce.')
  return (
    <>
      <PageHeader eyebrow="Our work" title="Built by Simpedu, running today" subtitle="Real products, deployed and in use — from school ERP to live sports scoreboards." />

      <Section className="case-list">
        {CASES.map((c, i) => (
          <Reveal key={c.title} as="article" className="case" delay={i * 0.04}>
            <span className="case-index">{String(i + 1).padStart(2, '0')}</span>
            <div className="case-visual">
              <DeviceShowcase images={c.images} kind={c.kind} glow={c.color} />
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
