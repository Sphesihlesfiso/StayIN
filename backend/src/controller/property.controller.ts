import { Request, Response } from "express";
import {
  getAllProperties,
  getPropertyById,
} from "../services/property.service";
export const fetchAllProperties = async (req: Request, res: Response) => {
  try {
    
    const properties = await getAllProperties();
    res.status(200).json(properties)
    
  } catch (error) {
    console.error("Error fetching properties", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUniqueProperty = async (req: Request, res: Response) => {
  const  id  = Number(req.params.id);
  try {
    const property = await getPropertyById(id);
   
    if (!property){
      res.status(404).json({message:"Property not found."})
    }else{
      res.json(property);
    }
  } catch (error) {
    console.error("Error fetching property", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
