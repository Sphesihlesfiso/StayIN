import { CheckCircle } from "lucide-react"
import { Card } from "./ui/card"
import { LandLordCardProps } from "@/types/CardProps"


export const LandLordCard = ({
  initial,
  name,
  trustScore,
  memberSince,
}: LandLordCardProps) => {
  return (
    <Card className="border-r-2 p-3">
      <div className="flex items-center gap-3">
        {/* Initial / Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-bold">
          {initial}
        </div>

        {/* Host Info */}
        <div className="flex flex-col">
          <h1 className="flex items-center gap-1 font-black">
            Hosted by {name} <CheckCircle className="h-4 w-4 text-green-500" />
          </h1>
          <p className="text-sm text-gray-600">
            ⭐ {trustScore} Landlord Trust Score · Member since {memberSince}
          </p>
        </div>
      </div>
    </Card>
  )
}
