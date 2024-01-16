import { Schema, model, models } from "mongoose";

const AnswerSchema = new Schema({
    title: {type: String, required:true},
    nofVotes: {type: Number},
    createdAt: { type: Date, default: Date.now },
    Poll: {type: Schema.Types.ObjectId, ref: 'Poll'}
})

const Answer = models.Answer || model('Answer', AnswerSchema);

export default Answer;