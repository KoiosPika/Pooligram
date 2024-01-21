'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

const Search = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          let newUrl = '';
    
          if(query) {
            newUrl = formUrlQuery({
              params: searchParams.toString(),
              key: 'query',
              value: query
            })
          } else {
            newUrl = removeKeysFromQuery({
              params: searchParams.toString(),
              keysToRemove: ['query']
            })
          }
    
          router.push(newUrl, { scroll: false });
        }, 300)
    
        return () => clearTimeout(delayDebounceFn);
      }, [query, searchParams, router])

      
    return (
        <div className="flex-center min-h-[54px] overflow-hidden rounded-lg bg-blue-800 px-4 py-2 w-full max-w-[350px] mt-3 mx-1">
            <Image src="/assets/icons/search.svg" alt="search" width={30} height={30} />
            <Input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder='Search Here...'
                className="p-regular-16 outline-offset-0 placeholder:text-grey-500 focus-visible:ring-0 focus-visible:ring-offset-0 ml-2 rounded-md"
            />
        </div>
    )
}

export default Search