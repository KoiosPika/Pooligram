"use server"

import { connectToDatabase } from "../database"
import Report from "../database/models/report.model"
import User from "../database/models/user.model";

export async function createReport(id: string) {
    try {

        await connectToDatabase();

        const report = await Report.create({
            nofReports: 0,
            poll: id
        })

        return JSON.parse(JSON.stringify(report))

    } catch (error) {
        console.log(error)
    }
}

export async function updateReport({ id, userId }: { id: string, userId: string }) {
    try {
        await connectToDatabase();

        const updatedReport = await Report.findOneAndUpdate(
            { poll: id },
            { $inc: { nofReports: 1 } },
            { new: true }
        );

        await User.updateOne(
            { _id: userId },
            { '$push': { hiddenPolls: id } }
        )

        return JSON.parse(JSON.stringify(updatedReport));
    } catch (error) {
        console.log(error)
    }
}