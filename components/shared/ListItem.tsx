import Poll, { IPoll } from '@/lib/database/models/poll.model'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { timeUntil } from '@/lib/utils'
import Link from 'next/link'
import CollectionDialog from './CollectionDialog'
import CopyLinkDialog from './CopyLinkDialog'
import PinningDialog from './PinningDialog'

const ListItem = ({ poll }: { poll: IPoll }) => {

    const now = new Date().toISOString();

    const pollStatus = timeUntil(poll.endDateTime.toString(), now);

    const sponsorStatus = timeUntil(poll.endSponsoredTime.toString(), now)

    return (
        <div className='flex flex-col justify-center h-[500px] bg-white rounded-lg items-center'>
            <div className='flex flex-col gap-2 py-3 justify-center items-center'>
                <p className='py-1 px-2 font-semibold text-[14px] rounded-lg bg-slate-300 text-slate-800 sm:w-[300px] truncate'>{poll.title}</p>
                <div className='flex flex-col gap-1 justify-center items-center my-2'>
                    <div className='relative'>
                        <Link href={`/poll/${poll._id}`} className='sm:min-h-[300px] sm:min-w-[300px] bg-slate-200 rounded-md'>
                            <Image src={poll.imageUrl} alt='hero' width={300} height={300} className='rounded-md sm:h-[300px] sm:w-[300px] h-[250px] w-[250px]' />
                        </Link>
                        {pollStatus && <div className='flex flex-row items-center gap-1 absolute top-2 left-2 bg-white px-2 py-1 rounded-lg border-2 border-green-800'>
                            <div className='bg-green-800 rounded-full h-2 w-2 blinking'></div>
                            <p className='text-green-800 font-bold'>Live</p>
                        </div>}
                        {!pollStatus && <div className='flex flex-row items-center gap-1 absolute top-2 left-2 bg-white px-2 py-1 rounded-lg border-2 border-red-500'>
                            <div className='bg-red-500 rounded-full h-2 w-2'></div>
                            <p className='text-red-500 font-bold'>Ended</p>
                        </div>}
                    </div>
                    <div className='grid grid-cols-2 justify-center items-center px-2 mt-auto gap-2'>
                        {pollStatus &&
                            <Link href={`/poll/${poll._id}/edit`} className='bg-green-700 flex flex-row items-center justify-center rounded-lg p-2 gap-1'>
                                <Image src={'/assets/icons/create.svg'} alt='dollar' height={15} width={15} />
                                <p className='text-white'>Edit Poll</p>
                            </Link>}
                        <CopyLinkDialog link={`https://pooligram.vercel.app/poll/${poll._id}`} />
                        {pollStatus && !sponsorStatus && <PinningDialog userId={poll.creator._id} id={poll._id} />}
                        {pollStatus && sponsorStatus && 
                        <Button className='bg-pink-500 w-full flex flex-row items-center gap-1 hover:bg-pink-500'>
                            <Image src={'/assets/icons/speaker.svg'} alt='live' height={21} width={21} />
                            <p className='text-[15px]'>{sponsorStatus}</p>
                        </Button>}
                        {pollStatus && <CollectionDialog pollId={poll._id} userId={poll.creator._id} />}
                        <p className='text-center py-[10px] px-5 rounded-lg inline-block font-semibold bg-purple-300 text-purple-800 text-[14px]'>Votes : {(poll.nofVotes).toLocaleString()}</p>
                        {pollStatus && <p className='font-semibold text-red-600 bg-red-200 py-[10px] px-5 rounded-lg text-center text-[14px]'>{timeUntil(poll.endDateTime.toString(), now)}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItem