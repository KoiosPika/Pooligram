
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
        hashtags: string[]
        imageUrl: string
        startDateTime: Date
        endDateTime: Date
        sponsored: boolean
        days: number
        openList: boolean
        openComments: boolean
    }
}

export type CreateAnswerParams = {
    pollId: string
    title: string
}

export type CreateCommentParams = {
    text: string,
    pollId: string,
    userId: string
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

export type GetPollsParams = {
    postHashtags: string[],
    userHashtags: string[],
    page: number,
    limit: number,
    query?: string,
    seenIds?: string[]
}

export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type UpdatePollParams = {
    poll: {
        pollId: string,
        hashtags: string[]
        sponsored: boolean
        days: number
        openComments: boolean
    }
}

export type CreateOrderParams = {
    stripeId: string
    buyerId: string
    amount: number
    createdAt: Date
}