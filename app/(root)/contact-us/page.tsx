import ContactFrom from "@/components/shared/ContactFrom"
import Selection from "@/components/shared/Selection";
import { getUserDataById } from "@/lib/actions/userData.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const page = async () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;

  const user = await getUserDataById(userId)

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ContactFrom />
      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center">
        <Selection userHashtags={user.hashtags} postHashtags={['']} hiddenPolls={user.hiddenPolls} />
      </div>
    </div>
  )
}

export default page