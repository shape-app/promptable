import { getOpenAiResponse } from '@/api/openai'
import { useEffect, useRef, useState } from 'react'
import { AutosizeTextarea } from '../common/TextInput'
import { usePrompts } from '@/hooks/prompt'
import { useUndoRedoInput } from '@/hooks/undoRedoInput'

const ChatWorkspace = ({
  selectedPromptId,
  version,
}: {
  selectedPromptId: PromptId | undefined
  version: number
}) => {
  const {
    userInput,
    undo,
    redo,
    canUndo,
    canRedo,
    setUndoableInput,
  } = useUndoRedoInput('')
  const [chatHistory, setChatHistory] = useState<
    {
      role: string
      content: string
    }[]
  >([])
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const handleSubmit = async () => {
    setChatHistory([
      ...chatHistory,
      { role: 'user', content: userInput },
    ])
    setUndoableInput('')
    const resp =
      (await getOpenAiResponse({ content: userInput })) ||
      'Fusce nec tincidunt dolor. Donec iaculis felis augue, a condimentum risus finibus vitae. Nulla facilisi. Integer eu faucibus mauris. Sed non nulla quis massa fringilla placerat. Nunc in sollicitudin dolor, sed mattis justo. In a velit nunc. Etiam euismod malesuada ex, id pellentesque sem facilisis a. Mauris vulputate massa eget tellus volutpat, sed venenatis lectus consequat. Cras sed mauris luctus, dignissim neque eu, gravida libero. Sed efficitur lobortis mauris id euismod. Maecenas sit amet purus eget velit auctor luctus. Vivamus vitae commodo ex, vel vulputate arcu. Nam accumsan, sem in dignissim hendrerit, mauris tortor pellentesque felis, ut mattis nisi nulla at ligula.'
    setChatHistory([
      ...chatHistory,
      { role: 'user', content: userInput },
      {
        role: 'assistant',
        content: resp,
      },
    ])
  }

  const selectedPrompt = usePrompts().data?.find(
    prompt => prompt.id === selectedPromptId
  )
  useEffect(() => {
    if (!!ref.current && !!selectedPrompt) {
      const head = userInput.slice(
        0,
        ref.current.selectionStart
      )
      const tail = userInput.slice(ref.current.selectionEnd)
      setUndoableInput(
        (head || '') + selectedPrompt.text + tail
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrompt?.id, selectedPrompt?.text, version])

  return (
    <div
      className='w-full h-workspace pt-6 grid grid-rows-[1fr_min-content]'
      style={{ scrollbarWidth: 'none' }}
    >
      <div className='overflow-y-scroll'>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`m-4 w-80% flex ${
              chat.role === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            {chat.role === 'user' ? (
              <div
                className='cursor-default border-2 w-55% px-4 py-2
                bg-black rounded-md text-white border-black'
              >
                {chat.content}
              </div>
            ) : (
              <div
                className='cursor-default w-55% bg-white px-4 py-2 
                rounded-md text-gray-500 border-2 border-070707'
              >
                {chat.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className='w-80% flex justify-center items-center gap-4 bg-white
        sm:pb-12 lg:pb-20 min-h-15vh pl-8'
      >
        <AutosizeTextarea
          ref={ref}
          value={userInput}
          maxHeight={800}
          onKeyDown={e => {
            if (e.key === 'z' && e.metaKey && e.shiftKey) {
              if (canRedo) {
                redo()
              }
              e.preventDefault()
            } else if (e.key === 'z' && e.metaKey) {
              if (canUndo) {
                undo()
              }
              e.preventDefault()
            }
          }}
          onChange={setUndoableInput}
          onSubmit={handleSubmit}
          placeholder='Send a message...'
        />
        <i
          aria-label='button'
          className='pi pi-send'
          onClick={handleSubmit}
        ></i>
      </div>
    </div>
  )
}

export default ChatWorkspace
