import { Button } from '@/components/ui/button'
import { getLeaderboardUsers } from '@/lib/actions/userData.actions'
import { IUserData } from '@/lib/database/models/userData.model'
import { getLevelColor } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const users = await getLeaderboardUsers()

  const { sessionClaims } = auth()

  const userId = sessionClaims?.userId as string;

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
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/live-round/polls'}>
                    <p className='text-[16px]'>Live Round</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/polls'}>
                    <p className='text-[16px]'>Top Polls</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                  <p className='text-[16px] text-yellow-300'>Top Users</p>
                </Button>
              </div>
              <div className='flex flex-row items-center gap-3'>
                <Image src={'/assets/icons/trophy-yellow.svg'} alt='trophy' height={25} width={25} />
                <p className='text-[25px] font-bold text-yellow-400 my-3'>Top Users</p>
                <Image src={'/assets/icons/trophy-yellow.svg'} alt='trophy' height={25} width={25} />
              </div>
              <div className='w-full flex justify-center items-center gap-3 px-4 mb-3'>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/users/points'}>
                    <p className='text-[13px] md:text-[16px] text-yellow-300 font-semibold'>Points Earned</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/users/votes-received'}>
                    <p className='text-[13px] md:text-[16px] font-semibold'>Votes Received</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/leaderboard/users/votes-submitted'}>
                    <p className='text-[13px] md:text-[16px] font-semibold'>Votes Submitted</p>
                  </Link>
                </Button>
              </div>
              <div className='w-full md:w-5/6 flex flex-row items-center justify-around py-1 rounded-lg bg-blue-800'>
                <div className=' p-2 flex items-center justify-center w-9 h-9'>
                  <p className='font-semibold text-white'>Rank</p>
                </div>
                <p className='font-semibold text-white'>User</p>
                <div className='w-1/4'>
                  <p className='font-semibold text-white'>Points</p>
                </div>
                <div className='w-1/4 relative flex items-center justify-center' style={{ height: '42px', width: '42px' }}>
                  <p className='font-semibold text-white'>Level</p>
                </div>
              </div>
              {users && users.map((user: IUserData, index: number) => {
                const color = getLevelColor(user.level)
                return (
                  <div key={user._id} className='w-full md:w-5/6 flex flex-row items-center justify-around py-1 my-1 rounded-lg' style={{ backgroundColor: user.User._id === userId ? 'yellow' : 'white' }}>
                    <div className='bg-blue-700 p-2 rounded-full flex items-center justify-center w-9 h-9 border-2 border-black'>
                      <p className='text-yellow-200 font-semibold'>{index + 1}</p>
                    </div>
                    <Link className='relative h-[80px] w-[80px] flex justify-center items-center' href={`/profile/${user.User.username}`}>
                      <Image className='absolute h-[80px] w-[80px]' src={`/assets/borders/Border-2.png`} alt='border' height={150} width={150} />
                      <Image src={user.User.photo} alt='user' width={150} height={150} className='h-[57px] w-[57px] mb-1' />
                    </Link>
                    <div className='w-1/4'>
                      <p className='font-semibold text-grey-600'>{user.User.username}</p>
                      <p className='font-semibold text-grey-600'>{(user.points).toLocaleString()}</p>
                    </div>
                    <div className='w-1/4 relative flex items-center justify-center' style={{ height: '42px', width: '42px' }}>
                      <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={38} width={38} />
                      <p className='font-bold text-white absolute z-10 text-[14px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{user.level}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page