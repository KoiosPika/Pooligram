import Checkout from '@/components/shared/Checkout';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import React from 'react'

const page = async () => {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUserById(userId);
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full flex flex-col max-w-[700px] justify-center items-center bg-white'>
        <div className='mt-3'>
          <p className='bg-green-200 text-green-800 p-1 rounded-md font-semibold ml-1 text-[35px]'>${(user.balance).toFixed(2)}</p>
          <Checkout userId={userId} amount={5}/>
        </div>
        <div className='my-3 justify-center items-center flex flex-col w-full'>
          <div className='w-full my-3 px-3'>
            <ul className='flex flex-col w-full bg-blue-800 rounded-xl p-1'>

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page