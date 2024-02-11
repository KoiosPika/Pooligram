import { Schema, model, models, Document } from "mongoose";
import { IPoll } from "./poll.model";
import { IUser } from "./user.model";
import { ICollectionGroup } from "./collectionGroup.model";

export interface ICollectionItem extends Document {
    _id: string,
    poll: IPoll,
    collectionGroup:ICollectionGroup
    creator:IUser
}

const CollectionItemSchema = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: "Poll" },
    collectionGroup: { type: Schema.Types.ObjectId, ref: "CollectionGroup" },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now() }
})

const CollectionItem = models.CollectionItem || model('CollectionItem', CollectionItemSchema);

export default CollectionItem;