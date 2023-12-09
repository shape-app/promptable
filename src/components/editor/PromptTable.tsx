import {
  Box,
  Grid,
  GridItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useClipboard,
} from '@chakra-ui/react'
import { useState } from 'react'

export const TableGrid = ({
  items,
  renderItem,
}: {
  items: Prompt[]
  renderItem: (item: Prompt) => React.ReactNode
}) => {
  return (
    <Grid
      templateRows={`repeat(${items.length}, min-content)`}
    >
      {items.map(item => (
        <GridItem w='100%' key={item.id}>
          {renderItem(item)}
        </GridItem>
      ))}
    </Grid>
  )
}

export const PromptItem = ({
  text,
  gap = 3,
  onDeleteClick,
  onEditClick,
  onMouseEnter,
}: {
  text: string
  gap?: 2 | 3 | 4 | 6 | 8
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
      <Popover placement='bottom' isOpen={showPopover}>
        <PopoverTrigger>
          <div
            className='flex-1'
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
        className={`flex gap-${gap} ml-4`}
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
