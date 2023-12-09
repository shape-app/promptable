export const PageLayout = ({
  leftNaviBar,
  rightContent,
}: {
  leftNaviBar: React.ReactNode
  rightContent: React.ReactNode
}) => {
  return (
    <div className='grid h-full sm:grid-cols-4 xl:grid-cols-7 2xl:grid-cols-11 sm:gap-x-16 xl:gap-x-20'>
      <div className='h-full pl-20 xl:col-span-2 2xl:col-span-3 sm:col-span-1 overflow-y-scroll pr-4'>
        {leftNaviBar}
      </div>
      <div className='h-full sm:col-span-3 xl:col-span-5 2xl:col-span-8 overflow-y-hidden'>
        {rightContent}
      </div>
    </div>
  )
}
