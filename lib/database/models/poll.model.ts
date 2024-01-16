import { Schema, model, models } from "mongoose";

const PollSchema = new Schema({
    title: {type: String, required:true},
    imageUrl: {type: String},
    createdAt: { type: Date, default: Date.now },
    sponsored: {type: Boolean},
    openList: {type: Boolean},
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Poll = models.Poll || model('Poll', PollSchema);

export default Poll;