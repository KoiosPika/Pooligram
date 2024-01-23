import DetailedPage from "@/components/shared/DetailedPage";
import { SearchParamsProps } from "@/types"
import { auth } from "@clerk/nextjs";

const page = ({ params: { id }, searchParams }: SearchParamsProps) => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <DetailedPage id={id} userId={userId} />
  )
}

export default page