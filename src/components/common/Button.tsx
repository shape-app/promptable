import { Button as ChakraButton } from '@chakra-ui/react'
import { ReactNode } from 'react'

const Button = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) => (
  <ChakraButton
    border='2px'
    borderColor='blackAlpha.800'
    fontWeight='normal'
    background='transparent'
    className={`${className}`}
    onClick={onClick}
  >
    {children}
  </ChakraButton>
)

export default Button
