import { createProperty, deleteProperty, getPropertyById, updateProperty } from "@/api/propertyEndPoints"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllProperties } from "@/api/propertyEndPoints"
import { Property } from "@/types/Property/property"
export const useProperty = (id: number) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
  })
}

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  })
}
export const useCreateProperty = () => {
  return useMutation({
    mutationFn: createProperty,
  })
}
export const useUpdateProperty = ()=>{
    return useMutation<Property, Error, { id:number; payload:Property }>({
      mutationFn: ({id,payload}) => updateProperty(id, payload),
    })
}
export const useDeleteProperty=() =>{
    return useMutation({
      mutationFn: (id: number) => deleteProperty(id),
    })
}