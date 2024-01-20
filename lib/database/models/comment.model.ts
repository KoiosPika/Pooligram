import { Schema, model, models, Document } from "mongoose";
import { IPoll } from "./poll.model";
import { IUser } from "./user.model";

export interface IComment extends Document {
    text: string,
    createdAt: Date,
    poll: IPoll,
    creator: IUser
}

const CommentSchema = new Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    poll: { type: Schema.Types.ObjectId, ref: 'Poll' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;