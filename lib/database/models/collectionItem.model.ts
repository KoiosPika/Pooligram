import { Schema, model, models, Document } from "mongoose";
import { IPoll } from "./poll.model";
import { ICollection } from "./collection.model";

export interface ICollectionItem extends Document {
    _id: string,
    poll: IPoll,
}

const CollectionItemSchema = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: "Poll" },
    collection: { type: Schema.Types.ObjectId, ref: "Collection" },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now() }
})

const CollectionItem = models.CollectionItem || model('CollectionItem', CollectionItemSchema);

export default CollectionItem;