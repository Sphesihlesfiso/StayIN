"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import PropertyForm, {
  type PropertyFormValues,
} from "@/components/property/property-form"

interface PropertyImageItem {
  url: string
}

export interface EditableProperty extends Partial<PropertyFormValues> {
  id: string
  images?: PropertyImageItem[] | null
}

function toDateInputValue(value?: string | Date | null): string {
  if (!value) return ""
  const date = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value.slice(0, 10) : ""
  }
  return date.toISOString().slice(0, 10)
}

export default function EditProperty() {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<EditableProperty | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError("Missing property ID.")
      setLoading(false)
      return
    }

    let cancelled = false

    async function loadProperty() {
      setLoading(true)
      setError(null)
      try {
        // Temporary mock while backend is down
        await new Promise((resolve) => setTimeout(resolve, 300))

        const mockProperty: EditableProperty = {
          id,
          title: "Sunny Studio near Campus",
          description: "Bright room with desk and fast Wi-Fi.",
          propertyType: "Apartment",
          province: "Western Cape",
          city: "Cape Town",
          suburb: "Rondebosch",
          address: "12 Main Road",
          bedrooms: 2,
          bathrooms: 1,
          availableRooms: 1,
          monthlyRent: 6500,
          deposit: 6500,
          utilitiesIncluded: true,
          genderPreference: "any",
          studentFriendly: true,
          nsfasAccepted: true,
          amenities: ["Wi-Fi", "Study Desk"],
          rules: ["No smoking"],
          parking: true,
          furnished: true,
          availableFrom: "2026-12-01",
          images: [{ url: "https://placehold.co/600x400?text=Property+1" }],
        }

        if (!cancelled) {
          setProperty(mockProperty)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load property."
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    loadProperty()

    return () => {
      cancelled = true
    }
  }, [id])

  const initialData = useMemo<Partial<PropertyFormValues> | undefined>(() => {
    if (!property) return undefined

    return {
      title: property.title ?? "",
      description: property.description ?? "",
      propertyType: property.propertyType ?? "",
      province: property.province ?? "",
      city: property.city ?? "",
      suburb: property.suburb ?? "",
      address: property.address ?? "",
      bedrooms: property.bedrooms ?? 1,
      bathrooms: property.bathrooms ?? 1,
      availableRooms: property.availableRooms ?? 1,
      monthlyRent: property.monthlyRent ?? 0,
      deposit: property.deposit ?? 0,
      utilitiesIncluded: property.utilitiesIncluded ?? false,
      genderPreference: property.genderPreference ?? "any",
      studentFriendly: property.studentFriendly ?? true,
      nsfasAccepted: property.nsfasAccepted ?? false,
      amenities: property.amenities ?? [],
      rules: property.rules ?? [],
      parking: property.parking ?? false,
      furnished: property.furnished ?? false,
      availableFrom: toDateInputValue(property.availableFrom),
    }
  }, [property])

  const existingImages = useMemo(
    () => (property?.images ?? []).map((image) => image.url).filter(Boolean),
    [property?.images]
  )

  async function handleUpdate(
    data: PropertyFormValues,
    images: File[],
    removedImages: string[]
  ) {
    if (!id) return

    const formData = new FormData()
    formData.append("data", JSON.stringify(data))

    images.forEach((image) => {
      formData.append("images", image)
    })

    removedImages.forEach((image) => {
      formData.append("removedImages", image)
    })

    // Connect your update mutation here.
    // await updatePropertyMutation.mutateAsync({ id, formData })
    console.log("Updating property:", id)
  }

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading property...</p>
      </main>
    )
  }

  if (error || !property) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-destructive">{error ?? "Property not found."}</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit property</h1>
        <p className="text-muted-foreground">
          Update your accommodation details.
        </p>
      </div>

      <PropertyForm
        mode="edit"
        initialData={initialData}
        existingImages={existingImages}
        onSave={handleUpdate}
      />
    </main>
  )
}
