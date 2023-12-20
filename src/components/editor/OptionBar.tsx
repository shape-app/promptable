'use client'
import { TabIndex } from '@/styles/common'
import { useEffect, useRef } from 'react'

const OptionBar = ({
  setShowOptionBar: setShowOptionBar,
  setShowDeleteModal,
  setShowRenameModal,
}: {
  setShowOptionBar: (value: boolean) => void
  setShowDeleteModal: (value: boolean) => void
  setShowRenameModal: (value: boolean) => void
}) => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement
      if (
        divRef.current &&
        !divRef.current.contains(target)
      ) {
        setShowOptionBar(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () =>
      document.removeEventListener(
        'click',
        handleClickOutside
      )
  }, [])

  return (
    <div
      className='bg-white border-3 border-black rounded-md p-2 z-10'
      ref={divRef}
    >
      <div onClick={e => e.stopPropagation()}>
        <ul>
          <li
            className='hover:bg-gray-100 cursor-pointer grid items-center
                      justify-between grid-cols-[1fr_min-content] px-2 flex-grow text-lg'
            onClick={() => {
              setShowRenameModal(true)
              setShowOptionBar(false)
            }}
          >
            Rename
          </li>
          <li
            className='hover:bg-gray-100 cursor-pointer grid items-center
                      justify-between grid-cols-[1fr_min-content] px-2 flex-grow text-lg'
            onClick={() => {
              setShowDeleteModal(true)
              setShowOptionBar(false)
            }}
          >
            Delete
          </li>
        </ul>
      </div>
    </div>
  )
}

export default OptionBar
