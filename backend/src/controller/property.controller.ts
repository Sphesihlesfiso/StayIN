import { Request,Response } from "express";
import { getAllProperties } from "../services/property.service";
export const fetchAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await getAllProperties();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties", error);
    res.status(500).json({ error: "Internal server error" });
  }
};