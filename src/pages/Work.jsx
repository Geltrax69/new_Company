import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScreenArtwork from '../components/ScreenArtwork.jsx'
import ProductComposition from '../components/ProductComposition.jsx'
import useDocumentTitle from '../useDocumentTitle.js'
import { PROJECTS } from '../data/projects.js'
import { WORK_STORIES as STORIES } from '../data/workStories.js'
import './work.css'

gsap.registerPlugin(ScrollTrigger)

const pad = value => String(value).padStart(2, '0')

function Chapter({ project, story, index }) {
  const chapter = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 901px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
      const root = chapter.current
      const storyRoot = root.querySelector('.case-story')
      storyRoot.classList.add('is-enhanced')
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray('.case-panel')
        const steps = gsap.utils.toArray('.case-step')
        const indicators = gsap.utils.toArray('.case-screen-nav a')
        const counter = root.querySelector('.case-current')
        const select = index => {
          steps.forEach((step, i) => step.classList.toggle('is-current', i === index))
          panels.forEach((panel, i) => panel.classList.toggle('is-shown', i === index))
          indicators.forEach((link, i) => {
            if (i === index) link.setAttribute('aria-current', 'step')
            else link.removeAttribute('aria-current')
          })
          counter.textContent = pad(index + 1)
          const nav = root.querySelector('.case-screen-nav')
          const link = indicators[index]
          if (link.offsetLeft < nav.scrollLeft) nav.scrollLeft = link.offsetLeft
          else if (link.offsetLeft + link.offsetWidth > nav.scrollLeft + nav.clientWidth) nav.scrollLeft = link.offsetLeft + link.offsetWidth - nav.clientWidth
        }
        select(0)
        steps.forEach((step, i) => {
          ScrollTrigger.create({ trigger: step.querySelector('.case-step-copy'), start: 'top 65%', end: 'bottom 35%', onEnter: () => select(i), onEnterBack: () => select(i) })
        })
        gsap.fromTo('.case-progress-fill', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: storyRoot, start: 'top 100px', end: 'bottom bottom', scrub: .2 } })
      }, chapter)
      return () => {
        ctx.revert()
        storyRoot.classList.remove('is-enhanced')
        root.querySelectorAll('.is-current, .is-shown').forEach(node => node.classList.remove('is-current', 'is-shown'))
      }
    })
    ScrollTrigger.refresh()
    return () => media.revert()
  }, [story])


  return (
    <article ref={chapter} id={story.id} className={`project-chapter chapter-${story.id}`}>
      <header className="case-header">
        <div className="case-meta"><span>{pad(index + 1)} / {story.category}</span><span>{project.year}</span></div>
        <div className="case-heading-row"><h2>{story.headline}</h2><p>{story.summary}</p></div>
        <div className="case-project-row"><span>{project.title}</span><span>{story.introduction}</span></div>
      </header>
      <div className="case-story">
        <aside className="case-stage" aria-label={`${project.title} screen sequence`}>
          <div className="case-stage-top"><span>The product in practice</span><span><b className="case-current">01</b> / {pad(story.steps.length)}</span></div>
          <div className="case-display" aria-hidden="true">
            {story.steps.map((step, i) => <div key={step.src} className={`case-panel ${step.src.includes('/phone-') || step.src.includes('scoreboard/desktop-3') ? 'is-portrait' : ''}`}>
              <ScreenArtwork src={step.src} alt="" />
              <span className="case-panel-caption">{pad(i + 1)} — {step.label}</span>
            </div>)}
          </div>
          <div className="case-stage-bottom"><nav className="case-screen-nav" aria-label={`${project.title} story chapters`}>{story.steps.map((step, i) => <a key={step.src} href={`#${story.id}-step-${i}`} aria-label={`${pad(i + 1)}: ${step.label}`}>{pad(i + 1)}</a>)}</nav><a href={`#${story.id}-details`} className="case-skip">Project details <span aria-hidden="true">↘</span></a></div>
          <div className="case-progress" aria-hidden="true"><span className="case-progress-fill" /></div>
        </aside>
        <div className="case-narrative">
          {story.steps.map((step, i) => <section key={step.src} id={`${story.id}-step-${i}`} className="case-step">
            <div className="case-step-copy"><p className="case-step-label"><span>{pad(i + 1)}</span>{step.label}</p><h3>{step.title}</h3><p className="case-step-description">{step.description}</p></div>
            <figure className={`case-inline-screen ${step.src.includes('/phone-') || step.src.includes('scoreboard/desktop-3') ? 'is-portrait' : ''}`}><ScreenArtwork src={step.src} alt={`${project.title} — ${step.label}`} /></figure>
          </section>)}
        </div>
      </div>
      <section className="case-details" id={`${story.id}-details`} tabIndex={-1} aria-labelledby={`${story.id}-details-title`}>
        <div className="case-details-heading"><p className="case-details-eyebrow">Project details</p><h3 id={`${story.id}-details-title`}>{project.title}</h3><p>{project.tag}</p></div>
        <div className="case-details-content"><p>{project.desc}</p><dl className="case-details-facts"><div><dt>Field</dt><dd>{story.category}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div><div><dt>Product screens</dt><dd>{story.steps.length}</dd></div></dl><div className="case-details-actions">{project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit the live project <span aria-hidden="true">↗</span></a>}<Link to="/book">Discuss a similar project <span aria-hidden="true">↗</span></Link><a href={`#${story.id}-step-0`}>Back to the screens <span aria-hidden="true">↑</span></a></div></div>
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
