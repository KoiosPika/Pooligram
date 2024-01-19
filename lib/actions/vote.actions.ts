'use server'

import { CreateVoteParams } from "@/types";
import { connectToDatabase } from "../database"
import Vote from "../database/models/vote.model";
import { auth } from '@clerk/nextjs'
import Poll from "../database/models/poll.model";
import User from "../database/models/user.model";
import Answer from "../database/models/answer.model";

const { sessionClaims } = auth();
const userId = sessionClaims?.userId as string;

const populateVote = (query: any) => {
    return query
        .populate({ path: 'Poll', model: Poll, select: '_id' })
        .populate({ path: 'Voter', model: User, select: '_id' })
        .populate({ path: 'Answer', model: Answer, select: '_id' })
}

export async function createVote({ pollId, answerId }: CreateVoteParams) {

    try {
        await connectToDatabase();

        await Vote.create({
            Voter: userId,
            Poll: pollId,
            Answer: answerId
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getVoteByPoll(pollId: string) {
    try {
        await connectToDatabase();

        const condition = { Voter: userId, Poll: pollId }

        const voteQuery = Vote.find(condition);

        const vote = await populateVote(voteQuery);

        if (vote.length === 0) {
            return undefined;
        }

        return JSON.parse(JSON.stringify(vote[0]))

    } catch (error) {
        console.log(error)
    }

}