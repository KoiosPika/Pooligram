"use client"

import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ userId, amount }: { userId: string, amount: number }) => {
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {
        const order = {
            amount,
            buyerId: userId
        }

        await checkoutOrder(order);
    }

    return (
        <form action={onCheckout} method="post">
            <Button type="submit" role="link" size="lg" className="w-full bg-green-600 border-2 border-white justify-center items-center">
                <p className='font-bold text-[18px] text-white'>Recharge ${amount}</p>
            </Button>
        </form>
    )
}

export default Checkout