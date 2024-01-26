"use server"

import { Email } from '@/components/shared/Email';
import { Resend } from 'resend';

type EmailProps = {
    email: {
        senderEmail: string,
        subject: string,
        description: string
        name:string
    }
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ email }: EmailProps) {
    try {
        const { data, error } = await resend.emails.send({
            from: email.senderEmail,
            to: ['rami10malass@gmail.com'],
            subject: email.subject,
            react: Email({ firstName: "John" }) as React.ReactElement,
        });

        if(error){
            return console.log(error)
        }
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}