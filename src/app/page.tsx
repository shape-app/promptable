'use client'

import { ViewProtection } from '@/components/ViewProtection'
import { WelcomePage } from '@/app/WelcomePage'
import { Suspense } from 'react'
import LoadingIndicator from '@/components/common/Loading'

const Page = () => {
  return (
    <>
      <Suspense fallback={<LoadingIndicator />}>
        <ViewProtection>
          <WelcomePage />
        </ViewProtection>
      </Suspense>
    </>
  )
}

export default Page
