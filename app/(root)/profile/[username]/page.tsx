import SocialsDialog from '@/components/shared/SocialsDialog'
import SocialsDrawer from '@/components/shared/SocialsDrawer'
import { getPollsByProfile } from '@/lib/actions/poll.actions'
import { getUserDataByUsername } from '@/lib/actions/userData.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import { IUserData } from '@/lib/database/models/userData.model'
import { getLevelColor } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ params: { username } }: { params: { username: string } }) => {

    const user: IUserData = await getUserDataByUsername(username)

    const polls = await getPollsByProfile(user.User._id)

    const color = getLevelColor(user.level)

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2 justify-center items-center'>
                            <div className='flex flex-col w-full md:w-8/12 justify-center items-center bg-slate-100 rounded-md p-3'>
                                <div className='flex flex-row w-full items-center p-2'>
                                    <Image className='h-[80px] w-[80px] rounded-full' src={user.User.photo} alt='photo' height={200} width={200} />
                                    <div className='ml-auto flex flex-row justify-center items-center gap-5'>
                                        <div className='flex flex-col items-center'>
                                            <p className='text-gray-500 text-[14px] sm:text-[16px]'>Votes Submitted</p>
                                            <p className='font-semibold text-[14px] sm:text-[16px]'>{user.totalVotesSubmitted}</p>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <p className='text-gray-500 text-[14px] sm:text-[16px]'>Votes Received</p>
                                            <p className='font-semibold text-[14px] sm:text-[16px]'>{user.totalVotesReceived}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row w-full items-center px-2'>
                                    <p className='font-semibold text-[18px]'>{user.User.username}</p>
                                    <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                                        <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                                        <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{user.level}</p>
                                    </div>
                                    <div className='ml-auto hidden sm:block'>
                                        <SocialsDialog />
                                    </div>
                                    <div className='ml-auto sm:hidden'>
                                        <SocialsDrawer />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row w-full gap-2 my-3 px-1'>
                                <Link href={`/profile/${user.User.username}`} className='flex flex-1 justify-center items-center py-2 bg-blue-500 rounded-lg border-[3px] border-yellow-400'>
                                    <p className='font-semibold text-[12px] md:text-[17px] text-yellow-300'>Polls ({user.nofPolls})</p>
                                </Link>
                                <Link href={`/profile/${user.User.username}/collections`} className='flex flex-1 justify-center items-center py-2 bg-blue-500 rounded-lg'>
                                    <p className='font-semibold text-[12px] md:text-[17px] text-white'>Collections ({user.nofCollections})</p>
                                </Link>
                                <Link href={`/profile/${user.User.username}/collections`} className='flex flex-1 justify-center items-center py-2 bg-blue-500 rounded-lg'>
                                    <p className='font-semibold text-[12px] md:text-[17px] text-white'>Titles ({user.nofTitles})</p>
                                </Link>
                            </div>
                            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
                                {polls && polls.map((poll: IPoll) => (
                                    <li key={poll._id} className='flex justify-center overflow-hidden'>
                                        <div className='flex flex-col min-h-[350px] bg-yellow-800 w-[300px] mx-1 rounded-lg'>
                                            <Link href={`/poll/${poll._id}`} className='flex flex-center h-[250px] bg-slate-300 rounded-t-lg'>
                                                <Image src={poll.imageUrl} alt='hero' height={400} width={400} className='w-[300px] h-[250px] overflow-hidden rounded-t-lg' />
                                            </Link>
                                            <div className='flex-1 w-full p-2 flex flex-col justify-between bg-white border-white border-t-2 rounded-b-lg'>
                                                <p className='truncate-2-lines text-black text-[14px] font-semibold'>{poll.title}</p>
                                                <div className='flex flex-row items-center'>
                                                    <Image src={poll.creator.photo || '/assets/images/user.png'} alt='user' className='w-[35px] h-[35px] rounded-full border-2 border-white' height={100} width={100} />
                                                    <p className='ml-2 font-semibold text-black text-[17px]'>{poll.creator.username}</p>
                                                    <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                                                        <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                                                        <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{poll.creator.UserData.level}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page