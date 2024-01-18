'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { CreateUserParams } from '@/types'

export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase()
        const newUser = await User.create(user)
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}