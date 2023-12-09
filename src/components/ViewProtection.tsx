'use client'
import {
  LocalStorageKey,
  useLocalStorage,
} from '@/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const ViewProtection = () => {
  const [hasViewed, setHasViewed] = useLocalStorage(
    LocalStorageKey.hasViewedWelcomePage
  )
  const router = useRouter()

  useEffect(() => {
    if (!hasViewed) {
      setHasViewed(false.toString())
    }
  })

  if (hasViewed) {
    router.replace('/prompts')
  }

  return null
}
