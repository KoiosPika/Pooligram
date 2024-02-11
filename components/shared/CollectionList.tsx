import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ScrollArea } from '../ui/scroll-area'
import { ICollectionGroup } from '@/lib/database/models/collectionGroup.model'
import { getCollectionsByPoll } from '@/lib/actions/collectionItem.actions'
import { ICollectionItem } from '@/lib/database/models/collectionItem.model'
import Link from 'next/link'

type CollectionListParams = {
    height: number,
    pollId: string
}

const CollectionList = ({ height, pollId }: CollectionListParams) => {

    useEffect(() => {
        const getCollections = async () => {
            const collections = await getCollectionsByPoll(pollId);
            setCollections(collections);

            console.log(collections)
        }

        getCollections()
    }, [])

    const [Collections, setCollections] = useState<ICollectionItem[]>([]);
    return (
        <div className='bg-blue-800 my-5 h-0 rounded-tl-lg rounded-bl-lg mr-0.5' style={{ height }}>
            <div className='w-full flex flex-row p-3 items-center rounded-lg'>
                <p className='text-[18px] font-semibold text-white'>Collections</p>
            </div>
            {Collections.length > 0 &&
                <ScrollArea style={{ height: height - 110 }} className='flex flex-1 px-3 h-0'>
                    {Collections.map((collection) => (
                        <div className='flex flex-col p-2 bg-white mb-3 rounded-xl'>
                            <div className='flex flex-row'>
                                <Link href={`/collections/${collection.collectionGroup._id}`}>
                                    <Image className='rounded-lg' src={collection.collectionGroup.imageUrl} alt='hero' height={100} width={100} />
                                </Link>
                                <div className='ml-2 flex flex-col gap-1'>
                                    <p className='font-semibold truncate bg-slate-400 text-white py-1 px-3 rounded-lg'>{collection.collectionGroup.title}</p>
                                    <p className='font-semibold bg-blue-400 text-blue-800 py-1 px-3 rounded-lg'>Polls: {collection.collectionGroup.nofPolls}</p>
                                    <p className='font-semibold bg-green-300 text-green-800 py-1 px-3 rounded-lg'>Votes: {collection.collectionGroup.nofVotes.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>}
            {Collections.length <= 0 &&
                <div style={{ height: height - 110 }} className='flex justify-center items-center flex-1 px-3 h-0'>
                    <p className='text-white text-[17px]'>No Collections yet</p>
                </div>}
        </div>
    )
}

export default CollectionList