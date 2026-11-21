"use client"

import { useState, useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Upload,
  X,
  ImagePlus,
  MapPin,
  Home,
  Banknote,
  Wifi,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { provinces, ruleOptions, amenityOptions } from "../../assets/json-files"
// -----------------------------
// VALIDATION
// -----------------------------

const MAX_IMAGES = 10
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

const propertySchema = z.object({
  title: z.string().min(5, "Title must contain at least 5 characters"),
  description: z
    .string()
    .min(30, "Description must contain at least 30 characters"),

  propertyType: z.string().min(1, "Select a property type"),

  province: z.string().min(1, "Select a province"),
  city: z.string().min(1, "Enter a city"),
  suburb: z.string().min(1, "Enter a suburb"),
  address: z.string().min(1, "Enter the property address"),

  bedrooms: z.coerce.number().min(1, "At least 1 bedroom is required"),
  bathrooms: z.coerce.number().min(1, "At least 1 bathroom is required"),
  availableRooms: z.coerce
    .number()
    .min(1, "At least 1 available room is required"),

  monthlyRent: z.coerce.number().positive("Enter a valid rental amount"),
  deposit: z.coerce.number().min(0, "Deposit cannot be negative"),

  utilitiesIncluded: z.boolean(),

  genderPreference: z.string().min(1, "Select a preference"),
  studentFriendly: z.boolean(),
  nsfasAccepted: z.boolean(),

  amenities: z.array(z.string()),
  rules: z.array(z.string()),

  parking: z.boolean(),
  furnished: z.boolean(),

  availableFrom: z.string().min(1, "Select an availability date"),
})

export type PropertyFormValues = z.infer<typeof propertySchema>

interface PropertyFormProps {
  initialData?: Partial<PropertyFormValues>
  existingImages?: string[]
  mode: "create" | "edit"
  onSave: (
    data: PropertyFormValues,
    images: File[],
    removedImages: string[]
  ) => Promise<void>
}

// -----------------------------
// OPTIONS
// -----------------------------

const defaultFormValues: PropertyFormValues = {
  title: "",
  description: "",
  propertyType: "",
  province: "",
  city: "",
  suburb: "",
  address: "",
  bedrooms: 1,
  bathrooms: 1,
  availableRooms: 1,
  monthlyRent: 0,
  deposit: 0,
  utilitiesIncluded: false,
  genderPreference: "any",
  studentFriendly: true,
  nsfasAccepted: false,
  amenities: [],
  rules: [],
  parking: false,
  furnished: false,
  availableFrom: "",
}

// -----------------------------
// COMPONENT
// -----------------------------

export default function PropertyForm({
  initialData,
  existingImages = [],
  mode,
  onSave,
}: PropertyFormProps) {
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema) as never,
    defaultValues: {
      ...defaultFormValues,
      ...initialData,
    },
  })

  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [removedImages, setRemovedImages] = useState<string[]>([])

  const previewsRef = useRef<string[]>([])
  previewsRef.current = imagePreviews

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...defaultFormValues,
        ...initialData,
      })
    }
  }, [initialData, form])

  useEffect(() => {
    return () => {
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  // -----------------------------
  // IMAGE HANDLING
  // -----------------------------

  const activeExistingImages = existingImages.filter(
    (image) => !removedImages.includes(image)
  )
  const totalImageCount = activeExistingImages.length + images.length

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || [])
    const remaining = Math.max(0, MAX_IMAGES - totalImageCount)

    const validFiles = files
      .filter((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
      .slice(0, remaining)

    if (validFiles.length > 0) {
      const nextPreviews = validFiles.map((file) => URL.createObjectURL(file))
      setImages((previous) => [...previous, ...validFiles])
      setImagePreviews((previous) => [...previous, ...nextPreviews])
    }

    event.target.value = ""
  }

  function removeNewImage(index: number) {
    const targetPreview = imagePreviews[index]
    if (targetPreview) {
      URL.revokeObjectURL(targetPreview)
    }

    setImages((previous) => previous.filter((_, i) => i !== index))
    setImagePreviews((previous) => previous.filter((_, i) => i !== index))
  }

  function handleResetForm() {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url))
    setImages([])
    setImagePreviews([])
    setRemovedImages([])
    form.reset({
      ...defaultFormValues,
      ...initialData,
    })
  }

  // -----------------------------
  // SUBMISSION
  // -----------------------------

  async function handleSubmit(data: PropertyFormValues) {
    await onSave(data, images, removedImages)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      {/* HEADER */}

      <div className="space-y-2">
        <Badge variant="secondary">Landlord dashboard</Badge>

        <h1 className="text-3xl font-bold tracking-tight">
          {mode === "edit" ? "Edit property listing" : "List your property"}
        </h1>

        <p className="text-muted-foreground">
          {mode === "edit"
            ? "Update your accommodation details, pricing, or photos."
            : "Provide details about your accommodation to help tenants find their next home."}
        </p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* BASIC INFORMATION */}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <CardTitle>Basic information</CardTitle>
            </div>

            <CardDescription>
              Tell prospective tenants about your property.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="gap-5">
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Property title</FieldLabel>

                    <Input
                      id="title"
                      placeholder="e.g. Modern 2 Bedroom House in Stellenbosch"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">Description</FieldLabel>

                    <Textarea
                      id="description"
                      placeholder="Describe your property, rooms, surroundings and what makes it special..."
                      className="min-h-32 resize-none"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldDescription>Minimum 30 characters.</FieldDescription>

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="propertyType"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Property type</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="HOUSE">House</SelectItem>
                        <SelectItem value="APARTMENT">Apartment</SelectItem>
                        <SelectItem value="FLAT">Flat</SelectItem>
                        <SelectItem value="STUDENT_ACCOMMODATION">
                          Student accommodation
                        </SelectItem>
                        <SelectItem value="GUESTHOUSE">Guesthouse</SelectItem>
                        <SelectItem value="ROOM">Single room</SelectItem>
                        <SelectItem value="COTTAGE">Cottage</SelectItem>
                      </SelectContent>
                    </Select>

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        {/* LOCATION */}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <CardTitle>Location</CardTitle>
            </div>

            <CardDescription>Where is your property located?</CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <Controller
                control={form.control}
                name="province"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Province</FieldLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>

                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              {(
                [
                  ["city", "City / Town", "e.g. Stellenbosch"],
                  ["suburb", "Suburb", "e.g. Idas Valley"],
                  ["address", "Street address", "Street and house number"],
                ] as const
              ).map(([name, label, placeholder]) => (
                <Controller
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={name}>{label}</FieldLabel>

                      <Input
                        id={name}
                        placeholder={placeholder}
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </CardContent>
        </Card>

        {/* PROPERTY DETAILS */}

        <Card>
          <CardHeader>
            <CardTitle>Property details</CardTitle>

            <CardDescription>
              Provide information about the accommodation.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <FieldGroup className="grid gap-5 sm:grid-cols-3">
              {(
                [
                  ["bedrooms", "Bedrooms"],
                  ["bathrooms", "Bathrooms"],
                  ["availableRooms", "Available rooms"],
                ] as const
              ).map(([name, label]) => (
                <Controller
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={name}>{label}</FieldLabel>

                      <Input
                        id={name}
                        type="number"
                        min={1}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={Number.isNaN(field.value) ? "" : field.value}
                        onChange={(e) => {
                          const val = e.target.value
                          field.onChange(val === "" ? "" : Number(val))
                        }}
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>

            <Separator />

            <FieldGroup className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["furnished", "Furnished", "Is the property furnished?"],
                  ["parking", "Parking available", "Is parking available?"],
                ] as const
              ).map(([name, label, description]) => (
                <Controller
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <Field
                      orientation="horizontal"
                      className="rounded-lg border p-4"
                    >
                      <FieldContent>
                        <FieldLabel>{label}</FieldLabel>
                        <FieldDescription>{description}</FieldDescription>
                      </FieldContent>

                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </CardContent>
        </Card>

        {/* PRICING */}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5" />
              <CardTitle>Pricing</CardTitle>
            </div>

            <CardDescription>
              Set your rental price and deposit.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              {(
                [
                  ["monthlyRent", "Monthly rent (R)"],
                  ["deposit", "Deposit (R)"],
                ] as const
              ).map(([name, label]) => (
                <Controller
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={name}>{label}</FieldLabel>

                      <Input
                        id={name}
                        type="number"
                        min={0}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={Number.isNaN(field.value) ? "" : field.value}
                        onChange={(e) => {
                          const val = e.target.value
                          field.onChange(val === "" ? "" : Number(val))
                        }}
                        aria-invalid={fieldState.invalid}
                      />

                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>

            <Controller
              control={form.control}
              name="utilitiesIncluded"
              render={({ field }) => (
                <Field
                  orientation="horizontal"
                  className="rounded-lg border p-4"
                >
                  <FieldContent>
                    <FieldLabel>Utilities included</FieldLabel>

                    <FieldDescription>
                      Are electricity and water included in the rent?
                    </FieldDescription>
                  </FieldContent>

                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              )}
            />
          </CardContent>
        </Card>

        {/* ACCOMMODATION PREFERENCES */}

        <Card>
          <CardHeader>
            <CardTitle>Accommodation preferences</CardTitle>

            <CardDescription>
              Specify who your accommodation is suitable for.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <Controller
              control={form.control}
              name="genderPreference"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Gender preference</FieldLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            {(
              [
                [
                  "studentFriendly",
                  "Student friendly",
                  "Is this accommodation suitable for students?",
                ],
                [
                  "nsfasAccepted",
                  "NSFAS accommodation",
                  "Is this property approved for NSFAS-funded students?",
                ],
              ] as const
            ).map(([name, label, description]) => (
              <Controller
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <Field
                    orientation="horizontal"
                    className="rounded-lg border p-4"
                  >
                    <FieldContent>
                      <FieldLabel>{label}</FieldLabel>
                      <FieldDescription>{description}</FieldDescription>
                    </FieldContent>

                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </Field>
                )}
              />
            ))}
          </CardContent>
        </Card>

        {/* AMENITIES */}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              <CardTitle>Amenities</CardTitle>
            </div>

            <CardDescription>
              Select all facilities available at the property.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {amenityOptions.map((amenity) => (
                <Controller
                  key={amenity}
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox
                        checked={field.value.includes(amenity)}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            checked
                              ? [...field.value, amenity]
                              : field.value.filter((value) => value !== amenity)
                          )
                        }}
                      />

                      <FieldLabel className="font-normal">{amenity}</FieldLabel>
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </CardContent>
        </Card>

        {/* HOUSE RULES */}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <CardTitle>House rules</CardTitle>
            </div>

            <CardDescription>
              Select the rules tenants are expected to follow.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid grid-cols-2 gap-4">
              {ruleOptions.map((rule) => (
                <Controller
                  key={rule}
                  control={form.control}
                  name="rules"
                  render={({ field }) => (
                    <Field orientation="horizontal" className="gap-2">
                      <Checkbox
                        checked={field.value.includes(rule)}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            checked
                              ? [...field.value, rule]
                              : field.value.filter((value) => value !== rule)
                          )
                        }}
                      />

                      <FieldLabel className="font-normal">{rule}</FieldLabel>
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </CardContent>
        </Card>

        {/* AVAILABILITY */}

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>

            <CardDescription>When can tenants move in?</CardDescription>
          </CardHeader>

          <CardContent>
            <Controller
              control={form.control}
              name="availableFrom"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="availableFrom">
                    Available from
                  </FieldLabel>

                  <Input
                    id="availableFrom"
                    type="date"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </CardContent>
        </Card>

        {/* PROPERTY IMAGES */}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImagePlus className="h-5 w-5" />
              <CardTitle>Property images</CardTitle>
            </div>

            <CardDescription>
              Upload up to {MAX_IMAGES} images of your accommodation. JPG, PNG
              and WEBP supported.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <label
              htmlFor="property-images"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition hover:bg-muted/50"
            >
              <Upload className="mb-3 h-8 w-8 text-muted-foreground" />

              <p className="font-medium">Click to upload images</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add photos of bedrooms, bathrooms and shared spaces.
              </p>

              <Input
                id="property-images"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {activeExistingImages.map((image) => (
                <div
                  key={image}
                  className="group relative aspect-square overflow-hidden rounded-lg border"
                >
                  <img
                    src={image}
                    alt="Existing property"
                    className="h-full w-full object-cover"
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setRemovedImages((prev) => [...prev, image])}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {imagePreviews.map((preview, index) => (
                <div
                  key={preview}
                  className="relative aspect-square overflow-hidden rounded-lg border"
                >
                  <img
                    src={preview}
                    alt="New property image"
                    className="h-full w-full object-cover"
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => removeNewImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              {totalImageCount}/{MAX_IMAGES} images selected ({images.length}{" "}
              new).
            </p>
          </CardContent>
        </Card>

        {/* SUBMIT */}

        <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <Button type="button" variant="outline" onClick={handleResetForm}>
            Reset form
          </Button>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Saving..."
              : mode === "edit"
                ? "Save changes"
                : "Publish property"}
          </Button>
        </div>
      </form>
    </div>
  )
}
