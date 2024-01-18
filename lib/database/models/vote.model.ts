import { Schema, model, models } from "mongoose";

const VoteSchema = new Schema({
    Poll: { type: Schema.Types.ObjectId, ref: 'Poll' },
    Answer: {type:Schema.Types.ObjectId, ref:'Answer'},
    Voter: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Vote = models.Vote || model('Vote', VoteSchema);

export default Vote;