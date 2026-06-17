import { useQuery, useMutation } from "@tanstack/react-query"
import {
  getAllRules,
  getRuleById,
  createRule,
  updateRule,
  deleteRule,
} from "@/api/ruleEndPoints"
import { Rule } from "@/types/Property/PropertyRule"

export const useRule = (id: number) =>
  useQuery({
    queryKey: ["rule", id],
    queryFn: () => getRuleById(id),
  })

export const useRules = () =>
  useQuery({
    queryKey: ["rules"],
    queryFn: getAllRules,
  })

export const useCreateRule = () =>
  useMutation({
    mutationFn: createRule,
  })

export const useUpdateRule = () =>
  useMutation<Rule, Error, { id: number; payload: Rule }>({
    mutationFn: ({ id, payload }) => updateRule(id, payload),
  })

export const useDeleteRule = () =>
  useMutation({
    mutationFn: (id: number) => deleteRule(id),
  })
