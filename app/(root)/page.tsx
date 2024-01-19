import Search from '@/components/shared/Search'
import Selection from '@/components/shared/Selection'
import { getUserById } from '@/lib/actions/user.actions'
import { SignedIn, SignedOut, auth } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const page = async () => {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUserById(userId)
  const userHashtags = user?.hashtags


  return (
    <div className='w-full flex justify-center bg-white'>
      <div className='flex-col flex w-full max-w-[1000px] mx-[5px]'>
        {/* <div className='w-full flex justify-center h-[70px] items-center'>
          <div className='bg-slate-400 w-full max-w-[800px] h-[70px] m-2'></div>
        </div> */}
        <div className='flex flex-row justify-center items-center'>
          <Search />
        </div>
        <div className='flex flex-row'>
          <p className='text-[20px] font-semibold my-5 ml-5 mr-2'>Popular Polls</p>
          <Image src={'/assets/icons/trend-solid.svg'} alt='trend' height={30} width={30} />
        </div>
        <SignedIn>
          <Selection postHashtags={['']} userHashtags={userHashtags} />
        </SignedIn>
        <SignedOut>
          <Selection postHashtags={['']} userHashtags={['']} />
        </SignedOut>
      </div>
    </div>
  )
}

export default page