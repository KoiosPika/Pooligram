
import ListItem from '@/components/shared/ListItem';
import Selection from '@/components/shared/Selection';
import { Button } from '@/components/ui/button';
import { getPollsByUser } from '@/lib/actions/poll.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { IPoll } from '@/lib/database/models/poll.model';
import { getLevelColor, getNextLevelPoints } from '@/lib/utils';
import { auth } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const user = await getUserById(userId)

    const Polls = await getPollsByUser(userId)

    const points = user.points;

    const upper = getNextLevelPoints(points)

    const lower = upper - 500;

    const earned = ((points - lower) / 500) * 100

    const color = getLevelColor(user.level)

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <ul className='flex flex-col w-full bg-blue-800 rounded-xl p-2'>
                            <div className='flex flex-col bg-white m-3 rounded-lg p-2'>
                                <div className='flex flex-row justify-center items-center gap-2'>
                                    <div className='relative flex items-center justify-center' style={{ height: '65px', width: '65px' }}>
                                        <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={60} width={60} />
                                        <p className='font-bold text-white absolute z-10 text-[20px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{user.level}</p>
                                    </div>
                                    <p className='text-[20px] font-bold'>You need {(upper - points).toLocaleString()} Points to reach next level!</p>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <p className='ml-auto font-bold text-gray-500 mb-1 text-[20px]'>{points.toLocaleString()} / {upper.toLocaleString()}</p>
                                    <div className='flex w-full rounded-full h-3 bg-green-400'>
                                        <div className='flex bg-green-700 rounded-full' style={{ width: `${earned}%` }}></div>
                                    </div>
                                </div>
                                <div className='flex flex-row mt-2 items-center gap-1'>
                                    <Image src={'/assets/icons/info.svg'} alt='info' height={16} width={16} />
                                    <p>You can earn points by voting on polls</p>
                                </div>
                            </div>
                            <div className='w-full flex justify-center items-center gap-3 px-4'>
                                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                                    <p className='text-yellow-300'>My Polls</p>
                                </Button>
                                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                                    <Link className='w-full h-full flex justify-center items-center' href={'/profile/votes'}>
                                        <p>My Votes</p>
                                    </Link>
                                </Button>
                                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                                    <Link className='w-full h-full flex justify-center items-center' href={'/profile/wallet'}>
                                        <p>My Wallet</p>
                                    </Link>
                                </Button>
                            </div>
                            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3'>
                                {Polls.length > 0 && Polls.map((poll: IPoll) => {
                                    return (
                                        <li key={poll._id}>
                                            <ListItem poll={poll} />
                                        </li>
                                    )
                                })}
                            </ul>
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
                <Selection userHashtags={user.hashtags} postHashtags={['']} hiddenPolls={user.hiddenPolls} />
            </div>
        </div>
    )
}

export default page