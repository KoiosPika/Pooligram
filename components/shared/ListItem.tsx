import { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { timeUntil } from '@/lib/utils'
import Link from 'next/link'

const ListItem = ({ poll }: { poll: IPoll }) => {
    const finalize = true;
    return (
        <div className='flex flex-row w-full p-3 bg-white m-3 rounded-lg items-center hidden:lg'>
            <div className='flex flex-col gap-2 w-2/3'>
                <p className='font-semibold text-[15px] truncate-2-lines'>Title: {poll.title}</p>
                <Link href={`/poll/${poll._id}`} className='flex flex-row flex-1 gap-1 items-center'>
                    <Image src={poll.imageUrl} alt='hero' width={150} height={150} className='rounded-md h-[65px] w-[65px]' />
                    <div className='flex flex-col mx-2'>
                        <p className='font-semibold bg-blue-300 text-blue-800 py-1 px-2 text-[12px] rounded-full'>Votes: 28.55M</p>
                    </div>
                </Link>
                <div className='flex-row'>
                    <p className='py-1 px-2 rounded-full inline-block font-semibold bg-green-300 text-green-800 text-[13px]'>Earnings: $1,890.60</p>
                </div>
            </div>
            <div className='flex flex-col ml-auto gap-1'>
                <div className='flex flex-col gap-2'>
                    <Button className='bg-green-700 flex flex-row items-center gap-1'>
                        <Image src={'/assets/icons/create.svg'} alt='dollar' height={15} width={15} />
                        <p>Edit Poll</p>
                    </Button>
                    {!timeUntil(poll.endDateTime.toString()) &&
                        <Button className='bg-yellow-600 flex flex-row items-center gap-1'>
                            <Image src={'/assets/icons/dollar.svg'} alt='dollar' height={10} width={10} />
                            <p>Finalize Poll</p>
                        </Button>}
                    {timeUntil(poll.endDateTime.toString()) &&
                        <Button disabled className='bg-blue-600 flex flex-row items-center gap-1'>
                            <Image src={'/assets/icons/stream.svg'} alt='live' height={25} width={25} />
                            <p>Poll is live!</p>
                        </Button>}
                </div>
                <p className='font-bold text-red-600 mt-1 sm:ml-auto'>{timeUntil(poll.endDateTime.toString())}</p>
            </div>
        </div>
    )
}

export default ListItem