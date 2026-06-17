
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
  icon?: ""
  label: string
}

export type NearbyPlaceProps = {
  name: string
  type:string
  distance:string
}