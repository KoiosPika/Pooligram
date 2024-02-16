'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import Image from "next/image"
import { Input } from "../ui/input"
import { useState } from "react"
import { createCollectionItem } from "@/lib/actions/collectionItem.actions"

const CollectionDialog = ({ pollId, userId }: { pollId: string, userId: string }) => {

    const [collectionID, setCollectionID] = useState('')
    const NewCollectionItem = async () => {
        await createCollectionItem({ userId, pollId, collectionGroupId: collectionID })
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className='bg-blue-600 flex flex-row items-center gap-2 hover:bg-blue-600'>
                    <Image src={'/assets/icons/square-plus-solid.svg'} alt='live' height={20} width={20} />
                    <p>Add to collection</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-800 border-0">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white">Add to collection</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black">X</AlertDialogCancel>
                    </AlertDialogTitle>
                    <Input placeholder="Collection Code" value={collectionID} onChange={(e) => setCollectionID(e.target.value)} className="border-[1px] border-black" />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-blue-600 text-yellow-300" onClick={NewCollectionItem}>Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CollectionDialog