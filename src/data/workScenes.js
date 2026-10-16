import { WORK_STORIES } from './workStories.js'

// Every source appears once. School/commerce use pairs; sports projects retain single-screen stories.
const definitions = [
  [
    ['overview', 'mixed', ['school/desktop-1', 'school/phone-7'], 'Office to classroom', 'One school. Connected views.', 'The office dashboard and teacher workspace bring the same school day into focus for different people.'],
    ['access', 'mixed', ['school/desktop-2', 'school/phone-1'], 'Accounts & access', 'A clear way into the platform.', 'Mobile sign-in and the administration login overview show both sides of access to the school platform.'],
    ['fees', 'mixed', ['school/desktop-3', 'school/phone-6'], 'Fees & payments', 'From school records to parent updates.', 'The administration fee workspace pairs with a mobile view of balances and payment history.'],
    ['results', 'mixed', ['school/desktop-4', 'school/phone-5'], 'Grades & results', 'The learning picture, brought together.', 'Desktop reporting and mobile exam results make room for both detailed review and a quick subject-level view.'],
    ['planning', 'phones', ['school/phone-2', 'school/phone-3'], 'Dashboard & timetable', 'The day ahead, in your hand.', 'A parent dashboard and daily timetable bring school updates and the next lesson into a clear mobile experience.'],
    ['attendance', 'phones', ['school/phone-8', 'school/phone-4'], 'Attendance entry & history', 'One action. A clearer record.', 'Classroom attendance entry pairs with a calendar history, connecting the daily task to a readable record.'],
  ],
  null, // HSTA retains its original single-screen story.
  null, // ScoreBoard retains its original single-screen story.
  [
    ['discovery', 'phones', ['uniminute/phone-1', 'uniminute/phone-2'], 'Home & nearby stores', 'A closer connection to local shops.', 'The storefront home and nearby-store directory give people two clear ways into local discovery.'],
    ['shopping', 'phones', ['uniminute/phone-5', 'uniminute/phone-3'], 'Catalogue & product detail', 'From the collection to a closer look.', 'A product catalogue pairs with a generous detail view, connecting browsing to a clearer buying decision.'],
    ['shops', 'phones', ['uniminute/phone-6', 'uniminute/phone-8'], 'Food & electronics storefronts', 'Different shops. One considered experience.', 'Food and electronics storefronts show the shopping interface adapting to different local businesses.'],
    ['care', 'phones', ['uniminute/phone-4', 'uniminute/phone-7'], 'Cart & support', 'Care for the steps around shopping.', 'The cart and support screens make space for empty states, common questions and the next useful action.'],
  ],
]

export const WORK_SCENES = WORK_STORIES.map((story, index) => ({
  ...story,
  scenes: definitions[index] ? definitions[index].map(([id, layout, paths, label, title, description]) => ({
    id, layout, label, title, description,
    screens: paths.map(path => {
      const src = `/work/${path}.webp`
      const screen = story.steps.find(step => step.src === src)
      if (!screen) throw new Error(`Missing product screen in paired scene: ${src}`)
      return screen
    }),
  })) : story.steps.map((step, i) => ({ ...step, id: `screen-${i + 1}`, layout: 'single', screens: [step] })),
}))
