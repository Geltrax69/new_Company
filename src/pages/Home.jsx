import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import FaqItem from '../components/FaqItem.jsx'
import EmailForm from '../components/EmailForm.jsx'
import Section from '../components/Section.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import BentoCard from '../components/BentoCard.jsx'
import TagPill from '../components/TagPill.jsx'
import CompanyCard from '../components/CompanyCard.jsx'
import StepCard from '../components/StepCard.jsx'
import CountUp from '../components/CountUp.jsx'
import useDocumentTitle from '../useDocumentTitle.js'
import { PROJECTS, PROJECT_COUNT } from '../data/projects.js'
import ProductComposition from '../components/ProductComposition.jsx'
import HomeCubes from '../components/HomeCubes'

const SERVICES = [
  {
    title: 'Web & product',
    bg: '#0f0f10',
    tagTone: 'overlay',
    preview: <img className="service-product" src="/work/school/desktop-1.webp" alt="Simpedu school management dashboard" width="2560" height="1325" loading="lazy" />,
    tags: ['Web', 'UX/UI design', 'Mobile app'],
  },
  {
    title: 'Graphic design & marketing material',
    bg: '#2c2c31',
    tagTone: 'overlay',
    preview: <div className="prev-type"><span>Social</span><span>Brand</span><span>Print</span><span>Digital</span></div>,
    tags: ['Social media creative', 'Banners', 'Pitch decks', 'Packaging', 'Email design', 'Any graphic material'],
  },
]

const BOTTLENECKS = [
  ['Forget about', 'unreliable freelancers'],
  ['No more', 'contractors ghosting before launch'],
  ['Stop', 'juggling scattered design and dev'],
  ['Say bye to', 'payroll and contracts'],
]

const SKILLS = [
  'School management', 'Sports portals', 'Live scoring', 'Websites', 'Web apps',
  'UI/UX design', 'Dashboards', 'E-commerce', 'Automation', 'Android apps',
  'APIs & integrations', 'Maintenance & support',
]

const COMPANIES = PROJECTS.map(({ title, year, ...project }) => ({ ...project, name: title, status: year }))

const PROCESS = [
  { step: 'Step 1', title: 'Talk to us', stat: 'Free', desc: 'a friendly call about what eats your time — no pitch decks, just questions', tone: 'dark' },
  { step: 'Step 2', title: 'Scope & quote', stat: '48h', desc: 'a clear plan with timeline and pricing, so you know exactly what you get' },
  { step: 'Step 3', title: 'Design & build', stat: 'Weekly', desc: 'working software you can click through early, shaped by your feedback' },
  { step: 'Step 4', title: 'Launch & support', stat: 'Ongoing', desc: 'we deploy, train your team, and stick around for updates and care' },
]

const HOW = [
  ['01', 'Start a conversation', 'Book a call or drop us a message — tell us what runs manually today.'],
  ['02', 'We design & build', 'Our in-house team designs, develops and tests. You see progress as it ships.'],
  ['03', 'Launch & grow', 'We deploy, hand over the keys, and stay on for support and new features.'],
]

const FAQS = [
  ['What does Simpedu build?', 'School management software, sports federation platforms, live scoreboards, e-commerce and custom web products. Our work page shows the products and their screens.'],
  ['How does a project start?', 'Tell us about the problem and the people who need to use the software. We will discuss the scope, then agree on a plan, timeline and quote.'],
  ['Can I see your products before booking?', 'Yes. Explore Our work to scroll through real product screens and follow the available live project links.'],
  ['What happens after launch?', 'We deploy the product, help your team get started and discuss the ongoing support and improvements your project needs.'],
]

