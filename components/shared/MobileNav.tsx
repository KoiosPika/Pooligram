import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import NavItems from './NavItems'
import Image from 'next/image'
import { Separator } from '../ui/separator'

const MobileNav = () => {
  return (
    <nav className='lg:hidden'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <Image
            src={'/assets/icons/bars-solid.svg'}
            alt='menu'
            width={24}
            height={24}
            className='cursor-pointer ml-2' />

        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-blue-800 lg:hidden' side={'left'}>
          <div className='flex flex-row items-center'>
            <Image
              className='rounded-full'
              src={'/assets/images/logo_header.png'}
              alt='logo'
              width={50}
              height={50}
            />
            <p className='font-semibold text-[18px] ml-2 text-white'>Main Menu</p>
          </div>
          <Separator className='border border-white' />
          <NavItems />
        </SheetContent>
      </Sheet>

    </nav>
  )
}

export default MobileNav