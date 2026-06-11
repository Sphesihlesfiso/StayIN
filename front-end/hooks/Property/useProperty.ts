import { getPropertyById } from "@/api/propertyEndPoints";
import { useQuery } from "@tanstack/react-query";
export const useProperty = (id:number)=>{
    return useQuery({
        queryKey:["property",id],
        queryFn:()=>getPropertyById(id)
    })
}