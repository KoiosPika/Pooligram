import React, { useEffect, useState } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button'
import Image from 'next/image'
import { getCollectionsByPoll } from '@/lib/actions/collectionItem.actions'
import { ICollectionItem } from '@/lib/database/models/collectionItem.model'
import { ScrollArea } from '../ui/scroll-area'
import Link from 'next/link'

const MobileCollections = ({ pollId }: { pollId: string }) => {
    const [open, setOpen] = React.useState(false)

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
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className='flex flex-row items-center gap-1 bg-blue-800 hover:bg-blue-800'>
                    <Image src={'/assets/icons/collection.svg'} alt='comment' height={20} width={20} />
                    <p className='text-white text-[12px]'>Collections</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent className='bg-blue-800 h-5/6'>
                <DrawerHeader>
                    <DrawerTitle>
                        <p className='text-white'>Collections</p>
                    </DrawerTitle>
                </DrawerHeader>
                {Collections.length > 0 &&
                    <ScrollArea className='flex flex-1 px-3 h-0'>
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
                    <div className='flex justify-center items-center flex-1 px-3 h-0'>
                        <p className='text-white text-[17px]'>No Collections yet</p>
                    </div>}
            </DrawerContent>
        </Drawer>
    )
}

export default MobileCollections