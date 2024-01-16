import Search from '@/components/shared/Search'
import Selection from '@/components/shared/Selection'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex justify-center bg-slate-100'>
      <div className='flex-col flex w-full max-w-[1000px] mx-[50px]'>
        <div className='flex flex-row justify-center items-center'>
          <Search />
        </div>
        <div className='flex flex-row'>
          <p className='text-[20px] font-semibold my-5 ml-5 mr-2'>Popular Polls</p>
          <Image src={'/assets/icons/trend-solid.svg'} alt='trend' height={30} width={30} />
        </div>
        <Selection />
      </div>
    </div>
  )
}

export default page