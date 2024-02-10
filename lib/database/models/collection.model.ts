import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ICollection extends Document {
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

const CollectionSchema = new Schema({
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

const Collection = models.Collection || model('Collection', CollectionSchema);

export default Collection;