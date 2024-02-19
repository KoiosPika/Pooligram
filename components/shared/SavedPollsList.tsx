'use client'

import { deleteSavedPoll, getSavedPollsByUser } from '@/lib/actions/savedPoll.actions'
import { ISavedPoll } from '@/lib/database/models/savedPoll.model'
import { getLevelColor } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const SavedPollsList = ({ userId }: { userId: string }) => {

    const [savedPolls, setSavedPolls] = useState<ISavedPoll[]>()

    useEffect(() => {

        async function getSavedPolls() {
            const polls = await getSavedPollsByUser(userId)
            setSavedPolls(polls)
        }

        getSavedPolls()
    }, [])

    const handleDeletion = async (id: string) => {
        await deleteSavedPoll(id).then(() => {
            const newPolls = savedPolls && savedPolls.filter(object => object._id !== id);

            setSavedPolls(newPolls);
        })
    }

    return (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 my-4 px-1'>
            {savedPolls && savedPolls.map((savedPoll: ISavedPoll) => {
                const levelColor = getLevelColor(savedPoll.poll.creator.UserData.level)
                return (
                    <li key={savedPoll._id} className='flex justify-center overflow-hidden'>
                        <div className='flex flex-col min-h-[350px] w-[300px] mx-1 rounded-lg relative'>
                            <div onClick={() => handleDeletion(savedPoll._id)} className='absolute right-2 top-2 p-[2px] bg-white rounded-sm cursor-pointer opacity-90'>
                                <Image src={'/assets/icons/trash.svg'} alt='trash' height={18} width={18} />
                            </div>
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
    )
}

export default SavedPollsList