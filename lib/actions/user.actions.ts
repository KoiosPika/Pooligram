'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { CreateUserParams } from '@/types'
import UserData from '../database/models/userData.model'

export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase()
        const newUser = await User.create({ ...user })
        const newUserData = await UserData.create({
            User: newUser._id,
            hashtags: ['sport', 'actions', 'news'],
            hiddenPolls: ['Hello'],
            tickets: 10,
            level: 1,
            points: 0,
            weeklyVotesReceived: 0,
            weeklyVotesSubmitted: 0,
            totalVotesReceived: 0,
            totalVotesSubmitted: 0,
        })
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}
