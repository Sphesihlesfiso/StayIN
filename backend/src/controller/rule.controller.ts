import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  successResponse,
  validationError,
  errorResponse,
} from "../utils/apiResponce";
import { createRuleSchema, UpdateRuleInput, updateRuleSchema } from '../../schema/rule.schema';
import {
  getAllRules,
  getRuleById,
  addRule,
  updateRule,
  deleteRule,
} from "../services/rule.service";

export const fetchAllRules = asyncHandler(
  async (req: Request, res: Response) => {
    const propertyId = Number(req.params.propertyId);
    const rules = await getAllRules(propertyId);

    res.status(200).json(successResponse(rules, "Rules fetched successfully"));
  },
);

export const fetchRuleById = asyncHandler(
  async (req: Request, res: Response) => {
    const ruleId = Number(req.params.ruleId);
    const rule = await getRuleById(ruleId);

    if (!rule) {
      // Return early if it doesn't exist so we don't send a null success
      return res.status(404).json(errorResponse("Rule not found"));
    }

    res.status(200).json(successResponse(rule, "Rule fetched successfully"));
  },
);

export const postRule = asyncHandler(async (req: Request, res: Response) => {
  // We merge the request body with the propertyId from the URL
  const inputData = {
    ...req.body,
    propertyId: Number(req.params.propertyId),
  };

  const parsed = createRuleSchema.safeParse(inputData);

  if (!parsed.success) {
    return res.status(400).json(validationError(parsed.error.issues));
  }

  const newRule = await addRule(parsed.data.propertyId, parsed.data.content);
  res.status(201).json(successResponse(newRule, "Rule created successfully"));
});

export const updateRuleById = asyncHandler(
  async (req: Request, res: Response) => {
    const ruleId = Number(req.params.ruleId);
    const parsed = updateRuleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues));
    }

    // Because updateRuleSchema is partial(), content could technically be undefined
    if (!parsed.data.content) {
      return res
        .status(400)
        .json(errorResponse("Content is required to update a rule"));
    }

    const updatedRule = await updateRule(ruleId, parsed.data.content);
    res
      .status(200)
      .json(successResponse(updatedRule, "Rule updated successfully"));
  },
);

export const deleteRuleById = asyncHandler(
  async (req: Request, res: Response) => {
    const ruleId = Number(req.params.ruleId);
    await deleteRule(ruleId);

    res.status(200).json(successResponse(null, "Rule deleted successfully"));
  },
);
