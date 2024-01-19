
export type CreateUserParams = {
    clerkId: string
    username: string
    email: string
    photo: string
    verified: boolean
    balance: number
}

export type CreatePollParams = {
    userId: string,
    poll: {
        title: string
        hashtags: [string]
        imageUrl: string
        startDateTime: Date
        endDateTime: Date
        sponsored: boolean
        openList: boolean
        openComments: boolean
    }
}

export type CreateAnswerParams = {
    pollId: string
    title: string
}

export type SearchParamsProps = {
    params: { id: string },
    searchParams: { [key: string]: string | string[] | undefined }
}

export type CreateVoteParams = {
    pollId: string,
    answerId: string,
    userId: string
}