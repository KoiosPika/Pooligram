'use client'

import Image from 'next/image'
import React, { startTransition, useEffect, useRef, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CommentList from '@/components/shared/CommentList'
import Selection from '@/components/shared/Selection'
import { getPollById } from '@/lib/actions/poll.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import { createAnswer, getAnswersByPoll, handleVoting } from '@/lib/actions/answer.actions'
import { IAnswer } from '@/lib/database/models/answer.model'
import { createVote, getVoteByPoll } from '@/lib/actions/vote.actions'
import { IVote } from '@/lib/database/models/vote.model'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { getUserById } from '@/lib/actions/user.actions'
import { IUser } from '@/lib/database/models/user.model'
import { getCommentsByPoll } from '@/lib/actions/comment.actions'
import { IComment } from '@/lib/database/models/comment.model'

const DetailedPage = ({ id, userId }: { id: string, userId: string }) => {
    const leftDivRef = useRef<HTMLDivElement>(null);
    const [rightDivHeight, setRightDivHeight] = useState<number>(0);
    const [Poll, setPoll] = useState<IPoll>()
    const [Answers, setAnswers] = useState<IAnswer[]>([]);
    const [vote, setVote] = useState<IVote>()
    const [showComments, setShowComments] = useState(false);
    const [newAnswer, setNewAnswer] = useState<string>('');
    const [User, setUser] = useState<IUser>();

    useEffect(() => {
        if (leftDivRef.current) {
            const height = leftDivRef.current.offsetHeight;
            setRightDivHeight(height);
        }
    }, [Answers]);

    useEffect(() => {
        const getPoll = async () => {
            const thisPoll = await getPollById(id);
            return thisPoll;
        };

        const getAnswers = async () => {
            const answers = await getAnswersByPoll(id);
            return answers;
        };

        const getVote = async () => {
            const vote = await getVoteByPoll({ pollId: id, userId })
            return vote;
        }

        const getUser = async () => {
            const user = await getUserById(userId);
            return user;
        }

        const fetchData = async () => {
            try {
                const [poll, answers, vote, user] = await Promise.all([getPoll(), getAnswers(), getVote(), getUser()]);
                setPoll(poll);
                setAnswers(answers);
                setVote(vote)
                setUser(user)
            
                setTimeout(() => setShowComments(true), 15);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const FormSchema = z.object({
        Answer: z.string({ required_error: "Please Select an Answer to Continue", }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            handleVoting(data.Answer);
            await createVote({
                pollId: id,
                answerId: data.Answer,
                userId: userId
            }).then((res) => {
                form.reset();
                window.location.reload();
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddAnswer = () => {
        createAnswer({
            pollId: id,
            title: newAnswer
        })
            .then((answer) => {
                setAnswers((prevState) => [...prevState, answer])
            })
    }
    return (
        <div>
            <div className='w-full flex justify-center h-[70px] items-center'>
                <div className='bg-slate-400 w-full max-w-[800px] h-[70px] m-2'></div>
            </div>
            <div className='flex flex-row justify-center md:justify-center xl:justify-center'>
                <div ref={leftDivRef} className='flex flex-col justify-center items-center my-5'>
                    <div className='flex h-[350px] justify-center items-center overflow-hidden bg-slate-300 rounded-tl-lg rounded-tr-lg md:rounded-tr-none'>
                        <Image src={Poll?.imageUrl || '/assets/images/loading.png'} alt='hero' width={350} height={350} />
                    </div>
                    {vote === undefined && <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-blue-800 w-[350px] p-3 rounded-bl-lg rounded-br-lg md:rounded-br-none">
                            <FormField
                                control={form.control}
                                name="Answer"
                                render={({ field }) => (
                                    <FormItem className="w-full space-y-3">
                                        <FormLabel className='text-white text-[18px]'>{Poll?.title}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                {Answers && Answers.map((answer) => (
                                                    <FormItem key={answer._id} className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value={answer._id} />
                                                        </FormControl>
                                                        <div className="font-semibold w-full bg-white px-2 py-1 rounded-md">
                                                            <FormLabel>
                                                                {answer.title}
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex flex-row'>
                                {(Poll && Poll.openList) &&
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button type='button' className='flex flex-row bg-transparent border-2 border-white hover:bg-slate-400'>
                                                <Image src={'/assets/icons/plus.svg'} alt='add' width={10} height={10} />
                                                <p className=' text-white ml-2'>Add</p>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-white max-w-[350px] rounded-xl'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Add a new Answer</AlertDialogTitle>
                                                <Input placeholder='Enter answer here...' className='border-2 border-black' onChange={(e) => setNewAnswer(e.target.value)} />
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className='bg-black' onClick={() => startTransition(handleAddAnswer)}>Add Answer</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>}
                                <Button className='bg-white ml-auto hover:bg-slate-400' type="submit">
                                    <p className='text-blue-800'>{form.formState.isSubmitting ? 'Please wait..' : 'Save'}</p>
                                </Button>
                            </div>
                        </form>
                    </Form>}

                    {vote &&
                        <div className="space-y-6 bg-blue-800 w-[350px] p-3 rounded-bl-lg rounded-br-lg md:rounded-br-none">
                            <div className="w-full space-y-3">
                                <p className='font-semibold text-[18px] text-white'>{Poll?.title}</p>
                                <div className="flex flex-col space-y-1 gap-2">
                                    {Answers && Answers.map((answer) => (
                                        <div className="font-semibold px-2 py-1 rounded-md bg-white">
                                            <div className='w-full flex flex-row justify-between items-center'>
                                                <div className='gap-2 items-center flex flex-row'>
                                                    <p>{answer.title}</p>
                                                    {vote.Answer._id === answer._id && <Image src={'/assets/icons/check.svg'} alt='check' width={15} height={15} />}
                                                </div>
                                                <p>{answer.votePercentage ? `${answer.votePercentage}%` : '0%'}</p>
                                            </div>
                                            <div className="flex w-full my-2">
                                                <div
                                                    style={{ width: answer.votePercentage ? `${answer.votePercentage}%` : '0%' }}
                                                    className='h-3 bg-blue-800 rounded-l-sm'
                                                ></div>
                                                <div
                                                    style={{ flexGrow: 1 }}
                                                    className='h-3 bg-gray-300'
                                                ></div>
                                            </div>
                                            <p className='text-[13px]'>{answer.nofVotes} Votes</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {(showComments && User) &&
                    <div className='hidden md:block w-full max-w-[350px] h-[0px]'>
                        {(vote || Poll?.creator._id === userId) && <CommentList height={rightDivHeight} user={User} pollId={id} />}
                        {(!vote && Poll?.creator._id != userId) &&
                            <div style={{ height: rightDivHeight }} className='flex flex-col justify-center items-center bg-blue-800 my-5 rounded-r-lg gap-2'>
                                <div className='flex flex-row gap-2 items-center'>
                                    <Image src={'/assets/icons/lock.svg'} alt='lock' width={20} height={20} />
                                    <p className='font-semibold text-[16px] text-white'>Comments are locked</p>
                                </div>
                                <p className='flex font-semibold text-[16px] mx-5 text-center text-white'>Please submit a vote to reveal the comment section.</p>
                            </div>}
                    </div>
                }
            </div>
            {(Poll && User) &&
                <div className='w-full flex justify-center items-center'>
                    <div className='px-[20px] max-w-[1000px]'>
                        <p className='mb-7 font-bold text-[20px]'>Related Polls: </p>
                        <Selection postHashtags={Poll?.hashtags} userHashtags={User?.hashtags} />
                    </div>
                </div>}
        </div>
    )
}

export default DetailedPage