"use client"

import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ userId, amount, tickets }: { userId: string, amount: number, tickets:number }) => {
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
        <form action={onCheckout}>
            <Button type="submit" role="link" size="lg" className="w-full p-7 flex flex-row justify-center items-center gap-2 bg-green-600 border-2 border-white hover:bg-green-800">
                <p className='font-bold text-[20px] text-white'>{tickets} x</p>
                <img className='h-12 w-7' src={'/assets/images/ticket-1.png'} alt='ticket' height={100} width={100} />
                <p className='font-bold text-[20px] text-white'>For ${amount}</p>
            </Button>
        </form>
    )
}

export default Checkout