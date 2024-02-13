'use server'

import { CreateCommentParams } from "@/types"
import { connectToDatabase } from "../database"
import Comment from "../database/models/comment.model"
import User from "../database/models/user.model"
import UserData from "../database/models/userData.model"

const populateComment = (query: any) => {
    return query
        .populate({ 
            path: 'creator', 
            model: User, 
            select: '_id username photo',
            populate: {
                path: 'UserData',
                model: UserData,
                select:'hashtags hiddenPolls tickets level points'
            }
         })
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

export async function getCommentsByPoll({ id, page }: { id: string, page: number }) {

    const limit = 6;
    try {
        await connectToDatabase()

        const condition = { poll: id }

        const skipAmount = (page - 1) * limit;

        const commentsQuery = Comment.find(condition)
            .sort({ createdAt: -1 })
            .skip(skipAmount)
            .limit(limit)

        const comments = await populateComment(commentsQuery)

        return JSON.parse(JSON.stringify(comments));

    } catch (error) {
        console.log(error)
    }
}