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
              <div className='w-full flex justify-center items-center gap-3'>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                  <p className='text-[16px] text-yellow-300 font-semibold'>Live Round</p>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/polls'}>
                    <p className='text-[16px] font-semibold'>Top Polls</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/users/points'}>
                    <p className='text-[16px] font-semibold'>Top Users</p>
                  </Link>
                </Button>
              </div>
              <div className='flex flex-row items-center gap-3'>
                <Image src={'/assets/icons/trophy-yellow.svg'} alt='trophy' height={25} width={25} />
                <p className='text-[25px] font-bold text-yellow-400 my-3'>Weekly Round #34</p>
                <Image src={'/assets/icons/trophy-yellow.svg'} alt='trophy' height={25} width={25} />
              </div>
              <div className='w-full flex justify-center items-center gap-3 mb-3'>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                  <p className='text-[13px] md:text-[16px] text-yellow-300 font-semibold'>Polls Voted</p>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/live-round/votes-received'}>
                    <p className='text-[13px] md:text-[16px] font-semibold'>Votes Received</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/live-round/votes-submitted'}>
                    <p className='text-[13px] md:text-[16px] font-semibold'>Votes Submitted</p>
                  </Link>
                </Button>
              </div>
              <CountdownTimer targetDate={date} />
              <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
                {polls.length > 0 && polls.map((poll: IPoll, index: number) => {
                  const color = getLevelColor(poll.creator.UserData.level)
                  return (
                    <li key={poll._id} className='min-h-[380px] min-w-[300px] flex flex-col'>
                      <div className='relative'>
                        <Link href={`/poll/${poll._id}`}>
                          <Image src={poll.imageUrl} alt='hero' className='h-[250px] w-[300px] rounded-t-lg' height={350} width={350} />
                        </Link>
                        <div className='absolute top-2 left-2 bg-yellow-300 p-2 rounded-full flex items-center justify-center w-10 h-10 border-2 border-black'>
                          <p className='text-black font-bold'>{index + 1}</p>
                        </div>
                      </div>
                      <div className='bg-white h-[150px] max-w-[300px] rounded-b-lg py-1 flex flex-col'>
                        <p className='ml-2 mb-2 truncate-2-lines text-[15px] text-blue-800 font-bold'>{poll.title}</p>
                        <div className='mt-auto flex flex-row items-center ml-2 mb-2'>
                          <Link href={`/profile/${poll.creator.username}`}>
                            <Image className='h-8 w-8 rounded-full' src={poll.creator.photo} alt='user' height={60} width={60} />
                          </Link>
                          <p className='text-[18px] text-blue-800 font-semibold ml-1'>{poll.creator.username}</p>
                          <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                            <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                            <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{poll.creator.UserData.level}</p>
                          </div>
                        </div>
                        <div className='flex w-full'>
                          <p className='ml-auto mr-5 bg-blue-800 text-yellow-300 py-1 px-2 rounded-lg font-semibold'>{(poll.nofVotes).toLocaleString()} Votes</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page