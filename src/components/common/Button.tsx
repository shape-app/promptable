import { Button as ChakraButton } from '@chakra-ui/react'
import { ReactNode } from 'react'

const Button = ({
  children,
  className,
  onClick,
  disabled,
  allowSubmit = false,
}: {
  allowSubmit?: boolean
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}) => (
  <ChakraButton
    border='2px'
    disabled={disabled}
    borderColor={
      disabled ? 'blackAlpha.400' : 'blackAlpha.800'
    }
    fontWeight='normal'
    background='transparent'
    className={`${className}`}
    onKeyDown={e => {
      if (
        allowSubmit &&
        e.key === 'Enter' &&
        !disabled &&
        onClick
      ) {
        console.log(e)
        onClick()
        e.stopPropagation()
      }
    }}
    onClick={disabled ? undefined : onClick}
    color={disabled ? 'blackAlpha.400' : 'blackAlpha.800'}
    cursor={disabled ? 'auto' : 'pointer'}
  >
    {children}
  </ChakraButton>
)

export default Button
