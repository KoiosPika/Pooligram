'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Poll, { IPoll } from '../database/models/poll.model'
import { CreatePollParams, GetPollsParams, UpdatePollParams } from '@/types'
import User from '../database/models/user.model'
import { ObjectId } from 'mongodb';
import UserData from '../database/models/userData.model'

const populatePoll = (query: any) => {
    return query
        .populate({
            path: 'creator',
            model: User,
            select: '_id username photo',
            populate: {
                path: "UserData",
                model: UserData,
                select: 'hashtags hiddenPolls tickets level points'
            }
        })
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

        await UserData.updateOne(
            { User: userId },
            { '$inc': { nofPolls: 1 } }
        )

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

export async function getPollsByProfile(userId: string) {
    try {
        await connectToDatabase();

        const polls = await populatePoll(Poll.find({ creator: userId })).sort({ createdAt: -1 })

        return JSON.parse(JSON.stringify(polls))

    } catch (error) {
        console.log(error);
    }
}

export async function getAllPolls({ postHashtags, userHashtags, page, limit = 6, query, hiddenPolls }: GetPollsParams) {

    try {
        await connectToDatabase();

        const currentDate = new Date();
        const pipeline: any[] = [
            {
                $match: {
                    _id: { $nin: hiddenPolls.map(id => new ObjectId(id)) },
                    $or: [
                        { title: { $regex: query || '', $options: 'i' } }, // Case-insensitive search in title
                        { hashtags: { $in: [new RegExp(query || '', 'i')] } } // Case-insensitive search in hashtags array
                    ],
                    endDateTime: { $gt: currentDate }
                }
            },
            {
                $addFields: {
                    isSponsored: { $gt: ["$endSponsoredTime", currentDate] },
                    matchesPostHashtags: { $in: ["$hashtags", postHashtags] },
                    matchesUserHashtags: { $in: ["$hashtags", userHashtags] }
                }
            },
            {
                $addFields: {
                    relevance: {
                        $cond: {
                            if: { $eq: ["$isSponsored", true] },
                            then: {
                                $cond: {
                                    if: { $eq: ["$matchesPostHashtags", true] },
                                    then: 1, // Highest priority: Sponsored + Matches Post Hashtags
                                    else: {
                                        $cond: {
                                            if: { $eq: ["$matchesUserHashtags", true] },
                                            then: 3, // Third priority: Sponsored + Matches User Hashtags
                                            else: 5 // Fallback for sponsored without matching hashtags
                                        }
                                    }
                                }
                            },
                            else: {
                                $cond: {
                                    if: { $eq: ["$matchesPostHashtags", true] },
                                    then: 2, // Second priority: Non-Sponsored + Matches Post Hashtags
                                    else: {
                                        $cond: {
                                            if: { $eq: ["$matchesUserHashtags", true] },
                                            then: 4, // Fourth priority: Non-Sponsored + Matches User Hashtags
                                            else: 6 // Fallback for non-sponsored without matching hashtags
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            { $sort: { relevance: 1, startDateTime: -1 } }, // Sort by relevance, then by startDateTime
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creator'
                }
            },
            {
                $unwind: '$creator'
            },
            {
                $lookup: {
                    from: 'userdatas',
                    localField: 'creator._id',
                    foreignField: 'User',
                    as: 'creator.UserData'
                }
            },
            {
                $unwind: {
                    path: '$creator.UserData',
                }
            }
        ];

        const polls = await Poll.aggregate(pipeline);

        return JSON.parse(JSON.stringify(polls));

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getCurrentRoundPolls() {
    try {
        await connectToDatabase();

        const polls = await populatePoll(Poll.find().sort({ nofVotes: -1 }).limit(24))

        return JSON.parse(JSON.stringify(polls))
    } catch (error) {
        console.log(error)
    }
}

export async function getLeaderboardPolls() {
    try {
        await connectToDatabase();

        const polls = await populatePoll(Poll.find().sort({ nofVotes: -1 }).limit(100))

        return JSON.parse(JSON.stringify(polls))

    } catch (error) {
        console.log(error)
    }
}

export async function sponsorPoll({ id, userId }: { id: string, userId: string }) {
    try {
        await connectToDatabase();

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1)

        await Poll.updateOne(
            { _id: id },
            { '$set': { endSponsoredTime: tomorrow } }
        )

        await UserData.updateOne(
            { User: userId },
            { '$inc': { tickets: -2 } }
        )

    } catch (error) {
        console.log(error)
    }
}

export async function getDate() {
    return new Date('2024-02-11T08:17:12.733Z')
}