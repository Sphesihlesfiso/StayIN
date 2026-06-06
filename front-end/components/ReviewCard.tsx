import { Card } from "@/components/ui/card"

type ReviewCardProps = {
  initial: string
  name: string
  date: string
  rating: number
  comment: string
}

export const ReviewCard = ({
  initial,
  name,
  date,
  rating,
  comment,
}: ReviewCardProps) => {
  return (
    <Card>
      <div className="grid grid-rows-1 border-r-2 p-2.5">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex justify-between">
            <div className="m-3 text-lg font-bold">{initial}</div>
            <div className="flex flex-col">
              <h1 className="font-semibold">{name}</h1>
              <h1 className="text-sm text-gray-500">{date}</h1>
            </div>
          </div>
          <div>
            <p className="text-sm">⭐ {rating}/5</p>
          </div>
        </div>

        {/* Body */}
        <div className="text-sm text-gray-700">{comment}</div>
      </div>
    </Card>
  )
}
