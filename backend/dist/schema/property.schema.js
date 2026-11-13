"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertySearchSchema = exports.propertyIdSchema = exports.updatePropertySchema = exports.createPropertySchema = void 0;
const zod_1 = require("zod");
const photo = zod_1.z.object({
    src: zod_1.z
        .string()
        .max(1500000)
        .regex(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/),
    alt: zod_1.z.string().trim().min(5).max(180),
    thumbnail: zod_1.z
        .string()
        .max(200000)
        .regex(/^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/)
        .optional(),
});
exports.createPropertySchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(3).max(120),
    address: zod_1.z.string().trim().min(3).max(240),
    town: zod_1.z.string().trim().min(2).max(100),
    suburb: zod_1.z.string().trim().min(2).max(100),
    about: zod_1.z.string().trim().min(20).max(5000),
    rentBasis: zod_1.z.enum(["PERSON", "ROOM", "PROPERTY"]).nullable().optional(),
    availability: zod_1.z
        .enum(["NOW", "FROM_DATE", "ON_ENQUIRY"])
        .nullable()
        .optional(),
    availableFrom: zod_1.z.iso.date().nullable().optional(),
    minimumLeaseMonths: zod_1.z.number().int().min(1).max(120).nullable().optional(),
    roomsAvailable: zod_1.z.number().int().min(1).max(1000).nullable().optional(),
    furnishing: zod_1.z
        .enum(["FURNISHED", "PARTLY_FURNISHED", "UNFURNISHED"])
        .nullable()
        .optional(),
    bathroom: zod_1.z.enum(["PRIVATE", "SHARED"]).nullable().optional(),
    wifiIncluded: zod_1.z.boolean().nullable().optional(),
    waterIncluded: zod_1.z.boolean().nullable().optional(),
    electricityIncluded: zod_1.z.boolean().nullable().optional(),
    gasIncluded: zod_1.z.boolean().nullable().optional(),
    rent: zod_1.z.number().positive().max(1000000),
    deposit: zod_1.z.number().min(0).max(1000000),
    adminFee: zod_1.z.number().min(0).max(1000000).default(0),
    gas: zod_1.z.number().int().min(0).max(100000).default(0),
    water: zod_1.z.number().int().min(0).max(100000).default(0),
    electricity: zod_1.z.number().int().min(0).max(100000).default(0),
    nsfasAccredited: zod_1.z.boolean().default(false),
    genderRestriction: zod_1.z.enum(["Male", "Female", "Mixed"]),
    propertyType: zod_1.z.enum([
        "SingleBackroom",
        "SharingBackroom",
        "Apartment",
        "SharingApartment",
        "SingeFlat",
        "Flat",
    ]),
    status: zod_1.z.enum(["DRAFT", "PUBLISHED", "UNAVAILABLE"]),
    photos: zod_1.z.array(photo).max(6),
    amenities: zod_1.z.array(zod_1.z.string().trim().min(1).max(100)).max(30),
    nearbyPlaces: zod_1.z
        .array(zod_1.z
        .object({
        name: zod_1.z.string().trim().min(2).max(120),
        type: zod_1.z.string().trim().min(2).max(60),
        walkingMinutes: zod_1.z.number().int().min(0).max(1440).nullable(),
        drivingMinutes: zod_1.z.number().int().min(0).max(1440).nullable(),
        distance: zod_1.z.number().nonnegative().nullable().optional(),
    })
        .refine((v) => v.walkingMinutes !== null ||
        v.drivingMinutes !== null ||
        v.distance != null, { message: "Add a walking or driving time for this place." }))
        .max(20)
        .optional(),
    rules: zod_1.z.array(zod_1.z.string().trim().min(1).max(300)).max(20),
})
    .superRefine((v, ctx) => {
    if (v.availability === "FROM_DATE" && !v.availableFrom)
        ctx.addIssue({
            code: "custom",
            path: ["availableFrom"],
            message: "Choose the earliest move-in date.",
        });
    if (v.availableFrom && v.availability !== "FROM_DATE")
        ctx.addIssue({
            code: "custom",
            path: ["availableFrom"],
            message: "Choose 'From a date' to set a move-in date.",
        });
    for (const key of ["water", "electricity", "gas"]) {
        if (v[`${key}Included`] === true && v[key] > 0)
            ctx.addIssue({
                code: "custom",
                path: [key],
                message: "This is included in the rent. Set the additional estimate to zero, or change what is included.",
            });
    }
    if (v.status === "PUBLISHED" && !v.photos.length)
        ctx.addIssue({
            code: "custom",
            path: ["photos"],
            message: "Add at least one photo before publishing.",
        });
    // Check file signatures rather than trusting a client-provided MIME type.
    v.photos.forEach((p, index) => {
        const bytes = Buffer.from(p.src.split(",")[1], "base64");
        const valid = p.src.startsWith("data:image/jpeg")
            ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
            : p.src.startsWith("data:image/png")
                ? bytes
                    .subarray(0, 8)
                    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
                : bytes.toString("ascii", 0, 4) === "RIFF" &&
                    bytes.toString("ascii", 8, 12) === "WEBP";
        const thumb = p.thumbnail
            ? Buffer.from(p.thumbnail.split(",")[1], "base64")
            : null;
        const thumbValid = !thumb || (thumb[0] === 255 && thumb[1] === 216 && thumb[2] === 255);
        if (!valid || !thumbValid)
            ctx.addIssue({
                code: "custom",
                path: ["photos", index],
                message: "Invalid image file.",
            });
    });
});
// Updates submit the entire editor payload so related fields are validated together.
exports.updatePropertySchema = exports.createPropertySchema;
exports.propertyIdSchema = zod_1.z.coerce.number().int().positive();
exports.propertySearchSchema = zod_1.z.object({
    q: zod_1.z.string().trim().max(100).optional(),
    town: zod_1.z.string().trim().min(2).max(100).optional(),
    suburb: zod_1.z.string().trim().min(2).max(100).optional(),
    nsfasAccredited: zod_1.z
        .enum(["true", "false"])
        .transform((v) => v === "true")
        .optional(),
    type: zod_1.z
        .enum([
        "SingleBackroom",
        "SharingBackroom",
        "Apartment",
        "SharingApartment",
        "SingeFlat",
        "Flat",
    ])
        .optional(),
    rentBasis: zod_1.z.enum(["PERSON", "ROOM", "PROPERTY"]).optional(),
    furnishing: zod_1.z
        .enum(["FURNISHED", "PARTLY_FURNISHED", "UNFURNISHED"])
        .optional(),
    bathroom: zod_1.z.enum(["PRIVATE", "SHARED"]).optional(),
    wifiIncluded: zod_1.z
        .enum(["true", "false"])
        .transform((v) => v === "true")
        .optional(),
    moveInBy: zod_1.z.iso
        .date()
        .refine((value) => value >=
        new Intl.DateTimeFormat("en-CA", {
            timeZone: "Africa/Johannesburg",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date()), "Choose today or a future move-in date.")
        .optional(),
    maxRent: zod_1.z.coerce.number().positive().optional(),
    page: zod_1.z.coerce.number().int().positive().max(10000).default(1),
});
