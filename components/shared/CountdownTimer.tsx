'use client'

import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const target = new Date(targetDate);
            const difference = target.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                setCountdown('0d: 0h: 0m: 0s');
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setCountdown(`${days}d: ${hours}h: ${minutes}m: ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className='bg-white border-2 border-red-500 text-red-500 p-2 rounded-lg'>
            <p className='font-bold text-[22px]'>{countdown}</p>
        </div>
    );
};

export default CountdownTimer;
