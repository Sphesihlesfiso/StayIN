
import { Property } from "@/types/Property/property"
import {crudOperations} from "@/lib/generalCrudeOperations"
// Interacts cleanly with your /api base url mapping
const propertyClient = crudOperations<Property>("property")
const propertyClientHome = crudOperations<Property>("")

export const getAllProperties = propertyClientHome.getAll
export const getPropertyById = propertyClient.getById
export const createProperty = propertyClient.create
export const updateProperty = propertyClient.update
export const deleteProperty = propertyClient.delete
