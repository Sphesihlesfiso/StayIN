
import { Property } from "@/types/property"
import {crudOperations} from "@/lib/generalCrudeOperations"
// Interacts cleanly with your /api base url mapping
const propertyClient = crudOperations<Property>("property")
const propertyClientV0 = crudOperations<Property>("")

export const getAllProperties = propertyClientV0.getAll
export const getPropertyById = propertyClient.getById
export const createProperty = propertyClient.create
export const updateProperty = propertyClient.update
export const deleteProperty = propertyClient.delete
