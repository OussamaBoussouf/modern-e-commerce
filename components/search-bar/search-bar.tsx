import { lazy, Suspense } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import SearchLoader from './search-loader'

const SearchSuggestions = lazy(() => import('./search-suggestions'))

function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const debouncedSearchValue = useDebounce(searchValue)
  const previewer = useRef(null)

  useEffect(() => {
    if (debouncedSearchValue.length > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [debouncedSearchValue])

  return (
    <div ref={previewer} className='relative'>
      <input
        className='bg-slate-200 w-full text-sm rounded-md py-2 ps-4 pe-8'
        type='text'
        placeholder='Search Product'
        name='search'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onBlur={() => setIsVisible(false)}
      />
      <Search
        size='15'
        color='black'
        className='absolute right-3 top-1/2 -translate-y-1/2'
      />
      {searchValue.length > 0 && (
        <Suspense fallback={<SearchLoader />}>
          <SearchSuggestions
            searchedValue={debouncedSearchValue}
            isVisible={isVisible}
            setIsVisible={() => setIsVisible(false)}
          />
        </Suspense>
      )}
    </div>
  )
}

export default SearchBar
