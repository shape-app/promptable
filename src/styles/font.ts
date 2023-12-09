import {
  Patrick_Hand,
  Playfair_Display,
  Roboto,
  Spectral,
} from 'next/font/google'

export const patrickHand = Patrick_Hand({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export const roboto = Roboto({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export const robotoBold = Roboto({
  weight: '700',
  style: 'normal',
  subsets: ['latin'],
})

export const spectral = Spectral({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
})

export const spectralSemiBold = Spectral({
  weight: '500',
  style: 'normal',
  subsets: ['latin'],
})

export const playfairDisplay = Playfair_Display({
  weight: '700',
  subsets: ['latin'],
  style: 'normal',
})

export const robot = Roboto({
  weight: '500',
  subsets: ['latin'],
  style: 'normal',
})

export const robotBold = Roboto({
  weight: '700',
  subsets: ['latin'],
  style: 'normal',
})

export const enum ResponsiveFontSize {
  Normal = '',
  SmallHeader = 'font-semibold sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl',
  MidHeader = 'font-bold 2xl:text-5xl lg:text-3xl sm:text-xl',
  LargeHeader = 'font-extra-bold 2xl:text-5xl lg:text-3xl sm:text-2xl',
}
