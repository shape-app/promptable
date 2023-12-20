import { useEffect, useRef, useState } from 'react'
import {
  AriaLabel,
  FocusStyle,
  TabIndex,
} from '@/styles/common'
import SearchBox from '../common/Search'
import OptionBar from './OptionBar'
import { CommonModal } from '../common/Modal'
import Button from '@/components/common/Button'
import {
  usePromptListsDeletion,
  usePromptListCreation,
  usePromptListUpdate,
} from '@/hooks/prompt'
import { AutosizeTextarea } from '../common/TextInput'
import Flyout from '@/components/common/Flyout'
import { ButtonGroup } from '@chakra-ui/react'

const LeftNaviBarForEditor = ({
  activeListId,
  setActiveListId,
  promptLists,
}: {
  activeListId: number | undefined
  setActiveListId: (value: number) => void
  promptLists: Array<PromptList>
}) => {
  const [showSearchBox, setShowSearchBox] = useState(false)
  const { data, trigger: createPromptList } =
    usePromptListCreation()
  const handleItemClick = (
    item: 'search' | 'preview' | 'add'
  ) => {
    switch (item) {
      case 'search':
        setShowSearchBox(true)
        break
      case 'preview':
        break
      case 'add':
        createPromptList({ name: '', index: -1 })
        break
    }
  }

  return (
    <>
      {showSearchBox ? (
        <SearchBox
          promptLists={promptLists}
          setShowSearchBox={setShowSearchBox}
          setActiveListId={setActiveListId}
        />
      ) : null}
      <div>
        <ToolbarItem
          icon='pi pi-search'
          text='Search'
          handleItemClick={() => handleItemClick('search')}
        />
        <ToolbarItem
          icon='pi pi-plus'
          text='Create a prompt list'
          handleItemClick={() => handleItemClick('add')}
        />
      </div>
      <div className='mt-6'>
        {promptLists.map(promptList => (
          <PromptList
            key={promptList.id}
            promptList={promptList}
            activeListId={activeListId}
            setActiveListId={setActiveListId}
            forceRenameModal={
              !!data && data.id === promptList.id
            }
          />
        ))}
      </div>
    </>
  )
}

export default LeftNaviBarForEditor

export const ToolbarItem = ({
  icon,
  text,
  handleItemClick,
}: {
  icon: string
  text: string
  handleItemClick: () => void
}) => {
  return (
    <div
      className='flex gap-5 items-center pb-4 cursor-pointer'
      onClick={() => handleItemClick()}
    >
      <i className={`${icon} xl:text-2xl 2xl:text-2l`} />
      <div className='col-span-3'>{text}</div>
    </div>
  )
}

export const PromptList = ({
  promptList,
  activeListId,
  setActiveListId,
  forceRenameModal = false,
}: {
  promptList: PromptList
  activeListId: number | undefined
  setActiveListId: (value: number) => void
  forceRenameModal?: boolean
}) => {
  const [showOptionBar, setShowOptionBar] = useState(false)
  const [showDeleteModal, setShowDeleteModal] =
    useState(false)
  const [showRenameModal, setShowRenameModal] =
    useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { trigger: deletePromptLists } =
    usePromptListsDeletion()

  useEffect(() => {
    if (forceRenameModal && !showRenameModal) {
      setShowRenameModal(true)
    }
  }, [forceRenameModal])

  const boundingRect = ref.current?.getBoundingClientRect()
  const bottom = boundingRect?.bottom ?? 0
  const right = boundingRect?.right ?? 0

  return (
    <div
      onKeyDown={e => {
        if (e.key === 'Enter') {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
          document.activeElement?.dispatchEvent(clickEvent)
        }
      }}
      className={`pt-2 pb-1 mb-2 cursor-default 
              border-b-3 transition-all duration-300 text-gray-500 
               ${
                 promptList.id === activeListId
                   ? 'text-gray-700 border-black'
                   : 'border-transparent'
               } ${FocusStyle.SelectableItem} px-2`}
      key={promptList.id}
      tabIndex={TabIndex.Normal}
    >
      <div
        className='flex-grow hover:cursor-pointer flex items-center justify-between'
        onClick={() => setActiveListId(promptList.id)}
      >
        {showRenameModal ? (
          <PromptListRenameModal
            className='w-80%'
            promptList={promptList}
            setShowRenameModal={setShowRenameModal}
          />
        ) : (
          <div className='truncate break-words'>
            {promptList.name}
          </div>
        )}
        <div
          aria-label={AriaLabel.Button}
          ref={ref}
          className={`flex items-center ml-2 relative ${FocusStyle.SelectableItem}`}
          onClick={e => {
            e.stopPropagation()
            setShowOptionBar(!showOptionBar)
          }}
          tabIndex={TabIndex.Normal}
        >
          <i
            className='pi pi-ellipsis-h cursor-pointer 
                  hover:bg-gray-100 rounded-md p-2'
            style={{ fontSize: '1.2rem' }}
          />
        </div>
        {showDeleteModal ? (
          <PromptListDeleteModal
            setShowDeleteModal={setShowDeleteModal}
            promptList={promptList}
            onConfirm={PromptListDelete =>
              deletePromptLists(PromptListDelete)
            }
          />
        ) : null}
        <Flyout
          x={right}
          y={bottom}
          isHidden={!showOptionBar}
        >
          <OptionBar
            setShowOptionBar={setShowOptionBar}
            setShowDeleteModal={setShowDeleteModal}
            setShowRenameModal={setShowRenameModal}
          />
        </Flyout>
      </div>
    </div>
  )
}

