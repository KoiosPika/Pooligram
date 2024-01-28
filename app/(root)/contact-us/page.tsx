import ContactFrom from "@/components/shared/ContactFrom"
import Selection from "@/components/shared/Selection";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const page = async () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUserById(userId)

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ContactFrom />
      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center">
        <div className='flex flex-row gap-1 items-center my-3 mr-auto ml-3'>
          <Image src={'/assets/icons/poll-2.svg'} alt='poll' height={29} width={29} />
          <p className='font-bold text-[20px]'>More Polls For You:</p>
        </div>
        <Selection userHashtags={user.hashtags} postHashtags={['']} />
      </div>
    </div>
  )
}

export default page