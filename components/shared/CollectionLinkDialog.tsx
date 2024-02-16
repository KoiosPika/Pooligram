'use client'

import React, { useState } from 'react'
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
import { Button } from '../ui/button'
import Image from 'next/image'
import QRCode from 'qrcode.react';

const CollectionLinkDialog = ({ link, id }: { link: string, id: string }) => {

    const [url, setUrl] = useState(link);
    const [showQR, setShowQR] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const copyToClipboard = async (toCopy: string, type: 'url' | 'id') => {
        try {
            await navigator.clipboard.writeText(toCopy);
            setCopied(type); // Set to either 'url' or 'id'
            setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy.');
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className='bg-green-500 flex flex-row items-center gap-1 hover:bg-green-500 w-full'>
                    <Image src={'/assets/icons/link.svg'} alt='live' height={20} width={20} />
                    <p>Copy</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-800 border-0 rounded-xl min-w-7/8">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex flex-row items-center justify-between">
                        <p className="text-white">Copy</p>
                        <AlertDialogCancel className="rounded-full bg-white text-black w-3 h-8">X</AlertDialogCancel>
                    </AlertDialogTitle>
                    <div className="flex flex-col items-center w-full justify-center">
                        <div className="relative w-full bg-gray-200 rounded-lg flex border-2 border-white">
                            <div className="relative w-full bg-gray-200 rounded-full flex">
                                <button
                                    onClick={() => setShowQR(false)}
                                    className={`z-10 w-1/2 rounded-lg font-semibold py-2 ${!showQR ? 'bg-blue-500 text-white' : 'text-gray-800'} transition-colors duration-300`}
                                >
                                    Link & Code
                                </button>
                                <button
                                    onClick={() => setShowQR(true)}
                                    className={`z-10 w-1/2 rounded-lg font-semibold py-2 ${showQR ? 'bg-blue-500 text-white' : 'text-gray-800'} transition-colors duration-300`}
                                >
                                    QR Code
                                </button>
                                <div className={`absolute left-0 bg-blue-500 rounded-full w-1/2 h-full transition-transform duration-300 ${showQR ? 'transform translate-x-full' : ''} z-0`}></div>
                            </div>
                            <div className={`absolute left-0 bg-blue-500 rounded-full w-1/2 h-full transition-transform duration-300 ${showQR ? 'transform translate-x-full' : ''}`}></div>
                        </div>
                        <div className="mt-4">
                            {showQR ? (
                                <QRCode value={url} size={200} />
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    <div className='w-full'>
                                        <p className='text-white font-semibold'>Link:</p>
                                    </div>
                                    <div className="flex items-center border-2 border-white rounded-lg">
                                        <span className="break-all bg-blue-500 py-2 px-3 max-w-[250px] truncate rounded-l-lg text-white">{url}</span>
                                        <button
                                            onClick={() => copyToClipboard(url, 'url')}
                                            className="px-2 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-150 rounded-r-lg"
                                        >
                                            {copied === 'url' ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-white font-semibold'>Code:</p>
                                    </div>
                                    <div className="flex items-center border-2 border-white rounded-lg max-w-[350px]">
                                        <span className="break-all bg-blue-500 py-2 px-3 truncate rounded-l-lg text-white flex-1">{id}</span>
                                        <button
                                            onClick={() => copyToClipboard(id, 'id')}
                                            className="px-2 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-150 rounded-r-lg"
                                        >
                                            {copied === 'id' ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className='w-full justify-center items-center'>
                    <AlertDialogCancel className="rounded-lg bg-white text-black w-1/2">Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CollectionLinkDialog