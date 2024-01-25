"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useInView } from "react-intersection-observer"
import { getCommentsByPoll } from '@/lib/actions/comment.actions'
import { IComment } from '@/lib/database/models/comment.model'
import { formatTimeAgo } from '@/lib/utils'

let page = 2;

const LoadMoreComments = ({ pollId }: { pollId: string }) => {

    const { ref, inView } = useInView()

    const [comments, setComments] = useState<IComment[]>([])

    const [showSpinner, setShowSpinner] = useState(true)

    useEffect(() => {
        async function getComments() {
            const newComments = await getCommentsByPoll({ id: pollId, page })
            if (newComments.length == 0) {
                setShowSpinner(false);
            }
            setComments(prevComments => [...prevComments, ...newComments]);
            page++;
        }

        if (inView) {
            getComments();
        }
    }, [inView, pollId])

    return (
        <>
            {comments.length > 0 &&
                <ul className='flex flex-col'>
                    {comments.map((comment) => (
                        <li key={comment._id} className='flex justify-center overflow-hidden flex-row'>
                            <div className='flex flex-row w-full p-2 bg-white mb-3 rounded-xl relative'>
                                <Image src={comment.creator?.photo} alt='user' width={70} height={70} className='rounded-full w-7 h-7' />
                                <div className='flex flex-col ml-2 w-full'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <p className='font-semibold text-[17px]'>{comment.creator?.username}</p>
                                        <Image src={'/assets/icons/verified.svg'} alt='verified' width={25} height={25} className='bg-blue-800 rounded-full' />
                                        <p className='text-[14px] text-grey-500 font-semibold'>{formatTimeAgo(comment.createdAt)}</p>
                                    </div>
                                    <p>{comment.text}</p>
                                    <div className='w-full h-7 relative'>
                                        <p className='ml-auto absolute right-3 text-blue-800 font-bold'>16 Replies</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            }
            {showSpinner && <section className="flex justify-center items-center w-full">
                <div ref={ref}>
                    <Image
                        src="/assets/icons/spinner-white.svg"
                        alt="spinner"
                        width={20}
                        height={20}
                        className="spin"
                    />
                </div>
            </section>}
        </>
    )
}

export default LoadMoreComments