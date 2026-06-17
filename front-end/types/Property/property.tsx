import { User } from "../User/user"
import { Amenity } from "./amenity"
import { Comment } from "./comment"
import { NearbyPlace } from "./nearbyPlace"
import { Rule } from "./PropertyRule"

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
  rules: Rule[]

  landlordId: number
  suburb: string
  town: string
  genderRestriction: GenderRestriction
  propertyType: PropertyType
  createdAt: string
  updatedAt: string
  User:User
  NearbyPlaces: NearbyPlace[]
  Amenities: Amenity[]
  Comments: Comment[]
}
