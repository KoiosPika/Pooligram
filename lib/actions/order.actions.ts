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
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/wallet`,
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

      const user = await User.findById(order.buyerId);

        const newBalance = user.balance + order.amount;

        await User.updateOne(
            { _id: order.buyerId },
            { $set: { balance: newBalance } }
        )
  
      return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
      console.log(error);
    }
  }