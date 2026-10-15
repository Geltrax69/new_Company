import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Badge from '../components/Badge.jsx'
import Reveal from '../components/Reveal.jsx'
import FaqItem from '../components/FaqItem.jsx'
import EmailForm from '../components/EmailForm.jsx'
import CycleWord from '../components/CycleWord.jsx'
import Section from '../components/Section.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import BentoCard from '../components/BentoCard.jsx'
import TagPill from '../components/TagPill.jsx'
import CompanyCard from '../components/CompanyCard.jsx'
import StepCard from '../components/StepCard.jsx'
import useDocumentTitle from '../useDocumentTitle.js'
import useScrollDrift from '../useScrollDrift.js'

const SERVICES = [
  {
    title: 'Web & product',
    bg: '#0f0f10',
    tagTone: 'overlay',
    preview: <div className="prev-window"><span></span><span></span><span></span></div>,
    tags: ['Web', 'UX/UI design', 'Mobile app'],
  },
  {
    title: 'Graphic design & marketing material',
    bg: '#13351f',
    tagTone: 'overlay',
    preview: <div className="prev-swatches"><i style={{ background: '#7a1f3d' }} /><i style={{ background: '#1f5132' }} /><i style={{ background: '#f4c7d4' }} /><i style={{ background: '#caf06b' }} /></div>,
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

const COMPANIES = [
  { name: 'Simpedu', desc: 'School Management System — a digital operating system for running a school: students, staff, academics, fees, exams and communication.', status: '2025 · Flagship product', link: 'https://www.educonnect.me', color: '#6d28d9' },
  { name: 'Haryana Sepak Takraw Association', desc: 'Sepak Takraw CMS Platform — manages and showcases athletes, events, tournaments, results, news and affiliated districts.', status: '2025', link: 'https://www.hsta.in/', color: '#1d4ed8' },
  { name: 'ScoreBoard Display', desc: 'Live match score control — referees set the score courtside, the venue display updates instantly, set by set.', status: '2026', link: 'http://scorecast.simpedu.in/', color: '#16a34a' },
  { name: 'Uniminute', desc: 'E-commerce platform — browse, cart, checkout and order tracking, built mobile-first for speed.', status: '2026', color: '#d97706' },
]

const CAP_DATA = [
  {
    name: 'Design',
    groups: [
      { title: 'UI/UX design', tags: ['Website', 'Landing page', 'Mobile & web app', 'UX/UI audit'] },
      { title: 'Brand identity', tags: ['Logo', 'System'] },
      { title: 'Illustration', tags: ['Custom art', 'Iconography'] },
    ],
  },
  {
    name: 'No-code development',
    groups: [
      { title: 'Framer', tags: ['Website builds', 'Prototypes'] },
      { title: 'Webflow', tags: ['Web builds', 'Interactions'] },
      { title: 'Airtable', tags: ['Databases', 'Ops'] },
      { title: 'Zapier / Make', tags: ['Automation', 'Integrations'] },
    ],
  },
  {
    name: 'Marketing',
    groups: [
      { title: 'Content marketing', tags: ['Blog articles', 'Website content', 'Case studies'] },
      { title: 'Social media marketing', tags: ['Social media ads', 'SMM strategy', 'Community management'] },
      { title: 'SEO', tags: ['SEO audit', 'Keyword research', 'On-page SEO', 'Link building'] },
      { title: 'Copywriting', tags: ['Ad copy', 'Sales copy', 'Taglines', 'E-mail copy'] },
      { title: 'PPC & paid ads', tags: ['Google ads', 'Meta ads', 'Campaign setup'] },
      { title: 'Email marketing', tags: ['Newsletters', 'E-mail templates', 'Sequences'] },
    ],
  },
  {
    name: 'Software development',
    groups: [
      { title: 'Frontend development', tags: ['HTML', 'CSS', 'JavaScript', 'React'] },
      { title: 'Full stack development', tags: ['MERN', 'Django', 'ASP.NET'] },
      { title: 'Backend development', tags: ['Node.js', 'Python', 'PHP'] },
      { title: 'Mobile App development', tags: ['iOS', 'Android', 'React Native'] },
      { title: 'AI development', tags: ['LLM integrations', 'OpenAI API'] },
      { title: 'QA engineering', tags: ['Automated testing', 'Manual testing'] },
    ],
  },
]

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
  ['How fast will I get my designs?', 'Most tasks land within 24–48 hours. Larger projects are broken into daily deliverables so you always see progress.'],
  ['What can I request?', "Web and product UI, branding, illustration, social, decks, motion, even development — if it's a creative task, it's in scope."],
  ['Is there a limit on tasks?', 'Add as many as you want to the queue. We work through them one or two at a time, in order.'],
  ['Can I pause or cancel?', 'Anytime, no contracts. Pause when work is light and resume the day you need us again.'],
]

export default function Home() {
  useDocumentTitle(null, 'Simpedu LLP — a software company born in education, now building across fields. School management systems, sports portals and live scoring platforms. Less manual. More impact.')
  const servicesRef = useScrollDrift(90)
  const serveRef = useScrollDrift(140)
  const [activeCap, setActiveCap] = useState(0)
  return (
    <>
      <Section className="hero">
        <Reveal className="hero-left">
          <h1 className="display">
            Less <CycleWord words={['manual work', 'paperwork', 'chaos', 'guesswork']} />, more impact
          </h1>
        </Reveal>
        <Reveal className="hero-right" delay={0.1}>
          <p className="body-lg">
            We're Simpedu LLP — a software company born in education, now
            building across fields. From school management systems to live
            sports scoreboards, we design and ship products that cut the manual work.
          </p>
          <EmailForm cta="Book demo" />
        </Reveal>
      </Section>

      <Section className="services">
        <div className="services-drift" ref={servicesRef}>
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
          <div className="testimonial-card">
            <div className="t-head">
              <div className="t-avatar" />
              <div>
                <strong>Jason Cornelius</strong>
                <span>Co-Founder at Perseus Defense <Badge variant="yc">Y</Badge> (S25)</span>
              </div>
            </div>
            <p>“Game-changer for our team. Working with Simpedu has been one of the best decisions we've made as a YC startup.”</p>
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
            <span className="num">4</span><span className="lbl">Products deployed</span>
            <div className="bento-logos"><span>Simpedu</span><span>HSTA</span><span>ScoreBoard</span><span>Uniminute</span></div>
          </BentoCard></Reveal>
          <Reveal delay={0.05}><BentoCard tone="mist">
            <span className="num">100%</span><span className="lbl">Built in-house</span>
            <div className="bento-orb" />
          </BentoCard></Reveal>
          <Reveal delay={0.1}><BentoCard tone="dark" span="bento-tall">
            <div className="bento-portrait" />
            <div className="t-head light"><strong>Simpedu LLP</strong><span>Born in education — now expanding into new fields</span></div>
          </BentoCard></Reveal>
          <Reveal delay={0.15}><BentoCard tone="mist">
            <span className="num">2+</span><span className="lbl">Fields served — education & sports</span>
          </BentoCard></Reveal>
          <Reveal delay={0.2}><BentoCard tone="mist" span="bento-wide">
            <div className="bento-skills">
              {SKILLS.map((s, i) => <TagPill key={s} tone={i % 4 === 1 ? 'dark' : 'light'}>{s}</TagPill>)}
            </div>
          </BentoCard></Reveal>
          <Reveal delay={0.25}><BentoCard tone="mist">
            <span className="num">1</span><span className="lbl">In-house team, from design to deployment</span>
          </BentoCard></Reveal>
        </div>
      </Section>

      <Section className="serve">
        <Reveal className="serve-head">
          <h2 className="heading">Built by Simpedu, running today</h2>
        </Reveal>
        <div className="serve-drift" ref={serveRef}>
          <div className="serve-scroll">
            {COMPANIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}><CompanyCard {...c} /></Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="capability">
        <Reveal className="cap-left">
          <h2 className="heading">One subscription.<br />Every <CycleWord words={CAP_DATA.map((c) => c.name.split(' ')[0].toLowerCase())} /><br />capability</h2>
          <ul className="cap-list">
            {CAP_DATA.map((c, i) => (
              <li key={c.name}>
                <button className={i === activeCap ? 'active' : ''} onClick={() => setActiveCap(i)}>{c.name}</button>
              </li>
            ))}
          </ul>
          <Link to="/book" className="cap-cta">
            <span className="cap-cta-visual" />
            <Button as="span">Get started</Button>
          </Link>
        </Reveal>
        <div className="cap-grid" key={activeCap}>
          {CAP_DATA[activeCap].groups.map((g) => (
            <div key={g.title} className="cap-tile">
              <strong>{g.title}</strong>
              <div className="cap-tile-tags">
                {g.tags.map((t) => <TagPill key={t}>{t}</TagPill>)}
              </div>
            </div>
          ))}
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
          <h2 className="heading center">How it works</h2>
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
          <h2 className="display-sm">Free consultation to scope your creative projects</h2>
          <Button as={Link} to="/book" className="consult-btn">›››&nbsp;&nbsp;Book demo&nbsp;&nbsp;‹‹‹</Button>
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
        <h2 className="display-sm">Get your <span className="cycle-word">product</span> done without headache</h2>
        <EmailForm cta="Get started" />
      </Reveal>
    </>
  )
}
