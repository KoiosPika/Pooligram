'use client'

import { Links } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className='lg:flex-between flex w-full flex-col items-start gap-5 lg:flex-row'>
      {Links.map((link) => {
        const isActive = pathname === link.route
        return (
          <li
            key={link.route}
            className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}
          >
            <Image src={link.icon} alt='icon' height={25} width={25} className='mr-5 ml-2 lg:hidden'/>
            <Link className='text-[16px]' href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems