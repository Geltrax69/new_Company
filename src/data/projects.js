const img = (dir, kind, n) => Array.from({ length: n }, (_, i) => `/work/${dir}/${kind}-${i + 1}.webp`)

export const PROJECTS = [
  {
    year: '2025',
    title: 'Simpedu',
    link: 'https://www.educonnect.me',
    tag: 'School Management System',
    quote: 'From morning attendance to year-end report cards — one login, zero paperwork.',
    desc: 'A complete digital OS for running a school: admissions, attendance, fees, exams, timetables and parent–teacher communication, built mobile-first for staff on the move.',
    kind: 'phone',
    images: [...img('school', 'desktop', 4), ...[7, 8, 4, 2, 3, 5, 6, 1].map((n) => `/work/school/phone-${n}.webp`)],
    color: '#6d28d9',
  },
  {
    year: '2025',
    title: 'Haryana Sepak Takraw Association',
    link: 'https://www.hsta.in/',
    tag: 'Sepak Takraw CMS Platform',
    quote: 'Every athlete, every tournament, every result — one federation, one platform.',
    desc: "A content and management platform for Haryana's sepak takraw federation: athlete profiles, district affiliations, tournament listings and news, all editable without touching code.",
    kind: 'desktop',
    images: img('sepaktakraw', 'desktop', 4),
    color: '#1d4ed8',
  },
  {
    year: '2026',
    title: 'ScoreBoard Display',
    link: 'http://scorecast.simpedu.in/',
    tag: 'Live match score control system',
    quote: 'The whole crowd sees it the instant the referee signals it.',
    desc: 'A live scoreboard system for sepak takraw matches — referees control the score from a courtside device while the venue display updates instantly, set by set.',
    kind: 'desktop',
    images: img('scoreboard', 'desktop', 8),
    color: '#16a34a',
  },
  {
    year: '2026',
    title: 'Uniminute',
    tag: 'E-commerce Platform',
    quote: 'Browse, cart, checkout — under a minute, start to finish.',
    desc: 'A fast, mobile-first e-commerce platform — product catalogue, cart, checkout and order tracking built for speed on every screen size.',
    kind: 'phone',
    images: img('uniminute', 'phone', 8),
    color: '#d97706',
  },
]

export const PROJECT_COUNT = PROJECTS.length
