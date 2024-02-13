import CopyLinkDialog from '@/components/shared/CopyLinkDialog'
import Selection from '@/components/shared/Selection'
import { Button } from '@/components/ui/button'
import { getUserDataById } from '@/lib/actions/userData.actions'
import { getVotesByUserId } from '@/lib/actions/vote.actions'
import { IVote } from '@/lib/database/models/vote.model'
import { getLevelColor, getNextLevelPoints } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const user = await getUserDataById(userId)

    const votes = await getVotesByUserId(userId)

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
                                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                                    <Link href={'/profile/polls'} className='w-full h-full flex justify-center items-center'>
                                        <p>My Polls</p>
                                    </Link>
                                </Button>
                                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                                    <p className='text-yellow-300'>My Votes</p>
                                </Button>
                                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 hover:bg-blue-600'>
                                    <Link href={'/profile/tickets'} className='w-full h-full flex justify-center items-center'>
                                        <p>My Tickets</p>
                                    </Link>
                                </Button>
                            </div>
                            {votes && votes.map((vote: IVote) => (
                                <div className='bg-white flex flex-row m-2 p-2 rounded-md'>
                                    <Image src={vote.Poll.imageUrl} className='h-[150px] w-[150px] md:h-[180px] md:w-[180px] bg-slate-200 rounded-md' alt='hero' height={250} width={250} />
                                    <div className='h-full w-full flex flex-col gap-2 p-3 overflow-hidden'>
                                        <p className='bg-blue-300 text-blue-700 rounded-full py-1 px-5 text-center truncate mr-auto'>{vote.Poll.title}</p>
                                        <p className='bg-green-300 text-green-700 rounded-full py-1 px-5 text-center mr-auto'>{vote.Answer.title}</p>
                                        <div className='ml-auto'>
                                            <CopyLinkDialog link={`https://pooligram.vercel.app/poll/${vote.Poll._id}`} />
                                        </div>
                                        <Link href={`/poll/${vote.Poll._id}`} className='ml-auto flex flex-row justify-center items-center bg-blue-500 rounded-md px-2'>
                                            <p className='text-white rounded-full py-1 px-2 text-center'>More Details</p>
                                            <Image src={'/assets/icons/arrow-white.svg'} alt='arrow' height={20} width={20} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
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