import { Box, ButtonGroup, Flex } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import Button from './Button'

const Pagination = <T,>({
  items,
  renderItem,
  getItemKey,
}: {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  getItemKey: (item: T) => string | number
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
      if (!firstChild) {
        return
      }
      const parentHeight = parentRef.current.clientHeight
      const buttonGroupHeight =
        buttonGroupRef.current?.clientHeight ?? 0
      const childHeight = firstChild.clientHeight
      const numberOfItemsPerPage = Math.floor(
        (parentHeight - buttonGroupHeight) / childHeight
      )
      setNumberOfItemsPerPage(numberOfItemsPerPage)

      const maxNumberOfPages = Math.ceil(
        items.length / numberOfItemsPerPage
      )
      if (maxNumberOfPages - 1 <= currentPage) {
        setCurrentPage(maxNumberOfPages - 1)
      }
    })
    observer.observe(parentRef.current)
    return () => observer.disconnect()
  }, [items])

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
            <Box w='100%' key={getItemKey(item)}>
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

export default Pagination
