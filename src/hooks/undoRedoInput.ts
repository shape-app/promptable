import { useState } from 'react'

interface UndoRedoInput {
  undoStack: string[]
  redoStack: string[]
  userInput: string
}

interface InputHistory {
  text: string
  next: InputHistory | null
  prev: InputHistory | null
}

export const useUndoRedoInput = (initialVal: string) => {
  const [inputHistory, setInputHistory] = useState<{
    current: InputHistory
  }>({
    current: {
      text: initialVal,
      next: null,
      prev: null,
    },
  })
  return {
    userInput: inputHistory.current.text,
    canUndo: !!inputHistory.current.prev,
    canRedo: !!inputHistory.current.next,
    setUndoableInput(val: string) {
      setInputHistory(({ current }) => {
        current.next = {
          text: val,
          next: null,
          prev: current,
        }
        return {
          current: current.next,
        }
      })
    },
    undo() {
      setInputHistory(({ current }) =>
        current.prev !== null
          ? {
              current: current.prev,
            }
          : { current }
      )
    },
    inputHistory,
    redo() {
      setInputHistory(({ current }) =>
        current.next !== null
          ? {
              current: current.next,
            }
          : { current }
      )
    },
  }
}
