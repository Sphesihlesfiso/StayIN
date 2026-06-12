import { User } from "./user"

export type Comment= {
    id:number,
    content:string,
    rating:number,
    commenterId:number,
    propertyId:number,
    User:User,
    timestamp:string
}