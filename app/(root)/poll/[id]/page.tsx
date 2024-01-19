'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Comments from '@/components/shared/Comments'
import Selection from '@/components/shared/Selection'
import { SearchParamsProps } from '@/types'
import { getPollById } from '@/lib/actions/poll.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import { getAnswersByPoll, handleVoting } from '@/lib/actions/answer.actions'
import { IAnswer } from '@/lib/database/models/answer.model'
import { createVote, getVoteByPoll } from '@/lib/actions/vote.actions'
import { IVote } from '@/lib/database/models/vote.model'

const page = ({ params: { id }, searchParams }: SearchParamsProps) => {

  const leftDivRef = useRef<HTMLDivElement>(null);
  const [rightDivHeight, setRightDivHeight] = useState<number>(0);
  const [Poll, setPoll] = useState<IPoll>()
  const [Answers, setAnswers] = useState<IAnswer[]>([]);
  const [vote, setVote] = useState<IVote>()
  const [showComments, setShowComments] = useState(false);

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
      const vote = await getVoteByPoll(id)
      return vote;
    }

    const fetchData = async () => {
      try {
        const [poll, answers, vote] = await Promise.all([getPoll(), getAnswers(), getVote()]);
        setPoll(poll);
        setAnswers(answers);
        setVote(vote)
        console.log(answers)

        // Delay showing comments
        setTimeout(() => setShowComments(true), 5);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle any errors here
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
        answerId: data.Answer
      }).then((res) => {
        form.reset();
        window.location.reload();
      })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div className='w-full flex justify-center h-[70px] items-center'>
        <div className='bg-slate-400 w-full max-w-[800px] h-[70px] m-2'></div>
      </div>
      <div className='flex flex-row justify-center md:justify-center xl:justify-center'>
        <div ref={leftDivRef} className='flex flex-col justify-center items-center my-5 border-2 rounded-lg border-black'>
          <Image className='w-[350px] rounded-t-lg' src={Poll?.imageUrl || '/assets/images/loading.png'} alt='hero' width={1000} height={1000} />
          {vote === undefined && <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-slate-200 w-[350px] p-3 rounded-b-lg">
              <FormField
                control={form.control}
                name="Answer"
                render={({ field }) => (
                  <FormItem className="w-full space-y-3">
                    <FormLabel>{Poll?.title}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {Answers && Answers.map((answer) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={answer._id} />
                            </FormControl>
                            <div className="font-semibold w-full bg-white px-2 py-1 border-2 rounded-md border-black">
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
                {(Poll && Poll.openList) && <Button className='flex flex-row bg-transparent border-2 border-black hover:bg-slate-400'>
                  <Image src={'/assets/icons/plus.svg'} alt='add' width={10} height={10} />
                  <p className=' text-black ml-2'>Add</p>
                </Button>}
                <Button className='bg-black ml-auto hover:bg-slate-400 border-2 border-black' type="submit">{form.formState.isSubmitting ? 'Please wait..' : 'Save'}</Button>
              </div>
            </form>
          </Form>}

          {vote &&
            <div className="space-y-6 bg-slate-200 w-[350px] p-3 rounded-lg">
              <div className="w-full space-y-3">
                <p className='font-semibold text-[18px]'>{Poll?.title}</p>
                <div className="flex flex-col space-y-1">
                  {Answers && Answers.map((answer) => (
                    <div className="font-semibold px-2 py-1 border-2 rounded-md bg-white border-black">
                      <div className='w-full flex flex-row justify-between items-center'>
                        <div className='gap-2 items-center flex flex-row'>
                          <p>{answer.title}</p>
                          {vote.Answer._id === answer._id && <Image src={'/assets/icons/check.svg'} alt='check' width={15} height={15} />}
                        </div>
                        <p>24.5%</p>
                      </div>
                      <div className='h-3 w-[200px] bg-primary-500 rounded-sm my-2 border-[2px] border-black'></div>
                      <p className='text-[13px]'>{answer.nofVotes} Votes</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        </div>

        {showComments &&
          <div className='hidden md:block w-full max-w-[350px] h-[0px]'>
            {vote && <Comments height={rightDivHeight} />}
            {!vote &&
              <div style={{ height: rightDivHeight }} className='flex flex-col justify-center items-center bg-slate-200 my-5 rounded-lg border-2 border-black gap-2'>
                <div className='flex flex-row gap-2 items-center'>
                  <Image src={'/assets/icons/lock.svg'} alt='lock' width={20} height={20}/>
                  <p className='font-semibold text-[16px]'>Comments are locked</p>
                </div>
                <p className='flex font-semibold text-[16px] mx-5 text-center'>Please submit a vote to reveal the comment section.</p>
              </div>}
          </div>


        }
      </div>
      <div className='px-[20px] lg:px-[200px]'>
        <p className='mb-7 font-bold text-[20px]'>Related Polls: </p>
        <Selection />
      </div>
    </div>
  )
}

export default page