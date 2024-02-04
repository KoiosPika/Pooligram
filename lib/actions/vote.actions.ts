'use server'

import { CreateVoteParams } from "@/types";
import { connectToDatabase } from "../database"
import Vote from "../database/models/vote.model";
import Poll from "../database/models/poll.model";
import User from "../database/models/user.model";
import Answer from "../database/models/answer.model";

const populateVote = (query: any) => {
    return query
        .populate({ path: 'Poll', model: Poll, select: '_id imageUrl title' })
        .populate({ path: 'Voter', model: User, select: '_id' })
        .populate({ path: 'Answer', model: Answer, select: '_id title' })
}

export async function createVote({ pollId, answerId, userId }: CreateVoteParams) {

    try {
        await connectToDatabase();

        await Vote.create({
            Voter: userId,
            Poll: pollId,
            Answer: answerId,
            createdAt: new Date()
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getVoteByPoll({ pollId, userId }: { pollId: string, userId: string }) {
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

export async function getVotesByUserId(userId: string) {
    try {
        await connectToDatabase();

        const condition = { Voter: userId }

        const voteQuery = Vote.find(condition);

        const votes = await populateVote(voteQuery);

        return JSON.parse(JSON.stringify(votes))

    } catch (error) {
        console.log(error)
    }
}