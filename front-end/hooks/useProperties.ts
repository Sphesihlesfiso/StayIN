import { useQuery } from "@tanstack/react-query"
import { getAllProperties } from "@/api/propertyEndPoints"
export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  })
}
