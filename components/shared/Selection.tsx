import React from 'react'
import { Polls } from '@/constants'
import Card from './Card'

const Selection = () => {
    return (
        <>{Polls.length > 0 ? (
            <div className='flex flex-col items-center gap-10'>
                <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                    {Polls.map((poll) => {
                        return (
                            <li className='flex justify-center overflow-hidden'>
                                <Card poll={poll}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        ) : (
            <></>
        )}</>
    )
}

export default Selection