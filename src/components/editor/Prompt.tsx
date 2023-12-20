import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useClipboard,
} from '@chakra-ui/react'
import { useState } from 'react'

export const PromptItem = ({
  text,
  onDeleteClick,
  onEditClick,
  onMouseEnter,
}: {
  text: string
  onEditClick?: () => void
  onDeleteClick?: () => void
  onMouseEnter?: (
    e: React.MouseEvent<HTMLDivElement>
  ) => void
}): React.ReactElement => {
  const [showPopover, setShowPopover] = useState(false)
  const { hasCopied, onCopy } = useClipboard(text, 1000)
  const delayedClosePopover = () =>
    setTimeout(() => {
      setShowPopover(false)
    }, 500)

  return (
    <Box
      className='pt-4 pb-2 px-1 border-black pl-2 pr-2
     flex items-center cursor-pointer
     hover:bg-gray-100 rounded-sm'
    >
      <Popover
        placement='bottom'
        isOpen={showPopover}
        autoFocus={false}
      >
        <PopoverTrigger>
          <div
            className='flex-1 truncate'
            onClick={() => {
              onCopy()
              delayedClosePopover()
            }}
            onMouseEnter={() => setShowPopover(true)}
            onMouseLeave={
              hasCopied
                ? undefined
                : () => setShowPopover(false)
            }
          >
            {text}
          </div>
        </PopoverTrigger>
        <PopoverContent width='w-min' fontSize='md'>
          <PopoverArrow />
          <PopoverBody>
            {hasCopied ? (
              <i className='pi pi-check text-lg' />
            ) : (
              'Click to copy'
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <div
        onMouseEnter={onMouseEnter}
        className={`flex gap-4 ml-4`}
      >
        <i
          onClick={onEditClick}
          className='pi pi-pencil text-lg hover:cursor-pointer'
        />
        <i
          className='pi pi-trash text-lg hover:cursor-pointer'
          onClick={onDeleteClick}
        />
      </div>
    </Box>
  )
}
