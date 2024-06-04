'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import FilterButton from './FilterButton'

function Filter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const filterName = searchParams.get('capacity') ?? 'all'

  function handleFliter(filter) {
    const params = new URLSearchParams(searchParams)

    params.set('capacity', filter)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="border border-primary-800 flex">
      <FilterButton
        filterName={filterName}
        filter="all"
        handleFliter={handleFliter}
      >
        All Cabins
      </FilterButton>
      <FilterButton
        filterName={filterName}
        filter="small"
        handleFliter={handleFliter}
      >
        1&mdash;3 Guests
      </FilterButton>
      <FilterButton
        filterName={filterName}
        filter="medium"
        handleFliter={handleFliter}
      >
        4&mdash;7 Guests
      </FilterButton>
      <FilterButton
        filterName={filterName}
        filter="large"
        handleFliter={handleFliter}
      >
        8+ Guests
      </FilterButton>
    </div>
  )
}

export default Filter
