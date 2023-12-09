type PromptId = number
type PromptListId = number

interface PromptList {
  id: PromptListId
  index: number
  name: string
  itemIds: Array<PromptId>
}

interface PromptListDelete {
  id: PromptListId
}

interface PromptListUpdate {
  id: PromptListId
  index?: number
  name?: string
  itemIds?: Array<PromptId>
}

interface PromptListCreation {
  index: number
  name: string
}

interface Prompt {
  id: PromptId
  index: number
  text: string
}

interface PromptUpdate {
  id: number
  index?: number
  text?: string
}

interface PromptCreation {
  index?: number
  text?: string
}

interface PromptDelete {
  id: PromptId
  parentId: PromptListId
}
