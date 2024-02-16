"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ICollectionGroup } from '@/lib/database/models/collectionGroup.model'
import { getAllCollections } from '@/lib/actions/collectionGroup.actions'
import { getLevelColor, timeUntil } from '@/lib/utils'
import Link from 'next/link'

type SelectionParams = {
    userHashtags: string[],
    query: string,
}

let page = 2;

const LoadMoreCollections = ({ userHashtags, query }: SelectionParams) => {
    const [collections, setCollections] = useState<ICollectionGroup[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(2); // Initialize page state

    const getCollections = async () => {
        setIsLoading(true);

        const newCollections = await getAllCollections({ userHashtags, page, query });
        console.log(newCollections);

        setCollections(prevCollections => [...prevCollections, ...newCollections]); // Append new collections
        setPage(prevPage => prevPage + 1);
        setIsLoading(false);
    };

    const handleClick = () => {
        if (!isLoading) {
            getCollections(); // Trigger loading more collections
        }
    };

    return (
        <>
            <section>
                <ul className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-2'>
                    {collections.map((collection, index) => {
                        const color = getLevelColor(collection.creator.UserData.level);
                        return (
                            <div key={index} className='flex flex-col bg-white rounded-lg w-[300px]'>
                                <div className='flex flex-col bg-white rounded-lg broder-2 w-[300px]'>
                                <div className='flex flex-row p-2 items-center gap-2 border-b-[2px] border-slate-300'>
                                    <Image className='w-8 h-8 rounded-full' src={collection.creator.photo} alt='user' height={100} width={100} />
                                    <p className='font-bold'>{collection.creator.username}</p>
                                    <div className='relative flex items-center justify-center ml-[-5px]' style={{ height: '40px', width: '40px' }}>
                                        <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                                        <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{collection.creator.UserData.level}</p>
                                    </div>
                                </div>
                                <p className='p-2 text-[14px]'>{collection.title}</p>
                                <div className='relative h-[300px] w-[300px] bg-slate-200'>
                                    <Link href={`/collections/${collection._id}`} className='flex h-[300px] justify-center items-center overflow-hidden bg-slate-300'>
                                        <Image src={collection?.imageUrl || '/assets/images/loading.png'} alt='hero' width={500} height={500} className='h-[300px] w-[300px]' />
                                    </Link>
                                </div>
                                <div className='flex flex-row'>
                                    <p className='bg-blue-500 text-yellow-300 font-semibold flex flex-1 justify-center text-center py-2 rounded-bl-lg'>Votes: {(collection.nofVotes).toLocaleString()}</p>
                                    <p className='bg-yellow-300 text-blue-600 font-semibold flex flex-1 justify-center text-center py-2 rounded-br-lg'>Poll: {collection.nofPolls}</p>
                                </div>
                            </div>
                            </div>
                        );
                    })}
                </ul>
            </section>
            <section className="flex justify-center items-center w-full">
                <div className='bg-orange-600 text-white px-3 py-1 rounded-md cursor-pointer' onClick={handleClick}>
                    {isLoading ? 'Loading...' : 'Load More'}
                </div>
            </section>
        </>
    );
};

export default LoadMoreCollections