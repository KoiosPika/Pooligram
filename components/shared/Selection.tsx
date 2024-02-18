'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getAllPolls, getPinnedPolls } from '@/lib/actions/poll.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import LoadMore from './LoadMore'
import Image from 'next/image'

type SelectionParams = {
    userHashtags: string[],
    postHashtags: string[],
    query?: string;
    hiddenPolls: string[]
}

const Selection = ({ postHashtags, userHashtags, query, hiddenPolls }: SelectionParams) => {

    const [Polls, setPolls] = useState<IPoll[]>()

    const [pinnedPolls, setPinnedPolls] = useState<IPoll[]>()

    useEffect(() => {
        setPolls([])
        setPinnedPolls([])
        async function getPolls() {
            try {
                const polls = await getAllPolls({ postHashtags, userHashtags, page: 1, limit: 6, query: query, hiddenPolls });
                setPolls(polls?.data)
            } catch (error) {
                console.log(error)
            }
        }

        async function getPinPolls() {
            try {
                const polls = await getPinnedPolls({ postHashtags: [''], userHashtags, page: 1, limit: 6, query, hiddenPolls });
                setPinnedPolls(polls);
                console.log(polls)
            } catch (error) {
                console.error('Error fetching pinned polls:', error);
            }
        }

        getPinPolls().then(()=> {getPolls()});
        ;
    }, [query])

    return (
        <section className='w-full'>
            <div className='flex flex-row items-center mr-auto ml-auto my-5'>
                <Image src={'/assets/icons/poll-2.svg'} alt='poll' height={25} width={25} />
                <p className='font-semibold text-[20px] ml-2'>Pinned Polls:</p>
            </div>
            {pinnedPolls && pinnedPolls.length > 0 ? (
                <div className='flex flex-col items-center gap-10 mb-10 w-full justify-center'>
                    <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                        {pinnedPolls.map((poll) => {
                            return (
                                <li key={poll._id} className='flex justify-center overflow-hidden'>
                                    <Card poll={poll} />
                                </li>
                            )
                        })}
                    </ul>
                    <div className='ml-auto border-2 border-blue-700 text-blue-700 font-semibold px-2 py-1 rounded-md'>View More</div>
                </div>
            ) : (
                <div className='flex w-full justify-center items-center'>
                    <Image
                        src="/assets/icons/spinner.svg"
                        alt="spinner"
                        width={56}
                        height={56}
                        className="spin"
                    />
                </div>
            )}

            <div className='flex flex-row items-center mr-auto ml-auto my-5'>
                <Image src={'/assets/icons/poll-2.svg'} alt='poll' height={25} width={25} />
                <p className='font-semibold text-[22px] ml-2'>More Polls For You:</p>
            </div>
            {Polls && Polls.length > 0 ? (
                <div className='flex flex-col items-center gap-10 mb-10 w-full justify-center'>
                    <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                        {Polls.map((poll) => {
                            return (
                                <li key={poll._id} className='flex justify-center overflow-hidden'>
                                    <Card poll={poll} />
                                </li>
                            )
                        })}
                    </ul>
                    <LoadMore postHashtags={postHashtags} userHashtags={userHashtags} query={query} hiddenPolls={hiddenPolls} />
                </div>
            ) : (
                <div className='flex w-full justify-center items-center'>
                    <Image
                        src="/assets/icons/spinner.svg"
                        alt="spinner"
                        width={56}
                        height={56}
                        className="spin"
                    />
                </div>
            )}

        </section>
    )
}

export default Selection