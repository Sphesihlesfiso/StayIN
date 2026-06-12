"use client"

import { useParams } from "next/navigation"

import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { ReviewCard } from "@/components/ReviewCard"

import PricingBreakDown from "@/components/PricingBreakDown"

import { MobileActionBar } from "@/components/MobileActionBar"
import { NearbyPlacesCard } from "@/components/NearyByPlace"
import { useProperty } from "@/hooks/Property/useProperty"
import { extractDate } from "@/lib/utils"


export default function PropertyDetailsPage() {
  const { id } = useParams()
  const propertyId = Number(id)
  const {data:property,isError,isLoading} = useProperty(propertyId)
  if (isError){
    return (<>
    Error Loading your property
    </>)

  }
  else if (isLoading){
    return (<>
    Loading your property
    </>)
  }
  
  
  return (
    <main className="mx-auto w-full space-y-6 p-4">
      {/* Cover Image */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 z-30 bg-black/35" />
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Property cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardFooter>
          <Button className="w-full">View on map</Button>
        </CardFooter>
      </Card>

      {/* Title + Location */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold">Private Backroom in Idas Vallei</h1>
        <h2 className="text-gray-600">{property?.town}</h2>
      </div>

      {/* Landlord */}
      {/* <LandLordCard  /> */}

      {/* House Rules */}
      
      <section>
        <h2 className="mb-2 text-lg font-bold">House Rules</h2>
        <ul className="list-inside list-disc text-gray-700">
          <li>{property?.rules}</li>
         
        </ul>
      </section>

      {/* About */}
      <section>
        <h2 className="mb-2 text-lg font-bold">About this place</h2>
        <p className="text-gray-700">{property?.about}</p>
      </section>

      {/* Amenities */}
      <section>
        <h2 className="mb-2 text-lg font-bold">Amenities</h2>
        <div className="flex flex-wrap gap-1">
          <ul>
            {property?.amenities?.map((amneity) => (
              <li key={amneity.id}>{amneity.name}</li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <NearbyPlacesCard />
      </section>

      {/* Reviews */}
      <section>
        <h2 className="mb-2 text-lg font-bold">
          What previous tenants had to say
        </h2>

        
        {property?.comments?.map((comment) => (
          <ReviewCard
            key={comment.id}
            initial="S"
            name={comment.User.username}
            rating={comment.rating}
            comment={comment.content}
            date={extractDate(comment.timestamp)}
          />
        ))}
      </section>

      {/* Pricing Breakdown */}
      <section className="sm:invisible">
        <PricingBreakDown />
      </section>
      <MobileActionBar />
    </main>
  )
}
