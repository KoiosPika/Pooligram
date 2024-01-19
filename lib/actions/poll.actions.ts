'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Poll from '../database/models/poll.model'
import { CreatePollParams, GetPollsParams } from '@/types'
import User from '../database/models/user.model'

const populatePoll = (query: any) => {
    return query
      .populate({ path: 'creator', model: User, select:'_id username photo verified' })
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

export async function getPollById(eventId: string) {
    try {
        await connectToDatabase()

        const poll = await Poll.findById(eventId)

        if (!poll) throw new Error('Poll not found')

        return JSON.parse(JSON.stringify(poll))
    } catch (error) {
        console.log(error)
    }
}

export async function getAllPolls({ postHashtags, userHashtags, page , limit = 6 }: GetPollsParams) {
    try {
        await connectToDatabase();

        
        const totalPostHashtagsCount = postHashtags.length > 0 ? 
        await Poll.countDocuments({
            hashtags: { $in: postHashtags }
        }) : 0;


        const totalUserHashtagsCount = userHashtags.length > 0 ? 
        await Poll.countDocuments({
            hashtags: { $in: userHashtags, $nin: postHashtags }
        }) : 0;

        
        const totalOtherCount = await Poll.countDocuments({
            hashtags: { $nin: [...postHashtags, ...userHashtags] }
        });

        const totalCount = totalPostHashtagsCount + totalUserHashtagsCount + totalOtherCount;
        const skipAmount = (page - 1) * limit;
        let combinedPolls = [];

        
        if (skipAmount < totalPostHashtagsCount) {
            const matchingPostHashtagsPolls = await populatePoll(Poll.find({ hashtags: { $in: postHashtags } })
                .sort({ createdAt: 'desc' })
                .skip(skipAmount)
                .limit(limit));

            combinedPolls.push(...matchingPostHashtagsPolls);
        }

        
        let remainingLimit = limit - combinedPolls.length;
        if (remainingLimit > 0 && skipAmount + combinedPolls.length < totalPostHashtagsCount + totalUserHashtagsCount) {
            const skipUserHashtags = Math.max(0, skipAmount - totalPostHashtagsCount);
            const matchingUserHashtagsPolls = await populatePoll(Poll.find({ 
                hashtags: { $in: userHashtags },
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
                hashtags: { $nin: [...postHashtags, ...userHashtags] },
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
        throw error; // It's a good practice to re-throw the error for further handling.
    }
}
