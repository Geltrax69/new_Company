import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScreenArtwork from '../components/ScreenArtwork.jsx'
import useDocumentTitle from '../useDocumentTitle.js'
import { PROJECTS } from '../data/projects.js'
import './work.css'

gsap.registerPlugin(ScrollTrigger)

const STORIES = [
  { id: 'school', category: 'Education', headline: 'A clearer\nschool day.', quote: 'From the first attendance mark to the final report card.', scene: 'studio', main: '/work/school/desktop-1.webp', note: 'School management, designed around the people who use it.' },
  { id: 'federation', category: 'Sports & community', headline: 'A home for\nthe whole game.', quote: 'The athletes. The fixtures. The moments that matter.', scene: 'arena', main: '/work/sepaktakraw/desktop-1.webp', note: 'A digital home for Haryana Sepak Takraw Association.' },
  { id: 'scoreboard', category: 'Live scoring', headline: 'Every point.\nIn full view.', quote: 'From courtside control to the big picture.', scene: 'arena', main: '/work/scoreboard/desktop-1.webp', note: 'Match control and a display built for the whole venue.' },
  { id: 'commerce', category: 'Commerce', headline: 'Little finds.\nEveryday life.', quote: 'From discovery to the details that make you choose.', scene: 'studio', main: '/work/uniminute/phone-5.webp', note: 'Uniminute: a mobile-first product and shopping experience.' },
]
const pad = value => String(value).padStart(2, '0')

function Chapter({ project, story, index }) {
  const [expanded, setExpanded] = useState(false)
  const screens = [...new Set([story.main, ...project.images])]
  const visible = expanded ? screens : screens.slice(0, 4)
  const collectionId = `${story.id}-screens`

  const chapter = useRef(null)
  const revealRequested = useRef(false)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.scroll-screen').forEach((frame, i) => {
          gsap.fromTo(frame.querySelector('.scroll-screen-motion'),
            { y: () => window.innerWidth < 700 ? 24 : 70 + (i % 3) * 20 },
            { y: () => window.innerWidth < 700 ? -24 : -70 - (i % 3) * 20, ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })
        })
      }, chapter)
      return () => ctx.revert()
    })
    ScrollTrigger.refresh()
    if (revealRequested.current) {
      revealRequested.current = false
      const target = expanded ? chapter.current.querySelectorAll('.scroll-screen')[4] : chapter.current.querySelector('.chapter-ending')
      target.focus({ preventScroll: true })
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 110, behavior: 'instant' })
    }
    return () => media.revert()
  }, [expanded])

  return (
    <article ref={chapter} id={story.id} className={`project-chapter chapter-${story.id}`}>
      <div className="chapter-heading">
        <div className="chapter-meta"><span>{pad(index + 1)} / {story.category}</span><span>{project.year}</span></div>
        <div className="chapter-description"><p className="chapter-project-name">{project.title}</p><p>{story.note}</p></div>
      </div>
      <div className="scroll-collection" id={collectionId}>
        <div className="collection-type-stage">
          <div className="collection-type">
            <p className="collection-eyebrow">{project.tag}</p>
            <h2>{story.headline.split('\n').map(line => <span key={line}>{line}</span>)}</h2>
            <a className="collection-skip" href={`#${story.id}-details`}>Skip to project details <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="scroll-screen-track">
          {visible.map((src, i) => <figure tabIndex={-1} className={`scroll-screen screen-position-${i % 4} ${src.includes('/phone-') ? 'screen-portrait' : 'screen-landscape'}`} key={src}>
            <div className="scroll-screen-motion">
              <div className={`scroll-screen-surface surface-${story.scene}`}>
                <ScreenArtwork src={src} alt={`${project.title} — product screen ${i + 1}`} />
              </div>
              <figcaption><span>{pad(i + 1)} / {pad(screens.length)}</span><span>{project.title}<small>{src.includes('/phone-') ? 'Mobile experience' : 'Web experience'}</small></span></figcaption>
            </div>
          </figure>)}
        </div>
      </div>
      <div className="chapter-ending" tabIndex={-1} id={`${story.id}-details`}>
        <p className="project-pullquote">{story.quote}</p>
        {screens.length > 4 && <button type="button" className="explore-screens" aria-expanded={expanded} aria-controls={collectionId} onClick={() => { revealRequested.current = true; setExpanded(value => !value) }}>
          <span>{expanded ? 'Show the edit' : 'Keep exploring'}<small>{expanded ? 'Return to four selected views' : `${pad(screens.length - 4)} more screens in the scroll`}</small></span><span className="explore-arrow" aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>}
      </div>
      <div className="chapter-footnote"><p>{project.desc}</p>{project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit project <span aria-hidden="true">↗</span></a>}</div>
    </article>
  )
}

export default function Work() {
  useDocumentTitle('Our work', 'Explore four products built by Simpedu LLP, from school management and sports platforms to live scoring and commerce.')

  return (
    <div className="work-experience">
      <header className="work-masthead">
        <p>Independent thinking. Working software.</p>
        <h1>Built for<br /><span>the real world.</span></h1>
        <div className="work-introduction"><span className="work-scroll-cue" aria-hidden="true">↓</span><p>School days. Match days. Everyday life.<br />Scroll through the work. See what’s inside.</p></div>
        <nav className="work-index" aria-label="Jump to a project">{STORIES.map((story, i) => <a href={`#${story.id}`} key={story.id}><span>{pad(i + 1)}</span>{PROJECTS[i].title}</a>)}</nav>
      </header>
      <div className="work-chapters">{PROJECTS.map((project, index) => <Chapter key={project.title} project={project} story={STORIES[index]} index={index} />)}</div>
      <section className="work-invitation"><p>Your next project starts with a conversation.</p><h2>What’s on<br />your mind?</h2><Link to="/book">Let’s talk <span aria-hidden="true">↗</span></Link><a className="invitation-email" href="mailto:contact@simpedu.in">contact@simpedu.in</a></section>
    </div>
  )
}
