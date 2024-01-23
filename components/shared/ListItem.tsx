import { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { timeUntil } from '@/lib/utils'
import Link from 'next/link'

const ListItem = ({ poll }: { poll: IPoll }) => {
    const finalize = true;

    const now = new Date().toISOString();
    console.log(now)
    return (
        <div className='w-full p-3 bg-white m-3 rounded-lg items-center'>
            <div className='flex flex-col gap-2'>
                <p className='py-1 px-2 font-semibold text-[14px] rounded-lg bg-slate-300 text-slate-800'>{poll.title} {poll.title} {poll.title} {poll.title} {poll.title}</p>
                <Link href={`/poll/${poll._id}`} className='flex flex-row gap-1 items-center my-2'>
                    <Image src={poll.imageUrl} alt='hero' width={300} height={300} className='rounded-md sm:h-[300px] sm:w-[300px] h-[150px] w-[150px]' />
                    <div className='flex flex-col justify-center items-center ml-2 mt-auto w-full gap-2'>
                        <Button className='bg-green-700 flex flex-row items-center gap-1 w-full'>
                            <Image src={'/assets/icons/create.svg'} alt='dollar' height={15} width={15} />
                            <p>Edit Poll</p>
                        </Button>
                        {timeUntil(poll.endDateTime.toString(), now) &&
                            <Button disabled className='bg-blue-600 flex flex-row items-center gap-1 w-full'>
                                <Image src={'/assets/icons/stream.svg'} alt='live' height={25} width={25} />
                                <p>Poll is live!</p>
                            </Button>}
                        {!timeUntil(poll.endDateTime.toString(), now) &&
                            <Button disabled className='bg-red-600 flex flex-row items-center gap-1 w-full'>
                                <Image src={'/assets/icons/stream.svg'} alt='live' height={25} width={25} />
                                <p>Poll has Ended</p>
                            </Button>}
                        <p className='w-full text-center py-1 px-2 rounded-lg inline-block font-semibold bg-blue-300 text-blue-800 text-[14px]'>Votes : 3,560,839</p>
                        <p className='font-semibold text-red-600 bg-red-200 py-1 w-full rounded-lg text-center text-[14px]'>{timeUntil(poll.endDateTime.toString(), now)}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ListItem