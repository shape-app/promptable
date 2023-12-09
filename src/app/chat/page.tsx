'use client'
import ChatInterface from '@/components/chat/ChatInterface'
import { usePromptLists, usePrompts } from '@/hooks/prompt'

const Chat = () => {
  const { data: prompts } = usePrompts()
  const { data: promptLists } = usePromptLists()

  return (
    <ChatInterface
      prompts={prompts || []}
      promptLists={promptLists || []}
    />
  )
}

export default Chat
