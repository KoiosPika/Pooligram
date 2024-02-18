import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

type ProfileMenu = {
    title: string,
    href: string,
    active: string
}

const ProfileMenuButton = ({ title, href, active }: ProfileMenu) => {

    const isActive = active === title;

    const activeClasses = isActive
        ? 'border-[3px] border-yellow-400 text-yellow-300'
        : 'border-b-4 border-b-blue-600';

    return (
        <Button className={`w-full h-[40px] rounded-sm bg-blue-600 ${activeClasses} hover:bg-blue-600`}>
            <Link className='w-full h-full flex justify-center items-center' href={href}>
                <p className={`text-[14px] md:text-[17px] ${isActive ? 'text-yellow-300' : ''}`}>
                    {title}
                </p>
            </Link>
        </Button>
    )
}

export default ProfileMenuButton