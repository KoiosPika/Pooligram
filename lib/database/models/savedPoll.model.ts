import { Schema, model, models, Document } from "mongoose";
import { IUser } from './user.model'
import { IPoll } from "./poll.model";

export interface ISavedPoll extends Document {
    _id: string,
    creator: IUser,
    poll: IPoll,
    createdAt: Date
}

const SavedPollSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    poll: { type: Schema.Types.ObjectId, ref: 'Poll' },
    createdAt: { type: Date, default: Date.now() }
})

const SavedPoll = models.SavedPoll || model('SavedPoll', SavedPollSchema);

export default SavedPoll;