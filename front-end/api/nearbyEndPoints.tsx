import { NearbyPlace } from "@/types/nearbyPlace"
import {crudOperations} from "@/lib/generalCrudeOperations"

const NearbyPlaceClient = crudOperations<NearbyPlace>(":propertyId/nearby-places")


export const getAllNearbyPlaces = NearbyPlaceClient.getAll
export const getNearbyPlaceById = NearbyPlaceClient.getById
export const createNearbyPlace = NearbyPlaceClient.create
export const updateNearbyPlace = NearbyPlaceClient.update
export const deleteNearbyPlace = NearbyPlaceClient.delete