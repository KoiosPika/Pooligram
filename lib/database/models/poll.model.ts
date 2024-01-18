import { Schema, model, models, Document } from "mongoose";

export interface IPoll extends Document {
    _id: string,
    title: string
    hashtags: [string]
    imageUrl: string
    createdAt: Date,
    startDateTime: Date
    endDateTime: Date
    sponsored: boolean
    openList: boolean
    openComments: boolean
    creator: { _id: string, username: string },
}

const PollSchema = new Schema({
    title: { type: String, required: true },
    hashtags: { type: [String], required: true },
    imageUrl: { type: String , required: true},
    createdAt: { type: Date, default: Date.now },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    sponsored: { type: Boolean, default: false },
    openList: { type: Boolean, default: false },
    openComments: { type: Boolean, default: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Poll = models.Poll || model('Poll', PollSchema);

export default Poll;