import { User } from "../User/user"

export type Comment= {
    id:number,
    content:string,
    rating:number,
    commenterId:number,
    propertyId:number,
    User:User,
    timestamp:string
}