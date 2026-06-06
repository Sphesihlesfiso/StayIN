"use client"

import { useParams } from "next/navigation"
import { mockProperties } from "@/public/assetts/assetts"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeCard } from "@/components/BadgeCard"
import { ReviewCard } from "@/components/ReviewCard"
import { LandLordCard } from "@/components/LandLordCard"
import PricingBreakDown from "@/components/PricingBreakDown"
import { LocateFixedIcon, WashingMachine, Wifi, Shield } from "lucide-react"

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const [property] = mockProperties!.filter((p) => p.id == Number(id))

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
          <Button className="w-full">
            <LocateFixedIcon className="mr-2" /> View on map
          </Button>
        </CardFooter>
      </Card>

      {/* Title + Location */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold">Private Backroom in Idas Vallei</h1>
        <h2 className="text-gray-600">Cape Town</h2>
      </div>

      {/* Landlord */}
      <LandLordCard  />

      {/* House Rules */}
      <section>
        <h2 className="mb-2 text-lg font-bold">House Rules</h2>
        <ul className="list-inside list-disc text-gray-700">
          <li>No Smoking indoors</li>
        </ul>
      </section>

      {/* About */}
      <section>
        <h2 className="mb-2 text-lg font-bold">About this place</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          ullam quia quisquam sapiente assumenda corrupti obcaecati odit iure
          nulla id aliquid ipsa blanditiis laborum reprehenderit magni error
          quos saepe animi.
        </p>
      </section>

      {/* Amenities */}
      <section>
        <h2 className="mb-2 text-lg font-bold">Amenities</h2>
        <div className="flex flex-wrap gap-3">
          <BadgeCard title="Wifi" variant="ghost" icon={Wifi} label="Wifi" />
          <BadgeCard
            title="Laundry"
            variant="outline"
            icon={WashingMachine}
            label="Washing Machine"
          />
          <BadgeCard
            title="Security"
            variant="outline"
            icon={Shield}
            label="CCTV"
          />
        </div>
      </section>

      {/* Reviews */}
      <section>
        <h2 className="mb-2 text-lg font-bold">
          What previous tenants had to say
        </h2>
        <ReviewCard
          initial="S"
          name="Sphesihle"
          rating={3}
          comment="Lorem ipsum dolor sit amet."
          date="25/03/2025"
        />
      </section>

      {/* Pricing Breakdown */}
      <section>
        <PricingBreakDown />
      </section>
    </main>
  )
}
