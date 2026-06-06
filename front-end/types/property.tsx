import { Amneity } from "./amenity"
import { Comment } from "./comment"

export type PropertyType = "SINGLE" | "SHARING"
export type GenderRestriction = "MALE_ONLY" | "FEMALE_ONLY" | "MIXED"

export type Property = {
  id: number
  name: string
  address: string
  rent: number
  deposit: number | null
  nsfasAccredited: boolean
  gas: number | null
  water: number | null
  electricity: number | null
  about: string
  rules: string
  landlordId: number
  suburb: string
  town: string
  genderRestriction: GenderRestriction
  propertyType: PropertyType
  createdAt: string
  updatedAt: string
  amenities: Amneity[]
  comments:Comment[]
}
export type BadgeCardProps ={
    title:string
    variant:"ghost" |"outline"
}