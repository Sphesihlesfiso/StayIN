"use client"
import React from "react"
import { PropertyCard } from "@/components/property/PropertyCard"
import { mockProperties } from "@/public/assetts/assetts"
import { useProperties } from "@/hooks/useProperties"
import { useQueryClient } from "@tanstack/react-query"
export default function HomePage() {
  const queryClient = useQueryClient()
  const { data: properties, isLoading, isError } = useProperties()


  if (isLoading) {
    return <p className="p-6">Loading properties...</p>
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load properties.</p>
  }
  properties!.forEach((property) => {
    queryClient.setQueryData(["property", property.id], property)
  })
  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Available Properties</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProperties!.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </main>
  )
}
