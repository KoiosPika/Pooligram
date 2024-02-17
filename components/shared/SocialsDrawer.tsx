'use client'

import React, { useEffect, useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from 'next/link'
import Image from 'next/image'

const SocialsDrawer = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <div className='ml-auto bg-orange-500 text-white px-3 py-1 rounded-lg cursor-pointer'>
                    Socials
                </div>
            </DrawerTrigger>
            <DrawerContent className='bg-blue-800 h-5/6'>
                <DrawerHeader>
                    <DrawerTitle>
                        <p className='text-white'>Social Accounts</p>
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col w-full justify-center items-center gap-3">
                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-white rounded-lg">
                        <div className="bg-black flex justify-center items-center rounded-l-lg px-2 h-full">
                            <Image alt="x" src={'/assets/socials/x-twitter.svg'} height={35} width={35} />
                        </div>
                        <p className="flex items-center px-2 text-[16px] text-white bg-black  w-full h-full font-semibold">
                            www.x.com
                        </p>
                        <div className="bg-black flex justify-center items-center rounded-r-lg px-2 text-white h-full font-semibold">
                            Copy
                        </div>
                    </div>

                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-purple-600 rounded-lg">
                        <div className="bg-white flex justify-center items-center rounded-l-md px-[6px] h-full">
                            <Image alt="x" src={'/assets/socials/instagram.webp'} height={40} width={40} />
                        </div>
                        <Link href={'https://www.instagram.com'} className="flex items-center px-2 text-[16px] text-purple-700 bg-white w-full h-full font-semibold">
                            <p>
                                www.instgram.com
                            </p>
                        </Link>
                        <div className="bg-white flex justify-center items-center rounded-r-sm px-2 text-purple-700 h-full font-semibold">
                            Copy
                        </div>
                    </div>

                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-black rounded-lg">
                        <div className="bg-[#fffc00] flex justify-center items-center rounded-l-md px-[3px] h-full">
                            <Image alt="x" src={'/assets/socials/snapchat.PNG'} height={50} width={50} />
                        </div>
                        <Link href={'https://www.snapchat.com'} className="flex items-center px-2 text-[16px] text-black bg-[#fffc00] w-full h-full font-semibold">
                            <p>
                                www.snapchat.com
                            </p>
                        </Link>
                        <div className="bg-[#fffc00] flex justify-center items-center rounded-r-sm px-2 text-black h-full font-semibold">
                            Copy
                        </div>
                    </div>

                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-[#5865f2] rounded-lg">
                        <div className="bg-white flex justify-center items-center rounded-l-md px-[5px] h-full">
                            <Image alt="x" src={'/assets/socials/discord.png'} height={45} width={45} />
                        </div>
                        <Link href={'https://www.snapchat.com'} className="flex items-center px-2 text-[16px] text-[#5865f2] bg-white w-full h-full font-semibold">
                            <p>
                                www.snapchat.com
                            </p>
                        </Link>
                        <div className="bg-white flex justify-center items-center rounded-r-sm px-2 text-[#5865f2] h-full font-semibold">
                            Copy
                        </div>
                    </div>


                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-white rounded-lg">
                        <div className="bg-[#ff0000] flex justify-center items-center rounded-l-md px-[3px] h-full">
                            <Image alt="x" src={'/assets/socials/youtube.webp'} height={50} width={50} />
                        </div>
                        <Link href={'https://www.youtube.com'} className="flex items-center px-2 text-[16px] text-white bg-[#ff0000] w-full h-full font-semibold">
                            <p>
                                www.youtube.com
                            </p>
                        </Link>
                        <div className="bg-[#ff0000] flex justify-center items-center rounded-r-sm px-2 text-white h-full font-semibold">
                            Copy
                        </div>
                    </div>

                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-white rounded-lg">
                        <div className="bg-black flex justify-center items-center rounded-l-md px-[5px] h-full">
                            <Image alt="x" src={'/assets/socials/tiktok.PNG'} height={45} width={45} />
                        </div>
                        <Link href={'https://www.tiktok.com'} className=" overflow-hidden flex items-center px-2 text-[16px] text-white bg-black w-full h-full font-semibold">
                            <p>
                                www.tiktok.com/hdghksokdjdkdkdojshskkdoj
                            </p>
                        </Link>
                        <div className="bg-black flex justify-center items-center rounded-r-sm px-2 text-white h-full font-semibold">
                            Copy
                        </div>
                    </div>

                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-blue-700 rounded-lg">
                        <div className="bg-white flex justify-center items-center rounded-l-md px-[6px] h-full">
                            <Image alt="x" src={'/assets/socials/facebook.svg'} height={40} width={40} />
                        </div>
                        <Link href={'https://www.facebook.com'} className="flex items-center px-2 text-[16px] text-blue-700 bg-white w-full h-full font-semibold">
                            <p>
                                www.facebook.com
                            </p>
                        </Link>
                        <div className="bg-white flex justify-center items-center rounded-r-sm px-2 text-blue-700 h-full font-semibold">
                            Copy
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default SocialsDrawer