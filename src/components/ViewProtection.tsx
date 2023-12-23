'use client'

import {
  LocalStorageKey,
  useLocalStorage,
} from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoadingIndicator from './common/Loading'

export const ViewProtection = ({
  children,
}: {
  children: JSX.Element
}) => {
  const [hasViewedString, setHasViewedString] =
    useLocalStorage(LocalStorageKey.hasViewedWelcomePage)
  const hasViewed = Boolean(hasViewedString)
  const router = useRouter()

  useEffect(() => {
    if (hasViewed) {
      router.replace('/prompts')
    }
  }, [hasViewed, setHasViewedString, router])

  if (hasViewedString === null || hasViewed) {
    return <LoadingIndicator />
  }

  return children
}
