import CollectionLinkDialog from '@/components/shared/CollectionLinkDialog'
import Selection from '@/components/shared/Selection'
import { Button } from '@/components/ui/button'
import { getCollectionById } from '@/lib/actions/collectionGroup.actions'
import { getCollectionItemsByCollection } from '@/lib/actions/collectionItem.actions'
import { getUserDataById } from '@/lib/actions/userData.actions'
import { ICollectionGroup } from '@/lib/database/models/collectionGroup.model'
import { ICollectionItem } from '@/lib/database/models/collectionItem.model'
import { IPoll } from '@/lib/database/models/poll.model'
import { getLevelColor } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ params: { id } }: { params: { id: string } }) => {

  const polls = await getCollectionItemsByCollection(id)

  const collectionGroup: ICollectionGroup = await getCollectionById(id);

  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUserDataById(userId)

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-full flex flex-col max-w-[1000px] justify-center items-center bg-white'>
        <div className='my-3 justify-center items-center flex flex-col w-full'>
          <div className='w-full my-3 px-3'>
            <div className='flex flex-col w-full bg-blue-800 rounded-xl p-2 justify-center items-center'>
              <div className='flex flex-row w-full md:w-3/4 bg-white rounded-lg p-2 mb-3'>
                <Image src={collectionGroup.imageUrl} alt='hero' className='h-[120px] w-[120px] md:h-[150px] md:w-[150px] rounded-lg' height={200} width={200} />
                <div className='mx-2 flex flex-col overflow-hidden mr-5 gap-1 w-full'>
                  <p className='text-[12px] md:text-[18px] font-semibold py-1 px-3 bg-red-300 text-red-700 rounded-lg truncate'>{collectionGroup.title}</p>
                  <p className='text-[12px] md:text-[18px] font-semibold py-1 px-3 bg-yellow-300 text-yellow-700 rounded-lg truncate'>Polls: {collectionGroup.nofPolls}</p>
                  <p className='text-[12px] md:text-[18px] font-semibold py-1 px-3 bg-blue-300 text-blue-700 rounded-lg truncate'>Votes: {collectionGroup.nofVotes.toLocaleString()}</p>
                  <div className='flex flex-row items-center'>
                    <Image src={collectionGroup.creator.photo} alt='photo' height={50} width={50} className='h-[25px] w-[25px] md:h-[30px] md:w-[30px] rounded-full' />
                    <p className='font-semibold text-[13px] md:text-[16px] ml-1'>{collectionGroup.creator.username}</p>
                    <div className='ml-auto'>
                      <CollectionLinkDialog link={`pooligram.vercel.app/collections/${collectionGroup._id}`} id={collectionGroup._id} />
                    </div>
                  </div>
                </div>
              </div>
              <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                {polls && polls.map((item: ICollectionItem) => {
                  const color = getLevelColor(item.creator.UserData.level)
                  return (
                    <li key={item._id} className='flex justify-center overflow-hidden'>
                      <div className='flex flex-col min-h-[350px] bg-yellow-800 w-[350px] mx-1 rounded-lg'>
                        <Link href={`/poll/${item.poll._id}`} className='flex flex-center h-[250px] bg-slate-300 rounded-t-lg'>
                          <Image src={item.poll.imageUrl} alt='hero' height={400} width={400} className='w-[350px] h-[250px] overflow-hidden rounded-t-lg' />
                        </Link>
                        <div className='flex-1 w-full p-2 flex flex-col justify-between bg-white border-white border-t-2 rounded-b-lg'>
                          <p className='truncate-2-lines text-black text-[14px] font-semibold'>{item.poll.title}</p>
                          <div className='flex flex-row items-center'>
                            <Image src={item.creator.photo || '/assets/images/user.png'} alt='user' className='w-[35px] h-[35px] rounded-full border-2 border-white' height={100} width={100} />
                            <p className='ml-2 font-semibold text-black text-[17px]'>{item.creator.username}</p>
                            <div className='relative flex items-center justify-center' style={{ height: '40px', width: '40px' }}>
                              <Image className='ml-1' src={`/assets/levels/level_${color}.svg`} alt='verified' height={32} width={32} />
                              <p className='font-bold text-white absolute z-10 text-[13.5px] flex items-center justify-center' style={{ top: '50%', left: '52%', transform: 'translate(-50%, -50%)' }}>{item.creator.UserData.level}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              {polls.length === 0 &&
                <div className='flex flex-col w-full justify-center items-center'>
                  <p className='font-semibold text-white'>No Polls yet</p>
                  <Link className='bg-orange-600 rounded-xl text-white font-semibold px-4 py-1 mt-2' href={'/profile/polls'}>
                    + Add Polls
                  </Link>
                </div>}
            </div>
            <div className='flex flex-col w-full justify-center items-center my-3'>
              <Selection postHashtags={['']} userHashtags={user.hashtags} query='' hiddenPolls={user.hiddenPolls} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page