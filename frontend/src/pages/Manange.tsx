import PropertyActions from "@/components/manange/propertyActions"
import { api } from "../lib/axios_instance"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { type PropertyFormValues } from "../types/property/property"

type Property = PropertyFormValues & {
  id: string
}

export default function ManageProperty() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { landlordId } = useParams()

  useEffect(() => {
    if (!landlordId) return

    async function fetchProperties() {
      try {
        setLoading(true)
        setError(null)

        const res = await api.get(`/properties/landlord/${landlordId}`)

        setProperties(res.data.data)
        // setProperties(res.data.data)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setError("Failed to load properties.")
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [landlordId])
  const handlePropertyDelete = (propertyId: string) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== propertyId)
    )
  }

  if (loading) {
    return <div className="container mx-auto p-8">Loading properties...</div>
  }

  if (error) {
    return <div className="container mx-auto p-8">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage your properties</h1>

        <p className="text-muted-foreground">
          View and manage your property listings.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {properties.length === 0 ? (
          <p>You haven't listed any properties yet.</p>
        ) : (
          properties.map((property) => (
            <PropertyActions
              key={property.id}
              property={property}
              onDelete={handlePropertyDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
