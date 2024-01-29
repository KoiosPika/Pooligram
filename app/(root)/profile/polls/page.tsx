
import ListItem from '@/components/shared/ListItem';
import Selection from '@/components/shared/Selection';
import { Button } from '@/components/ui/button';
import { getPollsByUser } from '@/lib/actions/poll.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { IPoll } from '@/lib/database/models/poll.model';
import { auth } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const user = await getUserById(userId)

    const Polls = await getPollsByUser(userId)
    

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <ul className='flex flex-col w-full bg-blue-800 rounded-xl p-2'>
                            <div className='w-full flex justify-center items-center gap-3'>
                                <Button className='w-[120px] h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-yellow-400 hover:bg-blue-600'>
                                    My Polls
                                </Button>
                                <Button className='w-[120px] h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                                    <Link className='w-full h-full flex justify-center items-center' href={'/profile/votes'}>
                                        <p>My Votes</p>
                                    </Link>
                                </Button>
                            </div>
                            {Polls.length > 0 && Polls.map((poll: IPoll) => {
                                return (
                                    <li key={poll._id} className='flex justify-center overflow-hidden'>
                                        <ListItem poll={poll} />
                                    </li>
                                )
                            })}
                            {Polls.length == 0 &&
                                <div className='w-full flex flex-col bg-white rounded-lg justify-center items-center p-3'>
                                    <Image
                                        src={'/assets/icons/poll-2.svg'}
                                        alt='poll' height={200} width={200}
                                    />
                                    <p className='font-bold text-[21px]'>
                                        You don't have any polls yet!
                                    </p>
                                    <Button className='bg-green-600 mt-3 hover:bg-green-700'>
                                        <Link href={'/poll/create'}>
                                            Create Poll Now!
                                        </Link>
                                    </Button>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
                <div className='flex flex-row gap-1 items-center my-3 mr-auto ml-3'>
                    <Image src={'/assets/icons/poll-2.svg'} alt='poll' height={29} width={29} />
                    <p className='font-bold text-[20px]'>More Polls For You:</p>
                </div>
                <Selection userHashtags={user.hashtags} postHashtags={['']} hiddenPolls={user.hiddenPolls}/>
            </div>
        </div>
    )
}

export default page