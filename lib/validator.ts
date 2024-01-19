import * as z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100, "Title can't be more then 100 characters"),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    sponsored: z.boolean(),
    openList: z.boolean(),
    openComments: z.boolean(),
})