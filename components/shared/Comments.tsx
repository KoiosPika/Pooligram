import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ScrollArea } from '../ui/scroll-area'

const Comments = ({ height }) => {
    const arr = [1, 2, 3, 4, 56, 7, 5, 4, 3, 2, 4, 5, 3, 45, 6, 4, 7, 4, 5, 6, 7, 3, 1];
    return (
        <div className='bg-slate-100 border-black border-2 my-5 rounded-lg h-0' style={{height}}>
            <div className='w-full flex flex-row p-3 items-center'>
                <p className='text-[18px] font-semibold'>Comments</p>
                <p className='text-[16px] font-semibold ml-5'>63.5k</p>
            </div>
            <ScrollArea style={{ height: height - 120 }} className='flex flex-1 px-3'>
                {arr.map((item) => (
                    <>
                        <div className='flex flex-row p-2 bg-white mb-3 rounded-xl'>
                            <Image src={'/assets/icons/user-solid.svg'} alt='user' width={25} height={25} className='bg-primary-500 rounded-full p-2 w-9 h-8' />
                            <div className='flex flex-col ml-2'>
                                <p className='font-semibold'>username</p>
                                <p>This is a comment
                                    This is a comment
                                    This is a comment
                                    This is a comment
                                    This is a comment
                                    This is a comment
                                    This is a comment
                                    This is a comment
                                    This is a comment
                                    This is a comment
                                </p>
                            </div>
                        </div>
                    </>
                ))}
            </ScrollArea>
            <div className='mt-auto flex flex-row p-2'>
                <Input placeholder='Write a comment' className='border-2 border-black' />
                <Button className='ml-2 border-2 border-black bg-black'>
                    <Image src={'/assets/icons/arrow.svg'} alt='arrow' width={25} height={25} />
                </Button>
            </div>
        </div>
    )
}

export default Comments