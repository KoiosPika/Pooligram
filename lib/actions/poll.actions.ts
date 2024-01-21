'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Poll from '../database/models/poll.model'
import { CreatePollParams, GetPollsParams } from '@/types'
import User from '../database/models/user.model'

const populatePoll = (query: any) => {
    return query
        .populate({ path: 'creator', model: User, select: '_id username photo verified' })
}

export async function createPoll({ userId, poll }: CreatePollParams) {
    try {
        await connectToDatabase()

        const newPoll = await Poll.create({ ...poll, creator: userId })

        return JSON.parse(JSON.stringify(newPoll))
    } catch (error) {
        console.log(error)
    }
}

export async function getPollById(pollId: string) {
    try {
        await connectToDatabase()

        const poll = await populatePoll(Poll.findById(pollId))

        if (!poll) throw new Error('Poll not found')

        return JSON.parse(JSON.stringify(poll))
    } catch (error) {
        console.log(error)
    }
}

export async function getPollsByUser(userId: string) {
    try {
        await connectToDatabase();

        const polls = await populatePoll(Poll.find({ creator: userId })).sort({ createdAt: 1 })

        return JSON.parse(JSON.stringify(polls))

    } catch (error) {
        console.log(error);
    }
}

export async function getAllPolls({ postHashtags, userHashtags, page, limit = 6, query }: GetPollsParams) {
    try {
        await connectToDatabase();

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};

        const postHashtagsCondition = postHashtags.length > 0 ? { hashtags: { $in: postHashtags } } : {};
        const userHashtagsCondition = userHashtags.length > 0 ? { hashtags: { $in: userHashtags, $nin: postHashtags } } : {};
        const otherCondition = { hashtags: { $nin: [...postHashtags, ...userHashtags] } };

        const totalPostHashtagsCount = await Poll.countDocuments({ ...postHashtagsCondition, ...titleCondition });
        const totalUserHashtagsCount = await Poll.countDocuments({ ...userHashtagsCondition, ...titleCondition });
        const totalOtherCount = await Poll.countDocuments({ ...otherCondition, ...titleCondition });

        const totalCount = totalPostHashtagsCount + totalUserHashtagsCount + totalOtherCount;
        const skipAmount = (page - 1) * limit;
        let combinedPolls = [];


        if (skipAmount < totalPostHashtagsCount) {
            const matchingPostHashtagsPolls = await populatePoll(Poll.find({ ...postHashtagsCondition, ...titleCondition })
                .sort({ createdAt: 'desc' })
                .skip(skipAmount)
                .limit(limit));

            combinedPolls.push(...matchingPostHashtagsPolls);
        }


        let remainingLimit = limit - combinedPolls.length;

        if (remainingLimit > 0 && skipAmount + combinedPolls.length < totalPostHashtagsCount + totalUserHashtagsCount) {
            const skipUserHashtags = Math.max(0, skipAmount - totalPostHashtagsCount);
            const matchingUserHashtagsPolls = await populatePoll(Poll.find({
                ...userHashtagsCondition,
                ...titleCondition,
                _id: { $nin: combinedPolls.map(poll => poll._id) }
            })
                .sort({ createdAt: 'desc' })
                .skip(skipUserHashtags)
                .limit(remainingLimit));

            combinedPolls.push(...matchingUserHashtagsPolls);
        }

        // Fetch remaining polls if needed
        remainingLimit = limit - combinedPolls.length;
        if (remainingLimit > 0) {
            const skipRemaining = Math.max(0, skipAmount - totalPostHashtagsCount - totalUserHashtagsCount);
            const remainingPolls = await populatePoll(Poll.find({
                ...otherCondition,
                ...titleCondition,
                _id: { $nin: combinedPolls.map(poll => poll._id) }
            })
                .sort({ createdAt: 'desc' })
                .skip(skipRemaining)
                .limit(remainingLimit));

            combinedPolls.push(...remainingPolls);
        }

        return {
            data: JSON.parse(JSON.stringify(combinedPolls)),
            totalPages: Math.ceil(totalCount / limit),
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}
