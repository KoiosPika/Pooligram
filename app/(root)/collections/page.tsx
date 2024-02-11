import SearchCollections from '@/components/shared/SearchCollections'
import { Button } from '@/components/ui/button'
import { getAllCollections } from '@/lib/actions/collectionGroup.actions'
import { ICollectionGroup } from '@/lib/database/models/collectionGroup.model'
import { timeUntil } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const collections = await getAllCollections();

    const now = new Date()

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-full flex flex-col max-w-[1000px] justify-center items-center bg-white'>
                <div className='my-3 justify-center items-center flex flex-col w-full'>
                    <div className='w-full my-3 px-3'>
                        <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2 justify-center items-center'>
                            <div className='w-full flex flex-row justify-end'>
                                <Link href={'/collections/mycollections'} className='bg-yellow-300 text-blue-800 hover:bg-yellow-300 p-2 rounded-lg'>
                                    <p className='font-semibold'>Go to My Collections</p>
                                </Link>
                            </div>
                            <SearchCollections />
                            <div className='flex flex-row items-center gap-2 mr-auto ml-3 my-2'>
                                <Image src={'/assets/icons/collection.svg'} alt='collection' height={30} width={30}/>
                                <p className='text-white text-[18px] font-semibold'>Collections for you</p>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-2'>
                                {collections && collections.map((collection: ICollectionGroup) => (
                                    <div className='flex flex-col bg-white rounded-lg broder-2 w-[300px]'>
                                        <div className='flex flex-row p-2 items-center gap-2 border-b-[2px] border-slate-300'>
                                            <Image className='w-8 h-8 rounded-full' src={collection.creator.photo} alt='user' height={100} width={100} />
                                            <p className='font-bold'>{collection.creator.username}</p>
                                        </div>
                                        <p className='p-2'>{collection.title}</p>
                                        <div className='relative h-[300px] w-[300px] bg-slate-200'>
                                            <Link href={`/collections/${collection._id}`} className='flex h-[300px] justify-center items-center overflow-hidden bg-slate-300'>
                                                <Image src={collection?.imageUrl || '/assets/images/loading.png'} alt='hero' width={500} height={500} className='h-[300px] w-[300px]' />
                                            </Link>
                                            <div className='absolute top-2 left-2 text-red-500 bg-white border-2 border-red-500 font-semibold p-1 rounded-lg'>{timeUntil(collection.endDateTime.toString(), now.toISOString())}</div>
                                        </div>
                                        <p className='p-2 truncate text-[13px]'>{collection.description}</p>
                                        <div className='flex flex-row'>
                                            <p className='bg-blue-500 text-yellow-300 font-semibold flex flex-1 justify-center text-center py-2 rounded-bl-lg'>Votes: {(collection.nofVotes).toLocaleString()}</p>
                                            <p className='bg-yellow-300 text-blue-600 font-semibold flex flex-1 justify-center text-center py-2 rounded-br-lg'>Poll: {collection.nofPolls}</p>
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