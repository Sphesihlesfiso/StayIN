import { User } from "@/types/user";
import {crudOperations} from "@/lib/generalCrudeOperations"

const userClient = crudOperations<User>("user")



export const getuserById = userClient.getById
export const updateuser = userClient.update
export const deleteuser = userClient.delete