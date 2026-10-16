import { WORK_STORIES } from './workStories.js'

// Every source appears once; each scroll step explains a relationship between screens.
const definitions = [
  [
    ['overview', 'mixed', ['school/desktop-1', 'school/phone-7'], 'Office to classroom', 'One school. Connected views.', 'The office dashboard and teacher workspace bring the same school day into focus for different people.'],
    ['access', 'mixed', ['school/desktop-2', 'school/phone-1'], 'Accounts & access', 'A clear way into the platform.', 'Mobile sign-in and the administration login overview show both sides of access to the school platform.'],
    ['fees', 'mixed', ['school/desktop-3', 'school/phone-6'], 'Fees & payments', 'From school records to parent updates.', 'The administration fee workspace pairs with a mobile view of balances and payment history.'],
    ['results', 'mixed', ['school/desktop-4', 'school/phone-5'], 'Grades & results', 'The learning picture, brought together.', 'Desktop reporting and mobile exam results make room for both detailed review and a quick subject-level view.'],
    ['planning', 'phones', ['school/phone-2', 'school/phone-3'], 'Dashboard & timetable', 'The day ahead, in your hand.', 'A parent dashboard and daily timetable bring school updates and the next lesson into a clear mobile experience.'],
    ['attendance', 'phones', ['school/phone-8', 'school/phone-4'], 'Attendance entry & history', 'One action. A clearer record.', 'Classroom attendance entry pairs with a calendar history, connecting the daily task to a readable record.'],
  ],
  [
    ['public', 'web-pair', ['sepaktakraw/desktop-1', 'sepaktakraw/desktop-2'], 'Website & player directory', 'Give the game and its players a home.', 'The public federation website and player directory bring the association, its news and the people behind the sport together.'],
    ['management', 'web-pair', ['sepaktakraw/desktop-3', 'sepaktakraw/desktop-4'], 'Administration & publishing', 'The tools behind the public platform.', 'Player management and content publishing give the association dedicated workspaces for maintaining its platform.'],
  ],
  [
    ['live', 'mixed', ['scoreboard/desktop-1', 'scoreboard/desktop-3'], 'Venue display & referee control', 'From courtside to the whole crowd.', 'The referee’s mobile controls pair with the venue scoreboard: a focused input experience and a clear public display.'],
    ['setup', 'web-pair', ['scoreboard/desktop-5', 'scoreboard/desktop-6'], 'Team & match setup', 'Prepare the game before the first point.', 'Team details and match setup are separate, focused steps in preparing a scoring session.'],
    ['workspace', 'web-pair', ['scoreboard/desktop-4', 'scoreboard/desktop-7'], 'Match workspace & settings', 'Keep the event under control.', 'The match workspace and display settings bring live match context and presentation controls into the same product.'],
    ['moments', 'web-pair', ['scoreboard/desktop-8', 'scoreboard/desktop-2'], 'Timeout & final result', 'Give every moment its place.', 'Dedicated timeout and winner screens carry the match beyond the running score.'],
  ],
  [
    ['discovery', 'phones', ['uniminute/phone-1', 'uniminute/phone-2'], 'Home & nearby stores', 'A closer connection to local shops.', 'The storefront home and nearby-store directory give people two clear ways into local discovery.'],
    ['shopping', 'phones', ['uniminute/phone-5', 'uniminute/phone-3'], 'Catalogue & product detail', 'From the collection to a closer look.', 'A product catalogue pairs with a generous detail view, connecting browsing to a clearer buying decision.'],
    ['shops', 'phones', ['uniminute/phone-6', 'uniminute/phone-8'], 'Food & electronics storefronts', 'Different shops. One considered experience.', 'Food and electronics storefronts show the shopping interface adapting to different local businesses.'],
    ['care', 'phones', ['uniminute/phone-4', 'uniminute/phone-7'], 'Cart & support', 'Care for the steps around shopping.', 'The cart and support screens make space for empty states, common questions and the next useful action.'],
  ],
]

export const WORK_SCENES = WORK_STORIES.map((story, index) => ({
  ...story,
  scenes: definitions[index].map(([id, layout, paths, label, title, description]) => ({
    id, layout, label, title, description,
    screens: paths.map(path => {
      const src = `/work/${path}.webp`
      const screen = story.steps.find(step => step.src === src)
      if (!screen) throw new Error(`Missing product screen in paired scene: ${src}`)
      return screen
    }),
  })),
}))
