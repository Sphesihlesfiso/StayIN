import { User } from "../User/user"

export type Comment= {
    id:number,
    rating:number,
    content:string,
    commenterId:number,
    propertyId:number,
    User:User,
    timestamp:string
}