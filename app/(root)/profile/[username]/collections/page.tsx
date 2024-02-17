import { getCollectionsByUser } from '@/lib/actions/collectionGroup.actions'
import { getUserDataByUsername } from '@/lib/actions/userData.actions'
import { ICollectionGroup } from '@/lib/database/models/collectionGroup.model'
import { getLevelColor } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ params: { username } }: { params: { username: string } }) => {

    const user = await getUserDataByUsername(username)

    const collections = await getCollectionsByUser(user.User._id)

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
                                            <p className='font-semibold text-[14px] sm:text-[16px]'>3.4K</p>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <p className='text-gray-500 text-[14px] sm:text-[16px]'>Votes Received</p>
                                            <p className='font-semibold text-[14px] sm:text-[16px]'>4.5M</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row w-full items-center px-2'>
                                    <p className='font-semibold text-[18px]'>{user.User.username}</p>
                                    <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                                        <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                                        <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{user.level}</p>
                                    </div>
                                    <div className='ml-auto bg-orange-500 text-white px-3 py-1 rounded-lg'>
                                        Socials
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row w-full gap-2 my-3 px-1'>
                                <Link href={`/profile/${user.User.username}`} className='flex flex-1 justify-center items-center py-2 bg-blue-500 rounded-lg'>
                                    <p className='font-semibold text-[12px] md:text-[17px] text-white'>Polls (3)</p>
                                </Link>
                                <Link href={`/profile/${user.User.username}/collections`} className='flex flex-1 justify-center items-center py-2 bg-blue-500 rounded-lg border-[3px] border-yellow-400'>
                                    <p className='font-semibold text-[12px] md:text-[17px] text-yellow-300'>Collections (20.3k)</p>
                                </Link>
                                <Link href={`/profile/${user.User.username}/collections`} className='flex flex-1 justify-center items-center py-2 bg-blue-500 rounded-lg'>
                                    <p className='font-semibold text-[12px] md:text-[17px] text-white'>Titles (20.4m)</p>
                                </Link>
                            </div>
                            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
                                {collections && collections.map((collection: ICollectionGroup) => (
                                    <li key={collection._id} className='flex flex-col bg-white rounded-lg broder-2 w-[280px]'>
                                        <div className='flex flex-row p-2 items-center gap-2 border-b-[2px] border-slate-300'>
                                            <Image className='w-8 h-8 rounded-full' src={collection.creator.photo} alt='user' height={100} width={100} />
                                            <p className='font-bold'>{collection.creator.username}</p>
                                        </div>
                                        <p className='p-2'>{collection.title}</p>
                                        <div className='relative h-[280px] w-[280px] bg-slate-200'>
                                            <Link href={`/collections/${collection._id}`} className='flex h-[280px] justify-center items-center overflow-hidden bg-slate-300'>
                                                <Image src={collection?.imageUrl || '/assets/images/loading.png'} alt='hero' width={500} height={500} className='h-[280px] w-[280px]' />
                                            </Link>
                                        </div>
                                        <p className='p-2 truncate text-[13px]'>{collection.description}</p>
                                        <div className='flex flex-row'>
                                            <p className='bg-blue-500 text-yellow-300 font-semibold flex flex-1 justify-center text-center py-2 rounded-bl-lg'>Votes: {(collection.nofVotes).toLocaleString()}</p>
                                            <p className='bg-yellow-300 text-blue-600 font-semibold flex flex-1 justify-center text-center py-2 rounded-br-lg'>Poll: {collection.nofPolls}</p>
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