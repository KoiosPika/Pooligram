import * as z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    sponsored: z.boolean(),
    openList: z.boolean(),
    openComments: z.boolean(),
})