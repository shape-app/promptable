'use client'
import LeftNaviBarForChat from './LeftNaviBarForChat'
import { PageLayout } from '../common/PageLayout'
import ChatWorkspace from './RightChatWorkspace'
import { useState } from 'react'

const ChatInterface = ({
  promptLists,
  prompts,
}: {
  promptLists: Array<PromptList>
  prompts: Array<Prompt>
}) => {
  const [selectedPromptId, setSelectedPromptId] =
    useState<PromptId>()
  const [version, setVersion] = useState<number>(0)
  return (
    <PageLayout
      rightContent={
        <ChatWorkspace
          version={version}
          selectedPromptId={selectedPromptId}
        />
      }
      leftNaviBar={
        <LeftNaviBarForChat
          promptLists={promptLists}
          prompts={prompts}
          setSelectedPromptId={id => {
            setSelectedPromptId(id)
            setVersion(version + 1)
          }}
        />
      }
    />
  )
}

export default ChatInterface
