import { Amenity } from "@/types/amenity";
import {crudOperations} from "@/lib/generalCrudeOperations"

const AmenitytClient = crudOperations<Amenity>(":propertyId/amenities")


export const getAllAmenities = AmenitytClient.getAll
export const getAmenitytById = AmenitytClient.getById
export const createAmenity = AmenitytClient.create
export const updateAmenity = AmenitytClient.update
export const deleteAmenity = AmenitytClient.delete