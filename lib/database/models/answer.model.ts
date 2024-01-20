import { Schema, model, models, Document } from "mongoose";
import { IPoll } from "./poll.model";

export interface IAnswer extends Document {
    title: string,
    nofVotes: number,
    createdAt: Date,
    poll: IPoll,
    votePercentage?: number
}

const AnswerSchema = new Schema({
    title: { type: String, required: true },
    nofVotes: { type: Number },
    createdAt: { type: Date, default: Date.now },
    poll: { type: Schema.Types.ObjectId, ref: 'Poll' }
})

const Answer = models.Answer || model('Answer', AnswerSchema);

export default Answer;