'use client'

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
  const [hasViewedString, setHasViewedString] =
    useLocalStorage(LocalStorageKey.hasViewedWelcomePage)
  const hasViewed = Boolean(hasViewedString)
  const router = useRouter()

  useEffect(() => {
    if (hasViewed === null) {
      setHasViewedString(true.toString())
    } else if (hasViewed) {
      router.replace('/prompts')
    } else {
    }
  }, [hasViewed, setHasViewedString, router])

  if (hasViewedString === null || hasViewed) {
    return null
  }

  return children
}
