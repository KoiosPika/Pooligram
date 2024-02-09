'use server'

import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import { CreateOrderParams } from '@/types';
import User from '../database/models/user.model';

export type CheckoutOrderParams = {
    amount: number,
    buyerId: string
}

const populateOrder = (query: any) => {
    return query
        .populate({ path: 'buyer', model: User, select: '_id username' })
}

export const checkoutOrder = async (order: CheckoutOrderParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: order.amount * 100,
                        product_data: {
                            name: 'Recharge'
                        }
                    },
                    quantity: 1
                },
            ],
            metadata: {
                buyerId: order.buyerId,
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/wallet`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        });

        redirect(session.url!)
    } catch (error) {
        throw error;
    }
}

export const createOrder = async (order: CreateOrderParams) => {

    try {
        await connectToDatabase();

        const newOrder = await Order.create({
            ...order,
            buyer: order.buyerId,
        });

        const ticketValue: { [key: string]: number } = {
            '1.99': 8,
            '3.99': 15,
            '6.99': 26,
            '9.99': 40
        };


        const user = await User.findById(order.buyerId);

        const newTickets = user.tickets + ticketValue[(order.amount).toString()];

        await User.updateOne(
            { _id: order.buyerId },
            { $set: { tickets: newTickets } }
        )

        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        console.log(error);
    }
}

export async function getOrdersById(userId: string) {
    try {
        await connectToDatabase();

        const conditions = { buyer: userId }

        const eventsQuery = Order.find(conditions)
            .sort({ createdAt: 'desc' })

        const orders = await populateOrder(eventsQuery)

        return JSON.parse(JSON.stringify(orders))
    } catch (error) {
        console.log(error)
    }
}