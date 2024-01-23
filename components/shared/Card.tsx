import { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ poll }: { poll: IPoll }) => {
    return (
        <div className='flex relative flex-col h-[300px] w-[350px] rounded-xl mx-1'>
            <Link href={`/poll/${poll._id}`} className='flex flex-center h-[200px] flex-grow bg-gray-50 bg-cover bg-center text-grey-500 rounded-t-lg'>
                <Image src={poll.imageUrl} alt='hero' height={300} width={300} className='flex w-[350px] overflow-hidden'/>
            </Link>
            <Link href={`/poll/${poll._id}`} className='h-[155px] w-full p-2 flex flex-col justify-between bg-blue-800 border-white border-t-2 rounded-b-lg'>
                <p className='font-semibold truncate-2-lines text-white text-[14px]'>{poll.title}</p>
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