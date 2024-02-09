'use client'

import React, { useState } from 'react'
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

type CollectionParams = {
    userId: string,
    dates: {
        Today: Date
        MaxDate: Date
        MinDate: Date
        SponsoredDate: Date
    }
}

const CollectionForm = ({ dates }: CollectionParams) => {

    const { MaxDate, MinDate } = dates;
    const form = useForm<z.infer<typeof collectionFormSchema>>({
        resolver: zodResolver(collectionFormSchema)
    })

    const [hashtags, setHashtags] = useState<string[]>([])
    const [newHashtag, setNewHashtag] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date>(MinDate);
    const [files, setFiles] = useState<File[]>([])

    const handleDeleteHashtag = (index: any) => {
        setHashtags(prevHashtags => prevHashtags.filter((_, i) => i !== index));
    };

    const AddHashtag = () => {
        setHashtags((prevState) => [...prevState, newHashtag.toLowerCase()])
        setNewHashtag('')
    }

    const onSubmit = () => {

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
                                        <p className='text-[18px] font-bold text-white'>Collection Description</p>
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
                        <p className='ml-5 mt-3 mb-2 text-black font-bold'>Polls expire within 5 days. But you can extend the period now for $0.25 per day or later for $0.50 per day. (Max is 30)</p>
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
                        </div>
                    </div>
                </div>


                <Button className="bg-blue-800 col-span-2 w-[190px] gap-1" type="submit">
                    <Image src={'/assets/icons/create.svg'} alt='create' height={20} width={20} />
                    <p>{form.formState.isSubmitting ? 'Please Wait...' : 'Create Collection Now!'}</p>
                </Button>
            </form>
        </Form >
    )
}

export default CollectionForm