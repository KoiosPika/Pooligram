"use server"

import { CreateCollectionItemParams } from "@/types";
import { connectToDatabase } from "../database";
import CollectionItem from "../database/models/collectionItem.model";
import Collection from "../database/models/collection.model";
import Poll from "../database/models/poll.model";
import User from "../database/models/user.model";

const populateCollectionItem = (query: any) => {
    return query
        .populate({ path: "poll", model: Poll, select: "_id imageUrl title" })
        .populate({ path: "creator", model: User, select: "_id username level photo" })
}

export async function createCollectionItem({ collectionId, pollId, userId }: CreateCollectionItemParams) {
    try {
        await connectToDatabase()

        const collectionItem = await CollectionItem.find({ poll: pollId, collection: collectionId })

        if (collectionItem.length > 0) {
            return;
        }

        await CollectionItem.create({
            poll: pollId,
            collection: collectionId,
            creator: userId,
        })

        const poll = await Poll.findById(pollId);
        const pollVotes = poll.nofVotes;

        await Collection.updateOne(
            { _id: collectionId },
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
            { collection: collectionId }
        ).sort({ createdAt: -1 }))

        return JSON.parse(JSON.stringify(polls))
    } catch (error) {
        console.log(error)
    }
}