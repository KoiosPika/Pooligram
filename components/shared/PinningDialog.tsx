'use client'

import React, { useEffect, useState } from 'react'
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
import { Button } from '../ui/button'
import Image from 'next/image'
import { getUserDataById } from '@/lib/actions/userData.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { IPoll } from '@/lib/database/models/poll.model'
import { getPollById, sponsorPoll } from '@/lib/actions/poll.actions'

const PinningDialog = ({ userId, id }: { userId: string, id: string }) => {

    const [User, setUser] = useState<IUserData>()
    const [Poll, setPoll] = useState<IPoll>()

    useEffect(() => {
        async function getUser() {
            const user = await getUserDataById(userId)
            setUser(user);
        }

        async function getPoll() {
            const poll = await getPollById(id)
            setPoll(poll)
        }

        getUser().then(() => {
            getPoll();
        });
    }, [])

    const handleSponsoring = async () => {
        await sponsorPoll({ userId, id })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className='bg-pink-500 w-full flex flex-row items-center gap-1 hover:bg-pink-500'>
                    <Image src={'/assets/icons/speaker.svg'} alt='live' height={21} width={21} />
                    <p className='text-[15px]'>Push to Top</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-800 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white">Pin Poll</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black h-[30px] w-[10px]">X</AlertDialogCancel>
                    </AlertDialogTitle>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex flex-row w-full justify-center items-center my-3 bg-blue-500 py-3 rounded-lg'>
                            <Image className='rounded-lg h-[100px] w-[100px] border-2 border-white' src={Poll?.imageUrl || '/assets/images/loading.png'} alt='hero' height={200} width={200} />
                            <div className='flex flex-col gap-2 ml-3'>
                                <p className='font-semibold text-[15px] text-white truncate-2-lines'>{Poll?.title}</p>
                                <p className='font-semibold text-[15px] text-white'>Votes: {Poll?.nofVotes.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className='inline-flex flex-row items-center justify-center gap-1 ml-2 rounded-lg px-3 py-1 bg-green-600'>
                            <p className='text-white rounded-md font-semibold ml-1 text-[20px]'>{User?.tickets}x</p>
                            <Image className='h-10 w-8' src={'/assets/images/ticket-1.png'} alt='ticket' height={100} width={100} />
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {User && <AlertDialogAction onClick={handleSponsoring} disabled={User?.tickets - 2 < 0} className="text-yellow-300 flex flex-row items-center gap-2 h-[50px] border-2 border-yellow-300" style={{ backgroundColor: User?.tickets - 2 > 0 ? '#1635B2' : '#E72313' }}>
                        <p>Request for 2x</p>
                        <Image className='h-10 w-8' src={'/assets/images/ticket-1.png'} alt='ticket' height={100} width={100} />
                    </AlertDialogAction>}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PinningDialog