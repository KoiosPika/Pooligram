import CountdownTimer from '@/components/shared/CountdownTimer'
import { Button } from '@/components/ui/button'
import { getDate, getCurrentRoundPolls } from '@/lib/actions/poll.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import { getLevelColor } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const polls = await getCurrentRoundPolls();

  const date = await getDate()

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full flex flex-col max-w-[1000px] justify-center items-center bg-white'>
        <div className='my-3 justify-center items-center flex flex-col w-full'>
          <div className='w-full my-3 px-3'>
            <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2 justify-center items-center'>
              <div className='flex flex-row items-center gap-3'>
                <Image src={'/assets/icons/trophy.svg'} alt='trophy' height={35} width={35} />
                <p className='text-[30px] font-bold text-white my-3'>Leaderboard</p>
                <Image src={'/assets/icons/trophy.svg'} alt='trophy' height={35} width={35} />
              </div>
              <div className='w-full flex justify-center items-center gap-3 px-4'>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                  <p className='text-[16px] text-yellow-300 font-semibold'>Live Round</p>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/polls'}>
                    <p className='text-[16px] font-semibold'>Top Polls</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/users'}>
                    <p className='text-[16px] font-semibold'>Top Users</p>
                  </Link>
                </Button>
              </div>
              <div className='flex flex-row items-center gap-3'>
                <Image src={'/assets/icons/trophy-yellow.svg'} alt='trophy' height={25} width={25} />
                <p className='text-[25px] font-bold text-yellow-400 my-3'>Weekly Round #34</p>
                <Image src={'/assets/icons/trophy-yellow.svg'} alt='trophy' height={25} width={25} />
              </div>
              <div className='w-full flex justify-center items-center gap-3 px-4 mb-3'>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/live-round/polls'}>
                    <p className='text-[13px] md:text-[16px] font-semibold'>Polls Voted</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/live-round/votes-received'}>
                    <p className='text-[13px] md:text-[16px] text-yellow-300 font-semibold'>Votes Received</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/live-round/votes-submitted'}>
                    <p className='text-[13px] md:text-[16px] font-semibold'>Votes Submitted</p>
                  </Link>
                </Button>
              </div>
              <CountdownTimer targetDate={date} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page