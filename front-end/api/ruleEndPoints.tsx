import { Rule } from "@/types/Property/PropertyRule"
import { crudOperations } from "@/lib/generalCrudeOperations"

const ruleClient = crudOperations<Rule>("property/:propertyId/rules")

export const getAllRules = ruleClient.getAll
export const getRuleById = ruleClient.getById
export const createRule = ruleClient.create
export const updateRule = ruleClient.update
export const deleteRule = ruleClient.delete
