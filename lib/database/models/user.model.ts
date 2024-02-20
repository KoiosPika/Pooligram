import { Schema, model, models, Document } from "mongoose";
import { IUserData } from "./userData.model";

export interface IUser extends Document {
    _id: string,
    email: string,
    username: string,
    photo: string,
    UserData: IUserData
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    UserData: { type: Schema.Types.ObjectId, ref: "UserData" },
})

const User = models.User || model('User', UserSchema);

export default User;