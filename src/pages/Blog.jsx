import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import Section from '../components/Section.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

const POSTS = [
  { slug: 'launch-with-video', title: 'How top startups launch with video', cat: 'Report', read: '8 min', bg: 'linear-gradient(135deg,#1f5132,#74c69d)' },
  { slug: 'design-subscription-roi', title: 'The real ROI of a design subscription', cat: 'Playbook', read: '6 min', bg: 'linear-gradient(135deg,#0c4a6e,#38bdf8)' },
  { slug: 'brief-that-ships', title: 'Writing a brief that ships in 24 hours', cat: 'Guide', read: '5 min', bg: 'linear-gradient(135deg,#7a1f3d,#f472b6)' },
  { slug: 'ai-in-creative-ops', title: 'Where AI actually helps in creative ops', cat: 'Essay', read: '7 min', bg: 'linear-gradient(135deg,#1e293b,#64748b)' },
  { slug: 'hiring-vs-subscription', title: 'In-house hire vs subscription: the math', cat: 'Playbook', read: '6 min', bg: 'linear-gradient(135deg,#3b0764,#a78bfa)' },
  { slug: 'motion-that-converts', title: 'Motion design that actually converts', cat: 'Guide', read: '5 min', bg: 'linear-gradient(135deg,#7c2d12,#fb923c)' },
]

export default function Blog() {
  useDocumentTitle('Blog', 'Playbooks and reports on design, speed and building from the Simpedu team.')
  return (
    <>
      <PageHeader eyebrow="Blog" title="Ideas on design, speed & building" subtitle="Playbooks and reports from the Simpedu team and our talent network." />
      <Section className="blog-grid">
        {POSTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <Link to={`/blog/${p.slug}`} className="blog-card">
              <div className="blog-thumb" style={{ '--bg': p.bg }} />
              <div className="blog-meta"><span>{p.cat}</span> · <span>{p.read} read</span></div>
              <h3 className="heading-sm">{p.title}</h3>
            </Link>
          </Reveal>
        ))}
      </Section>
    </>
  )
}
