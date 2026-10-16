import ScreenArtwork from './ScreenArtwork.jsx'
import { WORK_MEDIA } from '../data/workMedia.js'

// Code-native composition keeps the original UI sharp, accessible and inspectable.
export default function PairedScreens({ scene, project }) {
  if (scene.layout === 'single') {
    const screen = scene.screens[0]
    const media = WORK_MEDIA[screen.src]
    const ratio = media.width / (media.height * (1 - media.top - media.bottom))
    return <div className="single-screen-scene" style={{ '--single-ratio': ratio }}><a href={screen.src} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}: ${screen.label} full size`}><ScreenArtwork src={screen.src} alt={`${project.title} — ${screen.label}`} /></a><span>{screen.label}</span></div>
  }

  return (
    <div className={`paired-scene layout-${scene.layout}`}>
      <span className="paired-scene-mark" aria-hidden="true">{scene.layout === 'phones' ? 'App experience' : 'Connected product views'}</span>
      <div className="paired-scene-screens">
        {scene.screens.map((screen, index) => {
          const media = WORK_MEDIA[screen.src]
          const ratio = media.width / (media.height * (1 - media.top - media.bottom))
          const phone = ratio < .85
          return <figure className={`paired-screen ${phone ? 'is-phone' : 'is-web'} paired-screen-${index + 1}`} key={screen.src} style={{ '--pair-ratio': ratio }}>
            <a className="paired-screen-frame" href={screen.src} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}: ${screen.label} full size`}>
              {!phone && <span className="paired-window-bar" aria-hidden="true"><i /><i /><i /></span>}
              <ScreenArtwork src={screen.src} alt={`${project.title} — ${screen.label}`} />
            </a>
            <figcaption>{screen.label} <span aria-hidden="true">↗</span></figcaption>
          </figure>
        })}
      </div>
      <span className="paired-scene-caption">{project.title} <span aria-hidden="true">/</span> {scene.screens.length} connected screens</span>
    </div>
  )
}
