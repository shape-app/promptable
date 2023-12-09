'use client'

import PromptEditor from '@/components/editor/PromptEditor'
import { useState } from 'react'
import { usePromptLists, usePrompts } from '@/hooks/prompt'
import { ActiveListContext } from '@/contexts/prompt'

export default function Home() {
  const { data: prompts } = usePrompts()
  const { data: promptLists } = usePromptLists()
  const [promptListId, setPromptListId] = useState<number>()

  return (
    <ActiveListContext.Provider
      value={{
        activeListId: promptListId,
        activeList: promptLists?.find(
          list => list.id === promptListId
        ),
        setActiveListId: setPromptListId,
      }}
    >
      <PromptEditor
        prompts={prompts || []}
        promptLists={promptLists || []}
      />
    </ActiveListContext.Provider>
  )
}
