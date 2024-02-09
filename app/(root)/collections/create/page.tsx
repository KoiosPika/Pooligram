import CollectionForm from '@/components/shared/CollectionForm'
import { auth } from '@clerk/nextjs';
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
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <div className='flex flex-col w-full bg-white rounded-xl p-2 justify-center items-center'>
                            <CollectionForm dates={dates} userId={userId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page