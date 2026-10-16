import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenArtwork from '../components/ScreenArtwork.jsx'
import ProductComposition from '../components/ProductComposition.jsx'
import useDocumentTitle from '../useDocumentTitle.js'
import { PROJECTS } from '../data/projects.js'
import { WORK_STORIES as STORIES } from '../data/workStories.js'
import './work.css'

const pad = value => String(value).padStart(2, '0')

function Chapter({ project, story, index }) {
  const [active, setActive] = useState(0)
  const thumbnails = useRef([])
  const gesture = useRef(null)
  const step = story.steps[active]
  const select = (index, focus = false) => {
    const next = (index + story.steps.length) % story.steps.length
    setActive(next)
    if (focus) thumbnails.current[next]?.focus({ preventScroll: true })
  }
  const onGalleryKey = event => {
    const next = event.key === 'ArrowRight' ? active + 1 : event.key === 'ArrowLeft' ? active - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? story.steps.length - 1 : null
    if (next === null) return
    event.preventDefault()
    select(next, true)
  }

  return (
    <article id={story.id} className={`project-chapter chapter-${story.id}`}>
      <header className="case-header">
        <div className="case-meta"><span>{pad(index + 1)} / {story.category}</span><span>{project.year}</span></div>
        <div className="case-heading-row"><h2>{story.headline}</h2><p>{story.summary}</p></div>
        <div className="case-project-row"><span>{project.title}</span><span>{story.introduction}</span></div>
      </header>
      <div className="case-gallery" id={`${story.id}-screens`}>
        <div className="case-gallery-intro"><span>Inside the product</span><span>{story.steps.length} screens. Choose any view.</span></div>
        <div className="case-gallery-layout">
          <div className="case-gallery-copy" key={step.src}><p className="case-step-label"><span>{pad(active + 1)}</span>{step.label}</p><h3>{step.title}</h3><p className="case-step-description">{step.description}</p><a href={`#${story.id}-details`} className="case-skip">Project details <span aria-hidden="true">↘</span></a></div>
          <div className="case-gallery-viewer">
            <div className="case-gallery-display" onPointerDown={event => { if (event.pointerType !== 'mouse') gesture.current = { x: event.clientX, y: event.clientY } }} onPointerCancel={() => { gesture.current = null }} onPointerUp={event => {
              const start = gesture.current
              gesture.current = null
              if (!start) return
              const dx = event.clientX - start.x, dy = event.clientY - start.y
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) select(active + (dx < 0 ? 1 : -1))
            }}>
              {story.steps.map((screen, i) => <div key={screen.src} className={`case-panel ${i === active ? 'is-shown' : ''}`} aria-hidden={i !== active}><ScreenArtwork src={screen.src} alt={`${project.title} — ${screen.label}`} /></div>)}
            </div>
            <div className="case-gallery-toolbar"><p className="case-gallery-counter" aria-live="polite" aria-atomic="true"><span>{pad(active + 1)} / {pad(story.steps.length)}</span>{step.label}</p><div className="case-gallery-arrows"><button type="button" aria-label={`${project.title}: previous screen`} onClick={() => select(active - 1)}>←</button><button type="button" aria-label={`${project.title}: next screen`} onClick={() => select(active + 1)}>→</button></div></div>
            <div className="case-thumbnails" role="group" aria-label={`${project.title}: all ${story.steps.length} screens`} onKeyDown={onGalleryKey}>
              {story.steps.map((screen, i) => <button ref={node => { thumbnails.current[i] = node }} type="button" key={screen.src} aria-label={`${pad(i + 1)}: ${screen.label}`} aria-pressed={active === i} onClick={() => select(i)}><span className="case-thumbnail-image"><ScreenArtwork src={screen.src} alt="" /></span><span>{pad(i + 1)}</span></button>)}
            </div>
          </div>
        </div>
      </div>
      <section className="case-details" id={`${story.id}-details`} tabIndex={-1} aria-labelledby={`${story.id}-details-title`}>
        <div className="case-details-heading"><p className="case-details-eyebrow">Project details</p><h3 id={`${story.id}-details-title`}>{project.title}</h3><p>{project.tag}</p></div>
        <div className="case-details-content"><p>{project.desc}</p><dl className="case-details-facts"><div><dt>Field</dt><dd>{story.category}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Product screens</dt><dd>{story.steps.length}</dd></div></dl><div className="case-details-actions">{project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit the live project <span aria-hidden="true">↗</span></a>}<Link to="/book">Discuss a similar project <span aria-hidden="true">↗</span></Link><a href={`#${story.id}-screens`}>Back to the screens <span aria-hidden="true">↑</span></a></div></div>
      </section>
    </article>
  )
}

export default function Work() {
  const [previewIndex, setPreviewIndex] = useState(null)
  useDocumentTitle('Our work', 'Explore four products built by Simpedu LLP, from school management and sports platforms to live scoring and commerce.')

  return (
    <div className="work-experience">
      <header className="work-masthead">
        <div className="work-hero-copy">
        <p className="work-kicker"><span>Selected work</span><span>2025 — 2026</span></p>
        <h1><span>Built to work.</span><br /><span className="work-hero-muted">Made to matter.</span></h1>
        <div className="work-introduction"><p>Software for school days, match days,<br />and everything in between.</p><a href="#school" className="work-hero-link">Take a closer look <span aria-hidden="true">↙</span></a></div>
        </div>
        <ProductComposition className="work-hero-composition" preview={previewIndex === null ? null : { src: STORIES[previewIndex].steps[0].src, title: PROJECTS[previewIndex].title }} />
        <nav className="work-index" aria-label="Jump to a project" onMouseLeave={() => setPreviewIndex(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPreviewIndex(null) }}>{STORIES.map((story, i) => <a href={`#${story.id}`} key={story.id} onMouseEnter={() => setPreviewIndex(i)} onFocus={() => setPreviewIndex(i)}><span className="work-index-number">{pad(i + 1)}</span><span className="work-index-name">{PROJECTS[i].title}<small>{story.category}</small></span><span className="work-index-arrow" aria-hidden="true">↗</span></a>)}</nav>
      </header>
      <div className="work-chapters">{PROJECTS.map((project, index) => <Chapter key={project.title} project={project} story={STORIES[index]} index={index} />)}</div>
      <section className="work-invitation" id="contact"><p>Your next project starts with a conversation.</p><h2>Good things start<br />with a conversation.</h2><Link to="/book">Let’s talk <span aria-hidden="true">↗</span></Link><a className="invitation-email" href="mailto:contact@simpedu.in">contact@simpedu.in</a></section>
    </div>
  )
}
