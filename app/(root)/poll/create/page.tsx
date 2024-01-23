import PollForm from '@/components/shared/PollForm'
import { auth } from '@clerk/nextjs'
import React from 'react'

const page = () => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const Today = new Date();
  const MaxDate = new Date(Today);
  const MinDate = new Date(Today);
  const PollMax = new Date(Today);
  const SponsoredDate = new Date(Today);
  PollMax.setDate(Today.getDate() + 5)
  MinDate.setDate(Today.getDate() + 5);
  MaxDate.setDate(Today.getDate() + 30);
  SponsoredDate.setDate(Today.getDate() + 1);

  const dates = {
    Today,
    MaxDate,
    MinDate,
    SponsoredDate,
  }

  return (
    <>
      {/* <div className='w-full flex justify-center h-[70px] items-center bg-blue-600'>
        <div className='bg-slate-400 w-full max-w-[800px] h-[70px] m-2'></div>
      </div> */}
      {/* <div className='w-full flex justify-center items-center bg-slate-100 py-2'>
        <h3 className='text-[24px] font-semibold'>Create Poll</h3>
      </div> */}
      <div className="flex bg-white justify-center items-center py-5">
        <PollForm userId={userId} dates={dates} />
      </div>
    </>
  )
}

export default page