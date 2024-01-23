import { Schema, model, models, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IOrder extends Document {
    _id: string
    amount: number,
    createdAt: Date,
    buyer: IUser
}

const OrderSchema = new Schema({
    stripeId: { type: String, require: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Order = models.Order || model('Order', OrderSchema);

export default Order;