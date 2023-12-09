import database from '@/api/database'

export const getPrompts = async (): Promise<
  Array<Prompt>
> => (await database.prompts.toArray()) as Prompt[]

export const getPromptLists = async (): Promise<
  Array<PromptList>
> => (await database.promptLists.toArray()) as PromptList[]

export const deletePromptLists = async ({
  id,
}: {
  id: PromptListId
}): Promise<void> => database.promptLists.delete(id)

export const updatePromptList = async ({
  id,
  name,
}: PromptListUpdate): Promise<void> => {
  database.promptLists.update(id, {
    name,
  })
}

export const createPromptList = async ({
  name,
  index,
}: PromptListCreation): Promise<PromptList> => {
  if (index === -1) {
    index = (await getPromptLists()).length
  }
  const id = await database.promptLists.add({
    name,
    index,
    itemIds: [],
  })

  return (await getPromptLists()).find(
    ({ id: listId }) => listId === id
  ) as PromptList
}

export const updatePrompt = async ({
  id,
  index,
  text,
}: PromptUpdate): Promise<void> => {
  database.prompts.update(id, {
    text,
    index,
  })
}

export const deletePrompt = async ({
  id,
  parentId,
}: PromptDelete): Promise<void> => {
  database.prompts.delete(id)
  const parent = await database.promptLists.get(parentId)
  await database.promptLists.update(parentId, {
    itemIds: (parent?.itemIds || []).filter(
      itemId => itemId !== id
    ),
  })
}

export const addPrompt = async ({
  text,
  index,
  parentId,
}: {
  text: string
  index: number
  parentId: number
}): Promise<void> => {
  const added = await database.prompts.add({
    text,
    index,
  })
  const parent = await database.promptLists.get(parentId)
  await database.promptLists.update(parentId, {
    itemIds: [...(parent?.itemIds || []), added],
  })
}
