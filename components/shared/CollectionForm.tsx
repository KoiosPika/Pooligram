'use client'

import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { collectionFormSchema } from '@/lib/validator'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { FileUploader } from './FileUploader'
import DatePicker from "react-datepicker";
import { Button } from '../ui/button'
import { getUserById, updateUserTickets } from '@/lib/actions/user.actions'
import { daysBetweenDates } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { createCollection } from '@/lib/actions/collection.actions'

type CollectionParams = {
    userId: string,
    dates: {
        Today: Date
        MaxDate: Date
        MinDate: Date
    }
}

const DailyCharge = 2;

const CollectionForm = ({ dates, userId }: CollectionParams) => {

    const { MaxDate, MinDate } = dates;
    const form = useForm<z.infer<typeof collectionFormSchema>>({
        resolver: zodResolver(collectionFormSchema)
    })

    const [hashtags, setHashtags] = useState<string[]>([])
    const [newHashtag, setNewHashtag] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date>(MinDate);
    const [userTickets, setUserTickets] = useState(0)
    const [files, setFiles] = useState<File[]>([])
    const [days, setDays] = useState(0);

    useEffect(() => {
        async function getUser() {
            const user = await getUserById(userId);
            setUserTickets(user.tickets);
        }

        getUser();
    }, [])

    useEffect(() => {
        const day = daysBetweenDates(selectedDate, dates.MinDate)
        setDays(day);
    }, [selectedDate])

    const handleDeleteHashtag = (index: any) => {
        setHashtags(prevHashtags => prevHashtags.filter((_, i) => i !== index));
    };

    const AddHashtag = () => {
        setHashtags((prevState) => [...prevState, newHashtag.toLowerCase()])
        setNewHashtag('')
    }

    const onSubmit = async (values: z.infer<typeof collectionFormSchema>) => {
        try {
            await createCollection({
                userId,
                collection: {
                    ...values,
                    days,
                    hashtags,
                }
            }).then((res) => {
                updateUserTickets(userId, days, false, DailyCharge)
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
                                        <p className='text-[18px] font-bold text-white'>Collection Title</p>
                                    </div>
                                    <Input placeholder="Collection description..." {...field} className='flex flex-row flex-1 border-2 border-black' />
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-full p-5 bg-blue-800 rounded-lg">
                            <FormControl>
                                <>
                                    <div className='inline-flex flex-row flex-shrink gap-2 bg-blue-800 p-1 rounded-md'>
                                        <Image src={'/assets/icons/pen.svg'} alt='pen' height={20} width={20} />
                                        <p className='text-[18px] font-bold text-white'>Collection Description</p>
                                    </div>
                                    <Textarea placeholder="Collection description..." {...field} className='flex flex-row flex-1 border-2 border-black' />
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='w-full p-5 bg-blue-800 rounded-lg'>
                    <div className='inline-flex flex-row gap-1 bg-blue-800 p-1 rounded-md mb-3'>
                        <Image src={'/assets/icons/hashtag.svg'} alt='pen' height={25} width={25} />
                        <p className='text-[18px] font-bold text-white'>Collection Hashtags</p>
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
                            <Input placeholder='Add Hashtag (Max 8)' className='w-full px-5 max-w-[500px] border-2 border-black' onChange={(e) => setNewHashtag(e.target.value)} value={newHashtag} />
                            <button disabled={hashtags.length == 8} className='bg-yellow-300 hover:bg-grey-400 w-11 h-9 text-blue-800 text-[18px] rounded-md border-2 border-black' type="button" onClick={AddHashtag}>+</button>
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
                                        <p className='text-[18px] font-bold text-white'>Collection Cover Image</p>
                                    </div>
                                    <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='w-full p-5 bg-blue-800 rounded-lg'>
                    <div className='inline-flex flex-row gap-3 bg-blue-800 p-1 rounded-md items-center'>
                        <Image src={'/assets/icons/settings.svg'} alt='pen' height={25} width={25} />
                        <p className='text-[18px] font-bold text-white'>Collection Options</p>
                    </div>
                    <div className='flex flex-col bg-white rounded-lg m-7 p-3'>
                        <p className='ml-5 mt-3 mb-2 text-black font-bold'>Collections last for 10 days. But you can extend the period now for 1 ticket per day or later for 2 tickets per day.</p>
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
                                <p className='text-black font-semibold mr-1'>You're extending {days} days for</p>
                                <div className='flex flex-row items-center justify-center gap-1 ml-2 rounded-lg px-3 py-1' style={{ backgroundColor: '#21C126' }}>
                                    <p className='text-white rounded-md font-semibold ml-1 text-[20px]'>{days * DailyCharge}x</p>
                                    <Image className='h-10 w-6' src={'/assets/images/ticket-1.png'} alt='ticket' height={100} width={100} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex flex-row bg-white rounded-lg m-7 py-3 justify-center items-center'>
                        <p className='text-[18px] font-semibold'>Your tickets:</p>
                        <div className='flex flex-row items-center justify-center gap-1 ml-2 rounded-lg px-3 py-1' style={{ backgroundColor: userTickets - days >= 0 ? '#21C126' : '#EA2514' }}>
                            <p className='text-white rounded-md font-semibold ml-1 text-[20px]'>{userTickets - days}x</p>
                            <Image className='h-10 w-6' src={'/assets/images/ticket-1.png'} alt='ticket' height={100} width={100} />
                        </div>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                        <FormItem className='w-full p-5 max-w-[900px] bg-blue-800 rounded-lg'>
                            <div className='inline-flex flex-row gap-2 items-center bg-blue-800 p-1 rounded-md'>
                                <Image src={'/assets/icons/comments.svg'} alt='pen' height={28} width={28} />
                                <p className='text-[18px] font-bold text-white'>Collection Visibility</p>
                            </div>
                            <div className='w-full px-5 max-w-[900px]'>
                                <div className="flex m-3 items-center">
                                    <Checkbox onCheckedChange={field.onChange} checked={field.value} id='openComments' className="mr-2 h-7 w-7 border-2 border-white" />
                                    <label htmlFor="openComments" className="font-semibold text-white">Check the box if you want to make it a private collection</label>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />


                <Button className="bg-blue-800 col-span-2 w-[190px] gap-1" type="submit">
                    <Image src={'/assets/icons/create.svg'} alt='create' height={20} width={20} />
                    <p>{form.formState.isSubmitting ? 'Please Wait...' : 'Create Collection Now!'}</p>
                </Button>
            </form>
        </Form >
    )
}

export default CollectionForm