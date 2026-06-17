import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getAllNearbyPlaces,
  getNearbyPlaceById,
  createNearbyPlace,
  updateNearbyPlace,
  deleteNearbyPlace,
} from "@/api/nearbyEndPoints"
import { NearbyPlace } from "@/types/nearbyPlace"

export const useNearbyPlace = (id: number) =>
  useQuery({
    queryKey: ["nearbyPlace", id],
    queryFn: () => getNearbyPlaceById(id),
  })

export const useNearbyPlaces = () =>
  useQuery({
    queryKey: ["nearbyPlaces"],
    queryFn: getAllNearbyPlaces,
  })

export const useCreateNearbyPlace = () =>
  useMutation({
    mutationFn: createNearbyPlace,
  })

export const useUpdateNearbyPlace = () =>
  useMutation<NearbyPlace, Error, { id: number; payload: NearbyPlace }>({
    mutationFn: ({ id, payload }) => updateNearbyPlace(id, payload),
  })

export const useDeleteNearbyPlace = () =>
  useMutation({
    mutationFn: (id: number) => deleteNearbyPlace(id),
  })
