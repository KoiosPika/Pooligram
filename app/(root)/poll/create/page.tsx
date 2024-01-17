import PollForm from '@/components/shared/PollForm'
import React from 'react'

const page = () => {
  return (
    <>
      <div className='w-full flex justify-center h-[70px] items-center bg-slate-100'>
        <div className='bg-slate-400 w-full max-w-[800px] h-[70px] m-2'></div>
      </div>
      {/* <div className='w-full flex justify-center items-center bg-slate-100 py-2'>
        <h3 className='text-[24px] font-semibold'>Create Poll</h3>
      </div> */}
      <div className="flex bg-slate-100 justify-center items-center py-5">
        <PollForm />
      </div>
    </>
  )
}

export default page