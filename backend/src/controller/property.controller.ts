import { Request, Response } from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  deletePropertyById,
  updateProperty,
} from "../services/property.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse, errorResponse } from "../utils/apiResponce";
import {
  CreatePropertyInput,
  createPropertySchema,
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
    const propertyData = createPropertySchema.safeParse(req.body);

    if (!propertyData.success) {
      return res
        .status(400)
        .json(errorResponse(propertyData.error.message));
    }
    const newProperty = await addProperty(propertyData.data);
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
    const data = req.body;
    const updatedProperty = await updateProperty(id, data);
    res.status(200).json(successResponse(updatedProperty, "Property updated"));
  },
);
