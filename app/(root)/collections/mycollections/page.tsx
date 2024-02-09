import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const page = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5];
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full flex flex-col max-w-[1000px] justify-center items-center bg-white'>
        <div className='my-3 justify-center items-center flex flex-col w-full'>
          <div className='w-full my-3 px-3'>
            <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2 justify-center items-center'>
              <div className='flex flex-row p-2 items-center gap-2 my-2'>
                <Image src={'/assets/icons/collection.svg'} alt='collection' width={50} height={50} />
                <p className='text-[20px] font-semibold text-white'>My Collections</p>
              </div>
              <div className='w-full flex flex-row justify-center'>
                <Link href={'/collections/create'} className='bg-yellow-300 text-blue-800 hover:bg-yellow-300 p-2 rounded-lg'>
                  <p className='font-semibold'>+ Create new collection</p>
                </Link>
              </div>
              <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-2'>
                {data.map((item) => (
                  <div className='flex flex-col bg-white rounded-lg broder-2'>
                    <div className='flex flex-row p-2 items-center gap-2'>
                      <Image src={'/assets/images/user.png'} alt='user' height={30} width={30} />
                      <p className='font-bold'>username</p>
                    </div>
                    <p className='ml-2'>Title here</p>
                    <div className='relative'>
                      <Image src={'/assets/images/Job.png'} alt='hero' height={300} width={350} className='w-full' />
                      <div className='absolute top-2 left-2 text-red-500 bg-white border-2 border-red-500 font-semibold p-1 rounded-lg'>Ends in 8 days</div>
                    </div>
                    <p className='p-2 truncate text-[13px]'>Only football related content!!</p>
                    <div className='flex flex-row'>
                      <p className='bg-blue-500 text-yellow-300 font-semibold flex flex-1 justify-center text-center py-2 rounded-bl-lg'>Votes: +2,000</p>
                      <p className='bg-yellow-300 text-blue-600 font-semibold flex flex-1 justify-center text-center py-2 rounded-br-lg'>Poll: 80/100</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page