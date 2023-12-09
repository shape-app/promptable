import { ViewProtection } from '@/components/ViewProtection'
import Link from 'next/link'

const Intro = () => (
  <div className='max-w-2xl mx-auto p-4 text-gray-800'>
    <div className='text-3xl font-bold mb-4'>
      Welcome to Promptable!
    </div>
    <div className='italic mb-6'>
      &#x2F;ˈprɒmptəbl&#x2F;
    </div>
    <div className='text-xl font-bold mb-4'>
      What is Promptable?
    </div>
    <div className='mb-6'>
      Tired of scrolling through chat history just to find
      specific prompts? Can&apos;t find a central place to
      save your customized prompts? Find highlighting the
      entire text for copying too slow and tedious? <br />
      Promptable is a web app designed to tackle these
      challenges for users of AI powerhouses like ChatGPT
      and Bard.
    </div>
    <div className='text-xl font-bold mb-4'>Team</div>
    <div className='mb-10'>
      Promptable is developed and maintained by Shape, a
      community-driven organization focused on exploring a
      shared interest in software products. <br />
      Visit our{' '}
      <a
        className='text-gray-600 font-bold'
        href='https://ablaze-empress-f41.notion.site/Shape-bd828c0f62bf4b7d84e79a0cab20cd35'
        target='_blank'
        rel='noopener noreferrer'
      >
        Notion page
      </a>{' '}
      to learn more. For inquiries or feedback, please email
      us at{' '}
      <a
        className='text-gray-600 font-bold'
        href='mailto:shapeapp.23@gmail.com'
      >
        shapeapp.23@gmail.com
      </a>
      .
    </div>
    <div className='mb-6'>
      <Link
        className='bg-black text-white py-2 px-4 hover:bg-gray-800 transition duration-300'
        href={'/prompts'}
      >
        Get Started
      </Link>
    </div>
    <div className='text-sm'>
      &copy; Copyright {new Date().getFullYear()}{' '}
      Promptable. All rights reserved.
    </div>
  </div>
)

const Page = () => {
  return (
    <>
      <ViewProtection>
        <Intro />
      </ViewProtection>
    </>
  )
}

export default Page
