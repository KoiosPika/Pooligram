'use server'

import { CreateCollectionParams, GetAllCollectionsParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import CollectionGroup, { ICollectionGroup } from "../database/models/collectionGroup.model";
import UserData from "../database/models/userData.model";

const populateCollection = (query: any) => {
    return query
        .populate({
            path: "creator",
            model: User,
            select: "_id username photo",
            populate: {
                path: "UserData",
                model: UserData,
                select: "level"
            }
        })
}

export async function createCollectionGroup({ userId, collection }: CreateCollectionParams) {
    try {
        await connectToDatabase();

        const Today = new Date();
        const EndDate = new Date(Today)
        EndDate.setDate(Today.getDate() + (10 + collection.days))

        const newCollection = await CollectionGroup.create({
            title: collection.title,
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

export async function getCollectionById(id: string) {
    try {
        await connectToDatabase();

        const collectionGroup = await populateCollection(CollectionGroup.findById(id));

        return JSON.parse(JSON.stringify(collectionGroup));
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

export async function getAllCollections({ userHashtags, query, page }: GetAllCollectionsParams) {

    const limit = 3;
    try {
        await connectToDatabase()

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};

        const userHashtagsCondition = userHashtags && userHashtags.length > 0
            ? { hashtags: { $in: userHashtags } }
            : {};

        const otherCondition = { hashtags: { $nin: [...userHashtags || null] } };

        const totalUserHashtagsCount = await CollectionGroup.countDocuments({ ...userHashtagsCondition, ...titleCondition, });
        const totalOtherCount = await CollectionGroup.countDocuments({ ...otherCondition, ...titleCondition, });

        const totalCount = totalUserHashtagsCount + totalOtherCount;
        const skipAmount = (page - 1) * limit;

        let combinedCollections: ICollectionGroup[] = [];

        if (skipAmount < totalUserHashtagsCount) {
            const matchingPostHashtagsPolls = await populateCollection(CollectionGroup.find({
                ...userHashtagsCondition,
                ...titleCondition,
                endDateTime: { '$gt': new Date() },
                _id: {
                    $nin: [
                        ...combinedCollections.map(collectionGroup => collectionGroup._id)
                    ]
                },
                visibility: false
            })
                .sort({ startDateTime: -1 })
                .skip(skipAmount)
                .limit(limit));

            combinedCollections.push(...matchingPostHashtagsPolls);
        }

        let remainingLimit = limit - combinedCollections.length;

        if (remainingLimit > 0 && skipAmount + combinedCollections.length < totalUserHashtagsCount) {
            const skipUserHashtags = Math.max(0, skipAmount);
            const matchingUserHashtagsCollections = await populateCollection(CollectionGroup.find({
                ...userHashtagsCondition,
                ...titleCondition,
                endDateTime: { '$gt': new Date() },
                _id: {
                    $nin: [
                        ...combinedCollections.map(collectionGroup => collectionGroup._id)
                    ]
                },
                visibility: false
            })
                .sort({ startDateTime: -1 })
                .skip(skipUserHashtags)
                .limit(remainingLimit));

            combinedCollections.push(...matchingUserHashtagsCollections);
        }

        remainingLimit = limit - combinedCollections.length;

        if (remainingLimit > 0) {
            const skipRemaining = Math.max(0, skipAmount - totalUserHashtagsCount);
            const remainingPolls = await populateCollection(CollectionGroup.find({
                ...otherCondition,
                ...titleCondition,
                endDateTime: { '$gt': new Date() },
                _id: {
                    $nin: [
                        ...combinedCollections.map(collectionGroup => collectionGroup._id)
                    ]
                },
                visibility: false
            })
                .sort({ startDateTime: -1 })
                .skip(skipRemaining)
                .limit(remainingLimit));

            combinedCollections.push(...remainingPolls);
        }

        return JSON.parse(JSON.stringify(combinedCollections))

    } catch (error) {
        console.log(error)
    }
}