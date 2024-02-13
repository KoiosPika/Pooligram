'use server'

import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import UserData from "../database/models/userData.model"

const populateUsers = (query: any) => {
    return query
        .populate({ path: 'User', model: User, select: "_id photo username" })
}

export async function getUserDataById(id: string) {
    try {
        await connectToDatabase()

        const user = await UserData.findOne({ User: id })

        return JSON.parse(JSON.stringify(user))

    } catch (error) {
        console.log(error)
    }
}

export async function updateUserTickets(id: string, days: number, sponsored: boolean, dailyCharge: number) {
    try {
        await connectToDatabase();

        const user = await UserData.findOne({ User: id });

        const deduction = (sponsored ? 2 : 0) + (days * dailyCharge)

        const newTickets = user.tickets - deduction;

        await UserData.updateOne(
            { User: id },
            { $set: { tickets: newTickets } }
        )
    } catch (error) {
        console.log(error)
    }
}

export async function getLeaderboardUsers() {
    try {
        await connectToDatabase();

        const users = await populateUsers(UserData.find({}).sort({ level: -1, points: -1 }).limit(100))

        return JSON.parse(JSON.stringify(users))

    } catch (error) {
        console.log(error)
    }
}