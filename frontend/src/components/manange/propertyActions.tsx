import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { Pencil, Trash2 } from "lucide-react"
import { api } from "@/lib/axios_instance"
import { createPropertySchema } from "../../../../shared/schema/property.schema"
import type { z } from "zod"
type Property = z.infer<typeof createPropertySchema>
interface propertyActionProps {
  property: Property
  onDelete: (propertyId: string) => void
}

export default function PropertyActions({
  property,
  onDelete,
}: propertyActionProps) {
  const handleDelete = async () => {
    await api.delete(`properties/${property.id}`)
    onDelete(property.id)
  }

  return (
    <div className="w-full">
      <ItemGroup className="gap-4">
        <Item
          key={property.id}
          variant="outline"
          className="p-4"
          render={
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
              {/* Property image */}
              <ItemMedia variant="image" className="shrink-0">
                <img
                  src={`https://avatar.vercel.sh/${property.title}`}
                  alt={property.title}
                  className="h-32 w-full rounded-lg object-cover sm:w-40"
                />
              </ItemMedia>

              {/* Property information */}
              <ItemContent className="flex-1">
                <ItemTitle className="text-lg font-semibold">
                  {property.title}
                </ItemTitle>

                <ItemDescription>{property.address}</ItemDescription>

                <ItemDescription>{property.propertyType}</ItemDescription>

                <p className="mt-2 font-semibold text-primary">
                  R {property.monthlyRent.toLocaleString("en-ZA")} / month
                </p>
              </ItemContent>

              {/* Actions */}
              <div className="flex gap-2 sm:flex-col">
                <Button variant="outline" className="flex flex-row">
                  <Link to={`/properties/${property.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <div>Edit</div>
                  </Link>
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          }
        />
      </ItemGroup>
    </div>
  )
}
