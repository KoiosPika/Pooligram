import SearchCollections from '@/components/shared/SearchCollections'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2 justify-center items-center'>
                            <div className='w-full flex flex-row justify-end'>
                                <Link href={'/collections/mycollections'} className='bg-yellow-300 text-blue-800 hover:bg-yellow-300 p-2 rounded-lg'>
                                    <p className='font-semibold'>Go to My Collections</p>
                                </Link>
                            </div>
                            <SearchCollections />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page