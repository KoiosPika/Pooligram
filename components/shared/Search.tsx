import React from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'

const Search = () => {
    return (
        <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-lg bg-grey-50 px-4 py-2 max-w-[450px] mt-3 border-black border-2 mx-3">
            <Image src="/assets/icons/search.svg" alt="search" width={25} height={25} />
            <Input
                type="text"
                placeholder='Search Here...'
                className="p-regular-16 outline-offset-0 placeholder:text-grey-500 focus-visible:ring-0 focus-visible:ring-offset-0 ml-3 border-black border-2 rounded-md"
            />
        </div>
    )
}

export default Search