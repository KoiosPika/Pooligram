'use client'

import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getAllPolls } from '@/lib/actions/poll.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import LoadMore from './LoadMore'

type SelectionParams = {
    userHashtags: string[],
    postHashtags: string[],
    query?: string;
}

const Selection = ({ postHashtags, userHashtags, query }: SelectionParams) => {

    const [Polls, setPolls] = useState<IPoll[]>()

    useEffect(() => {
        setPolls([])
        async function getPolls() {
            const polls = await getAllPolls({ postHashtags, userHashtags, page: 1, limit: 6, query: query });
            setPolls(polls?.data)
        }

        getPolls();
    }, [query])

    return (
        <>{Polls && Polls.length > 0 ? (
            <div className='flex flex-col items-center gap-10 mb-10'>
                <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                    {Polls.map((poll) => {
                        return (
                            <li key={poll._id} className='flex justify-center overflow-hidden'>
                                <Card poll={poll} />
                            </li>
                        )
                    })}
                </ul>
                <LoadMore postHashtags={postHashtags} userHashtags={userHashtags} query={query} />
            </div>
        ) : (
            <></>
        )}</>
    )
}

export default Selection