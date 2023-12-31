import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'

type ChakraModalProps = ModalContentProps

export const CommonModal = ({
  open,
  closeModal,
  header,
  footer,
  children,
  fixedHeight,
  ...restProps
}: {
  open: boolean
  closeModal: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
  fixedHeight?: string
  children: React.ReactNode
} & ModalContentProps) => {
  const [topOffset, setTopOffset] = useState('-100%')
  const adjustModalPosition = useCallback(
    (element: HTMLElement) => {
      const { height } = element.getBoundingClientRect()
      const { height: documentHeight } =
        document.body.getBoundingClientRect()
      const componentProportion =
        (height / documentHeight) * 100
      setTopOffset(
        `${Math.floor((80 - componentProportion) / 2)}%`
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
      trapFocus={true}
      isOpen={open}
      onClose={closeModal}
      closeOnEsc
      size='2xl'
    >
      <ModalOverlay bg='blackAlpha.50' />
      <ModalContent
        ref={onRefAttached}
        top={topOffset}
        className='border-3 mt-1/4 sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl'
        borderColor='blackAlpha.800'
        maxHeight={fixedHeight ? '' : '75vh'}
        height={fixedHeight ? fixedHeight : ''}
        {...restProps}
      >
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody maxHeight={'100%'}>{children}</ModalBody>
        {!!footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  )
}
