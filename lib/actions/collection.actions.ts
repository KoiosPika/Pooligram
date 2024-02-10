'use server'

import { CreateCollectionParams } from "@/types";
import Collection from "../database/models/collection.model";

export async function createCollection({ userId, collection }: CreateCollectionParams) {
    try {

        const Today = new Date();
        const EndDate = new Date(Today)
        EndDate.setDate(Today.getDate() + (10 + collection.days))

        await Collection.create({
            title: collection.title,
            description: collection.description,
            imageUrl: collection.imageUrl,
            hashtags: collection.hashtags,
            visibility: collection.visibility,
            endDateTime: EndDate,
            creator: userId,
        })

        return;
    } catch (error) {
        console.log(error)
    }
}