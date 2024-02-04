import { Document, Schema, model, models } from "mongoose";
import { IPoll } from "./poll.model";
import { IAnswer } from "./answer.model";

export interface IVote extends Document {
    Poll: IPoll
    Answer: IAnswer
}

const VoteSchema = new Schema({
    Poll: { type: Schema.Types.ObjectId, ref: 'Poll' },
    Answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
    Voter: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date }
})

const Vote = models.Vote || model('Vote', VoteSchema);

export default Vote;