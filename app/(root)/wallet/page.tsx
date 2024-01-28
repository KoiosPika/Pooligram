import Checkout from '@/components/shared/Checkout';
import Selection from '@/components/shared/Selection';
import { getOrdersById } from '@/lib/actions/order.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { formatDate } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const page = async () => {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUserById(userId);

  const orders = await getOrdersById(userId)

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='w-full flex flex-col max-w-[700px] justify-center items-center p-3'>
        <div className='my-3 justify-center items-center flex flex-col w-full bg-blue-800 rounded-lg'>
          <div className='w-full my-3 p-3'>
            <div className='flex flex-row items-center gap-2 mb-3'>
              <Image src={'/assets/icons/balance.svg'} alt='balance' height={32} width={32} />
              <p className='text-white text-[20px] font-semibold'>Current Balance</p>
            </div>
            <div className='w-full flex-row flex justify-center'>
              <p className='bg-green-100 text-green-800 p-1 rounded-md font-semibold text-[35px] text-center border-4 border-green-800 px-8'>${(user.balance).toFixed(2)}</p>
            </div>
            <div className='flex flex-row items-center gap-2 mt-5 mb-3'>
              <Image src={'/assets/icons/recharge.svg'} alt='balance' height={30} width={30} />
              <p className='text-white text-[20px] font-semibold'>Recharge with one click!</p>
            </div>
            <div className='grid w-full gap-3 grid-cols-2'>
              <Checkout userId={userId} amount={1.99} />
              <Checkout userId={userId} amount={3.99} />
              <Checkout userId={userId} amount={6.99} />
              <Checkout userId={userId} amount={9.99} />
            </div>
            <div className='flex flex-row items-center gap-2 mt-5 mb-3'>
              <Image src={'/assets/icons/receipt.svg'} alt='balance' height={30} width={30} />
              <p className='text-white text-[20px] font-semibold'>Past Orders</p>
            </div>
            {orders && orders.length > 0 &&
              <div className='bg-slate-100 mt-3 rounded-md'>
                <table className='min-w-full w-full'>
                  <thead>
                    <tr className='border-b-2 border-grey-600'>
                      <th className='font-bold px-5 py-2 w-1/2 text-center'>Order Date</th>
                      <th className='font-bold px-5 py-2 w-1/2 text-center'>Order Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders && orders.map((order: IOrder) => (
                      <tr key={order._id} className='border-b border-grey-300'>
                        <td className='px-5 py-2 text-[16px] w-1/2 text-center font-semibold'>{formatDate(order.createdAt)}</td>
                        <td className='px-5 py-2 text-[16px] text-center w-1/2 font-semibold'>${(order.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>}
            {orders.length == 0 &&
              <div className='w-full flex justify-center items-center'>
                <p className='text-white text-[18px]'>You don't have any orders yet!</p>
              </div>
            }
          </div>
        </div>
      </div>
      <div className='w-full lg:w-2/3 p-2'>
        <div className='flex flex-row gap-1 items-center my-3'>
          <Image src={'/assets/icons/poll-2.svg'} alt='poll' height={29} width={29} />
          <p className='font-bold text-[20px]'>More Polls For You:</p>
        </div>
        <Selection userHashtags={user.hashtags} postHashtags={['']}/>
      </div>
    </div>
  )
}

export default page