import { MutableRefObject, useRef } from 'react'

const useTimeout = (
  timeoutInSec: number
): {
  start: (func: () => void) => void
  cancel: () => void
} => {
  const timeoutHandleRef: MutableRefObject<
    NodeJS.Timeout | undefined
  > = useRef()

  return {
    start: (func: () => void) => {
      if (!!timeoutHandleRef.current) {
        console.log('Find another timer, skipping')
        return
      }
      console.log(
        `Set a timer firing in ${timeoutInSec} secs`
      )
      timeoutHandleRef.current = setTimeout(() => {
        func()
        timeoutHandleRef.current = undefined
      }, timeoutInSec * 1_000)
    },
    cancel: () => {
      if (!timeoutHandleRef.current) {
        console.log('No active timer, skipping')
        return
      }
      clearTimeout(timeoutHandleRef.current)
      console.log(
        'Timer cancelled, timer ID',
        timeoutHandleRef.current
      )
      timeoutHandleRef.current = undefined
    },
  }
}

export default useTimeout
