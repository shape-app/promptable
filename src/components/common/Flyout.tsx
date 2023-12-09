'use client'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const Flyout = ({
  children,
  x,
  y,
  isHidden,
}: {
  children: React.ReactNode
  x: number
  y: number
  isHidden: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [actualPosition, setActualPosition] = useState<{
    x: number
    y: number
  }>({ x, y })

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect()
    const componentHasYetMounted = !rect
    const positionFromPropsChanged =
      x !== actualPosition.x || y !== actualPosition.y

    if (positionFromPropsChanged) {
      setActualPosition({ x, y })
    }

    if (componentHasYetMounted) {
      return
    }

    const componentBottom = y + rect.height
    if (componentBottom > window.innerHeight) {
      setActualPosition({
        x,
        y: y - rect.height,
      })
    }
  }, [ref.current, x, y])

  if (isHidden) {
    return null
  }

  return createPortal(
    <div
      className='absolute'
      style={{
        left: actualPosition.x,
        top: actualPosition.y,
      }}
      ref={ref}
    >
      {children}
    </div>,
    window.document.body
  )
}

export default Flyout
