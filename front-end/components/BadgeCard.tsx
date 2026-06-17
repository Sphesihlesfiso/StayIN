import { Badge } from "@/components/ui/badge"
import { Wifi } from "lucide-react"
import { BadgeCardProps } from "@/types/Components/CardProps"

export const BadgeCard = ({
  title,
  variant = "default",
  icon: Icon = Wifi,
  label,
}: BadgeCardProps) => {
  return (
    <div className="space-y-1">
      <h1 className="font-bold">{title}</h1>
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-4 w-4" />
        {label}
      </Badge>
    </div>
  )
}
