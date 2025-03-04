'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import Link from "next/link"

const SocialsDialog = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className='ml-auto bg-orange-500 text-white px-3 py-1 rounded-lg'>
                    Socials
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-800 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white">Social Accounts</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black">X</AlertDialogCancel>
                    </AlertDialogTitle>
                </AlertDialogHeader>
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

                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-red-600 rounded-lg">
                        <div className="bg-white flex justify-center items-center rounded-l-md px-[4px] h-full">
                            <Image alt="x" src={'/assets/socials/instagram.PNG'} height={50} width={50} />
                        </div>
                        <Link href={'https://www.instagram.com'} className="flex items-center px-2 text-[16px] text-red-700 bg-white w-full h-full font-semibold">
                            <p>
                                www.instgram.com
                            </p>
                        </Link>
                        <div className="bg-white flex justify-center items-center rounded-r-sm px-2 text-red-700 h-full font-semibold">
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

                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-white rounded-lg">
                        <div className="bg-[#5865f2] flex justify-center items-center rounded-l-sm px-[5px] h-full">
                            <Image alt="x" src={'/assets/socials/discord-1.PNG'} height={45} width={45} />
                        </div>
                        <Link href={'https://www.discord.com'} className="flex items-center px-2 text-[16px] text-white bg-[#5865f2] w-full h-full font-semibold">
                            <p>
                                www.discord.com
                            </p>
                        </Link>
                        <div className="bg-[#5865f2] flex justify-center items-center rounded-r-sm px-2 text-white h-full font-semibold">
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

                    <div className="flex items-center w-2/3 h-[45px] overflow-hidden border-2 border-white rounded-lg">
                        <div className="bg-orange-600 flex justify-center items-center rounded-l-md px-[6px] h-full">
                            <Image alt="x" src={'/assets/socials/envelope.svg'} height={40} width={40} />
                        </div>
                        <Link href={'https://www.facebook.com'} className="flex items-center px-2 text-[16px] text-white bg-orange-600 w-full h-full font-semibold">
                            <p>
                                personal@gmail.com
                            </p>
                        </Link>
                        <div className="bg-orange-600 flex justify-center items-center rounded-r-sm px-2 text-white h-full font-semibold">
                            Copy
                        </div>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-blue-600 text-yellow-300">Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SocialsDialog