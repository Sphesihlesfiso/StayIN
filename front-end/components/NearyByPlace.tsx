
import { NearbyPlaceProps } from "@/types/Components/CardProps"
export const NearbyPlaceBadge = ({ name, type, distance }: NearbyPlaceProps) => {
  return (
    <div className="flex gap-1">
      <div>{type} </div>|
      <div>{name}</div>|
      <div>{distance} km away</div>
    </div>
  )

}


