import {
  addPrompt,
  deletePrompt,
  getPrompts,
  getPromptLists,
  updatePrompt,
  deletePromptLists,
  updatePromptList,
  createPromptList,
} from '@/api/prompts'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'

type Args = {
  text: string
  index: number
  parentId: number
}
const PROMPT_KEY = 'prompts'
const PROMPT_LIST_KEY = 'promptLists'

export const usePrompts = () =>
  useSWR(PROMPT_KEY, getPrompts)

export const usePromptLists = () =>
  useSWR(PROMPT_LIST_KEY, getPromptLists)

const refetchPromptsAndLists = () => {
  mutate(PROMPT_KEY)
  mutate(PROMPT_LIST_KEY)
}

const refetchPromptLists = () => mutate(PROMPT_LIST_KEY)

export const usePromptCreation = () =>
  useSWRMutation<void, unknown, 'createPrompt', Args>(
    'createPrompt',
    (key: string, { arg }) => addPrompt(arg),
    {
      onSuccess: refetchPromptsAndLists,
    }
  )

export const usePromptUpdate = () =>
  useSWRMutation<
    void,
    unknown,
    'createPrompt',
    PromptUpdate
  >(
    'createPrompt',
    (key: string, { arg }) => updatePrompt(arg),
    {
      onSuccess: refetchPromptsAndLists,
    }
  )

export const usePromptDeletion = () =>
  useSWRMutation<
    void,
    unknown,
    'deletePrompt',
    { id: number; parentId: number }[]
  >(
    'deletePrompt',
    async (key: string, { arg }) => {
      await Promise.all(
        arg.map(prompt => deletePrompt(prompt))
      )
    },
    {
      onSuccess: refetchPromptsAndLists,
    }
  )

export const usePromptListsDeletion = () =>
  useSWRMutation<
    void,
    unknown,
    'deletePromptLists',
    { id: PromptListId }[]
  >(
    'deletePromptLists',
    async (key: string, { arg }) => {
      await Promise.all(arg.map(deletePromptLists))
    },
    {
      onSuccess: refetchPromptsAndLists,
    }
  )

export const usePromptListUpdate = () =>
  useSWRMutation<
    void,
    unknown,
    'renamePromptLists',
    { id: PromptListId; name?: string }
  >(
    'renamePromptLists',
    async (key: string, { arg }) => {
      await updatePromptList(arg)
    },
    {
      onSuccess: refetchPromptLists,
    }
  )

export const usePromptListCreation = () =>
  useSWRMutation<
    PromptList,
    unknown,
    'createPromptList',
    PromptListCreation
  >(
    'createPromptList',
    (key: string, { arg }) => createPromptList(arg),
    {
      onSuccess: refetchPromptLists,
    }
  )
