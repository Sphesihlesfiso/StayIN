import { User } from "@/types/user";
import { crudOperations } from "@/lib/generalCrudeOperations";
const authClient=crudOperations<User>("")