"use server"

import { CreateCollectionItemParams } from "@/types";
import { connectToDatabase } from "../database";
import CollectionItem from "../database/models/collectionItem.model";
import Poll from "../database/models/poll.model";
import User from "../database/models/user.model";
import CollectionGroup from "../database/models/collectionGroup.model";

const populateCollectionItem = (query: any) => {
    return query
        .populate({ path: "poll", model: Poll, select: "_id imageUrl title" })
        .populate({ path: "creator", model: User, select: "_id username level photo" })
        .populate({path:"collectionGroup", model:CollectionGroup, select:"_id title imageUrl nofVotes nofPolls"})
}

export async function createCollectionItem({ collectionGroupId, pollId, userId }: CreateCollectionItemParams) {
    try {
        await connectToDatabase()

        const collectionItem = await CollectionItem.find({ poll: pollId, collectionGroup: collectionGroupId })

        if (collectionItem.length > 0) {
            return;
        }

        await CollectionItem.create({
            poll: pollId,
            collectionGroup: collectionGroupId,
            creator: userId,
        })

        const poll = await Poll.findById(pollId);
        const pollVotes = poll.nofVotes;

        await CollectionGroup.updateOne(
            { _id: collectionGroupId },
            {
                $inc: {
                    nofVotes: pollVotes,
                    nofPolls: 1
                }
            }
        );

        return;
    } catch (error) {
        console.log(error)
    }
}

export async function getCollectionItemsByCollection(collectionId: string) {
    try {
        await connectToDatabase();

        const polls = await populateCollectionItem(CollectionItem.find(
            { collectionGroup: collectionId }
        ).sort({ createdAt: -1 }))

        return JSON.parse(JSON.stringify(polls))
    } catch (error) {
        console.log(error)
    }
}

export async function getCollectionsByPoll(pollId: string) {
    try {
        await connectToDatabase()

        const collectionGroups = await populateCollectionItem(CollectionItem.find({ poll: pollId }))

        return JSON.parse(JSON.stringify(collectionGroups))
    } catch (error) {
        console.log(error)
    }
}