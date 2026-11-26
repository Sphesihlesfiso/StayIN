
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
const userId=4;
import {
  CreatePropertyInput,
  createPropertySchema,
  updatePropertySchema,
} from "@shared/schema/property.schema";
import multer from "multer"
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
    // 1. The client sends the fields as a JSON string under "data"
   
    let raw: unknown
    try {
      raw = JSON.parse(req.body?.data)

    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing JSON in 'data' field",
      })
    }

    // 2. Validate the parsed object
    const parsed = createPropertySchema.safeParse(raw)
    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues))
    }

    // 3. Images (empty array if none were selected)
    const files = (req.files as Express.Multer.File[]) ?? []

    // 4. userId must come from your auth middleware
    const userId = 4 // adjust to however your auth attaches the user

    const newProperty = await addProperty(parsed.data, userId, files)
    res.status(201).json(successResponse(newProperty, "Property created"))
  }
)
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
    res.status(200).json(successResponse(updatedProperty, "Property updated."));
  },
);
