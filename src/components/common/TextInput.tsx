import { Textarea } from '@chakra-ui/react'
import {
  useRef,
  forwardRef,
  ForwardedRef,
  useEffect,
  MutableRefObject,
} from 'react'

type TextareaProps = Parameters<typeof Textarea>['0']

type OtherProps = Omit<
  TextareaProps,
  | 'onChange'
  | 'onBlur'
  | 'focusBorderColor'
  | 'value'
  | 'maxBlockSize'
  | 'focusBorderColor'
>

const AutosizeTextarea = forwardRef(
  (
    {
      value,
      onChange,
      borderColor,
      onKeyDown,
      onBlur,
      onSubmit,
      scale = 1,
      tolerance = 10,
      maxHeight,
      ...rest
    }: {
      scale?: number
      onBlur?: () => void
      tolerance?: number
      value?: string
      onChange?: (value: string) => void
      borderColor?: TextareaProps['focusBorderColor']
      onKeyDown?: (e: React.KeyboardEvent) => void
      onSubmit?: () => void
      maxHeight?: number | string
    } & OtherProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const handleRef = useRef<{ handled: boolean }>({
      handled: false,
    })
    const textAreaRef: MutableRefObject<HTMLTextAreaElement | null> =
      useRef<HTMLTextAreaElement>(null)
    const handleElement = (
      element: HTMLTextAreaElement | null
    ) => {
      if (!!element) {
        textAreaRef.current = element
        if (ref instanceof Function) {
          ref(element)
        } else if (!!ref) {
          ref.current = element
        }

        element.style.height = '1px'
        const scrollHeight = Math.floor(
          element.scrollHeight * scale
        )
        const difference = Math.abs(
          scrollHeight - element.clientHeight * scale
        )
        if (
          difference > tolerance &&
          scrollHeight > tolerance
        ) {
          element.style.height = `${scrollHeight}px`
        }
      }
    }

    useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.selectionStart =
          textAreaRef.current.value.length
        textAreaRef.current.selectionEnd =
          textAreaRef.current.value.length
      }
    }, [])

    return (
      <Textarea
        boxSizing='border-box'
        minHeight='min-content'
        ref={handleElement}
        style={{ resize: 'none' }}
        autoFocus
        maxBlockSize={maxHeight}
        onBlur={onBlur}
        value={value}
        onKeyDown={e => {
          if (onKeyDown) {
            onKeyDown(e)
          }
          if (e.key == 'Enter' && !e.shiftKey) {
            handleRef.current.handled = true
            onSubmit?.()
            e.stopPropagation()
          }
        }}
        focusBorderColor={borderColor || 'blackAlpha.800'}
        onChange={e => {
          if (handleRef.current.handled) {
            handleRef.current.handled = false
          } else {
            onChange?.(e.target.value || '')
          }
        }}
        {...rest}
      />
    )
  }
)

AutosizeTextarea.displayName = 'AutosizeTextarea'
export { AutosizeTextarea }