export default function Home() {
  useDocumentTitle(null, 'Simpedu LLP — a software company born in education, now building across fields. School management systems, sports portals and live scoring platforms. Less manual. More impact.')
  return (
    <>
      <div className="home-hero-field">
        <HomeCubes />
        <Section className="hero hero-product">
          <Reveal className="hero-left">
            <p className="home-kicker">Independent design & software studio</p>
            <h1 className="display">
              Complex work.<br />Beautifully simplified.
            </h1>
            <p className="body-lg">
              We're Simpedu LLP — a software company born in education, now
              building across fields. From school management systems to live
              sports scoreboards, we design and ship products that cut the manual work.
            </p>
            <div className="hero-actions">
              <Link to="/work" className="btn btn-pill">Explore our work</Link>
              <Link to="/book" className="btn btn-outline">Book demo</Link>
            </div>
          </Reveal>
          <Reveal className="hero-right hero-visual" delay={0.1}>
            <ProductComposition className="home-product-scene" />
            <p className="hero-caption">Selected work / Education, sport & commerce</p>
          </Reveal>
        </Section>
      </div>

      <Section className="workflow-sequence">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="heading">One workflow, three views.</h2>
          <p className="body-lg">The school day, from office to classroom to home.</p>
        </Reveal>
        <div className="workflow-steps">
          <Reveal className="workflow-step" delay={0}>
            <div className="workflow-media">
              <img src="/work/school/desktop-1.webp" alt="School office dashboard overview" loading="lazy" width="2560" height="1325" />
            </div>
            <h3>1. Office overview</h3>
            <p>Admins see attendance, fees, and staff status at a glance.</p>
          </Reveal>
          <Reveal className="workflow-step" delay={0.1}>
            <div className="workflow-media">
              <img src="/work/school/phone-8.webp" alt="Teacher marking attendance on mobile" loading="lazy" />
            </div>
            <h3>2. Teacher action</h3>
            <p>Teachers mark attendance from the classroom in seconds.</p>
          </Reveal>
          <Reveal className="workflow-step" delay={0.2}>
            <div className="workflow-media">
              <img src="/work/school/phone-4.webp" alt="Parent viewing attendance updates" loading="lazy" />
            </div>
            <h3>3. Parent view</h3>
            <p>Parents see updates instantly, no phone calls needed.</p>
          </Reveal>
        </div>
      </Section>

      <Section className="services">
        <div className="services-drift">
          <div className="services-scroll">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}><ServiceCard {...s} /></Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="how" className="solve">
        <Reveal className="solve-left">
          <h2 className="heading">We solve the bottlenecks that kill your speed</h2>
          <div className="studio-principle">
            <span>Our approach</span>
            <p>One team from the first sketch to the software your people use every day.</p>
            <Link to="/about">Meet Simpedu <span aria-hidden="true">↗</span></Link>
          </div>
        </Reveal>
        <Reveal className="panel" delay={0.1}>
          <ul className="panel-list">
            {BOTTLENECKS.map(([lead, key]) => (
              <li key={key}><i>→</i><span className="lead">{lead}</span> <b>{key}</b></li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section className="why">
        <Reveal><h2 className="heading center">Education, but smarter</h2></Reveal>
        <div className="bento">
          <Reveal><BentoCard tone="mist">
            <span className="num"><CountUp to={PROJECT_COUNT} /></span><span className="lbl">Projects in our portfolio</span>
            <div className="bento-logos"><span>Simpedu</span><span>HSTA</span><span>ScoreBoard</span><span>Uniminute</span></div>
          </BentoCard></Reveal>
          <Reveal delay={0.05}><BentoCard tone="mist">
            <span className="num"><CountUp to={100} suffix="%" /></span><span className="lbl">Built in-house</span>
            <div className="bento-orb" />
          </BentoCard></Reveal>
          <Reveal delay={0.1}><BentoCard tone="dark" span="bento-tall">
            <div className="bento-portrait" />
            <div className="t-head light"><strong>Simpedu LLP</strong><span>Born in education — now expanding into new fields</span></div>
          </BentoCard></Reveal>
          <Reveal delay={0.15}><BentoCard tone="mist">
            <span className="num"><CountUp to={2} suffix="+" /></span><span className="lbl">Fields served — education & sports</span>
          </BentoCard></Reveal>
          <Reveal delay={0.2}><BentoCard tone="mist" span="bento-wide">
            <div className="bento-skills">
              {SKILLS.map((s, i) => <TagPill key={s} tone={i % 4 === 1 ? 'dark' : 'light'}>{s}</TagPill>)}
            </div>
          </BentoCard></Reveal>
          <Reveal delay={0.25}><BentoCard tone="mist">
            <span className="num"><CountUp to={1} /></span><span className="lbl">In-house team, from design to deployment</span>
          </BentoCard></Reveal>
        </div>
      </Section>

      <Section className="serve">
        <Reveal className="serve-head">
          <h2 className="heading">Built by Simpedu, running today</h2>
        </Reveal>
        <div className="serve-drift">
          <div className="serve-scroll">
            {COMPANIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}><CompanyCard {...c} /></Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="approval">
        <Reveal className="approval-head">
          <h2 className="heading center">How we work</h2>
          <p className="body-lg center">Small team. Senior work. No middlemen.</p>
        </Reveal>
        <div className="approval-grid">
          {PROCESS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.07}><StepCard {...s} /></Reveal>
          ))}
        </div>
      </Section>

      <Section className="how">
        <Reveal className="how-head">
          <h2 className="heading center">How we work</h2>
          <p className="body-lg center">No agency maze, no freelancer roulette.<br />Just a team that builds.</p>
        </Reveal>
        <div className="how-body">
          <Reveal className="how-steps">
            {HOW.map(([n, t, d], i) => (
              <details key={n} open={i === 0}>
                <summary><span className="how-num">{n}</span>{t}<i>›</i></summary>
                <div className="how-detail">
                  <p>{d}</p>
                  {i === 0 && <Button as={Link} to="/book">Book a demo ↗</Button>}
                </div>
              </details>
            ))}
          </Reveal>
          <Reveal className="how-visual" delay={0.1} />
        </div>
      </Section>

      <Reveal as="section" id="start" className="consult">
        <div className="consult-card">
          <h2 className="display-sm">Bring us the problem. We’ll shape the next step.</h2>
          <Button as={Link} to="/book" className="consult-btn">Book a conversation ↗</Button>
        </div>
        <div className="consult-proof">
          <h3 className="heading">Built by Simpedu LLP</h3>
          <p className="body">From education to everything else — follow the build on Instagram <a href="https://www.instagram.com/simpedu_/" target="_blank" rel="noreferrer">@simpedu_</a></p>
        </div>
      </Reveal>

      <Section id="faq" className="faq">
        <Reveal><h2 className="heading center">Questions, answered.</h2></Reveal>
        <Reveal className="accordion">
          {FAQS.map(([q, a]) => <FaqItem key={q} q={q}>{a}</FaqItem>)}
        </Reveal>
      </Section>

      <Reveal as="section" className="cta-final">
        <h2 className="display-sm">Have something in mind?<br />Let’s make it work.</h2>
        <EmailForm cta="Get started" />
      </Reveal>
    </>
  )
}
