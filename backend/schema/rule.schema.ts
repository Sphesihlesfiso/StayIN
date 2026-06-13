
import {z} from "zod"
export const createRuleSchema =z.object({
    content:z.string().min(1,"The rule must atleast have one word."),
    propertyId:z.int()
})
export const updateRuleSchema=createRuleSchema.partial()
export type CreateRuleInput=z.infer<typeof createRuleSchema>
export type UpdateRuleInput =z.infer<typeof updateRuleSchema>