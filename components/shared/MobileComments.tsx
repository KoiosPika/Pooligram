import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Image from 'next/image'
import { Input } from '../ui/input'
import { createComment, getCommentsByPoll } from '@/lib/actions/comment.actions'
import { IComment } from '@/lib/database/models/comment.model'
import { ScrollArea } from '../ui/scroll-area'
import { formatTimeAgo, getLevelColor } from '@/lib/utils'
import LoadMoreComments from './LoadMoreComments'
import { IUserData } from '@/lib/database/models/userData.model'

const MobileComments = ({ pollId, user }: { pollId: string, user: IUserData }) => {
    const [open, setOpen] = React.useState(false)
    const [newComment, setNewComment] = useState('')
    const [Comments, setComments] = useState<IComment[]>([]);

    const color = getLevelColor(user.level)

    useEffect(() => {
        const getComments = async () => {
            const comments = await getCommentsByPoll({ id: pollId, page: 1 });
            console.log(comments)
            setComments(comments);
        }

        getComments()
    }, [])

    const handleSubmit = async () => {
        await createComment({
            text: newComment,
            userId: user.User._id,
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
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className='flex flex-row items-center gap-1 bg-blue-800 hover:bg-blue-800'>
                    <Image src={'/assets/icons/comments.svg'} alt='comment' height={20} width={20} />
                    <p className='text-white'>Comments</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent className='bg-blue-800 h-5/6'>
                <DrawerHeader>
                    <DrawerTitle>
                        <p className='text-white'>Comments 63.5K</p>
                    </DrawerTitle>
                </DrawerHeader>
                {Comments && Comments.length > 0 &&
                    <ScrollArea className='flex flex-1 px-3 h-0'>
                        {Comments.map((comment : IComment) => (
                            <div className='flex flex-row p-2 bg-white mb-3 rounded-xl'>
                                <Image src={comment.creator.photo} alt='user' width={70} height={70} className='rounded-full w-7 h-7' />
                                <div className='flex flex-col ml-2 w-full'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <p className='font-semibold text-[17px]'>{comment.creator.username}</p>
                                        <Image src={`/assets/icons/level_${color}.svg`} alt='verified' width={25} height={25} className='bg-blue-800 rounded-full' />
                                        <p className='text-[14px] text-grey-500 font-semibold'>{formatTimeAgo(comment.createdAt)}</p>
                                    </div>
                                    <p>{comment.text}</p>
                                    <div className='w-full h-7 relative'>
                                        <p className='ml-auto absolute right-3 text-blue-800 font-bold'>16 Replies</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <LoadMoreComments pollId={pollId} />
                    </ScrollArea>}
                <DrawerFooter className="pt-2 flex flex-row">
                    <Input onFocusCapture={(e) => e.preventDefault()} placeholder='Write a comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} className='font-semibold text-[16px]' />
                    <Button className='ml-2 border-2 border-white bg-white hover:bg-yellow-300' onClick={() => handleSubmit()}>
                        <Image src={'/assets/icons/arrow.svg'} alt='arrow' width={25} height={25} />
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default MobileComments