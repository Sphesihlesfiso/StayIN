import { createPropertySchema } from "../../../../shared/schema/property.schema"
import { z } from "zod"

export type PropertyFormValues = z.infer<typeof createPropertySchema>
