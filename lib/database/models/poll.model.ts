import { Schema, model, models, Document } from "mongoose";
import { IUser } from './user.model'

export interface IPoll extends Document {
    _id: string,
    title: string
    hashtags: string[]
    imageUrl: string
    createdAt: Date,
    startDateTime: Date
    endDateTime: Date
    endSponsoredTime: Date
    openComments: boolean
    nofVotes: number
    creator: IUser
}

const PollSchema = new Schema({
    title: { type: String, required: true },
    hashtags: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    endSponsoredTime: { type: Date, default: Date.now },
    openComments: { type: Boolean, default: true },
    nofVotes: { type: Number, default: 0 },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Poll = models.Poll || model('Poll', PollSchema);

export default Poll;