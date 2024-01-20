"use client"

import { getAllPolls } from '@/lib/actions/poll.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useInView } from "react-intersection-observer"
import Card from './Card'

type SelectionParams = {
    userHashtags: string[],
    postHashtags: string[]
}

let page = 2;

const LoadMore = ({ postHashtags, userHashtags }: SelectionParams) => {

    const { ref, inView } = useInView()

    const [Polls, setPolls] = useState<IPoll[]>([])

    const [showSpinner, setShowSpinner] = useState(true)

    useEffect(() => {
        async function getPolls() {
            const polls = await getAllPolls({ postHashtags, userHashtags, page, limit: 6 });
            console.log(polls);
            if(polls.data.length == 0){
                setShowSpinner(false);
            }
            setPolls([...Polls, ...polls.data])
            page++;
        }

        if (inView) {
            getPolls();
        }
    }, [inView])
    return (
        <>
            <section>
                <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                    {Polls.map((poll) => {
                        return (
                            <li className='flex justify-center overflow-hidden'>
                                <Card key={poll._id} poll={poll} />
                            </li>
                        )
                    })}
                </ul>
            </section>
            {showSpinner && <section className="flex justify-center items-center w-full">
                <div ref={ref}>
                    <Image
                        src="/assets/icons/spinner.svg"
                        alt="spinner"
                        width={56}
                        height={56}
                        className="spin"
                    />
                </div>
            </section>}
        </>
    )
}

export default LoadMore