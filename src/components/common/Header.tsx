import { ResponsiveFontSize, roboto } from '@/styles/font'
import { NextFont } from 'next/dist/compiled/@next/font'

export const Header = ({
  className,
  children,
  font = roboto,
  size = 'sm',
}: {
  className?: string
  font?: NextFont
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}) => (
  <header
    aria-label='header'
    className={`${className || ''} ${font.className} ${
      size === 'sm'
        ? 'font-semibold sm:text-sm md:text-md lg:text-lg 2xl:text-2xl'
        : size === 'md'
        ? 'font-bold sm:text-sm md:text-md lg:text-lg 2xl:text-2xl'
        : ResponsiveFontSize.LargeHeader
    }`}
  >
    {children}
  </header>
)
