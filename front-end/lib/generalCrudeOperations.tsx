import api from "@/lib/axios"
import type { ApiResponse } from "@/types/ApiResponse"

export function crudOperations<T>(resourceUrl: string) {
  return {
    getAll: async (): Promise<T[]> => {
      const result = await api.get<ApiResponse<T[]>>(`/${resourceUrl}`)
      if (!result.data.success) throw new Error(result.data.message)
      return result.data.data
    },

    getById: async (id: string | number): Promise<T> => {
      const result = await api.get<ApiResponse<T>>(`/${resourceUrl}/${id}`)
      if (!result.data.success) throw new Error(result.data.message)
      return result.data.data
    },

    create: async (payload: Partial<T>): Promise<T> => {
      const result = await api.post<ApiResponse<T>>(`/${resourceUrl}`, payload)
      if (!result.data.success) throw new Error(result.data.message)
      return result.data.data
    },

    update: async (id: string | number, payload: Partial<T>): Promise<T> => {
      const result = await api.patch<ApiResponse<T>>(
        `/${resourceUrl}/${id}`,
        payload
      )
      if (!result.data.success) throw new Error(result.data.message)
      return result.data.data
    },

    delete: async (id: string | number): Promise<void> => {
      await api.delete(`/${resourceUrl}/${id}`)
    },
  }
}
