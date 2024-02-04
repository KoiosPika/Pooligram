import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
    _id: string,
    email: string,
    username: string,
    photo: string,
    verified: boolean,
    hashtags: string[],
    hiddenPolls: string[]
    balance: number
    level: number
    points: number
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    hashtags: { type: [String], required: true },
    hiddenPolls: { type: [String], required: true },
    photo: { type: String, required: true },
    verified: { type: Boolean, required: true },
    balance: { type: Number, required: true },
    level: { type: Number, default: 1 },
    points: { type: Number, default: 0 }
})

const User = models.User || model('User', UserSchema);

export default User;