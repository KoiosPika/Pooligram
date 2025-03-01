import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ScrollArea } from '../ui/scroll-area'
import { IComment } from '@/lib/database/models/comment.model'
import { createComment, getCommentsByPoll } from '@/lib/actions/comment.actions'
import { formatTimeAgo, getLevelColor } from '@/lib/utils'
import LoadMoreComments from './LoadMoreComments'
import { IUserData } from '@/lib/database/models/userData.model'
import { InterComment } from './MobileComments'

type CommentListParams = {
    height: number,
    user: IUserData,
    pollId: string
}

const CommentList = ({ height, user, pollId }: CommentListParams) => {

    const color = getLevelColor(user.level)

    useEffect(() => {
        const getComments = async () => {
            const comments = await getCommentsByPoll({ id: pollId, page: 1 });
            setComments(comments);
        }

        getComments()
    }, [])

    const [Comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('')


    const handleSubmit = async () => {
        await createComment({
            text: newComment,
            userId: user.User._id,
            pollId,
        }).then((res) => {
            let comment: InterComment = {
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
                <p className='text-[16px] font-semibold ml-3 text-white'>0</p>
            </div>
            {Comments.length > 0 && <ScrollArea style={{ height: height - 110 }} className='flex flex-1 px-3 h-0'>
                {Comments.map((comment: IComment) => (
                    <div className='flex flex-col p-2 bg-white mb-3 rounded-xl'>
                        <div className='flex flex-row items-center'>
                            <Image src={comment.creator.photo || '/assets/images/user.png'} alt='user' width={75} height={75} className='rounded-full w-9 h-9' />
                            <div className='flex flex-col ml-2 w-full'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <p className='font-semibold text-[17px]'>{comment.creator.username}</p>
                                    <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                                        <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                                        <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{user.level}</p>
                                    </div>
                                    <p className='text-[14px] text-grey-500 font-semibold'>{formatTimeAgo(comment.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                        <p className='text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aperiam, praesentium nihil rem nulla id temporibus amet beatae natus dolorem, soluta asperiores dignissimos veritatis. Rerum nobis omnis perspiciatis aspernatur neque.</p>
                        {/* <div className='w-full h-7 relative'>
                            <p className='ml-auto absolute right-3 text-blue-800 font-bold hover:cursor-pointer'>16 Replies</p>
                        </div> */}
                    </div>
                ))}
                <LoadMoreComments pollId={pollId} />
            </ScrollArea>}
            {Comments.length <= 0 &&
                <div style={{ height: height - 110 }} className='flex justify-center items-center flex-1 px-3 h-0'>
                    <p className='text-white text-[17px]'>No Comments yet</p>
                </div>}
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