'use client'

import { Skeleton, Stack } from '@chakra-ui/react'

import {
  LocalStorageKey,
  useLocalStorage,
} from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const ViewProtection = ({
  children,
}: {
  children: JSX.Element
}) => {
  const [hasViewedString, setHasViewed] = useLocalStorage(
    LocalStorageKey.hasViewedWelcomePage
  )
  const hasViewed = Boolean(hasViewedString)
  const router = useRouter()
  console.log('ViewProtection: rendering')

  useEffect(() => {
    if (!hasViewed) {
      setHasViewed(false.toString())
    } else {
      router.replace('/prompts', undefined)
    }
  })

  if (hasViewedString === null || hasViewed) {
    return (
      <div className='flex justify-center'>
        <Stack width={'3xl'} spacing={10}>
          <Skeleton height='50px' width={'xl'} />
          <Skeleton height='30px' />
          <Skeleton height='30px' />
          <Skeleton height='30px' />
          <Skeleton height='30px' />
          <Skeleton height='30px' />
        </Stack>
      </div>
    )
  }

  return children
}
