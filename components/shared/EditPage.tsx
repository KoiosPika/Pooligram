'use client'

import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updatePoll } from '@/lib/actions/poll.actions'
import { useRouter } from 'next/navigation'
import { getUserDataById, updateUserTickets } from '@/lib/actions/userData.actions'
import { daysBetweenDates, timeUntil } from '@/lib/utils'
import { IPoll } from '@/lib/database/models/poll.model'

const DailyCharge = 2;

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

    const FormSchema = z.object({
        openComments: z.boolean(),
        endDateTime: z.date()
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            openComments: poll.openComments
        }
    })

    const router = useRouter()
    const [renderPage, setRenderPage] = useState(false)
    const [userTickets, setUserTickets] = useState(0);
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
            const user = await getUserDataById(userId);
            setUserTickets(user.tickets);
        }

        getUser();
    }, [])

    useEffect(() => {
        const day = daysBetweenDates(selectedDate, dates.MinDate)
        setDays(day);
    }, [selectedDate])

    useEffect(() => {
        if (sponsored == false) {
            setUserTickets(userTickets + 2)
        } else {
            setUserTickets(userTickets - 2)
        }
    }, [sponsored])

    const AddHashtag = () => {
        setHashtags((prevState) => [...prevState, newHashtag.toLowerCase()])
        setNewHashtag('')
    }

    const handleDeleteHashtag = (index: any) => {
        setHashtags(prevHashtags => prevHashtags.filter((_, i) => i !== index));
    };

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
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
                updateUserTickets(userId, days, sponsored, DailyCharge)
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
                        <div className='w-full p-5 max-w-[700px] bg-blue-800 border-2 border-black rounded-lg'>
                            <div className='inline-flex flex-row gap-1 bg-blue-800 p-1 rounded-md mb-3'>
                                <Image src={'/assets/icons/hashtag.svg'} alt='pen' height={25} width={25} />
                                <p className='text-[18px] font-bold text-white'>Poll Hashtags</p>
                            </div>
                            {hashtags.length > 0 &&
                                <div className='w-full flex flex-col max-w-[700px] justify-center items-center px-5 md:px-15'>
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
                                    <Input placeholder='Add Hashtag (Max 16)' className='w-full px-5 max-w-[300px] border-2 border-black' onChange={(e) => setNewHashtag(e.target.value)} value={newHashtag} />
                                    <button disabled={hashtags.length == 16} className='bg-yellow-300 hover:bg-grey-400 w-11 h-9 text-blue-800 text-[18px] rounded-md border-2 border-black' type="button" onClick={AddHashtag}>+</button>
                                </div>
                            </div>
                        </div>


                        <div className='w-full p-5 max-w-[700px] bg-blue-800 border-2 border-black rounded-lg'>
                            <div className='inline-flex flex-row gap-3 bg-blue-800 p-1 rounded-md items-center'>
                                <Image src={'/assets/icons/settings.svg'} alt='pen' height={25} width={25} />
                                <p className='text-[18px] font-bold text-white'>Poll Options</p>
                            </div>
                            <div className='flex flex-col bg-white rounded-lg m-7 p-3'>
                                <p className='ml-5 mt-3 mb-2 text-black font-bold'>Extend the period now for 2 tickets</p>
                                <div className='flex flex-row items-center ml-5 mb-2 gap-1'>
                                    <Image src={'/assets/icons/info.svg'} alt='info' height={15} width={15} />
                                    <p className='text-black text-[12px] font-semibold'>(Max is 30 days from the day you created the poll)</p>
                                </div>
                                <div className='w-full pl-5 pt-4 max-w-[700px]'>
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
                                        <div className='flex flex-row items-center justify-center gap-1 ml-2 rounded-lg px-3 py-1' style={{ backgroundColor: '#21C126' }}>
                                            <p className='text-white rounded-md font-semibold ml-1 text-[20px]'>{days * DailyCharge}x</p>
                                            <Image className='h-10 w-8' src={'/assets/images/ticket-1.png'} alt='ticket' height={100} width={100} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row bg-white rounded-lg m-7 py-3 justify-center items-center'>
                                <p className='text-[18px] font-semibold'>Your tickets:</p>
                                <div className='flex flex-row items-center justify-center gap-1 ml-2 rounded-lg px-3 py-1' style={{ backgroundColor: userTickets - days >= 0 ? '#21C126' : '#EA2514' }}>
                                    <p className='text-white rounded-md font-semibold ml-1 text-[20px]'>{userTickets - days}x</p>
                                    <Image className='h-10 w-8' src={'/assets/images/ticket-1.png'} alt='ticket' height={100} width={100} />
                                </div>
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="openComments"
                            render={({ field }) => (
                                <FormItem className='w-full p-5 max-w-[700px] bg-blue-800 border-2 border-black rounded-lg'>
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


                        <Button disabled={form.formState.isSubmitting || userTickets - days < 0} className="bg-blue-800 col-span-2 w-[155px] gap-1" type='submit'>
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