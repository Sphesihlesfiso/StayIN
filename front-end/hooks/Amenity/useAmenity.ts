import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} from "@/api/amenityEndPoints"
import { Amenity } from "@/types/Property/amenity"

export const useAmenity = (id: number) =>
  useQuery({
    queryKey: ["amenity", id],
    queryFn: () => getAmenityById(id),
  })

export const useAmenities = () =>
  useQuery({
    queryKey: ["amenities"],
    queryFn: getAllAmenities,
  })

export const useCreateAmenity = () =>
  useMutation({
    mutationFn: createAmenity,
  })

export const useUpdateAmenity = () =>
  useMutation<Amenity, Error, { id: number; payload: Amenity }>({
    mutationFn: ({ id, payload }) => updateAmenity(id, payload),
  })

export const useDeleteAmenity = () =>
  useMutation({
    mutationFn: (id: number) => deleteAmenity(id),
  })
