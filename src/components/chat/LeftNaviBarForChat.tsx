'use client'
import { useContext, useState } from 'react'
import { ActiveListContext } from '@/contexts/prompt'

const LeftNaviBarForChat = ({
  promptLists,
  prompts,
  setSelectedPromptId,
}: {
  promptLists: Array<PromptList>
  prompts: Array<Prompt>
  setSelectedPromptId: (id: PromptId) => void
}) => {
  const { setActiveListId } = useContext(ActiveListContext)
  const [showCopyIcon, setShowCopyIcon] = useState(true)
  const [showKeyIcon, setShowKeyIcon] = useState(true)
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard:', text)
        setShowCopyIcon(false)
        setTimeout(() => {
          setShowCopyIcon(true)
        }, 1000)
      })
      .catch(error => {
        console.error('Failed to copy text:', error)
      })
  }

  const handleAutoFill = (id: PromptId) => {
    setShowKeyIcon(false)
    setSelectedPromptId(id)
    setTimeout(() => {
      setShowKeyIcon(true)
    }, 1000)
  }
  return (
    <>
      <div className='h-ful'>
        <div className='mt-6'>
          {promptLists.map(promptList => {
            const promptsInPromptList = prompts.filter(
              prompt =>
                promptList?.itemIds.includes(prompt.id)
            )
            return (
              <>
                <div>
                  <div
                    className={`pt-2 pb-1 mb-2 cursor-default 
                                border-b-3 border-white
                                transition-all duration-200
                                grid grid-cols-[1fr_min-content] 
                                text-gray-500 ${'text-gray-700 border-black'}`}
                    key={promptList.id}
                    tabIndex={0}
                  >
                    {promptList.name}
                  </div>
                  {promptsInPromptList.map(prompt => (
                    <div
                      className='flex items-center mb-2 text-gray-500'
                      key={prompt.id}
                    >
                      <div className='flex gap-4 items-center pb-2'>
                        <div>
                          {showKeyIcon ? (
                            <IconForPromptInNavibar
                              iconType='key'
                              onClick={() =>
                                handleAutoFill(prompt.id)
                              }
                            />
                          ) : (
                            <IconForPromptInNavibar iconType='check' />
                          )}
                          {showCopyIcon ? (
                            <IconForPromptInNavibar
                              iconType='copy'
                              onClick={() =>
                                handleCopy(prompt.text)
                              }
                            />
                          ) : (
                            <IconForPromptInNavibar iconType='check' />
                          )}
                        </div>
                        <div>{prompt.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default LeftNaviBarForChat

const IconForPromptInNavibar = ({
  iconType,
  onClick,
}: {
  iconType: 'key' | 'copy' | 'check'
  onClick?: () => void
}) => {
  return (
    <i
      className={`pi pi-${iconType} hover:bg-gray-200 hover:text-black rounded-md p-2 cursor-pointer`}
      onClick={onClick}
    />
  )
}
