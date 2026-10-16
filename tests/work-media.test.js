import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { PROJECTS } from '../src/data/projects.js'
import { WORK_STORIES } from '../src/data/workStories.js'

const directories = ['school', 'sepaktakraw', 'scoreboard', 'uniminute']

test('every product WebP is included exactly once in its visible story and catalog', () => {
  directories.forEach((directory, index) => {
    const files = readdirSync(new URL(`../public/work/${directory}/`, import.meta.url))
      .filter(name => name.endsWith('.webp')).map(name => `/work/${directory}/${name}`).sort()
    const screens = WORK_STORIES[index].steps.map(step => step.src)
    assert.deepEqual([...screens].sort(), files, `${directory}: story must show every source exactly once`)
    assert.deepEqual([...PROJECTS[index].images].sort(), files, `${directory}: catalog must include every source`)
  })
})

test('paired and original single-screen stories include every product WebP exactly once', async () => {
  const { WORK_SCENES } = await import('../src/data/workScenes.js')
  directories.forEach((directory, index) => {
    const sources = WORK_SCENES[index].scenes.flatMap(scene => scene.screens.map(screen => screen.src))
    const files = readdirSync(new URL(`../public/work/${directory}/`, import.meta.url))
      .filter(name => name.endsWith('.webp')).map(name => `/work/${directory}/${name}`).sort()
    assert.deepEqual([...sources].sort(), files, `${directory}: paired scenes must include every source exactly once`)
    assert.equal(WORK_SCENES[index].scenes.length, [6, 4, 8, 4][index])
    assert(WORK_SCENES[index].scenes.every(scene => scene.screens.length === ([0, 3].includes(index) ? 2 : 1)))
  })
})
