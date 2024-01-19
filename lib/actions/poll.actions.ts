'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Poll from '../database/models/poll.model'
import { CreatePollParams } from '@/types'
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

export async function getAllPolls() {
    try {
        await connectToDatabase();

        const pollsQuery = Poll.find({hashtags:{$in:['cute','football']}}).sort({ createdAt: 'desc' })

        const polls = await populatePoll(pollsQuery)

        return JSON.parse(JSON.stringify(polls));
        
    } catch (error){
        console.log(error)
    }
}