'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from '../ui/button'
import { eventFormSchema } from '@/lib/validator'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pollDefaultValues } from '@/constants'
import { updatePoll } from '@/lib/actions/poll.actions'
import { useRouter } from 'next/navigation'
import { getUserById, updateUserBalance } from '@/lib/actions/user.actions'
import { daysBetweenDates, getMaxDate, timeUntil } from '@/lib/utils'
import { IPoll } from '@/lib/database/models/poll.model'

const DailyCharge = 0.75;

type EditPageParams = {
    poll: IPoll,
    userId: string,
    dates: {
        MinDate: Date,
        MaxDate: Date,
        Today: Date,
        PollSponsoreDate: Date,
    }
}

const EditPage = ({ poll, userId, dates }: EditPageParams) => {

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: pollDefaultValues
    })

    const router = useRouter()
    const [renderPage, setRenderPage] = useState(false)
    const [userBalance, setUserBalance] = useState(0);
    const [hashtags, setHashtags] = useState<string[]>(poll.hashtags);
    const [newHashtag, setNewHashtag] = useState<string>('');
    const [sponsored, setSponsored] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(dates.MinDate);
    const [days, setDays] = useState(0);

    const allowSponsorship = timeUntil(dates.PollSponsoreDate.toISOString(), dates.Today.toISOString());

    useEffect(() => {
        if (poll.creator._id != userId) {
            router.push('/')
        } else {
            setRenderPage(true)
        }
    }, [])

    useEffect(() => {
        async function getUser() {
            const user = await getUserById(userId);
            setUserBalance(user.balance);
        }

        getUser();
    }, [])

    useEffect(() => {
        const day = daysBetweenDates(selectedDate, dates.MinDate)
        setDays(day);
    }, [selectedDate])

    useEffect(() => {
        if (sponsored == false) {
            setUserBalance(userBalance + 1)
        } else {
            setUserBalance(userBalance - 1)
        }
    }, [sponsored])

    const AddHashtag = () => {
        setHashtags((prevState) => [...prevState, newHashtag.toLowerCase()])
        setNewHashtag('')
    }

    const handleDeleteHashtag = (index: any) => {
        setHashtags(prevHashtags => prevHashtags.filter((_, i) => i !== index));
    };

    const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
        try {
            const UpdatedPoll = await updatePoll({
                poll: {
                    pollId: poll._id,
                    days,
                    sponsored: allowSponsorship ? sponsored : false,
                    hashtags: hashtags,
                    openComments: values.openComments
                }
            }).then((res) => {
                updateUserBalance(userId, days, sponsored)
                form.reset();
                router.push(`/poll/${poll._id}`);
            })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex bg-white justify-center items-center py-5 px-2">
            {renderPage &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-5 justify-center items-center px-3">
                        <div className='w-full p-5 max-w-[500px] bg-blue-800 border-2 border-black rounded-lg'>
                            <div className='inline-flex flex-row gap-1 bg-blue-800 p-1 rounded-md mb-3'>
                                <Image src={'/assets/icons/hashtag.svg'} alt='pen' height={25} width={25} />
                                <p className='text-[18px] font-bold text-white'>Poll Hashtags</p>
                            </div>
                            {hashtags.length > 0 &&
                                <div className='w-full flex flex-col max-w-[500px] justify-center items-center px-5 md:px-15'>
                                    <ul className="grid w-full grid-cols-2 gap-2">
                                        {hashtags.map((hashtag, index) => (
                                            <li key={index} className='w-full p-3 border-2 border-white bg-white rounded-md flex flex-row my-2 justify-between relative'>
                                                <p className='text-[16px] text-black font-semibold'>#{hashtag}</p>
                                                <button type="button" onClick={() => handleDeleteHashtag(index)} className='absolute right-2'>
                                                    <Image src={'/assets/icons/minus.svg'} alt='minus' width={20} height={30} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                            <div className='flex flex-col gap-2 justify-center md:justify-between items-center'>
                                <div className='flex flex-row justify-center items-center gap-2'>
                                    <Input placeholder='Add Hashtag (Max 8)' className='w-full px-5 max-w-[300px] border-2 border-black' onChange={(e) => setNewHashtag(e.target.value)} value={newHashtag} />
                                    <button disabled={hashtags.length == 8} className='bg-yellow-300 hover:bg-grey-400 w-11 h-9 text-blue-800 text-[18px] rounded-md border-2 border-black' type="button" onClick={AddHashtag}>+</button>
                                </div>
                            </div>
                        </div>


                        <div className='w-full p-5 max-w-[500px] bg-blue-800 border-2 border-black rounded-lg'>
                            <div className='inline-flex flex-row gap-3 bg-blue-800 p-1 rounded-md items-center'>
                                <Image src={'/assets/icons/settings.svg'} alt='pen' height={25} width={25} />
                                <p className='text-[18px] font-bold text-white'>Poll Options</p>
                            </div>
                            <div className='flex flex-col bg-white rounded-lg m-7 p-3'>
                                <p className='ml-5 mt-3 mb-2 text-black font-bold'>For a $1.00 sponsorship fee, you can enhance the visibility of your poll by ensuring it appears at the top of the poll list for 24 hours.</p>
                                <div className="w-full px-5 max-w-[500px]">
                                    <div className="flex mt-4 items-center">
                                        <Checkbox
                                            disabled={allowSponsorship != false}
                                            onCheckedChange={() => setSponsored(!sponsored)}
                                            checked={sponsored}
                                            className="mr-2 h-7 w-7 border-2 border-blue-800" />
                                        <label className="font-bold text-blue-800 text-[16px]">Sponsor the poll for</label>
                                        <p className='bg-green-200 text-green-800 p-1 rounded-md font-semibold ml-1'>$1.00</p>
                                    </div>
                                </div>
                                {allowSponsorship && <p className='p-1 ml-5 mt-3 bg-red-200 text-red-600 font-bold text-[14px] text-center rounded-lg'>Current Sponsorship {allowSponsorship}</p>}
                            </div>
                            <div className='flex flex-col bg-white rounded-lg m-7 p-3'>
                                <p className='ml-5 mt-3 mb-2 text-black font-bold'>Extend the period now for $0.50 per day or later for $0.75 per day.</p>
                                <div className='flex flex-row items-center ml-5 mb-2 gap-1'>
                                    <Image src={'/assets/icons/info.svg'} alt='info' height={15} width={15} />
                                    <p className='text-black text-[12px] font-semibold'>(Max is 30 days from the day you created the poll)</p>
                                </div>
                                <div className='w-full pl-5 pt-4 max-w-[500px]'>
                                    <div className='w-full flex justify-center items-center'>
                                        <FormField
                                            control={form.control}
                                            name="endDateTime"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormControl>
                                                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                                                            <Image src="/assets/icons/calendar.svg" alt="calender" width={24} height={24} />
                                                            <p className="m-3 whitespace-nowrap font-semibold text-black">End Date:</p>
                                                            <DatePicker
                                                                className='rounded-lg px-2 font-semibold w-[105px] bg-blue-800 text-white'
                                                                onChange={(date: Date) => {
                                                                    field.onChange(date);
                                                                    setSelectedDate(date);
                                                                }}
                                                                selected={selectedDate}
                                                                minDate={dates.MinDate}
                                                                maxDate={dates.MaxDate}
                                                                dateFormat={"MM/dd/yyyy"}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex mb-3 items-center justify-center">
                                        <p className='text-black font-semibold mr-1'>You're extending {days} days for</p>
                                        <p className='bg-green-200 text-green-800 p-1 rounded-md font-semibold'>${(days * DailyCharge).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col bg-white rounded-lg m-7 py-3 justify-center items-center'>
                                {(userBalance - days * DailyCharge >= 0) &&
                                    <div className='flex flex-row items-center gap-2'>
                                        <p className='text-[20px] font-semibold'>Your Balance: </p>
                                        <p className='text-[20px] font-semibold border-2 bg-green-200 text-green-800 rounded-lg p-1'>${(userBalance - days * DailyCharge).toFixed(2)}</p>
                                    </div>}
                                {(userBalance - days * DailyCharge < 0) &&
                                    <div className='flex flex-row items-center gap-2'>
                                        <p className='text-[20px] font-semibold'>Your Balance: </p>
                                        <p className='text-[20px] font-semibold border-2 bg-red-200 text-red-800 rounded-lg p-1'>${(userBalance - days * DailyCharge).toFixed(2)}</p>
                                    </div>}
                                {(userBalance - days * DailyCharge < 0) && <p className='bg-red-200 text-red-800 rounded-lg p-1 font-semibold mt-2 border-2 border-red-800'>Please refill your wallet first!</p>}
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="openComments"
                            render={({ field }) => (
                                <FormItem className='w-full p-5 max-w-[500px] bg-blue-800 border-2 border-black rounded-lg'>
                                    <div className='inline-flex flex-row gap-2 items-center bg-blue-800 p-1 rounded-md'>
                                        <Image src={'/assets/icons/comments.svg'} alt='pen' height={28} width={28} />
                                        <p className='text-[18px] font-bold text-white'>Poll Comments</p>
                                    </div>
                                    <div className='w-full px-5 max-w-[500px]'>
                                        <div className="flex m-3 items-center">
                                            <Checkbox onCheckedChange={field.onChange} checked={field.value} id='openComments' className="mr-2 h-7 w-7 border-2 border-white" />
                                            <label htmlFor="openComments" className="font-semibold text-white">Allow users to comment on your poll</label>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />


                        <Button disabled={form.formState.isSubmitting || (userBalance - days * DailyCharge < 0)} className="bg-blue-800 col-span-2 w-[155px] gap-1" type="submit">
                            <Image src={'/assets/icons/create.svg'} alt='create' height={20} width={20} />
                            <p>{form.formState.isSubmitting ? 'Please Wait...' : 'Update Poll Now!'}</p>
                        </Button>
                    </form>
                </Form >
            }
        </div>
    )
}

export default EditPage