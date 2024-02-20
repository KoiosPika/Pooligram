import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IUserData extends Document {
    _id: string,
    User: IUser
    hashtags: string[],
    hiddenPolls: string[]
    tickets: number
    level: number
    points: number
    weeklyVotesReceived: number
    weeklyVotesSubmitted: number
    totalVotesReceived: number
    totalVotesSubmitted: number
    nofPolls: number,
    nofCollections: number,
    nofTitles: number
}

const UserDataSchema = new Schema({
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    hashtags: { type: [String], required: true },
    hiddenPolls: { type: [String], required: true },
    tickets: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    points: { type: Number, default: 0 },
    weeklyVotesReceived: { type: Number, default: 0 },
    weeklyVotesSubmitted: { type: Number, default: 0 },
    totalVotesReceived: { type: Number, default: 0 },
    totalVotesSubmitted: { type: Number, default: 0 },
    nofPolls: { type: Number, default: 0 },
    nofCollections: { type: Number, default: 0 },
    nofTitles: { type: Number, default: 0 },
})

const UserData = models.UserData || model('UserData', UserDataSchema);

export default UserData;