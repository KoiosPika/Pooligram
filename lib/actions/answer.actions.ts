'use server'

import { CreateAnswerParams } from "@/types"
import { connectToDatabase } from "../database"
import Answer from "../database/models/answer.model"
import Poll from "../database/models/poll.model"

const populateAnswer = (query: any) => {
    return query
        .populate({ path: 'poll', model: Poll, select: '_id' })
}

export async function createAnswer({ pollId, title }: CreateAnswerParams) {
    try {
        await connectToDatabase();
        const newAnswer = await Answer.create({ title, poll: pollId, nofVotes: 0 })
        return JSON.parse(JSON.stringify(newAnswer))
    } catch (error) {
        console.log(error)
    }
}

export async function getAnswersByPoll(id: string) {
    try {
        await connectToDatabase();

        const condition = { poll: id }

        const answersQuery =  Answer.find(condition).sort({ nofVotes: -1 })

        const answers = await populateAnswer(answersQuery)

        return JSON.parse(JSON.stringify(answers));
    } catch (error) {
        console.log(error)
    }
}

export async function handleVoting(id: string) {
    try {
        await connectToDatabase();

        const result = await Answer.updateOne(
            { _id: id },
            { $inc: { nofVotes: 1 } }
        )

        return result;

    } catch (error) {
        console.log(error)
    }
}