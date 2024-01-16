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

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
})

const page = () => {

  const leftDivRef = useRef<HTMLDivElement>(null);
  const [rightDivHeight, setRightDivHeight] = useState<number>(0);

  useEffect(() => {
    if (leftDivRef.current) {
      const height = leftDivRef.current.offsetHeight;
      setRightDivHeight(height);
    }
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('hello')
  }
  return (
    <div>
      <div className='w-full flex justify-center h-[70px] items-center'>
        <div className='bg-slate-400 w-full max-w-[800px] h-[70px] m-2'>
          
        </div>
      </div>
      <div className='flex flex-row justify-center md:justify-center xl:justify-center'>
        <div ref={leftDivRef} className='flex flex-col justify-center items-center my-5 border-2 rounded-lg border-black'>
          <Image className='w-full max-w-[350px] md:max-w-[350px]' src={'/assets/images/Job.png'} alt='hero' width={400} height={400} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-slate-200 max-w-[350px] md:max-w-[350px] p-3 rounded-lg">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Would you stay in this era? Would you stay in this era? Would you stay in this era?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="all" />
                          </FormControl>
                          <div className="font-semibold w-full bg-white px-2 py-1 border-2 rounded-md border-black">
                            <FormLabel>
                              Yes
                            </FormLabel>
                          </div>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mentions" />
                          </FormControl>
                          <div className="font-semibold w-full bg-white px-2 py-1 border-2 rounded-md border-black">
                            <FormLabel>
                              No
                            </FormLabel>
                          </div>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mentions" />
                          </FormControl>
                          <div className="font-semibold w-full bg-white px-2 py-1 border-2 rounded-md border-black">
                            <FormLabel>
                              Maybe
                            </FormLabel>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='bg-black' type="submit">Save</Button>
            </form>
          </Form>
        </div>
        <div className='hidden md:block w-full max-w-[350px] h-[0px]'>
          <Comments height={rightDivHeight} />
        </div>
      </div>
      <div className='px-[100px]'>
        <p className='mb-7 font-bold text-[20px]'>Related Polls: </p>
        <Selection />
      </div>
    </div>
  )
}

export default page