'use client'

import PromptList from './PromptList'
import { useContext } from 'react'
import LeftNaviBarForEditor from './LeftNaviBarForEditor'
import { PageLayout } from '../common/PageLayout'
import { ActiveListContext } from '@/contexts/prompt'

const PromptEditor = ({
  promptLists,
  prompts,
}: {
  promptLists: Array<PromptList>
  prompts: Array<Prompt>
}) => {
  const { activeListId, setActiveListId } = useContext(
    ActiveListContext
  )
  const activePromptList = promptLists.find(promptList => {
    return promptList.id === activeListId
  })
  const promptsInPromptList = prompts.filter(
    prompt => activePromptList?.itemIds.includes(prompt.id)
  )
  return (
    <PageLayout
      rightContent={
        activePromptList ? (
          <PromptList
            key={activePromptList.id}
            promptList={activePromptList}
            promptsInPromptList={promptsInPromptList}
          />
        ) : null
      }
      leftNaviBar={
        <LeftNaviBarForEditor
          activeListId={activeListId}
          setActiveListId={setActiveListId}
          promptLists={promptLists}
        />
      }
    />
  )
}

export default PromptEditor
