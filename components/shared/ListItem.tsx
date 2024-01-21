import { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { timeUntil } from '@/lib/utils'

const ListItem = ({ poll }: { poll: IPoll }) => {
    return (
        <div className='flex flex-row w-full p-3 bg-white m-3 rounded-lg items-center hidden:lg'>
            <div className='flex flex-col w-2/3 sm:w-3/4'>
                <div className='flex flex-row gap-1 items-center'>
                    <Image src={poll.imageUrl} alt='hero' width={150} height={150} className='rounded-md h-[60px] w-[60px]'/>
                    <div className='flex flex-col mx-2 w-1/2 sm:w-3/4'>
                        <p className='font-semibold truncate'>Title: {poll.title}</p>
                        <p className='font-semibold'>Votes: 28.55M</p>
                    </div>
                </div>
                <p className='font-semibold text-red-600 mt-1'>{timeUntil(poll.endDateTime.toString())}</p>
            </div>
            <div className='flex flex-col md:flex-row ml-auto gap-2'>
                <Button className='bg-green-700'>Edit Poll</Button>
                {!timeUntil(poll.endDateTime.toString()) && <Button className='bg-yellow-600'>Finalize Poll</Button>}
                {timeUntil(poll.endDateTime.toString()) && <Button disabled className='bg-blue-600'>Poll is live!</Button>}
            </div>
        </div>
    )
}

export default ListItem