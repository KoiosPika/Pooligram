import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ScrollArea } from '../ui/scroll-area'
import { IComment } from '@/lib/database/models/comment.model'
import { createComment, getCommentsByPoll } from '@/lib/actions/comment.actions'
import { IUser } from '@/lib/database/models/user.model'
import { formatTimeAgo } from '@/lib/utils'
import LoadMoreComments from './LoadMoreComments'

type CommentListParams = {
    height: number,
    user: IUser,
    pollId: string
}

const CommentList = ({ height, user, pollId }: CommentListParams) => {

    useEffect(() => {
        const getComments = async () => {
            const comments = await getCommentsByPoll({ id: pollId, page: 1 });
            setComments(comments);
        }

        getComments()
    }, [])

    const [Comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState('')


    const handleSubmit = async () => {
        await createComment({
            text: newComment,
            userId: user._id,
            pollId,
        }).then((res) => {
            let comment: any = {
                text: res.text,
                creator: user,
                createdAt: Date.now()
            }
            setComments((prevState) => [comment, ...prevState])
            setNewComment('');
        })
    }
    return (
        <div className='bg-blue-800 my-5 h-0 rounded-tr-lg rounded-br-lg ml-0.5' style={{ height }}>
            <div className='w-full flex flex-row p-3 items-center rounded-lg'>
                <p className='text-[18px] font-semibold text-white'>Comments</p>
                <p className='text-[16px] font-semibold ml-3 text-white'>63.5k</p>
            </div>
            <ScrollArea style={{ height: height - 110 }} className='flex flex-1 px-3 h-0'>
                {Comments.map((comment) => (
                    <div className='flex flex-row p-2 bg-white mb-3 rounded-xl'>
                        <Image src={comment.creator.photo} alt='user' width={70} height={70} className='rounded-full w-7 h-7' />
                        <div className='flex flex-col ml-2 w-full'>
                            <div className='flex flex-row gap-2 items-center'>
                                <p className='font-semibold text-[17px]'>{comment.creator.username}</p>
                                <p className='text-[14px] text-grey-500 font-semibold'>{formatTimeAgo(comment.createdAt)}</p>
                            </div>
                            <p className='text-[14px]'>{comment.text}</p>
                            <div className='w-full h-7 relative'>
                                <p className='ml-auto absolute right-3 text-blue-800 font-bold hover:cursor-pointer'>16 Replies</p>
                            </div>
                        </div>
                    </div>
                ))}
                <LoadMoreComments pollId={pollId} />
            </ScrollArea>
            <div className='mt-auto flex flex-row p-2'>
                <Input placeholder='Write a comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} className='font-semibold' />
                <Button className='ml-2 border-2 border-white bg-white hover:bg-yellow-300' onClick={() => handleSubmit()}>
                    <Image src={'/assets/icons/arrow.svg'} alt='arrow' width={25} height={25} />
                </Button>
            </div>
        </div>
    )
}

export default CommentList