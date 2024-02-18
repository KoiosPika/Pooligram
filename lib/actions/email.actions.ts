"use server"

import { Email } from '@/components/shared/Email';
import { Resend } from 'resend';
import UserData from '../database/models/userData.model';
import User from '../database/models/user.model';
import Poll from '../database/models/poll.model';

type EmailProps = {
    email: {
        senderEmail: string,
        subject: string,
        description: string
        name: string
    }
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ email }: EmailProps) {
    try {

        const { data, error } = await resend.emails.send({
            from: email.senderEmail,
            to: ['ramimalass@pollstreet.net'],
            subject: email.subject,
            react: Email({ firstName: "John" }) as React.ReactElement,
        });

        const userDataDocuments = await UserData.find();

        for (const userData of userDataDocuments) {
            // Since UserData.User should already contain the ObjectId of the User,
            // use it to update the corresponding User document with the UserData reference.
            if (userData.User) {
                await User.findByIdAndUpdate(userData.User, { $set: { UserData: userData._id } });
                console.log(`Linked UserData ${userData._id} to User ${userData.User}`);
            } else {
                console.log(`UserData ${userData._id} does not have a corresponding User ObjectId`);
            }
        }

        if (error) {
            return console.log(error)
        }
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}