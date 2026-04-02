import { Request, Response } from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  deletePropertyById,
  updateProperty,
} from "../services/property.service";
import { asyncHandler } from "../utils/asyncHandler";

export const fetchAllProperties = asyncHandler(
  async (req: Request, res: Response) => {
    const properties = await getAllProperties();
    res.status(200).json(properties);
  },
);
export const getUniqueProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const property = await getPropertyById(id);
    if (!property) {
      res.status(404).json({ message: "Property not found." });
    } else {
      res.status(200).json(property);
    }
  },
);
export const uploadProperty = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body);

    const propertyData = req.body;

    if (!propertyData || Object.keys(propertyData).length === 0) {
      return res.status(400).json({ message: "No input found" });
    }
    await addProperty(propertyData);
    res.status(201).json({ message: "New property added." });
  },
);
export const deleteProperty = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await deletePropertyById(id);
    res.status(202).json({ message: "Property has been deleted." });
  },
);
export const updatePropertyById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body;
    
    const updatedProperty = await updateProperty(data, id);
    res.json({ data:updatedProperty });
  },
);
