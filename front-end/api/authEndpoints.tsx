import { User } from "@/types/User/user"
import { crudOperations } from "@/lib/generalCrudeOperations"
const authClient = crudOperations<User>("")
