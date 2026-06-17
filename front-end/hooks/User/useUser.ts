import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "@/api/userEndPoints"
import { User } from "@/types/user"

export const useUser = (id: number) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  })

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  })

export const useCreateUser = () =>
  useMutation({
    mutationFn: createUser,
  })

export const useUpdateUser = () =>
  useMutation<User, Error, { id: number; payload: User }>({
    mutationFn: ({ id, payload }) => updateUser(id, payload),
  })

export const useDeleteUser = () =>
  useMutation({
    mutationFn: (id: number) => deleteUser(id),
  })
