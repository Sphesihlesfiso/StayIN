import { CardImage } from "../components/property/property-card"
import { PropertyPaging } from "../components/paging"
import { api } from "@/lib/axios_instance"
import { useEffect, useState } from "react"
import { z } from "zod"
import { createPropertySchema } from "../../../shared/schema/property.schema"

type PropertyInput = z.infer<typeof createPropertySchema>

export const iframeHeight = "800px"
export const description = "A responsive property listing page."

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState<PropertyInput[]>([])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)

        const res = await api.get("/properties")

        setProperties(res.data.data)
      } catch (error) {
        console.log("Error fetching properties", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <p>Loading properties...</p>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <CardImage key={property.id} input={property} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </section>

        <div className="mt-auto flex justify-center py-6">
          <PropertyPaging />
        </div>
      </main>
    </div>
  )
}
