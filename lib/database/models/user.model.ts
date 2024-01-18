import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    verified: {type: Boolean, required: true},
    balance: {type: Number, required: true}
})

const User = models.User || model('User', UserSchema);

export default User;