'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Poll, { IPoll } from '../database/models/poll.model'
import { CreatePollParams, GetPollsParams, UpdatePollParams } from '@/types'
import User from '../database/models/user.model'
import { ObjectId } from 'mongodb';

const populatePoll = (query: any) => {
    return query
        .populate({ path: 'creator', model: User, select: '_id username photo verified level' })
}

export async function createPoll({ userId, poll }: CreatePollParams) {
    try {
        await connectToDatabase()

        console.log(poll.days)

        const Today = new Date();
        const EndDate = new Date(Today)
        const SponsoredDate = new Date(Today)
        EndDate.setDate(Today.getDate() + (5 + poll.days))
        SponsoredDate.setDate(Today.getDate() + 1);

        const verifiedPoll = {
            title: poll.title,
            hashtags: poll.hashtags,
            imageUrl: poll.imageUrl,
            startDateTime: Today,
            endDateTime: EndDate,
            endSponsoredTime: poll.sponsored ? SponsoredDate : Today,
            openList: poll.openList,
            openComments: poll.openComments
        }
        const newPoll = await Poll.create({ ...verifiedPoll, creator: userId })

        return JSON.parse(JSON.stringify(newPoll))
    } catch (error) {
        console.log(error)
    }
}

export async function updatePoll({ poll }: UpdatePollParams) {

    try {
        await connectToDatabase()

        const currentPoll = await Poll.findById(poll.pollId)

        const Today = new Date();
        const EndDate = new Date();
        const SponsoredDate = new Date(Today)
        EndDate.setDate(currentPoll.endDateTime.getDate() + (poll.days))
        SponsoredDate.setDate(Today.getDate() + 1);

        console.log(EndDate)

        const updatedPoll = await Poll.updateOne(
            { _id: currentPoll._id },
            {
                hashtags: poll.hashtags,
                endDateTime: EndDate,
                endSponsoredTime: poll.sponsored ? SponsoredDate : currentPoll.SponsoredDate,
                openComments: poll.openComments
            }
        )

        return JSON.parse(JSON.stringify(updatedPoll));
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

        const polls = await populatePoll(Poll.find({ creator: userId })).sort({ endDateTime: -1 })

        return JSON.parse(JSON.stringify(polls))

    } catch (error) {
        console.log(error);
    }
}

export async function getAllPolls({ postHashtags, userHashtags, page, limit = 6, query, hiddenPolls }: GetPollsParams) {


    try {
        await connectToDatabase();

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};

        const hiddenPollsObjectIds = hiddenPolls.map((id) => new ObjectId(id))

        const hiddenPollsCondition = { _id: { $nin: hiddenPollsObjectIds } }

        const postHashtagsCondition = postHashtags && postHashtags.length > 0
            ? { hashtags: { $in: postHashtags } }
            : {};

        const userHashtagsCondition = userHashtags && userHashtags.length > 0
            ? { hashtags: { $in: userHashtags, $nin: postHashtags } }
            : {};

        const otherCondition = { hashtags: { $nin: [...postHashtags || null, ...userHashtags || null] } };

        const totalPostHashtagsCount = await Poll.countDocuments({ ...postHashtagsCondition, ...titleCondition, ...hiddenPollsCondition });
        const totalUserHashtagsCount = await Poll.countDocuments({ ...userHashtagsCondition, ...titleCondition, ...hiddenPollsCondition });
        const totalOtherCount = await Poll.countDocuments({ ...otherCondition, ...titleCondition, ...hiddenPollsCondition });

        const totalCount = totalPostHashtagsCount + totalUserHashtagsCount + totalOtherCount;
        const skipAmount = (page - 1) * limit;
        let combinedPolls: IPoll[] = [];

        if (skipAmount < totalPostHashtagsCount) {
            const matchingPostHashtagsPolls = await populatePoll(Poll.find({
                ...postHashtagsCondition,
                ...titleCondition,
                endDateTime: { '$gt': new Date() },
                _id: {
                    $nin: [
                        ...hiddenPollsObjectIds,
                        ...combinedPolls.map(poll => poll._id)
                    ]
                }
            })
                .sort({ startDateTime: -1 })
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
                endDateTime: { '$gt': new Date() },
                _id: {
                    $nin: [
                        ...hiddenPollsObjectIds,
                        ...combinedPolls.map(poll => poll._id)
                    ]
                }
            })
                .sort({ startDateTime: -1 })
                .skip(skipUserHashtags)
                .limit(remainingLimit));

            combinedPolls.push(...matchingUserHashtagsPolls);
        }

        remainingLimit = limit - combinedPolls.length;
        if (remainingLimit > 0) {
            const skipRemaining = Math.max(0, skipAmount - totalPostHashtagsCount - totalUserHashtagsCount);
            const remainingPolls = await populatePoll(Poll.find({
                ...otherCondition,
                ...titleCondition,
                endDateTime: { '$gt': new Date() },
                _id: {
                    $nin: [
                        ...hiddenPollsObjectIds,
                        ...combinedPolls.map(poll => poll._id)
                    ]
                }
            })
                .sort({ startDateTime: -1 })
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

export async function getLeaderboardPolls() {
    try {
        await connectToDatabase();

        const polls = await populatePoll(Poll.find().sort({ nofVotes: -1 }).limit(24))

        return JSON.parse(JSON.stringify(polls))
    } catch (error) {
        console.log(error)
    }
}

export async function getDate(){
    return new Date('2024-02-11T08:17:12.733Z')
}