
import { Request, Response } from "express";
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  deletePropertyById,
  updateProperty,
  getAllbyId,
} from "../services/property.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse, errorResponse, validationError } from "../utils/apiResponce";
import {uploadImageToCloudflare} from "../utils/cloudfareImages"
const userId=4;
import {
  CreatePropertyInput,
  createPropertySchema,
  updatePropertySchema,
} from "@shared/schema/property.schema";

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
export const getAllpropertiesByLandlord=asyncHandler(async(req:Request,res:Response)=>{
  const id = Number(req.params.id);
  const properties=await getAllbyId(id)
  res.status(200).json(successResponse(properties, "Properties found"));
})




export const uploadProperty = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("files:", (req.files as Express.Multer.File[] | undefined)?.length, "data:", typeof req.body?.data)
    // 1. The client sends the fields as a JSON string under "data"
    let raw: unknown;
    try {
      raw = JSON.parse(req.body?.data);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing JSON in 'data' field",
      });
    }

    // 2. Validate the parsed object
    const parsed = createPropertySchema.safeParse(raw);
    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues));
    }

    // 3. Upload all attached images to Cloudflare in parallel
    const files = (req.files as Express.Multer.File[]) ?? [];
    const uploadedImages = await Promise.all(
      files.map((file) => uploadImageToCloudflare(file))
    );

    // 4. userId from your auth middleware
    const userId = 4;
    const imageUrls = uploadedImages.map((img) => img.url);
    // 5. Save property + Cloudflare image references (id & url) in your DB
    const newProperty = await addProperty(parsed.data, userId, imageUrls);
    
    res.status(201).json(successResponse(newProperty, "Property created"));
  }
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
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
      return res.status(400).json({ success: false, message: "Invalid property id" })
    }

    // 1. Parse the JSON string from the multipart body
    let raw: unknown
    try {
      raw = JSON.parse(req.body?.data)
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing JSON in 'data' field",
      })
    }

    // 2. Validate
    const parsed = updatePropertySchema.safeParse(raw)
    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues))
    }
    const {availableFrom}=parsed.data
    
    console.log(`updated prop ${parsed}`)
    // 3. New images and removed image URLs
    const newFiles = (req.files as Express.Multer.File[]) ?? []
    let removedImages: string[] = []
    try {
      removedImages = JSON.parse(req.body?.removedImages ?? "[]")
    } catch {
      return res.status(400).json({ success: false, message: "Invalid 'removedImages'" })
    }

    // 4. Ownership check
    const userId = 4// however your auth attaches it
    const updatedProperty = await updateProperty(id,parsed.data, newFiles, removedImages)
    if (!updatedProperty) {
      return res.status(404).json({ success: false, message: "Property not found" })
    }

    res.status(200).json(successResponse(updatedProperty, "Property updated."))
  }
)