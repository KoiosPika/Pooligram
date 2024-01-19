import Search from '@/components/shared/Search'
import Selection from '@/components/shared/Selection'
import { getUser } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const page = async () => {

  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUser(userId)
  const userHashtags = user?.hashtags


  return (
    <div className='w-full flex justify-center bg-slate-100'>
      <div className='flex-col flex w-full max-w-[1000px] mx-[5px]'>
        <div className='w-full flex justify-center h-[70px] items-center'>
          <div className='bg-slate-400 w-full max-w-[800px] h-[70px] m-2'></div>
        </div>
        <div className='flex flex-row justify-center items-center'>
          <Search />
        </div>
        <div className='flex flex-row'>
          <p className='text-[20px] font-semibold my-5 ml-5 mr-2'>Popular Polls</p>
          <Image src={'/assets/icons/trend-solid.svg'} alt='trend' height={30} width={30} />
        </div>
        <Selection postHashtags={['']} userHashtags={userHashtags} />
      </div>
    </div>
  )
}

export default page