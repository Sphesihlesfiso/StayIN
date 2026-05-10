import { safeParse } from './../../node_modules/zod/src/v4/classic/parse';
import { Request, Response } from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  deletePropertyById,
  updateProperty,
} from "../services/property.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse, errorResponse, validationError } from "../utils/apiResponce";

import {
  CreatePropertyInput,
  createPropertySchema,
  updatePropertySchema,
} from "../../schema/property.schema";

export const fetchAllProperties = asyncHandler(
  async (req: Request, res: Response) => {
    const properties = await getAllProperties();
    res.status(200).json(successResponse(properties, "Properties fetched"));
  },
);

export const getUniqueProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const property = await getPropertyById(id);
    res.status(200).json(successResponse(property, "Property found"));
  },
);

export const uploadProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = createPropertySchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json(validationError(parsed.error.issues));
    }
    const newProperty = await addProperty(parsed.data);
    res.status(201).json(successResponse(newProperty, "Property created"));
  },
);

export const deleteProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await deletePropertyById(id);
    res.status(204).send();
  },
);

export const updatePropertyById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    
    const parsed = updatePropertySchema.safeParse(req.body);
    if (!parsed.success){
      return res.status(400).json(validationError(parsed.error.issues))
    }
    const updatedProperty = await updateProperty(id, parsed.data);
    res.status(200).json(successResponse(updatedProperty, "Property parsed"));
  },
);
