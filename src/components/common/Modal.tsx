import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'

export const CommonModal = ({
  open,
  closeModal,
  header,
  footer,
  children,
}: {
  open: boolean
  closeModal: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}) => {
  const [topOffset, setTopOffset] = useState('-100%')
  const adjustModalPosition = useCallback(
    (element: HTMLElement) => {
      const { height } = element.getBoundingClientRect()
      const { height: documentHeight } =
        document.body.getBoundingClientRect()
      const componentProportion =
        (height / documentHeight) * 100
      setTopOffset(
        `${Math.floor((70 - componentProportion) / 2)}%`
      )
    },
    []
  )

  const onRefAttached = useCallback(
    (element: HTMLElement | null) => {
      if (!element) {
        return
      }
      adjustModalPosition(element)
      const observer = new ResizeObserver(() =>
        adjustModalPosition(element)
      )
      observer.observe(element)
      return () => observer.disconnect()
    },
    [adjustModalPosition]
  )

  return (
    <ChakraModal
      isOpen={open}
      onClose={closeModal}
      closeOnEsc
      size='2xl'
    >
      <ModalOverlay bg='blackAlpha.50' />
      <ModalContent
        ref={onRefAttached}
        top={topOffset}
        className='border-3 mt-1/4 sm:text-sm md:text-md lg:text-lg 
        xl:text-xl 2xl:text-2xl'
        borderColor='blackAlpha.800'
        maxHeight='75vh'
      >
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {!!footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  )
}
