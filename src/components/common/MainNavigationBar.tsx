import { robotBold, robotoBold } from '@/styles/font'
import { Header } from './Header'

const MainNavigation = () => (
  <Header
    className={`flex flex-row h-navigator justify-between
     items-center sm:px-14 lg:px-20`}
  >
    <div className={`logo ${robotBold.className}`}></div>
    <div
      className={`flex flex-row text-center font-bold
      ${robotoBold.className}`}
    >
      <div className='mr-6'>Promptable</div>
    </div>
  </Header>
)

export default MainNavigation
