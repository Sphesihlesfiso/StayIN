"use client"

import PropertyForm from "@/components/property/property-form"
import { type PropertyFormValues } from "../types/property/property"
import { api } from "../lib/axios_instance"

console.log("1. handleCreate triggered")
export default function Upload() {
  console.log("Outside handleCreate trigger")

  async function handleCreate(
    data: PropertyFormValues,
    images: File[],
    removedImages: string[]
  ) {
    console.log("1. handleCreate triggered")
    console.log("Property data:", data)
    console.log("Images:", images)

    const formData = new FormData()

    formData.append("data", JSON.stringify(data))

    images.forEach((image) => {
      formData.append("images", image)
    })

    // Only needed for edit operations, but useful to track for now.
    console.log("Removed images:", removedImages)

    try {
      console.log("2. Sending POST request...")

      const res = await api.post("/properties", formData)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("3. Server response:", res.data)

      return res.data.data
    } catch (error) {
      console.error("POST failed:", error)

      throw error
    }
  }

  return (
    <main className="container mx-auto px-4">
      <PropertyForm mode="create" onSave={handleCreate} />
    </main>
  )
}
