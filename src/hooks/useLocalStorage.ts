export const enum LocalStorageKey {
  hasViewedWelcomePage = 'has_viewed_welcome_page',
}

export const useLocalStorage = (
  key: LocalStorageKey
): [string | null, (value: string) => void] => {
  // We are running in browser
  if (typeof window !== 'undefined') {
    return [
      localStorage.getItem(key),
      (value: string) => {
        localStorage.setItem(key, value)
      },
    ]
  }

  // We are running on server
  return [null, () => {}]
}
