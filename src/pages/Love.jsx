import PageHeader from '../components/PageHeader.jsx'
import Badge from '../components/Badge.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

const REVIEWS = [
  { name: 'Jason Cornelius', role: 'Co-Founder, Perseus Defense', yc: 'S25', text: 'Game-changer for our team. One of the best decisions we made as a YC startup.' },
  { name: 'Marty Kausas', role: 'Founder, Pylon', yc: 'W23', text: 'Like having an in-house design team without the overhead. We ship twice as fast.' },
  { name: 'Dana Whitfield', role: 'Head of Growth, Nestra', text: 'Turnaround is unreal. I brief at night, wake up to polished drafts.' },
  { name: 'Omar Haddad', role: 'CEO, Gather', text: 'The matching actually works — our designer just gets our brand now.' },
  { name: 'Priya Nair', role: 'PM, Playhouse', text: 'Queued 14 tasks in our launch week. Every single one landed on time.' },
  { name: 'Lukas Berg', role: 'CTO, StarOps', text: 'Design and front-end dev in one subscription saved us a whole hire.' },
  { name: 'Sofia Marchetti', role: 'Marketing Lead, Willow', text: 'Our social engagement doubled after the new creative system.' },
  { name: 'Tom Becker', role: 'Founder, Outtalent', text: 'Senior-level quality at a price that made sense for a seed-stage team.' },
]

export default function Love() {
  useDocumentTitle('Love', "What it's like to build with Simpedu LLP.")
  return (
    <>
      <PageHeader eyebrow="♥ Love" title="Teams genuinely love working with us" subtitle="Kind words from the people we build with" />
      <Section className="love-wall">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.05}>
            <figure className="review-card">
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                <span className="r-avatar" style={{ '--i': i }} />
                <span>
                  <strong>{r.name}</strong>
                  <span className="r-role">{r.role} {r.yc && <Badge variant="yc">{r.yc}</Badge>}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </Section>
    </>
  )
}
