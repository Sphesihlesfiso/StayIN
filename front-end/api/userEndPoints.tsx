import { User } from "@/types/User/user"
import { crudOperations } from "@/lib/generalCrudeOperations"

const userClient = crudOperations<User>("user")

export const getUserById = userClient.getById
export const updateUser = userClient.update
export const deleteUser = userClient.delete
export const createUser = userClient.create
export const getAllUsers = userClient.getAll
