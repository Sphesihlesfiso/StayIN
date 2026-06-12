import { LucideIcon } from "lucide-react"
export type LandLordCardProps = {
  initial: string
  name: string
  trustScore: number
  memberSince: string
}

export type BadgeCardProps = {
  title: string
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "ghost"
    | "link"
  icon?: LucideIcon
  label: string
}

export type NearbyPlaceProps = {
  name: string
  walkTime?: string
  carTime?: string
}