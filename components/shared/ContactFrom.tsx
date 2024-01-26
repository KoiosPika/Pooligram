"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/lib/actions/email.actions';
import { useRouter } from 'next/navigation';

const ContactFrom = () => {

    const router = useRouter()

    const FormSchema = z.object({
        name: z.string(),
        email: z.string(),
        subject: z.string(),
        description: z.string().max(200, { message: "Max is 200 characters." })
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const email = {
            senderEmail: values.email,
            subject: values.subject,
            description: values.description,
            name: values.name
        }

        await sendEmail({ email }).then((res)=>{
            console.log(res)
            router.push('/');
        })
    }
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full flex flex-col max-w-[700px] justify-center items-center p-3'>
                <div className='my-3 justify-center items-center flex flex-col w-full bg-blue-800 rounded-lg p-3'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <p className='text-white text-[18px] font-semibold mr-auto mt-2 mb-2'>1. Full Name</p>
                                                <Input placeholder='Enter your full name' className='text-[16px]' {...field} />
                                            </>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <p className='text-white text-[18px] font-semibold mr-auto mt-4 mb-2'>2. Email</p>
                                                <Input placeholder='Enter your preferred email' className='text-[16px]' {...field}/>
                                            </>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <p className='text-white text-[18px] font-semibold mr-auto mt-4 mb-2'>3. Subject</p>
                                                <Input placeholder='What are you emailing us about' className='text-[16px]' {...field} />
                                            </>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <p className='text-white text-[18px] font-semibold mr-auto mt-4 mb-2'>4. Description</p>
                                                <Textarea placeholder='Describe the problem and how we can help you' className='text-[16px]' {...field} />
                                            </>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='w-full flex justify-center items-center my-2'>
                                <Button className='w-1/2 mt-3 bg-white text-blue-800' type='submit'>
                                    <p className='font-semibold'>{form.formState.isSubmitting ? 'Please wait...' : 'Submit'}</p>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ContactFrom