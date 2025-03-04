import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t bg-blue-800'>
      <div className='flex-center wrapper flex-between flex gap-4 p-5 text-center flex-row'>
        <Link href={'/'}>
          <Image
          src="/assets/images/logo_header.png"
          alt="logo"
          width={50}
          height={50}
          className='rounded-full'
          />
        </Link>
        <p className='text-white'>2024 Pooligram. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer