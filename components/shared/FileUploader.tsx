'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
    onFieldChange: (url: string) => void
    imageUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles)
        onFieldChange(convertFileToUrl(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
    })

    return (
        <div
            {...getRootProps()}
            className="flex-center items-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-whit w-full bg-slate-100 border-2 border-black">
            <input {...getInputProps()} className="cursor-pointer" />

            {imageUrl ? (
                <div className="flex h-full w-full flex-1 justify-center ">
                    <img
                        src={imageUrl}
                        alt="image"
                        width={250}
                        height={250}
                        className="w-full object-cover object-center"
                    />
                </div>
            ) : (
                <div className="flex-center flex-col py-5 text-grey-500">
                    <p className='my-3'>Select a Cover Photo</p>
                    <img src="/assets/icons/upload.svg" width={60} height={60} alt="file upload" />
                    <h3 className="mb-2 mt-2">Drag photo here</h3>
                    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                    <Button type="button" className="rounded-md bg-black">
                        Select from device
                    </Button>
                </div>
            )}
        </div>
    )
}