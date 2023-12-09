import { Dexie, Table } from 'dexie'

export interface IPrompt extends Omit<Prompt, 'id'> {
  id?: number
}

export interface IPromptList
  extends Omit<PromptList, 'id'> {
  id?: number
}

class PrompterDB extends Dexie {
  prompts!: Table<IPrompt>
  promptLists!: Table<IPromptList>

  constructor() {
    super('gpt_prompter')
    console.info('Initializing `prompts` table...')
    this.version(1).stores({
      prompts: '++id, index, text',
    })
    this.version(1).stores({
      promptLists: '++id, index, name, itemIds',
    })
  }
  static instance(): PrompterDB {
    return new PrompterDB()
  }
}

const database = new PrompterDB()
export default database
