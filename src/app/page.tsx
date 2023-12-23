'use client'

import { ViewProtection } from '@/components/ViewProtection'
import { WelcomePage } from '@/app/WelcomePage'

const Page = () => {
  return (
    <>
      <ViewProtection>
        <WelcomePage />
      </ViewProtection>
    </>
  )
}

export default Page
