import { User } from "../User/user"

export type Comment= {
    id:number,
    rating:number,
    content:string,
    
    propertyId:number,
    User:User,
    timestamp:string
}