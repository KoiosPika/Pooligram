import Card from '@/components/shared/Card';
import ListItem from '@/components/shared/ListItem';
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
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <ul className='flex flex-col w-full bg-blue-800 rounded-xl p-1'>
                            {Polls.map((poll: IPoll) => {
                                return (
                                    <li key={poll._id} className='flex justify-center overflow-hidden'>
                                        <ListItem poll={poll} />
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