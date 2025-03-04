'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from '../ui/button'
import { pollFormSchema } from '@/lib/validator'
import { Textarea } from '../ui/textarea'
import { FileUploader } from './FileUploader'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pollDefaultValues } from '@/constants'
import { useUploadThing } from '@/lib/uploadthing'
import { createPoll } from '@/lib/actions/poll.actions'
import { useRouter } from 'next/navigation'
import { createAnswer } from '@/lib/actions/answer.actions'
import { getUserDataById, updateUserTickets } from '@/lib/actions/userData.actions'
import { daysBetweenDates } from '@/lib/utils'
import { createReport } from '@/lib/actions/report.actions'

const DailyCharge = 1;

type PollParams = {
    userId: string,
    dates: {
        Today: Date
        MaxDate: Date
        MinDate: Date
        SponsoredDate: Date
    }
}

const PollForm = ({ userId, dates }: PollParams) => {

    const { MaxDate, MinDate } = dates;
    const form = useForm<z.infer<typeof pollFormSchema>>({
        resolver: zodResolver(pollFormSchema),
        defaultValues: pollDefaultValues
    })

    const router = useRouter();

    const [options, setOptions] = useState<string[]>([]);
    const [newOption, setNewOption] = useState('')
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [newHashtag, setNewHashtag] = useState<string>('');
    const [sponsored, setSponsored] = useState<boolean>(false);

    const [files, setFiles] = useState<File[]>([])
    const [userTickets, setUserTickets] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date>(MinDate);
    const [days, setDays] = useState(0);

    useEffect(() => {
        async function getUser() {
            const user = await getUserDataById(userId);
            setUserTickets(user.tickets);
        }

        getUser();
    }, [])

    useEffect(() => {
        if (sponsored == false) {
            setUserTickets(userTickets + 2)
        } else {
            setUserTickets(userTickets - 2)
        }
    }, [sponsored])

    useEffect(() => {
        const day = daysBetweenDates(selectedDate, MinDate)
        setDays(day);
    }, [selectedDate])

    const AddOption = () => {
        setOptions((prevState) => [...prevState, newOption])
        setNewOption('')
    }

    const AddHashtag = () => {
        setHashtags((prevState) => [...prevState, newHashtag.toLowerCase()])
        setNewHashtag('')
    }

    const handleDeleteOption = (index: number) => {
        setOptions(prevOptions => prevOptions.filter((_, i) => i !== index));
    };

    const handleDeleteHashtag = (index: number) => {
        setHashtags(prevHashtags => prevHashtags.filter((_, i) => i !== index));
    };

    const { startUpload } = useUploadThing('imageUploader');

    const onSubmit = async (values: z.infer<typeof pollFormSchema>) => {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return;
            }

            uploadedImageUrl = uploadedImages[0].url;
        }

        try {
            const newPoll = await createPoll({
                userId,
                poll: {
                    ...values,
                    days,
                    sponsored,
                    hashtags: hashtags,
                    imageUrl: uploadedImageUrl
                }
            })

            createReport(newPoll._id);

            await Promise.all(options.map(async (option) => {
                await createAnswer({ pollId: newPoll._id, title: option });
            })).then((res) => {
                updateUserTickets(userId, days, sponsored, DailyCharge)
                form.reset();
                router.push(`/poll/${newPoll._id}`);
            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-5 justify-center items-center px-3 max-w-[700px]">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full p-5 bg-blue-800 rounded-lg">
                            <FormControl>
                                <>
                                    <div className='inline-flex flex-row flex-shrink gap-2 bg-blue-800 p-1 rounded-md'>
                                        <Image src={'/assets/icons/pen.svg'} alt='pen' height={20} width={20} />
                                        <p className='text-[18px] font-bold text-white'>Poll Title</p>
                                    </div>
                                    <Textarea placeholder="Poll Title" {...field} className='flex flex-row flex-1 border-2 border-black' />
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='w-full p-5 bg-blue-800 rounded-lg'>
                    <div className='inline-flex flex-row gap-1 bg-blue-800 p-1 rounded-md mb-3'>
                        <Image src={'/assets/icons/hashtag.svg'} alt='pen' height={25} width={25} />
                        <p className='text-[18px] font-bold text-white'>Poll Hashtags</p>
                    </div>
                    {hashtags.length > 0 &&
                        <div className='w-full flex flex-col max-w-[900px] justify-center items-center px-5 md:px-15'>
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
                            <Input placeholder='Add Hashtag (Max 16)' className='w-full px-5 max-w-[500px] border-2 border-black' onChange={(e) => setNewHashtag(e.target.value)} value={newHashtag} />
                            <button disabled={hashtags.length == 16} className='bg-yellow-300 hover:bg-grey-400 w-11 h-9 text-blue-800 text-[18px] rounded-md border-2 border-black' type="button" onClick={AddHashtag}>+</button>
                        </div>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="w-full p-5 bg-blue-800 rounded-lg">
                            <FormControl className="h-72">
                                <>
                                    <div className='inline-flex flex-row gap-2 bg-blue-800 p-1 rounded-md'>
                                        <Image src={'/assets/icons/image.svg'} alt='pen' height={20} width={20} />
                                        <p className='text-[18px] font-bold text-white'>Poll Cover Image</p>
                                    </div>
                                    <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <div className='w-full p-5 bg-blue-800 rounded-lg'>
                    <div className='inline-flex flex-row gap-2 bg-blue-800 p-1 rounded-md mb-2'>
                        <Image src={'/assets/icons/answers.svg'} alt='pen' height={25} width={25} />
                        <p className='text-[18px] font-bold text-white'>Poll Answers</p>
                    </div>
                    <div className='flex flex-row ml-1 mb-2 gap-1'>
                        <Image src={'/assets/icons/info-white.svg'} alt='info' height={18} width={18} className='mb-auto' />
                        <p className='text-white text-[12px]'>To ensure integrity of the poll, you won't be able to edit answers after creating the poll</p>
                    </div>
                    {options.length > 0 &&
                        <div className='w-full flex flex-col max-w-[500px] justify-center items-center px-5 md:px-15'>
                            {options.map((option, index) => (
                                <div key={index} className='w-full p-3 border-2 border-white bg-white rounded-md flex flex-row my-2 justify-between'>
                                    <p className='text-[16px] text-black font-semibold'>{option}</p>
                                    <button type="button" onClick={() => handleDeleteOption(index)}>
                                        <Image src={'/assets/icons/minus.svg'} alt='minus' width={20} height={30} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    }
                    <div className='flex flex-col gap-2 justify-center md:justify-between items-center'>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <Input placeholder='Add Answer' className='w-full px-5 max-w-[300px] border-2 border-black' onChange={(e) => setNewOption(e.target.value)} value={newOption} />
                            <button className='hover:bg-grey-400 w-11 h-9 text-blue-800 text-[18px] rounded-md border-2 border-black bg-yellow-400' type="button" onClick={AddOption}>+</button>
                        </div>
                    </div>
                </div>

                <div className='w-full p-5 bg-blue-800 rounded-lg'>
                    <div className='inline-flex flex-row gap-3 bg-blue-800 p-1 rounded-md items-center'>
                        <Image src={'/assets/icons/settings.svg'} alt='pen' height={25} width={25} />
                        <p className='text-[18px] font-bold text-white'>Poll Options</p>
                    </div>
                    <div className='flex flex-col bg-white rounded-lg m-7 p-3'>
                        <p className='ml-5 mt-3 mb-2 text-black font-bold'>Extend the poll's expiration date past 5 days for 1 ticket per day</p>
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
                                                        minDate={MinDate}
                                                        maxDate={MaxDate}
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
                                <p className='text-black font-semibold mr-1 text-[14px]'>You're extending {days} days for</p>
                                <div className='flex flex-row items-center justify-center gap-1 ml-2 rounded-lg px-3 py-1' style={{ backgroundColor: '#21C126' }}>
                                    <p className='text-white rounded-md font-semibold ml-1 text-[20px]'>{days}x</p>
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
                        <FormItem className='w-full p-5 bg-blue-800 rounded-lg'>
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


                <Button disabled={form.formState.isSubmitting || userTickets - days < 0} className="bg-blue-800 col-span-2 w-[155px] gap-1" type="submit">
                    <Image src={'/assets/icons/create.svg'} alt='create' height={20} width={20} />
                    <p>{form.formState.isSubmitting ? 'Please Wait...' : 'Create Poll Now!'}</p>
                </Button>
            </form>
        </Form >
    )
}

export default PollForm