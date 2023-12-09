'use client'

import { useState } from 'react'
import {
  usePromptCreation,
  usePromptDeletion,
  usePromptUpdate,
} from '@/hooks/prompt'
import { PromptItem, TableGrid } from './PromptTable'
import { AutosizeTextarea } from '../common/TextInput'
import { CommonModal } from '../common/Modal'
import { ToolbarItem } from '@/components/editor/LeftNaviBarForEditor'

import Button from '../common/Button'
import { ButtonGroup } from '@chakra-ui/react'

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
      <div className='mr-20 mb-3 pr-12 pl-8'>
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
        <ToolbarItem
          icon='pi pi-plus'
          text='Add a new prompt'
          handleItemClick={() =>
            setDialogueState({
              state: 'create',
            })
          }
        />
        <TableGrid
          items={promptsInPromptList}
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
              gap={4}
              text={prompt.text}
            ></PromptItem>
          )}
        ></TableGrid>
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

  const onSaveClick = () => {
    if (!currentPromptText) {
      return
    }
    if (activePrompt !== undefined) {
      onSave({
        ...activePrompt,
        text: currentPromptText,
      })
    } else {
      onSave({ text: currentPromptText })
      setCurrentPromptText('')
    }
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
    >
      <AutosizeTextarea
        maxHeight='53vh'
        value={currentPromptText}
        onChange={setCurrentPromptText}
        scale={1.1}
        tolerance={10}
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
  return (
    <CommonModal
      closeModal={closeDialogue}
      open={visible}
      header='Are you sure to delete?'
      footer={
        <ButtonGroup>
          <Button onClick={closeDialogue}>Cancel</Button>
          <Button
            onClick={async () => {
              if (activePrompts !== undefined) {
                await onConfirm(
                  activePrompts.map(prompt => ({
                    id: prompt.id,
                    parentId: promptList.id,
                  }))
                )
                closeDialogue()
              }
            }}
          >
            Confirm
          </Button>
        </ButtonGroup>
      }
    >
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
    </CommonModal>
  )
}
