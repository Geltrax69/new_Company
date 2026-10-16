import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { PROJECTS } from '../src/data/projects.js'
import { WORK_STORIES } from '../src/data/workStories.js'

const directories = ['school', 'sepaktakraw', 'scoreboard', 'uniminute']

test('every product WebP is included exactly once in its complete gallery sequence and catalog', () => {
  directories.forEach((directory, index) => {
    const files = readdirSync(new URL(`../public/work/${directory}/`, import.meta.url))
      .filter(name => name.endsWith('.webp')).map(name => `/work/${directory}/${name}`).sort()
    const screens = WORK_STORIES[index].steps.map(step => step.src)
    assert.deepEqual([...screens].sort(), files, `${directory}: gallery must include every source exactly once`)
    assert.deepEqual([...PROJECTS[index].images].sort(), files, `${directory}: catalog must include every source`)
  })
})
