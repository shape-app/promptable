import {
  Box,
  ButtonGroup,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useClipboard,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import Button from '../common/Button'

export const TableGrid = ({
  items,
  renderItem,
}: {
  items: Prompt[]
  renderItem: (item: Prompt) => React.ReactNode
}) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const buttonGroupRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] =
    useState(1)

  useEffect(() => {
    if (!parentRef.current) {
      return
    }
    let observer = new ResizeObserver(() => {
      if (!parentRef.current) {
        return
      }
      const firstChild = parentRef.current.children[0]
      const parentHeight = parentRef.current.clientHeight
      const buttonGroupHeight =
        buttonGroupRef.current?.clientHeight ?? 0
      const childHeight = firstChild.clientHeight
      const numberOfItemsPerPage = Math.floor(
        (parentHeight - buttonGroupHeight) / childHeight
      )
      setNumberOfItemsPerPage(numberOfItemsPerPage)
    })
    observer.observe(parentRef.current)
    return () => observer.disconnect()
  }, [parentRef.current])

  const numberOfPages = Math.ceil(
    items.length / numberOfItemsPerPage
  )
  const startingIndex = currentPage * numberOfItemsPerPage
  const endingIndex = startingIndex + numberOfItemsPerPage

  return (
    <Flex h='full' direction='column'>
      <Flex
        flex='1 0 auto'
        ref={parentRef}
        minH={0}
        overflow='auto'
        direction='column'
      >
        {items
          .slice(startingIndex, endingIndex)
          .map(item => (
            <Box w='100%' key={item.id}>
              {renderItem(item)}
            </Box>
          ))}
      </Flex>
      <Flex
        flex='0 1 auto'
        direction={'row'}
        justifyContent={'end'}
      >
        <ButtonGroup
          alignItems='center'
          ref={buttonGroupRef}
          gap={5}
        >
          <Button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(v => v - 1)}
          >
            {'<'}
          </Button>
          <Box>
            {currentPage + 1} / {numberOfPages}
          </Box>
          <Button
            disabled={currentPage === numberOfPages - 1}
            onClick={() => setCurrentPage(v => v + 1)}
          >
            {'>'}
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

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
      <Popover placement='bottom' isOpen={showPopover}>
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
