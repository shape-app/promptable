import { createContext } from 'react'

interface IActiveListContext {
  activeListId?: number
  activeList?: PromptList
  setActiveListId: (value: number) => void
}

export const ActiveListContext =
  createContext<IActiveListContext>({
    setActiveListId() {
      throw new Error('setActiveListId not implemented')
    },
  })
