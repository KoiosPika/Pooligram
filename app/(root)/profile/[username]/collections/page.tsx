import { getUserDataByUsername } from '@/lib/actions/userData.actions'
import { getLevelColor } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ params: { username } }: { params: { username: string } }) => {

    const user = await getUserDataByUsername(username)

    const color = getLevelColor(user.level)
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2'>
                            <div className='flex flex-col w-full justify-center items-center bg-white rounded-md'>
                                <div className='flex flex-row items-center mt-3'>
                                    <p className='font-semibold text-[18px]'>{user.User.username}</p>
                                    <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                                        <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                                        <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{user.level}</p>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-center items-center gap-3 p-3'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='font-semibold text-[20px]'>5,690</p>
                                        <p className='font-semibold text-[16px]'>Votes Received</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <Image className='rounded-full h-[100px] w-[100px]' src={user.User.photo} alt='photo' height={200} width={200} />
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='font-semibold text-[20px]'>5,690</p>
                                        <p className='font-semibold text-[16px]'>Votes Submitted</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row w-full gap-2 my-3 px-5'>
                                <Link href={`/profile/${user.User.username}`} className='flex flex-1 justify-center items-center py-2 bg-blue-500 rounded-lg'>
                                    <p className='font-semibold text-[17px] text-white'>Polls</p>
                                </Link>
                                <Link href={`/profile/${user.User.username}/collections`} className='flex flex-1 justify-center items-center py-2 bg-blue-500 rounded-lg border-[3px] border-yellow-400'>
                                    <p className='font-semibold text-[17px] text-yellow-300'>Collections</p>
                                </Link>
                            </div>
                        </div></div></div></div></div>
    )
}

export default page