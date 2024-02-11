import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'

const SearchCollections = () => {
    return (
        <div className="flex-center min-h-[54px] overflow-hidden rounded-lg bg-blue-800 border-2 border-white px-4 py-2 w-full max-w-[350px] mt-3 mx-1">
            <Image src="/assets/icons/search.svg" alt="search" width={30} height={30} />
            <Input
                type="text"
                placeholder='Search Here...'
                className="p-regular-16 outline-offset-0 placeholder:text-grey-500 focus-visible:ring-0 focus-visible:ring-offset-0 ml-2 rounded-md border-[3px] border-blue-800"
            />
        </div>
    )
}

export default SearchCollections