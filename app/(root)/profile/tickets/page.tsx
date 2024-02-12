import Checkout from '@/components/shared/Checkout';
import Selection from '@/components/shared/Selection';
import { Button } from '@/components/ui/button';
import { getOrdersById } from '@/lib/actions/order.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { formatDate, getLevelColor, getNextLevelPoints } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async () => {

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUserById(userId);

  const orders = await getOrdersById(userId)

  const points = user.points;

  const upper = getNextLevelPoints(points)

  const lower = upper - 500;

  const earned = ((points - lower) / 500) * 100

  const color = getLevelColor(user.level)

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full flex flex-col max-w-[900px] justify-center items-center bg-white'>
        <div className='my-3 justify-center items-center flex flex-col w-full'>
          <div className='w-full my-3 px-3'>
            <ul className='flex flex-col w-full bg-blue-800 rounded-xl p-2'>
              <div className='flex flex-col bg-white m-3 rounded-lg p-2'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <div className='relative flex items-center justify-center' style={{ height: '65px', width: '65px' }}>
                    <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={60} width={60} />
                    <p className='font-bold text-white absolute z-10 text-[20px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{user.level}</p>
                  </div>
                  <p className='text-[20px] font-bold'>You need {(upper - points).toLocaleString()} Points to reach next level!</p>
                </div>
                <div className='flex flex-col w-full'>
                  <p className='ml-auto font-bold text-gray-500 mb-1 text-[20px]'>{points.toLocaleString()} / {upper.toLocaleString()}</p>
                  <div className='flex w-full rounded-full h-3 bg-green-400'>
                    <div className='flex bg-green-700 rounded-full' style={{ width: `${earned}%` }}></div>
                  </div>
                </div>
                <div className='flex flex-row mt-2 items-center gap-1'>
                  <Image src={'/assets/icons/info.svg'} alt='info' height={16} width={16} />
                  <p>You can earn points by voting on polls</p>
                </div>
              </div>
              <div className='w-full flex justify-center items-center gap-3 px-4'>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/profile/polls'}>
                    <p>My Polls</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-b-4 border-b-blue-600 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/profile/votes'}>
                    <p>My Votes</p>
                  </Link>
                </Button>
                <Button className='w-1/3 h-[50px] rounded-sm bg-blue-600 border-[3px] border-yellow-400 hover:bg-blue-600'>
                  <Link className='w-full h-full flex justify-center items-center' href={'/profile/tickets'}>
                    <p className='text-yellow-300'>My Tickets</p>
                  </Link>
                </Button>
              </div>
              <div className='w-full my-3 p-3'>
                <div className='flex flex-row items-center gap-2 mb-3'>
                  <Image src={'/assets/icons/balance.svg'} alt='balance' height={32} width={32} />
                  <p className='text-white text-[20px] font-semibold'>Your Tickets</p>
                </div>
                <div className='w-full flex-row flex justify-center'>
                  <div className='bg-green-600 text-white border-green-100 border-4 flex flex-row items-center p-1 rounded-lg'>
                    <p className=' p-1 rounded-md font-semibold text-[35px] text-center px-3'>{(user.tickets).toLocaleString()} x</p>
                    <Image className='h-13 w-9' src={'/assets/images/ticket-1.png'} alt='ticket' height={100} width={100} />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-5 mb-3'>
                  <Image src={'/assets/icons/recharge.svg'} alt='balance' height={30} width={30} />
                  <p className='text-white text-[20px] font-semibold'>Recharge with one click!</p>
                </div>
                <div className='grid w-full gap-3 grid-cols-2'>
                  <Checkout userId={userId} amount={1.99} tickets={8} />
                  <Checkout userId={userId} amount={3.99} tickets={15} />
                  <Checkout userId={userId} amount={6.99} tickets={26} />
                  <Checkout userId={userId} amount={9.99} tickets={40} />
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
            </ul>
          </div>
        </div>
        <div className='flex flex-row gap-1 items-center my-3 mr-auto ml-3'>
          <Image src={'/assets/icons/poll-2.svg'} alt='poll' height={29} width={29} />
          <p className='font-bold text-[20px]'>More Polls For You:</p>
        </div>
        <Selection userHashtags={user.hashtags} postHashtags={['']} hiddenPolls={user.hiddenPolls} />
      </div>
    </div>

  )
}

export default page