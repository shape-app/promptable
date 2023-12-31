'use client'

import { useState } from 'react'
import {
  usePromptCreation,
  usePromptDeletion,
  usePromptUpdate,
} from '@/hooks/prompt'
import { PromptItem } from './Prompt'
import { AutosizeTextarea } from '../common/TextInput'
import { CommonModal } from '../common/Modal'
import { ToolbarItem } from '@/components/editor/LeftNaviBarForEditor'

import Button from '../common/Button'
import { ButtonGroup } from '@chakra-ui/react'
import Pagination from '../common/Pagination'

const PromptList = ({
  promptList,
  promptsInPromptList,
}: {
  promptList: PromptList
  promptsInPromptList: Array<Prompt>
}) => {
  return (
    <PromptTable
      promptsInPromptList={promptsInPromptList}
      promptList={promptList}
    />
  )
}

type EmptyState = {
  state?: undefined
}
type CreationState = {
  state: 'create'
}
type DeletionState = {
  state: 'delete'
  options: {
    prompt: Prompt
  }
}
type BulkDeletionState = {
  state: 'bulkDelete'
}
type UpdateState = {
  state: 'update'
  options: {
    prompt: Prompt
  }
}
type DialogueState =
  | EmptyState
  | CreationState
  | UpdateState
  | DeletionState
  | BulkDeletionState

const PromptTable = ({
  promptList,
  promptsInPromptList,
}: {
  promptList: PromptList
  promptsInPromptList: Array<Prompt>
}) => {
  const [dialogueState, setDialogueState] =
    useState<DialogueState>({})
  const closeCurrentDialogue = () => setDialogueState({})
  const { trigger: createPrompt } = usePromptCreation()
  const { trigger: updatePrompt } = usePromptUpdate()
  const { trigger: deletePrompts } = usePromptDeletion()

  return (
    <>
      <div className='flex flex-col pr-20 mb-3 pl-8 h-full box-border'>
        {dialogueState.state === 'update' ? (
          <PromptEditorDialogue
            activePrompt={dialogueState.options.prompt}
            key={`edit-${
              dialogueState.options.prompt?.id || -1
            }`}
            setVisible={closeCurrentDialogue}
            onSave={(promptUpdate: PromptUpdate) =>
              updatePrompt(promptUpdate)
            }
            visible
            header='Edit Prompt'
          />
        ) : null}
        {dialogueState.state === 'delete' ? (
          <PromptDeleteDialog
            activePrompts={[dialogueState.options.prompt]}
            promptList={promptList}
            visible
            key={`delete-${
              dialogueState.options.prompt?.id || -1
            }`}
            setVisible={closeCurrentDialogue}
            onConfirm={promptDeletes =>
              deletePrompts(promptDeletes)
            }
          />
        ) : null}
        <PromptEditorDialogue
          activePrompt={undefined}
          visible={dialogueState.state === 'create'}
          key={`add-${-1}`}
          setVisible={closeCurrentDialogue}
          onSave={async ({ text }) => {
            if (!text) {
              return
            }
            createPrompt({
              text,
              index: promptsInPromptList.length,
              parentId: promptList.id,
            })
          }}
          header='Add Prompt'
        />
        <div className='flex-initial'>
          <ToolbarItem
            icon='pi pi-plus'
            text='Add a new prompt'
            handleItemClick={() =>
              setDialogueState({
                state: 'create',
              })
            }
          />
        </div>
        <div className='flex-auto min-w-0'>
          <Pagination
            items={promptsInPromptList}
            getItemKey={prompt => prompt.id}
            renderItem={prompt => (
              <PromptItem
                onEditClick={() =>
                  setDialogueState({
                    state: 'update',
                    options: { prompt },
                  })
                }
                onDeleteClick={() =>
                  setDialogueState({
                    state: 'delete',
                    options: { prompt },
                  })
                }
                text={prompt.text}
              ></PromptItem>
            )}
          ></Pagination>
        </div>
      </div>
    </>
  )
}
export default PromptList

type PromptEditorDialogueProps = {
  visible: boolean
  setVisible: (value: boolean) => void
  header: string
} & (
  | {
      activePrompt: Prompt
      onSave: (value: PromptUpdate) => Promise<void>
    }
  | {
      activePrompt: undefined
      onSave: (value: { text: string }) => Promise<void>
    }
)

const PromptEditorDialogue = ({
  activePrompt,
  visible,
  setVisible,
  onSave,
  header,
}: PromptEditorDialogueProps) => {
  const closeDialogue = () => setVisible(false)
  const [currentPromptText, setCurrentPromptText] =
    useState(activePrompt?.text || '')

  const savePrompt = () => {
    if (activePrompt !== undefined) {
      onSave({
        ...activePrompt,
        text: currentPromptText,
      })
    } else {
      onSave({ text: currentPromptText })
      setCurrentPromptText('')
    }
  }

  const onSaveClick = () => {
    if (!currentPromptText) {
      return
    }
    savePrompt()
    closeDialogue()
  }

  return (
    <CommonModal
      open={visible}
      closeModal={closeDialogue}
      header={header}
      footer={
        <ButtonGroup>
          <Button onClick={closeDialogue}>Close</Button>
          <Button onClick={onSaveClick}>Save</Button>
        </ButtonGroup>
      }
      onKeyDown={e => {
        switch (e.key) {
          case 'Escape':
            e.stopPropagation()
            closeDialogue()
            break
        }
      }}
    >
      <AutosizeTextarea
        maxHeight='53vh'
        value={currentPromptText}
        onChange={setCurrentPromptText}
        scale={1.1}
        tolerance={10}
        onSubmit={() => {
          savePrompt()
          closeDialogue()
        }}
      />
    </CommonModal>
  )
}

const PromptDeleteDialog = ({
  activePrompts,
  promptList,
  visible,
  setVisible,
  onConfirm,
}: {
  activePrompts?: Prompt[]
  visible: boolean
  promptList: PromptList
  setVisible: (value: boolean) => void
  onConfirm: (value: PromptDelete[]) => Promise<void>
}) => {
  const closeDialogue = () => setVisible(false)
  const deletePromptsAndCloseDialogue = () => {
    if (activePrompts !== undefined) {
      onConfirm(
        activePrompts.map(prompt => ({
          id: prompt.id,
          parentId: promptList.id,
        }))
      )
      closeDialogue()
    }
  }

  return (
    <CommonModal
      closeModal={closeDialogue}
      open={visible}
      header='Are you sure to delete?'
      footer={
        <ButtonGroup>
          <Button onClick={closeDialogue}>Cancel</Button>
          <Button onClick={deletePromptsAndCloseDialogue}>
            Confirm
          </Button>
        </ButtonGroup>
      }
      onKeyDown={e => {
        switch (e.key) {
          case 'Escape':
            e.stopPropagation()
            closeDialogue()
            break
          case 'Enter':
            e.stopPropagation()
            deletePromptsAndCloseDialogue()
            break
        }
      }}
    >
      <div>
        {activePrompts && activePrompts?.length > 1 ? (
          <div className='confirmation-content text-base'>
            <div>{activePrompts.length} prompts</div>
          </div>
        ) : null}
        {activePrompts && activePrompts.length === 1 ? (
          <div className='confirmation-content text-base'>
            <div>{activePrompts[0].text}</div>
          </div>
        ) : null}
      </div>
    </CommonModal>
  )
}
