'use server'

import { CreateCommentParams } from "@/types"
import { connectToDatabase } from "../database"
import Comment from "../database/models/comment.model"
import User from "../database/models/user.model"

const populateComment = (query: any) => {
    return query
        .populate({ path: 'creator', model: User, select: '_id username photo' })
}

export async function createComment({ pollId, userId, text }: CreateCommentParams) {
    try {
        await connectToDatabase();

        const comment = await Comment.create({
            text,
            poll: pollId,
            creator: userId
        })

        return JSON.parse(JSON.stringify(comment));
    } catch (error) {
        console.log(error);
    }
}

export async function getCommentsByPoll(id: string) {
    try {
        await connectToDatabase()

        const condition = { poll: id }

        const commentsQuery = Comment.find(condition).sort({ createdAt: -1 })

        const comments = await populateComment(commentsQuery)

        return JSON.parse(JSON.stringify(comments));

    } catch (error) {
        console.log(error)
    }
}