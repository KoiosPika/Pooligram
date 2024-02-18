'use server'

import { connectToDatabase } from "../database"
import Poll from "../database/models/poll.model";
import SavedPoll, { ISavedPoll } from "../database/models/savedPoll.model";
import User from "../database/models/user.model";
import UserData from "../database/models/userData.model";

const populatePoll = (query: any) => {
    return query
        .populate({
            path: 'poll',
            model: Poll,
            select: '_id imageUrl title',
            populate: {
                path: 'creator',
                model: User,
                select: '_id username photo',
                populate: {
                    path: "UserData",
                    model: UserData,
                    select: 'level'
                }
            }
        })
}

export async function handleSaving({ userId, id }: { userId: string, id: string }) {
    try {
        await connectToDatabase();

        const poll = await SavedPoll.findOne({
            creator: userId,
            poll: id
        })

        if (poll) {
            return;
        }

        await SavedPoll.create({
            creator: userId,
            poll: id
        })

        return;
    } catch (error) {
        console.log(error)
    }
}

export async function getSavedPollsByUser(userId: string) {
    try {
        await connectToDatabase();

        const savedPollsQuery = SavedPoll.find({ creator: userId }).sort({ createdAt: -1 });

        const savedPolls = await populatePoll(savedPollsQuery);

        return JSON.parse(JSON.stringify(savedPolls))

    } catch (error) {
        console.log(error)
    }
}