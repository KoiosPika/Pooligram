import ProfileMenuButton from '@/components/shared/ProfileMenuButton'
import Selection from '@/components/shared/Selection'
import { getSavedPollsByUser } from '@/lib/actions/savedPoll.actions'
import { getUserDataById } from '@/lib/actions/userData.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import { ISavedPoll } from '@/lib/database/models/savedPoll.model'
import { getLevelColor, getNextLevelPoints } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const user = await getUserDataById(userId)

    const points = user.points;

    const upper = getNextLevelPoints(points)

    const lower = upper - 500;

    const earned = ((points - lower) / 500) * 100

    const color = getLevelColor(user.level)

    const savedPolls = await getSavedPollsByUser(userId)

    console.log(savedPolls)

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2'>
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
                                <div className='flex w-full mt-3'>
                                    <Link href={`/profile/${user.User.username}`} className='flex flex-row items-center gap-2 ml-auto rounded-lg text-white px-3 py-1 bg-blue-700'>
                                        <Image className='rounded-full border-[2px] border-white h-[30px] w-[30px]' src={user.User.photo} alt='photo' height={100} width={100} />
                                        <p className='font-semibold text-[15px]'>Go To Profile</p>
                                    </Link>
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-2 justify-center items-center gap-3 px-4'>
                                <ProfileMenuButton title="My Polls" href="/profile/polls" active="Saved Polls" />
                                <ProfileMenuButton title="My Votes" href="/profile/votes" active="Saved Polls" />
                                <ProfileMenuButton title="My Tickets" href="/profile/tickets" active="Saved Polls" />
                                <ProfileMenuButton title="Saved Polls" href="/profile/saved" active="Saved Polls" />
                            </div>
                            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 my-4 px-1'>
                                {savedPolls && savedPolls.map((savedPoll: ISavedPoll) => {
                                    const levelColor = getLevelColor(savedPoll.poll.creator.UserData.level)
                                    return (
                                        <li key={savedPoll._id} className='flex justify-center overflow-hidden'>
                                            <div className='flex flex-col min-h-[350px] bg-yellow-800 w-[300px] mx-1 rounded-lg'>
                                                <Link href={`/poll/${savedPoll.poll._id}`} className='flex flex-center h-[250px] bg-slate-300 rounded-t-lg'>
                                                    <Image src={savedPoll.poll.imageUrl} alt='hero' height={400} width={400} className='w-[300px] h-[250px] overflow-hidden rounded-t-lg' />
                                                </Link>
                                                <div className='flex-1 w-full p-2 flex flex-col justify-between bg-white border-white border-t-2 rounded-b-lg'>
                                                    <p className='truncate-2-lines text-black text-[14px] font-semibold'>{savedPoll.poll.title}</p>
                                                    <div className='flex flex-row items-center'>
                                                        <Image src={savedPoll.poll.creator.photo || '/assets/images/user.png'} alt='user' className='w-[35px] h-[35px] rounded-full border-2 border-white' height={100} width={100} />
                                                        <p className='ml-2 font-semibold text-black text-[17px]'>{savedPoll.poll.creator.username}</p>
                                                        <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                                                            <Image className='ml-1' src={`/assets/levels/level_${levelColor}.svg`} alt='verified' height={32} width={32} />
                                                            <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{savedPoll.poll.creator.UserData.level}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <Selection userHashtags={user.hashtags} postHashtags={['']} query='' hiddenPolls={user.hiddenPolls} />
            </div>
        </div>
    )
}

export default page