import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { updateReport } from '@/lib/actions/report.actions'

const ReportMenu = ({ id }: { id: string }) => {
    const handleReport = async () => {
        await updateReport(id)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='bg-white h-[25px] w-[25px] rounded-full justify-center items-center flex'>
                    <Image src={'/assets/icons/exclamation.svg'} alt='exc' height={20} width={20} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[100px] mr-[90px] sm:mr-[120px] md:mr-[120px]">
                <DropdownMenuItem onClick={handleReport}>
                    <p className='text-red-600 font-semibold'>Report Poll</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ReportMenu