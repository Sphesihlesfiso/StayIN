import { Amneity } from "./amenity"
import { Comment } from "./comment"

export type PropertyType = "Backroom" | "Apartment" 
export type GenderRestriction = "Male" | "Female" | "Mixed"

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
