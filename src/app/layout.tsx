'use client'

import './globals.css'
import 'primereact/resources/themes/mira/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { ChakraProvider } from '@chakra-ui/react'
import { spectral } from '@/styles/font'
import MainNavigationBar from '@/components/common/MainNavigationBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <ChakraProvider>
        <body className={`h-screen ${spectral.className}`}>
          <MainNavigationBar />
          <main
            className={`h-rest sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl`}
          >
            {children}
          </main>
        </body>
      </ChakraProvider>
    </html>
  )
}
