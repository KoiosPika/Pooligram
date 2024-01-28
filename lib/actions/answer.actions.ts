'use server'

import { CreateAnswerParams } from "@/types"
import { connectToDatabase } from "../database"
import Answer, { IAnswer } from "../database/models/answer.model"
import Poll from "../database/models/poll.model"
import User from "../database/models/user.model"

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

        const answersQuery = Answer.find(condition).sort({ nofVotes: -1 })

        const answers = await populateAnswer(answersQuery)

        const totalVotes = answers.reduce((acc: number, answer: IAnswer) => acc + answer.nofVotes, 0);

        const answersWithPercentages = answers.map((answer: IAnswer) => {
            const answerObj = answer.toObject();
            const percentage = totalVotes > 0 ? (answerObj.nofVotes / totalVotes * 100).toFixed(1) : 0;
            return {
                ...answerObj,
                votePercentage: percentage
            };
        });

        return JSON.parse(JSON.stringify(answersWithPercentages));
    } catch (error) {
        console.log(error)
    }
}

export async function handleVoting({ userId, answerId, pollId }: { answerId: string, pollId: string, userId: string }) {
    try {
        await connectToDatabase();

        const result = await Answer.updateOne(
            { _id: answerId },
            { $inc: { nofVotes: 1 } }
        )

        await Poll.updateOne(
            { _id: pollId },
            { $inc: { nofVotes: 1 } }
        )

        await User.updateOne(
            { _id: userId },
            { '$set': { verified: true } }
        )

        return result;

    } catch (error) {
        console.log(error)
    }
}