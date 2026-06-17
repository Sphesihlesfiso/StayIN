import { Amenity } from "@/types/amenity";
import {crudOperations} from "@/lib/generalCrudeOperations"

const AmenitytClient = crudOperations<Amenity>("property/:propertyId/amenities")


export const getAllAmenities = AmenitytClient.getAll
export const getAmenityById = AmenitytClient.getById
export const createAmenity = AmenitytClient.create
export const updateAmenity = AmenitytClient.update
export const deleteAmenity = AmenitytClient.delete