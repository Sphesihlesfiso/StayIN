"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import PropertyForm from "@/components/property/property-form"
import { type PropertyFormValues } from "../types/property/property"
import { api } from "../lib/axios_instance"

interface PropertyImageItem {
  url: string
}

export type EditableProperty = Partial<PropertyFormValues> & {
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
  // const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchProperties() {
      try {
        setLoading(true)
        setError(null)

        const res = await api.get(`/properties/${id}`)

        setProperty(res.data.data)
        // setProperties(res.data.data)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setError("Failed to load properties.")
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [id])

  const initialData = useMemo<Partial<PropertyFormValues> | undefined>(() => {
    if (!property) return undefined

    return {
      title: property.title ?? "",
      description: property.description ?? "",
      propertyType: property.propertyType ?? undefined,
      province: property.province ?? "",
      town: property.town ?? "",
      suburb: property.suburb ?? "",
      address: property.address ?? "",
      bedrooms: property.bedrooms ?? 1,
      bathrooms: property.bathrooms ?? 1,
      availableRooms: property.availableRooms ?? 1,
      monthlyRent: property.monthlyRent ?? 0,
      deposit: property.deposit ?? 0,
      utilitiesIncluded: property.utilitiesIncluded ?? false,
      genderPreferences: property.genderPreferences ?? "Mixed",
      studentFriendly: property.studentFriendly ?? true,
      nsfasAccredited: property.nsfasAccredited ?? false,
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
    const formData = new FormData()

    formData.append("data", JSON.stringify(data))

    images.forEach((image) => {
      formData.append("images", image)
    })

    formData.append("removedImages", JSON.stringify(removedImages))

    try {
      // setSaving(true)

      const res = await api.patch(`/properties/${id}`, formData)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Property updated successfully:", res.data)

      return res.data.data
    } catch (error) {
      console.error("Update failed:", error)

      throw error
    } finally {
      // setSaving(false)
    }
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
        // saving={saving}
        initialData={initialData}
        existingImages={existingImages}
        onSave={handleUpdate}
      />
    </main>
  )
}
