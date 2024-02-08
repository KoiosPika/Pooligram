import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { updateReport } from '@/lib/actions/report.actions'

const ReportMenu = ({ id, userId }: { id: string, userId: string }) => {
    const handleReport = async () => {
        await updateReport({ id, userId })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='bg-white h-[25px] w-[25px] rounded-full justify-center items-center flex'>
                    <Image src={'/assets/icons/dots.svg'} alt='exc' height={5} width={5} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[100px] mr-[90px] sm:mr-[120px] md:mr-[120px]">
                <DropdownMenuItem onClick={handleReport} className='flex flex-row items-center gap-1 hover:bg-slate-300 cursor-pointer'>
                    <Image src={'/assets/icons/link-blue.svg'} alt='exc' height={15} width={15} />
                    <p className='text-blue-600 font-semibold'>Copy Link</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleReport} className='flex flex-row items-center gap-1 hover:bg-slate-300 cursor-pointer'>
                    <Image src={'/assets/icons/exclamation.svg'} alt='exc' height={15} width={15} />
                    <p className='text-red-600 font-semibold'>Report Poll</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ReportMenu