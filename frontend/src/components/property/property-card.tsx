import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { createPropertySchema } from "../../../../shared/schema/property.schema"

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router"

type PropertyInput = z.infer<typeof createPropertySchema>

interface CardImageProps {
  input: PropertyInput
}

export function CardImage({ input }: CardImageProps) {
  const navigate = useNavigate()
  return (
    <Card
      className="relative cursor-pointer overflow-hidden pt-0"
      onClick={() => navigate(`/properties/${input.id}`)}
    >
      <div className="relative aspect-video w-full">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt={input.title}
          className="h-full w-full object-cover brightness-75"
        />
      </div>

      <CardHeader>
        <CardAction className="flex flex-wrap gap-0.5" />

        <CardTitle>R {input.monthlyRent} pm</CardTitle>

        <CardDescription>
          <div>
            {/* <p className="mb-2 font-medium">{input.title}</p> */}

            <p className="mb-2">
              {input.suburb}, {input.town}
            </p>

            <p className="mb-2">{input.propertyType.replaceAll("_", " ")}</p>

            <div className="flex flex-wrap gap-1">
              {input.nsfasAccredited && (
                <Badge variant="outline">Nsfas Accredited</Badge>
              )}

              {/* {input.studentFriendly && (
                <Badge variant="outline">Student Friendly</Badge>
              )} */}

              {/* {input.furnished && <Badge variant="outline">Furnished</Badge>}

              {input.parking && <Badge variant="outline">Parking</Badge>}

              {input.utilitiesIncluded && (
                <Badge variant="outline">Utilities Included</Badge>
              )} */}
            </div>

            <div className="mt-3 flex gap-3 text-sm">
              {/* <span>{input.bedrooms} Bedrooms</span>
              <span>{input.bathrooms} Bathrooms</span> */}
              {/* <span>{input.availableRooms} Available Rooms</span> */}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
