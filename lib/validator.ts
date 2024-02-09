import * as z from "zod"

export const pollFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100, "Title can't be more then 100 characters"),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    endSponsoredTime: z.date(),
    openList: z.boolean(),
    openComments: z.boolean(),
})

export const collectionFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100, "Title can't be more then 100 characters"),
    description: z.string().min(3, 'Title must be at least 3 characters'),
    imageUrl: z.string(),
    endDateTime: z.date(),
    visibility: z.boolean(),
})