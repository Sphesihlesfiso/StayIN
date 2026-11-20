"use client"

import PropertyForm, {
  type PropertyFormValues,
} from "@/components/property/property-form"

export default function Upload() {
  async function handleCreate(
    data: PropertyFormValues,
    images: File[],
    _removedImages: string[]
  ) {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))

    images.forEach((image) => {
      formData.append("images", image)
    })

    // Connect your create mutation here.
    // await createPropertyMutation.mutateAsync(formData)
    console.log("Creating property:", data, images.length)
  }

  return (
    <main className="container mx-auto px-4">
      <PropertyForm mode="create" onSave={handleCreate} />
    </main>
  )
}
