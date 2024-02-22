import { Button } from '@/components/ui/button'
import { getUserDataById } from '@/lib/actions/userData.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { getLevelColor, getNextLevelPoints } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const user: IUserData = await getUserDataById(userId)


    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[900px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2'>
                            <div className='flex flex-row w-full gap-3 my-3'>
                                <Link href={'/shop/borders'} className='flex flex-1 justify-center items-center bg-blue-600 py-1 text-white rounded-lg border-2 border-white'>
                                    <p>Borders</p>
                                </Link>
                                <Link href={'/shop/souvenirs'} className='flex flex-1 justify-center items-center bg-blue-600 py-1 text-white rounded-lg border-2 border-white'>
                                    <p>Souvenirs</p>
                                </Link>
                                <Link href={'/shop/borders'} className='flex flex-1 justify-center items-center bg-blue-600 py-1 text-white rounded-lg border-2 border-white'>
                                    <p>Redeem</p>
                                </Link>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-1.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Summer Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-2.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Fall Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-3.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Beach Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-4.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Beach Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-5.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Beach Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-1.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Summer Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-2.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Fall Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-3.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Beach Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-4.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Beach Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center p-2 bg-blue-600 rounded-lg border-2 border-yellow-400'>
                                    <Image src={'/assets/borders/Border-5.png'} height={500} width={500} className='h-full w-full' alt='border'/>
                                    <p className='text-white font-semibold'>Beach Theme</p>
                                    <div className='relative justify-center items-center flex mr-5'>
                                        <Image src={'/assets/images/diamond.png'} alt='ticket' className='h-[50px] w-[50px] z-10' height={200} width={200}/>
                                        <div className=' absolute left-4 bg-white w-[60px] flex justify-end pr-2 rounded-lg'>
                                            <p className='font-semibold'>20</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default page