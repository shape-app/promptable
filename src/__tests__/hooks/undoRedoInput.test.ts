import { renderHook, act } from '@testing-library/react'
import { useUndoRedoInput } from '@/hooks/undoRedoInput'

describe('useuserInputWithUndoRedo should', () => {
  let result: {
    current: ReturnType<typeof useUndoRedoInput>
  }
  let rerender: () => void

  function typeHelloWorld() {
    act(() => {
      result.current.setUndoableInput('hello')
    })
    act(() => {
      result.current.setUndoableInput('hello ')
    })
    act(() => {
      result.current.setUndoableInput('hello world')
    })

    expect(result.current.canUndo).toBeTruthy()
    expect(result.current.canRedo).toBeFalsy()
    expect(result.current.userInput).toEqual('hello world')
  }

  beforeEach(() => {
    let { rerender: innerRerender, result: innerResult } =
      renderHook(() => useUndoRedoInput(''))
    rerender = innerRerender
    result = innerResult
  })

  it('can undo last edit', () => {
    typeHelloWorld()
    act(() => {
      result.current.undo()
    })
    expect(result.current.canUndo).toBeTruthy()
    expect(result.current.canRedo).toBeTruthy()
    expect(result.current.userInput).toEqual('hello ')
  })

  it('can redo last undo', () => {
    typeHelloWorld()
    act(() => {
      result.current.undo()
    })
    act(() => {
      result.current.redo()
    })
    expect(result.current.canUndo).toBeTruthy()
    expect(result.current.canRedo).toBeFalsy()
    expect(result.current.userInput).toEqual('hello world')
  })

  it('can handle multiple batched ops', () => {
    act(() => {
      result.current.setUndoableInput('hello')
      result.current.setUndoableInput('hello ')
      result.current.setUndoableInput('hello world')
    })
    act(() => {
      result.current.undo()
    })
    expect(result.current.canUndo).toBeTruthy()
    expect(result.current.userInput).toEqual('hello ')
  })

  it('can undo multiple times', () => {
    typeHelloWorld()
    act(() => {
      result.current.undo()
    })
    act(() => {
      result.current.undo()
    })
    expect(result.current.canUndo).toBeTruthy()
    expect(result.current.canRedo).toBeTruthy()
    expect(result.current.userInput).toEqual('hello')
  })

  it('can redo multiple times', () => {
    typeHelloWorld()
    act(() => {
      result.current.undo()
      result.current.undo()
    })
    act(() => {
      result.current.redo()
      result.current.redo()
    })
    expect(result.current.canUndo).toBe(true)
    expect(result.current.canRedo).toBe(false)
    expect(result.current.userInput).toEqual('hello world')
  })

  it('erases redo history if there are edits options following undos', () => {
    typeHelloWorld()
    act(() => {
      result.current.undo()
    })
    act(() => {
      result.current.setUndoableInput('test')
    })
    expect(result.current.canUndo).toBe(true)
    expect(result.current.canRedo).toBe(false)
    expect(result.current.userInput).toEqual('test')
  })
})
