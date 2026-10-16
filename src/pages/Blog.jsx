import { Link, Navigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import useDocumentTitle from '../useDocumentTitle.js'

export function BlogPost() {
  // Placeholder articles removed. Redirect to the blog index.
  return <Navigate to="/blog" replace />
}

export default function Blog() {
  useDocumentTitle('Blog', 'Articles and notes from the Simpedu team.')
  return (
    <>
      <PageHeader eyebrow="Blog" title="Notes from the team" subtitle="We're writing about what we build and learn. Check back soon." />
      <Section className="blog-empty">
        <p>Our first articles are on the way. Meanwhile, explore <Link to="/work">our work</Link>.</p>
      </Section>
    </>
  )
}
