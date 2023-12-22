import { useEffect, useState } from 'react'

export enum LocalStorageKey {
  hasViewedWelcomePage = 'has_viewed_welcome_page',
}

export const useLocalStorage = (
  key: LocalStorageKey
): [string | null, (value: string) => void] => {
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setValue(localStorage.getItem(key))
    }
  }, [key])

  if (typeof window === 'undefined') {
    throw Promise.resolve(value)
  }

  return [
    value,
    (value: string) => {
      setValue(value)
      localStorage.setItem(key, value)
    },
  ]
}
