import Selection from '@/components/shared/Selection'
import { Button } from '@/components/ui/button'
import { getUserById } from '@/lib/actions/user.actions'
import { getVotesByUserId } from '@/lib/actions/vote.actions'
import { IVote } from '@/lib/database/models/vote.model'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const user = await getUserById(userId)

    const votes = await getVotesByUserId(userId)

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <ul className='flex flex-col w-full bg-blue-800 rounded-xl p-2'>
                            <div className='w-full flex justify-center items-center gap-3'>
                                <Button className='w-[120px] h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                                    <Link href={'/profile/polls'} className='w-full h-full flex justify-center items-center'>
                                        <p>My Polls</p>
                                    </Link>
                                </Button>
                                <Button className='w-[120px] h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-yellow-400 hover:bg-blue-600'>
                                    My Votes
                                </Button>
                            </div>
                            {votes && votes.map((vote: IVote) => (
                                <div className='bg-white flex flex-row m-2 p-2 rounded-md'>
                                    <Image src={vote.Poll.imageUrl} className='h-[140px] w-[140px] bg-slate-200 rounded-md' alt='hero' height={250} width={250} />
                                    <div className='h-full w-full flex flex-col gap-2 p-3 overflow-hidden'>
                                        <p className='bg-blue-300 text-blue-700 rounded-full py-1 px-5 text-center truncate mr-auto'>{vote.Poll.title}</p>
                                        <p className='bg-green-300 text-green-700 rounded-full py-1 px-5 text-center mr-auto'>{vote.Answer.title}</p>
                                        <Link href={`/poll/${vote.Poll._id}`} className='ml-auto flex flex-row justify-center items-center'>
                                            <p className='text-blue-600 underline rounded-full py-1 px-2 text-center'>More Details</p>
                                            <Image src={'/assets/icons/arrow.svg'} alt='arrow' height={20} width={20}/>
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