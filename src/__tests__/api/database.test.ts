/**
 * @jest-environment node
 */

/**
 * @note For the fake indexedDB implemetation to work with Dexie,
 * this import must come before Dexie.
 */
import 'fake-indexeddb/auto'
import database from '@/api/database'

describe('promptsAPI', () => {
  beforeEach(async () => {
    await database.prompts.clear()
  })

  it('can add and retrieve prompts from the database', async () => {
    const promptId = await database.prompts.add({
      index: 0,
      text: 'hello',
    })
    const [prompt] = await database.prompts.bulkGet([
      promptId,
    ])
    expect(prompt!.text).toEqual('hello')
    expect(prompt!.index).toEqual(0)
  })

  it('can correctly delete prompts', async () => {
    const promptId = await database.prompts.add({
      index: 0,
      text: 'hello',
    })
    const [prompt] = await database.prompts.bulkGet([
      promptId,
    ])
    expect(prompt!.text).toEqual('hello')
    expect(prompt!.index).toEqual(0)
  })
})
