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
    <header className='w-full h-20 border-b bg-slate-50'>
      <div className='wrapper flex items-center justify-between lg:justify-around'>
        <MobileNav />
        <Link href={'/'}>
          <Image src={'/assets/images/logo_header.png'} alt='logo' height={50} width={50} />
        </Link>

        <nav className='lg:flex-between hidden w-full max-w-xs'>
          <NavItems />
        </nav>

        <div className='flex justify-end'>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
          <SignedOut>
            <Button asChild className='rounded-md bg-black hover:bg-slate-400' size={'icon'}>
              <Link href={'/sign-in'}>
                <Image src={'/assets/icons/login.svg'} alt='sigin' width={20} height={20}/>
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header