import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ICollectionGroup extends Document {
    _id: string,
    title: string
    nofVotes: number,
    nofPolls: number,
    imageUrl: string,
    visibility: boolean,
    createdAt: Date,
    endDateTime: Date,
    hashtags: string[],
    description: string,
    creator: IUser
}

const CollectionGroupSchema = new Schema({
    title: { type: String, required: true },
    nofVotes: { type: Number, default: 0 },
    nofPolls: { type: Number, default: 0 },
    imageUrl: { type: String },
    hashtags: { type: [String] },
    description: { type: String },
    visibility: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    endDateTime: { type: Date },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
})

const CollectionGroup = models.CollectionGroup || model('CollectionGroup', CollectionGroupSchema);

export default CollectionGroup;