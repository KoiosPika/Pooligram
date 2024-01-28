'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import { CreateUserParams } from '@/types'

export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase()
        const newUser = await User.create({ ...user, hashtags: ['trend', 'popular', 'sport'], seenIds: ['999999999999aaaaaaaaaaaa'] })
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}

export async function getUserById(id: string) {
    try {
        await connectToDatabase()
        const user = await User.findById(id)
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        console.log(error)
    }
}

export async function updateUserBalance(id: string, days: number, sponsored: boolean) {
    try {
        await connectToDatabase();

        const user = await User.findById(id);

        const deduction = (sponsored ? 1 : 0) + (days * 0.50)

        const newBalance = user.balance - deduction;

        await User.updateOne(
            { _id: id },
            { $set: { balance: newBalance } }
        )
    } catch (error) {
        console.log(error)
    }
}


export async function updateUser(id: string) {
    // try {
    //     await connectToDatabase();
    //     const updatedUser = await User.findByIdAndUpdate(id, {
    //         clerkId: "user_2b9vcvRlUIQtFM9a6KxNGlh0HHE",
    //         email: "rami7malass@gmail.com",
    //         username: "ramrom",
    //         hashtags: ['hello'],
    //         photo: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yYjl2Y3lJYUJ5NkQ4WU9jWTVBSEljekxFNkEifQ",
    //         verified: false,
    //         balance: 0
    //     })

    //     if (!updatedUser) throw new Error('User update failed')
    //     return JSON.parse(JSON.stringify(updatedUser))
    // } catch (error) {
    //     console.log(error);
    // }
}
