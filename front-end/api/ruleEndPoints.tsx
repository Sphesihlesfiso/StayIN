import { Rule } from "@/types/PropertyRule";
import {crudOperations} from "@/lib/generalCrudeOperations"

const ruleClient = crudOperations<Rule>(":propertyId/rules")


export const getAllrules = ruleClient.getAll
export const getruleById = ruleClient.getById
export const createrule = ruleClient.create
export const updaterule = ruleClient.update
export const deleterule = ruleClient.delete