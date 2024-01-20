import { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ poll }: { poll: IPoll }) => {
    return (
        <div className='flex relative flex-col h-[300px] w-[350px] rounded-xl mx-1'>
            {poll.sponsored &&
                <div className='absolute top-3 left-3 bg-white border-black border-2 p-1 rounded-full'>
                    <Image src={'/assets/icons/speaker.svg'} alt='speaker' height={20} width={20} className='bg-white'/>
                </div>}
            <Link style={{backgroundImage:`url(${poll.imageUrl})`}} href={`/poll/${poll._id}`} className='flex-center h-[350px] flex-grow bg-gray-50 bg-cover bg-center text-grey-500 rounded-t-lg'/>
            <Link href={`/poll/${poll._id}`} className='h-[155px] w-full p-2 flex flex-col justify-between bg-blue-800 border-black border-t-2 rounded-b-lg'>
                <p className='font-bold truncate-2-lines text-white text-[14px]'>{poll.title}</p>
                <div className='flex flex-row items-center'>
                    <Image src={poll.creator?.photo || '/assets/images/user.png'} alt='user' className='w-[35px] h-[35px] rounded-full border-2 border-white' height={100} width={100} />
                    <p className='ml-2 font-semibold text-white'>{poll.creator?.username}</p>
                    {poll.creator?.verified && <Image className='ml-1' src={'/assets/icons/verified.svg'} alt='verified' height={18} width={18} />}
                </div>
            </Link>
        </div>
    )
}

export default Card