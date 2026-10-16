import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScreenArtwork from '../components/ScreenArtwork.jsx'
import WorkGallery from '../components/WorkGallery.jsx'
import useDocumentTitle from '../useDocumentTitle.js'
import { PROJECTS } from '../data/projects.js'
import './work.css'

gsap.registerPlugin(ScrollTrigger)

const STORIES = [
  { id: 'school', category: 'Education', headline: 'A clearer\nschool day.', quote: 'From the first attendance mark to the final report card.', scene: 'studio', main: '/work/school/desktop-1.webp', detail: '/work/school/phone-7.webp', note: 'School management, designed around the people who use it.' },
  { id: 'federation', category: 'Sports & community', headline: 'A home for\nthe whole game.', quote: 'The athletes. The fixtures. The moments that matter.', scene: 'arena', main: '/work/sepaktakraw/desktop-1.webp', detail: null, note: 'A digital home for Haryana Sepak Takraw Association.' },
  { id: 'scoreboard', category: 'Live scoring', headline: 'Every point.\nIn full view.', quote: 'From courtside control to the big picture.', scene: 'arena', main: '/work/scoreboard/desktop-1.webp', detail: '/work/scoreboard/desktop-3.webp', note: 'Match control and a display built for the whole venue.' },
  { id: 'commerce', category: 'Commerce', headline: 'Little finds.\nEveryday life.', quote: 'From discovery to the details that make you choose.', scene: 'studio', main: '/work/uniminute/phone-5.webp', detail: '/work/uniminute/phone-3.webp', note: 'Uniminute: a mobile-first product and shopping experience.' },
]
const pad = value => String(value).padStart(2, '0')

function Chapter({ project, story, index }) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  return (
    <article id={story.id} className={`project-chapter chapter-${story.id}`}>
      <div className="chapter-heading">
        <div className="chapter-meta"><span>{pad(index + 1)} / {story.category}</span><span>{project.year}</span></div>
        <div className="chapter-title-window"><h2 className="chapter-title">{story.headline.split('\n').map(line => <span key={line}>{line}</span>)}</h2></div>
        <div className="chapter-description"><h3>{project.title}</h3><p>{story.note}</p></div>
      </div>
      <div className={`project-scene scene-${story.scene}`}>
        <picture className="scene-backdrop" aria-hidden="true"><source media="(max-width: 600px)" srcSet={`/images/showcase/${story.scene}-800.webp`} /><img src={`/images/showcase/${story.scene}-1600.webp`} alt="" width="1672" height="941" loading="lazy" /></picture>
        <span className="scene-word" aria-hidden="true">{['School.', 'Play.', 'Point.', 'Discover.'][index]}</span>
        <ScreenArtwork src={story.main} alt={`${project.title} — main product view`} className="scene-product-main" />
        {story.detail && <ScreenArtwork src={story.detail} alt={`${project.title} — supporting product view`} className="scene-product-detail" />}
        <span className="scene-note">The product, up close.</span>
      </div>
      <div className="chapter-ending">
        <p className="project-pullquote">{story.quote}</p>
        <button type="button" className="explore-screens" aria-label={`Explore ${project.title}: ${project.images.length} screens`} onClick={() => setGalleryOpen(true)}>
          <span>Explore the screens<small>{pad(project.images.length)} views. Your pace.</small></span><span className="explore-arrow" aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="chapter-footnote"><p>{project.desc}</p>{project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit project <span aria-hidden="true">↗</span></a>}</div>
      <WorkGallery project={project} open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </article>
  )
}

export default function Work() {
  const root = useRef(null)
  useDocumentTitle('Our work', 'Explore four products built by Simpedu LLP, from school management and sports platforms to live scoring and commerce.')

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.project-scene').forEach(scene => {
          gsap.fromTo(scene.querySelector('.scene-backdrop'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 0.7 } })
          gsap.fromTo(scene.querySelector('.scene-product-main'), { y: 32 }, { y: -28, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 0.7 } })
          const detail = scene.querySelector('.scene-product-detail')
          if (detail) gsap.fromTo(detail, { y: -24 }, { y: 30, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 0.7 } })
        })
        gsap.utils.toArray('.chapter-title').forEach(title => {
          gsap.fromTo(title, { x: -18 }, { x: 18, ease: 'none', scrollTrigger: { trigger: title, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
        })
      }, root)
      return () => ctx.revert()
    })
    return () => media.revert()
  }, [])

  return (
    <div ref={root} className="work-experience">
      <header className="work-masthead">
        <p>Independent thinking. Working software.</p>
        <h1>Built for<br /><span>the real world.</span></h1>
        <div className="work-introduction"><span className="work-scroll-cue" aria-hidden="true">↓</span><p>School days. Match days. Everyday life.<br />A selection of things we’ve designed and built.</p></div>
        <nav className="work-index" aria-label="Jump to a project">{STORIES.map((story, i) => <a href={`#${story.id}`} key={story.id}><span>{pad(i + 1)}</span>{PROJECTS[i].title}</a>)}</nav>
      </header>
      <div className="work-chapters">{PROJECTS.map((project, index) => <Chapter key={project.title} project={project} story={STORIES[index]} index={index} />)}</div>
      <section className="work-invitation"><p>Your next project starts with a conversation.</p><h2>What’s on<br />your mind?</h2><Link to="/book">Let’s talk <span aria-hidden="true">↗</span></Link><a className="invitation-email" href="mailto:contact@simpedu.in">contact@simpedu.in</a></section>
    </div>
  )
}
