import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Footprints } from "lucide-react"

import { NearbyPlaceProps } from "@/types/CardProps"
const NearbyPlaceBadge = ({ name, walkTime, carTime }: NearbyPlaceProps) => {
  return (
    <Badge
      variant="outline"
      className="flex w-full flex-col gap-1 sm:flex-row sm:items-center sm:gap-2"
    >
      <span className="font-semibold">{name}</span>
      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        {walkTime && (
          <span className="flex items-center gap-1">
            <Footprints className="h-4 w-4" /> {walkTime} walk
          </span>
        )}
        {carTime && (
          <span className="flex items-center gap-1">
            <Car className="h-4 w-4" /> {carTime} by car
          </span>
        )}
      </div>
    </Badge>
  )
}

export const NearbyPlacesCard = () => {
  return (
    <Card className="space-y-3 p-4">
      <h1 className="text-lg font-bold">Nearby Places</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NearbyPlaceBadge name="Mall" walkTime="5 min" carTime="2 min" />
        <NearbyPlaceBadge name="University" walkTime="15 min" carTime="5 min" />
        <NearbyPlaceBadge name="Train Station" carTime="10 min" />
        <NearbyPlaceBadge name="Grocery Store" walkTime="8 min" />
      </div>
    </Card>
  )
}
