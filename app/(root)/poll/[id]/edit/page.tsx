import EditPage from '@/components/shared/EditPage'
import { getPollById } from '@/lib/actions/poll.actions'
import { IPoll } from '@/lib/database/models/poll.model'
import { getMaxDate } from '@/lib/utils'
import { auth } from '@clerk/nextjs'


type EditPollProps = {
  params: {
    id: string
  }
}

const page = async ({ params: { id } }: EditPollProps) => {

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const poll: IPoll = await getPollById(id)

  const Today = new Date();

  const MinDate = new Date(poll.endDateTime)

  const MaxDate = new Date(getMaxDate(poll.startDateTime))

  const PollSponsoreDate = new Date(poll.endSponsoredTime)

  const dates = {
    MinDate, MaxDate, Today, PollSponsoreDate
  }

  return (
    <EditPage poll={poll} userId={userId} dates={dates} />
  )
}

export default page