const PromptListDeleteModal = ({
  setShowDeleteModal,
  promptList,
  onConfirm,
}: {
  setShowDeleteModal: (value: boolean) => void
  promptList: PromptList
  onConfirm: (value: PromptListDelete[]) => Promise<void>
}) => {
  const closeDialogue = () => {
    setShowDeleteModal(false)
  }
  return (
    <CommonModal
      open
      closeModal={() => setShowDeleteModal(false)}
      header='Are you sure to delete?'
      onKeyDown={async e => {
        switch (e.key) {
          case 'Enter':
            e.stopPropagation()
            await onConfirm([{ id: promptList.id }])
            closeDialogue()
            break
          case 'Escape':
            closeDialogue()
            e.stopPropagation()
            break
        }
      }}
      footer={
        <>
          <ButtonGroup>
            <Button onClick={() => closeDialogue()}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (promptList !== undefined) {
                  await onConfirm([{ id: promptList.id }])
                  closeDialogue()
                }
              }}
            >
              Confirm
            </Button>
          </ButtonGroup>
        </>
      }
    >
      <div className='text-base'>{promptList.name}</div>
    </CommonModal>
  )
}

const PromptListRenameModal = ({
  promptList,
  setShowRenameModal,
}: {
  className?: string
  promptList: PromptList
  setShowRenameModal: (value: boolean) => void
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { trigger: updatePromptList } =
    usePromptListUpdate()
  const [inputValue, setInputValue] = useState(
    promptList.name
  )
  const [warningMessage, setWarningMessage] = useState('')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const saveAndQuit = () => {
    if (inputValue.trim() === '') {
      setWarningMessage('Name cannot be empty.')
      return
    }
    setShowRenameModal(false)
    updatePromptList({
      id: promptList.id,
      name: inputValue,
    })
  }

  const handleChange = (value: string) => {
    if (warningMessage) setWarningMessage('')
    setInputValue(value)
  }

  return (
    <div>
      {warningMessage && (
        <div className='flex items-center text-xs text-gray-700 bg-gray-50 border border-gray-300 p-2 rounded-md shadow space-x-2'>
          <i className='pi pi-exclamation-triangle'></i>{' '}
          <span className='leading-tight text-xl'>
            {warningMessage}
          </span>
        </div>
      )}
      <AutosizeTextarea
        resize='none'
        padding='0px 1px'
        height='100%'
        borderColor='gray-200'
        ref={inputRef}
        scale={1}
        value={inputValue}
        onSubmit={saveAndQuit}
        onBlur={() => saveAndQuit()}
        onKeyDown={e => {
          switch (e.key) {
            case 'Escape':
            case 'Enter':
              e.stopPropagation()
              return saveAndQuit()
          }
        }}
        onChange={handleChange}
        className={`mt-2 w-full shadow-sm rounded-md border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        style={{ fontSize: '30px' }}
      />
    </div>
  )
}
