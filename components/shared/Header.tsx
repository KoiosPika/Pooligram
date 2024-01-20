import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import { Button } from '../ui/button'
import MobileNav from './MobileNav'
import Search from './Search'

const Header = () => {
  return (
    <header className='w-full h-20 border-b bg-blue-800'>
      <div className='wrapper flex items-center justify-between lg:justify-around'>
        <MobileNav />
        <Link href={'/'}>
          <Image className='rounded-full' src={'/assets/images/logo_header.png'} alt='logo' height={45} width={45} />
        </Link>

        <nav className='lg:flex-between hidden w-full max-w-xs'>
          <NavItems />
        </nav>

        <div className='flex justify-end'>
          <SignedIn>
            <div className='border-2 border-white rounded-full'>
              <UserButton afterSignOutUrl='/' />
            </div>
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-md bg-white hover:bg-yellow-300' size={'icon'}>
              <Link href={'/sign-in'}>
                <Image src={'/assets/icons/login.svg'} alt='sigin' width={20} height={20} />
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header