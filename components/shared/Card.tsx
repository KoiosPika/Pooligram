import { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ poll }: { poll: IPoll }) => {
    return (
        <div className='flex relative flex-col max-h-[350px] w-[350px] border-black border-2 rounded-md mx-1'>
            {poll.sponsored &&
                <div className='absolute top-3 left-3 bg-slate-200 border-black border-2 p-1 rounded-full'>
                    <Image src={'/assets/icons/speaker.svg'} alt='speaker' height={20} width={20} />
                </div>}
            <Link href={`/poll/${poll._id}`} className=' flex h-[350px] justify-center items-center overflow-hidden rounded-t-sm'>
                <Image src={poll.imageUrl} alt='hero' height={350} width={350} />
            </Link>
            <Link href={`/poll/${poll._id}`} className='h-[155px] w-full p-2 flex flex-col justify-between bg-slate-200 rounded-b-sm border-black border-t-2'>
                <p className='font-bold truncate-2-lines'>{poll.title}</p>
                <div className='flex flex-row items-center'>
                    <Image src={poll.creator?.photo || '/assets/images/user.png'} alt='user' className='w-[35px] h-[35px] rounded-full' height={100} width={100} />
                    <p className='ml-2 font-semibold'>{poll.creator?.username}</p>
                    {poll.creator?.verified && <Image className='ml-1' src={'/assets/icons/verified.svg'} alt='verified' height={18} width={18} />}
                </div>
            </Link>
        </div>
    )
}

export default Card