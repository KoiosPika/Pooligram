import { getCollectionItemsByCollection } from '@/lib/actions/collectionItem.actions'
import { ICollectionItem } from '@/lib/database/models/collectionItem.model'
import { IPoll } from '@/lib/database/models/poll.model'
import { getLevelColor } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {

  const polls = await getCollectionItemsByCollection(id)

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full flex flex-col max-w-[1000px] justify-center items-center bg-white'>
        <div className='my-3 justify-center items-center flex flex-col w-full'>
          <div className='w-full my-3 px-3'>
            <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2 justify-center items-center'>
              <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                {polls && polls.map((item: ICollectionItem) => {
                  const color = getLevelColor(item.creator.level)
                  return (
                    <li key={item._id} className='flex justify-center overflow-hidden'>
                      <div className='flex flex-col min-h-[360px] bg-yellow-800 w-[350px] rounded-xl mx-1'>
                        <Link href={`/poll/${item.poll._id}`} className='flex flex-center h-[250px] bg-slate-300 text-grey-500 rounded-t-lg'>
                          <Image src={item.poll.imageUrl} alt='hero' height={400} width={400} className='w-[350px] h-[300px] overflow-hidden' />
                        </Link>
                        <div className='flex-1 w-full p-2 flex flex-col justify-between bg-white border-white border-t-2 rounded-b-lg'>
                          <p className='truncate-2-lines text-black text-[14px] font-semibold'>{item.poll.title}</p>
                          <div className='flex flex-row items-center'>
                            <Image src={item.creator.photo || '/assets/images/user.png'} alt='user' className='w-[35px] h-[35px] rounded-full border-2 border-white' height={100} width={100} />
                            <p className='ml-2 font-semibold text-black text-[17px]'>{item.creator.username}</p>
                            <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                              <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                              <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{item.creator.level}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page