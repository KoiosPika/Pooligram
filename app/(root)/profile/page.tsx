import Card from '@/components/shared/Card';
import { getPollsByUser } from '@/lib/actions/poll.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { IPoll } from '@/lib/database/models/poll.model';
import { auth } from '@clerk/nextjs'
import Image from 'next/image';
import React from 'react'

const page = async () => {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const user = await getUserById(userId);

    const Polls = await getPollsByUser(userId)
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex max-w-[800px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col'>
                    <Image src={user.photo} alt='profile' width={100} height={100} className='rounded-full' />
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-[26px] font-semibold'>{user.username}</p>
                        {user.verified && <Image className='pt-1' src={'/assets/icons/verified.svg'} alt='verified' width={25} height={25} />}
                    </div>
                    <div className='bg-blue-800 flex flex-row border-2 border-black rounded-md gap-20 px-10'>
                        <div className='flex flex-col justify-center items-center p-2'>
                            <p className='text-[20px] font-bold text-white'>8</p>
                            <p className='text-[15px] font-semibold text-white'>Polls</p>
                        </div>
                        <div className='flex flex-col justify-center items-center p-2'>
                            <p className='text-[20px] font-bold text-white'>29.5k</p>
                            <p className='text-[15px] font-semibold text-white'>Votes</p>
                        </div>
                    </div>
                    <div className='grid-cols-1 lg:grid-cols-2 my-5 gap-3'>
                        <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                            {Polls.map((poll: IPoll) => {
                                return (
                                    <li key={poll._id} className='flex justify-center overflow-hidden'>
                                        <Card poll={poll} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page