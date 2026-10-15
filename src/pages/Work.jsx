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
        {/* 01 School: dual workflow panels */}
        <Reveal as="article" className="case case-school" delay={0}>
          <span className="case-index">01</span>
          <div className="case-copy">
            <span className="case-year">{CASES[0].year}</span>
            <h2>{CASES[0].title}</h2>
            <p className="case-tag">{CASES[0].tag}</p>
            <p className="case-quote" style={{ '--case-accent': CASES[0].color }}>{CASES[0].quote}</p>
            <p className="case-desc">{CASES[0].desc}</p>
          </div>
          <div className="case-duo">
            <figure>
              <img src="/work/school/phone-8.webp" alt="Teacher marking attendance on mobile" loading="lazy" />
              <figcaption>Teacher view — mark attendance</figcaption>
            </figure>
            <figure>
              <img src="/work/school/phone-4.webp" alt="Parent viewing attendance on mobile" loading="lazy" />
              <figcaption>Parent view — see updates</figcaption>
            </figure>
          </div>
          <details className="case-more">
            <summary>View more screenshots</summary>
            <DeviceShowcase images={CASES[0].images} kind="phone" label={CASES[0].title} />
          </details>
        </Reveal>

        {/* 02 Federation: large desktop canvas */}
        <Reveal as="article" className="case case-federation" delay={0.04}>
          <span className="case-index">02</span>
          <div className="case-copy">
            <span className="case-year">{CASES[1].year}</span>
            <h2>{CASES[1].title}</h2>
            <p className="case-tag">{CASES[1].tag}</p>
            <p className="case-quote" style={{ '--case-accent': CASES[1].color }}>{CASES[1].quote}</p>
            <p className="case-desc">{CASES[1].desc}</p>
          </div>
          <div className="case-wide">
            <img src="/work/sepaktakraw/desktop-1.webp" alt="Haryana Sepak Takraw Association website homepage" loading="lazy" />
          </div>
        </Reveal>

        {/* 03 ScoreBoard: dominant wide display */}
        <Reveal as="article" className="case case-scoreboard" delay={0.08}>
          <span className="case-index">03</span>
          <div className="case-copy">
            <span className="case-year">{CASES[2].year}</span>
            <h2>{CASES[2].title}</h2>
            <p className="case-tag">{CASES[2].tag}</p>
            <p className="case-quote" style={{ '--case-accent': CASES[2].color }}>{CASES[2].quote}</p>
            <p className="case-desc">{CASES[2].desc}</p>
          </div>
          <div className="case-hero-img">
            <img src="/work/scoreboard/desktop-1.webp" alt="Live scoreboard display showing match score" loading="lazy" />
          </div>
        </Reveal>

        {/* 04 Uniminute: phone pairing */}
        <Reveal as="article" className="case case-commerce" delay={0.12}>
          <span className="case-index">04</span>
          <div className="case-copy">
            <span className="case-year">{CASES[3].year}</span>
            <h2>{CASES[3].title}</h2>
            <p className="case-tag">{CASES[3].tag}</p>
            <p className="case-quote" style={{ '--case-accent': CASES[3].color }}>{CASES[3].quote}</p>
            <p className="case-desc">{CASES[3].desc}</p>
          </div>
          <div className="case-duo case-phones">
            <figure>
              <img src="/work/uniminute/phone-5.webp" alt="Uniminute product listing on mobile" loading="lazy" />
              <figcaption>Browse products</figcaption>
            </figure>
            <figure>
              <img src="/work/uniminute/phone-3.webp" alt="Uniminute product details on mobile" loading="lazy" />
              <figcaption>Product details</figcaption>
            </figure>
          </div>
        </Reveal>
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
