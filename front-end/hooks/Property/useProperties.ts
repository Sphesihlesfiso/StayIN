import { useQuery } from "@tanstack/react-query"
import { getAllProperties } from "@/api/propertyEndPoints"
export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  })
}
export const useGetItem = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>
) => {
  return useQuery({
    queryKey,
    queryFn,
  })
}
