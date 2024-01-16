import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t bg-slate-50'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href={'/'}>
          <Image
          src="/assets/images/logo_header.png"
          alt="logo"
          width={50}
          height={50}
          />
        </Link>
        <p>2023 Pooligram. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer