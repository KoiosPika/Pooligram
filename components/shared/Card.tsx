import { IPoll } from '@/lib/database/models/poll.model'
import { getLevelColor } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ poll }: { poll: IPoll }) => {

    const color = getLevelColor(poll.creator.UserData.level)
    return (
        <div className='flex flex-col min-h-[360px] bg-yellow-800 w-[350px] rounded-xl mx-1'>
            <Link href={`/poll/${poll._id}`} className='flex flex-center h-[250px] bg-slate-300 text-grey-500 rounded-t-lg'>
                <Image src={poll.imageUrl} alt='hero' height={400} width={400} className='w-[350px] h-[300px] overflow-hidden' />
            </Link>
            <div className='flex-1 w-full p-2 flex flex-col justify-between bg-blue-800 border-white border-t-2 rounded-b-lg'>
                <p className='truncate-2-lines text-white text-[14px] font-semibold'>{poll.title}</p>
                <div className='flex flex-row items-center'>
                    <Image src={poll.creator.photo || '/assets/images/user.png'} alt='user' className='w-[35px] h-[35px] rounded-full border-2 border-white' height={100} width={100} />
                    <p className='ml-2 font-semibold text-white text-[17px]'>{poll.creator.username}</p>
                    <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                        <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                        <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{poll.creator.UserData.level}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card