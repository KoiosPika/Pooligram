'use server'

import { CreateCollectionParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import CollectionGroup from "../database/models/collectionGroup.model";

const populateCollection = (query: any) => {
    return query
        .populate({ path: "creator", model: User, select: "_id username photo" })
}

export async function createCollectionGroup({ userId, collection }: CreateCollectionParams) {
    try {
        await connectToDatabase();

        const Today = new Date();
        const EndDate = new Date(Today)
        EndDate.setDate(Today.getDate() + (10 + collection.days))

        const newCollection = await CollectionGroup.create({
            title: collection.title,
            description: collection.description,
            imageUrl: collection.imageUrl,
            hashtags: collection.hashtags,
            visibility: collection.visibility,
            endDateTime: EndDate,
            creator: userId,
        })

        return JSON.parse(JSON.stringify(newCollection));
    } catch (error) {
        console.log(error)
    }
}

export async function getCollectionsByUser(userId: string) {
    try {
        await connectToDatabase();

        const collections = await populateCollection(CollectionGroup.find(
            { creator: userId }
        ).sort({ endDateTime: -1 }))

        return JSON.parse(JSON.stringify(collections))
    } catch (error) {
        console.log(error)
    }
}

export async function getAllCollections() {
    try {
        await connectToDatabase()

        const collectionGroups = await populateCollection(CollectionGroup.find({}))

        return JSON.parse(JSON.stringify(collectionGroups))
    } catch (error) {
        console.log(error)
    }
}