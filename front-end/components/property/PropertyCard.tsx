import React from "react"


import { Property, GenderRestriction, PropertyType } from '../../types/Property/property';


import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export const PropertyCard = ({
  nsfasAccredited,
  genderRestriction,
  propertyType,
  rent,
  deposit,
  suburb,
  town,
  name,
  id,
}: Property) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
    toast.success(isSaved ? "Removed from saved" : "Saved to your list")
  }
  return (
    <Link href={`/property/${id}`} passHref>
      <article className="overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <Image
            src={'/public/assetts/OIP (1).webp'}
            alt={`${""} in ${""}`}
            fill
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}
          <button
            onClick={handleSave}
            className={cn(
              "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110",
              isSaved ? "text-red-500" : "text-foreground/70"
            )}
            aria-label={isSaved ? "Remove from saved" : "Save listing"}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all",
                isSaved && "fill-current"
              )}
            />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-lg font-bold text-foreground">
              R{rent.toLocaleString("en-ZA")}
              <span className="text-sm font-normal text-muted-foreground">
                /mo
              </span>
            </span>
          </div>

          <h3 className="mb-2 text-sm font-medium text-foreground">
            {name} <span className="text-muted-foreground">•</span>{" "}
            {town} {suburb} {nsfasAccredited},{deposit}
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {/* {property.badges.slice(0, 2).map((badge, index) => (
              <BadgePill key={index} badge={badge} />
            ))} */}
          </div>
        </div>
      </article>
    </Link>
  )
}
