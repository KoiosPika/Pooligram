import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
    _id: string,
    email: string,
    username: string,
    photo: string,
    verified: boolean,
    hashtags: string[],
    balance: number
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    hashtags: { type: [String], required: true },
    photo: { type: String, required: true },
    verified: { type: Boolean, required: true },
    balance: { type: Number, required: true }
})

const User = models.User || model('User', UserSchema);

export default User;