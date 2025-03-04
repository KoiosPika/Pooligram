import Search from '@/components/shared/Search'
import Selection from '@/components/shared/Selection'
import { getUserDataById } from '@/lib/actions/userData.actions'
import { SearchParamsProps } from '@/types'
import { SignedIn, SignedOut, auth } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const page = async ({ searchParams }: SearchParamsProps) => {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUserDataById(userId)

  const userHashtags = user?.hashtags

  const searchText = (searchParams?.query as string) || ''


  return (
    <div className='w-full flex justify-center bg-white'>
      <div className='flex-col flex w-full mx-[5px] justify-center items-center md:max-w-[700px] xl:max-w-[1000px]'>
        {/* <div className='w-full flex justify-center h-[70px] items-center'>
          <div className='bg-slate-400 w-full max-w-[800px] h-[70px] m-2'></div>
        </div> */}
        <div className='flex flex-row justify-center items-center w-full'>
          <Search />
        </div>
        <div className='flex flex-col justify-center items-center w-full'>
          <SignedIn>
            <Selection postHashtags={['']} userHashtags={userHashtags} query={searchText} hiddenPolls={user?.hiddenPolls} />
          </SignedIn>
          <SignedOut>
            <Selection postHashtags={['']} userHashtags={['']} query={searchText} hiddenPolls={['65b6d95073cc0d9878d9c560']} />
          </SignedOut>
        </div>
      </div>
    </div>
  )
}

export default page