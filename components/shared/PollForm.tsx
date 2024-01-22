'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from '../ui/button'
import { eventFormSchema } from '@/lib/validator'
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
import { getUserById } from '@/lib/actions/user.actions'

const PollForm = ({ userId }: { userId: string }) => {
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: pollDefaultValues
    })

    const router = useRouter();

    const Today = new Date();
    const MaxDate = new Date(Today);
    const PollMax = new Date(Today)
    PollMax.setDate(Today.getDate() + 7)
    MaxDate.setDate(Today.getDate() + 30);

    const [options, setOptions] = useState<string[]>([]);
    const [newOption, setNewOption] = useState('')
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [newHashtag, setNewHashtag] = useState<string>('');
    const [canChangeDate, setCanChangeDate] = useState<boolean>(false);
    const [sponsored, setSponsored] = useState<boolean>(false);

    const [files, setFiles] = useState<File[]>([])
    const [userBalance, setUserBalance] = useState(0);
    const [extraDays, setExtraDays] = useState<number>(0)
    const [extendedCharge, setExtendedCharge] = useState<number>(0)
    const prevExtraDaysRef = useRef(extraDays);

    useEffect(() => {
        async function getUser() {
            const user = await getUserById(userId);
            setUserBalance(user.balance);
        }

        getUser();
    }, [])

    useEffect(() => {
        if (sponsored == false) {
            setUserBalance(userBalance + 2)
        } else {
            setUserBalance(userBalance - 2)
        }
    }, [sponsored])

    useEffect(() => {
        if (Number.isNaN(extraDays)) {
            setExtendedCharge(0)
        } else {
            setExtendedCharge(extraDays * 0.25)
        }
    }, [extraDays])

    const AddOption = () => {
        setOptions((prevState) => [...prevState, newOption])
        setNewOption('')
    }

    const AddHashtag = () => {
        setHashtags((prevState) => [...prevState, newHashtag.toLowerCase()])
        setNewHashtag('')
    }

    const handleDeleteOption = (index: any) => {
        setOptions(prevOptions => prevOptions.filter((_, i) => i !== index));
    };

    const handleDeleteHashtag = (index: any) => {
        setHashtags(prevHashtags => prevHashtags.filter((_, i) => i !== index));
    };

    const { startUpload } = useUploadThing('imageUploader');

    const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
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
                poll: { ...values, endDateTime: canChangeDate ? values.endDateTime : PollMax, hashtags: hashtags, imageUrl: uploadedImageUrl }
            })

            await Promise.all(options.map(async (option) => {
                await createAnswer({ pollId: newPoll._id, title: option });
            })).then((res) => {
                form.reset();
                router.push(`/poll/${newPoll._id}`);
            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-5 justify-center items-center px-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full p-5 max-w-[500px] bg-blue-800 border-2 border-black rounded-lg">
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

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="w-full p-5 max-w-[500px] bg-blue-800 border-2 border-black rounded-lg">
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


                <div className='w-full p-5 max-w-[500px] bg-blue-800 border-2 border-black rounded-lg'>
                    <div className='inline-flex flex-row gap-2 bg-blue-800 p-1 rounded-md mb-3'>
                        <Image src={'/assets/icons/answers.svg'} alt='pen' height={25} width={25} />
                        <p className='text-[18px] font-bold text-white'>Poll Answers</p>
                    </div>
                    {options.length > 0 &&
                        <div className='w-full flex flex-col max-w-[500px] justify-center items-center px-5 md:px-15'>
                            {options.map((option, index) => (
                                <div className='w-full p-3 border-2 border-white bg-white rounded-md flex flex-row my-2 justify-between'>
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
                        <FormField
                            control={form.control}
                            name="openList"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center my-3">
                                            <Checkbox onCheckedChange={field.onChange} checked={field.value} id="openList" className="mr-2 h-7 w-7 border-2 border-white" />
                                            <label htmlFor="openList" className="font-semibold text-white">Allow users to add more options</label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>



                <div className='w-full p-5 max-w-[500px] bg-blue-800 border-2 border-black rounded-lg'>
                    <div className='inline-flex flex-row gap-3 bg-blue-800 p-1 rounded-md items-center'>
                        <Image src={'/assets/icons/settings.svg'} alt='pen' height={25} width={25} />
                        <p className='text-[18px] font-bold text-white'>Poll Options</p>
                    </div>
                    <p className='text-[13px] font-semibold text-white'>(please refill your wallet first)</p>
                    <div className='flex flex-col bg-white rounded-lg m-7 p-3'>
                        <p className='ml-5 mt-3 mb-2 text-blue-800 font-bold'>For a $2.00 sponsorship fee, you can enhance the visibility of your poll by ensuring it appears at the top of the poll list for 24 hours.</p>
                        <FormField
                            control={form.control}
                            name="sponsored"
                            render={({ field }) => (
                                <FormItem className="w-full px-5 max-w-[500px]">
                                    <FormControl>
                                        <div className="flex mt-4 items-center">
                                            <Checkbox onCheckedChange={() => setSponsored(!sponsored)} checked={sponsored} id="openList" className="mr-2 h-7 w-7 border-2 border-blue-800" />
                                            <label htmlFor="openList" className="font-bold text-blue-800 text-[16px]">Sponsor the poll for $2.00</label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col bg-white rounded-lg m-7 p-3'>
                        <p className='ml-5 mt-3 mb-2 text-blue-800 font-bold'>Polls expire within 5 days. But you can extend the period now for $0.25 per day or later for $0.50 per day</p>
                        <div className='w-full pl-5 pt-4 max-w-[500px]'>
                            <div className="flex mb-3 items-center">
                                <Checkbox onCheckedChange={() => setCanChangeDate(!canChangeDate)} checked={canChangeDate} className="mr-2 h-7 w-7 border-2 border-blue-800" />
                                <label htmlFor="isFree" className="font-bold text-blue-800">Check here to add more days</label>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                {canChangeDate &&
                                    <Input min={0} className='w-[160px] border-2 border-black font-bold' step={'1'} type='number' placeholder='How many days?' value={extraDays} onChange={(e) => setExtraDays(e.target.valueAsNumber)} onKeyDown={(e)=>{if(e.key === '.'){e.preventDefault()}}} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col bg-white rounded-lg m-7 py-3 justify-center items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <p className='text-[20px] font-semibold'>Your Balance: </p>
                            <p className='text-[20px] font-semibold border-2 border-blue-800 rounded-lg p-2'>{userBalance - extendedCharge}</p>
                        </div>
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


                <Button disabled={form.formState.isSubmitting} className="bg-blue-800 col-span-2 w-[155px] gap-1" type="submit">
                    <Image src={'/assets/icons/create.svg'} alt='create' height={20} width={20} />
                    <p>{form.formState.isSubmitting ? 'Please Wait...' : 'Create Poll Now!'}</p>
                </Button>
            </form>
        </Form >
    )
}

export default PollForm