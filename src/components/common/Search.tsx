import { useState } from 'react'
import { CommonModal } from './Modal'

const SearchBox = ({
  promptLists,
  setShowSearchBox,
  setActiveListId,
}: {
  promptLists: PromptList[]
  setShowSearchBox: (value: boolean) => void
  setActiveListId: (value: number) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value)
  }
  const handleItemClick = (itemId: number) => {
    setActiveListId(itemId)
    setShowSearchBox(false)
  }
  return (
    <CommonModal
      open
      closeModal={() => setShowSearchBox(false)}
    >
      <div className='p-6'>
        <input
          autoFocus
          className='border-b-3 border-gray-300 bg-white 
                         h-10 w-full mb-3
                         text-md focus:outline-none focus:border-black'
          type='text'
          name='search'
          placeholder='Search prompt list'
          onChange={handleInput}
        />
        <ul>
          {promptLists
            .filter(promptList =>
              promptList.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map(item => (
              <>
                <div
                  className='hover:bg-gray-100 cursor-pointer grid items-center
                      justify-between grid-cols-[1fr_min-content]
                      [&>*:last-child]:hidden [&>*:last-child]:hover:block p-2'
                  onClick={() => handleItemClick(item.id)}
                >
                  <li key={item.id} className='flex-grow'>
                    {item.name}
                  </li>
                  <div>
                    <i className='fas fa-camera-retro pi pi-arrow-right' />
                  </div>
                </div>
              </>
            ))}
        </ul>
      </div>
    </CommonModal>
  )
}

export default SearchBox
