// controllers/amenity.controller.ts
import { asyncHandler } from "../utils/asyncHandler";
import {
  getAllAmenities,
  getAmenityById,
  addAmenity,
  deleteAmenity,
  updateAmenity,
} from "../services/amenity.service";
import { Request, Response } from "express";
import {
  successResponse,
  errorResponse,
  validationError,
} from "../utils/apiResponce";
import {
  createAmenitySchema,
  updateAmenitySchema,
} from "../../schema/amenity.schema";

export const fetchAllAmenities = asyncHandler(
  async (req: Request, res: Response) => {
    const amenities = await getAllAmenities();
    res.status(200).json(successResponse(amenities, "Amenities fetched"));
  },
);

export const fetchAmenityById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(errorResponse("Invalid id"));
    const amenity = await getAmenityById(id);
    res.status(200).json(successResponse(amenity, "Amenity found"));
  },
);

export const postAmenity = asyncHandler(async (req: Request, res: Response) => {
  const parsed = createAmenitySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(validationError(parsed.error.issues));
  }
  const amenity = await addAmenity(parsed.data);
  res.status(201).json(successResponse(amenity, "Amenity created"));
});

export const deleteAmenityById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(errorResponse("Invalid id"));
    await deleteAmenity(id);
    res.status(204).send();
  },
);

export const updateAmenityById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json(errorResponse("Invalid id"));
    const parsed = updateAmenitySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues));
    }
    const updatedAmenity = await updateAmenity(id, parsed.data);
    res.status(200).json(successResponse(updatedAmenity, "Amenity updated"));
  },
);
