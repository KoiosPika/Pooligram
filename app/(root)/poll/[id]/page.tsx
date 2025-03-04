import DetailedPage from "@/components/shared/DetailedPage";
import { SearchParamsProps } from "@/types"
import { auth } from "@clerk/nextjs";

const page = async ({ params: { id }, searchParams }: SearchParamsProps) => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  
  const Today = new Date();

  return (
    <DetailedPage id={id} userId={userId} today={Today} />
  )
}

export default page