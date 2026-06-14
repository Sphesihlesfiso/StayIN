import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  successResponse,
  validationError,
  errorResponse,
} from "../utils/apiResponce";
import {
  createNearbyPlaceSchema,
  updateNearbyPlaceSchema,
} from "../../schema/nearbyPlace.schema";
import {
  getAllNearbyPlaces,
  getNearbyPlaceById,
  addNearbyPlace,
  updateNearbyPlace,
  deleteNearbyPlace,
} from "../services/nearby.service";

// GET /properties/:propertyId/nearby-places
export const fetchAllNearbyPlaces = asyncHandler(
  async (req: Request, res: Response) => {
    const propertyId = Number(req.params.propertyId);
    const places = await getAllNearbyPlaces(propertyId);

    res
      .status(200)
      .json(successResponse(places, "Nearby places fetched successfully"));
  },
);

// GET /properties/:propertyId/nearby-places/:placeId
export const fetchNearbyPlaceById = asyncHandler(
  async (req: Request, res: Response) => {
    const placeId = Number(req.params.placeId);
    const place = await getNearbyPlaceById(placeId);

    if (!place) {
      return res.status(404).json(errorResponse("Nearby place not found"));
    }

    res
      .status(200)
      .json(successResponse(place, "Nearby place fetched successfully"));
  },
);

// POST /properties/:propertyId/nearby-places
export const postNearbyPlace = asyncHandler(
  async (req: Request, res: Response) => {
    // Merge the body with the propertyId from the URL for Zod validation
    const inputData = {
      ...req.body,
      nearByPlaceId: Number(req.params.propertyId),
    };

    const parsed = createNearbyPlaceSchema.safeParse(inputData);

    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues));
    }

    // Passing the validated data directly to the service
    const newPlace = await addNearbyPlace(parsed.data);
    res
      .status(201)
      .json(successResponse(newPlace, "Nearby place created successfully"));
  },
);

// PATCH /properties/:propertyId/nearby-places/:placeId
export const updateNearbyPlaceById = asyncHandler(
  async (req: Request, res: Response) => {
    const placeId = Number(req.params.placeId);
    const parsed = updateNearbyPlaceSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(validationError(parsed.error.issues));
    }

    // Ensure there is actually data being sent to update
    if (Object.keys(parsed.data).length === 0) {
      return res
        .status(400)
        .json(errorResponse("No valid fields provided for update"));
    }

    const updatedPlace = await updateNearbyPlace(placeId, parsed.data);
    res
      .status(200)
      .json(successResponse(updatedPlace, "Nearby place updated successfully"));
  },
);

// DELETE /properties/:propertyId/nearby-places/:placeId
export const deleteNearbyPlaceById = asyncHandler(
  async (req: Request, res: Response) => {
    const placeId = Number(req.params.placeId);
    await deleteNearbyPlace(placeId);

    res
      .status(200)
      .json(successResponse(null, "Nearby place deleted successfully"));
  },
);
