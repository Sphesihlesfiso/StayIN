import { Request, Response } from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
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
    const propertyData = req.body;
    console.log("BODY:", JSON.stringify(propertyData, null, 2));
    console.log(propertyData);
    if (!propertyData || Object.keys(propertyData).length === 0) {
      return res.status(400).json({ message: "No input found" });
    }

    const newProperty = await addProperty(propertyData);
    res.status(201).json(newProperty);
  },
);
