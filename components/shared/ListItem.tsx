import { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const ListItem = ({ poll }: { poll: IPoll }) => {
    return (
        <>
            <div className='flex flex-row w-full p-3 bg-white m-3 rounded-lg items-center hidden:lg'>
                <Image src={poll.imageUrl} alt='hero' width={60} height={60} />
                <div className='flex flex-col mx-2 w-3/5'>
                    <p className='font-semibold truncate'>Title: {poll.title}</p>
                    <p className='font-semibold'>Votes: 2.43M</p>
                </div>
                <div className='flex flex-col md:flex-row ml-auto gap-2'>
                    <Button className='bg-green-700'>Edit Poll</Button>
                    <Button className='bg-yellow-600'>Finalize Poll</Button>
                </div>
            </div>
        </>
    )
}

export default ListItem