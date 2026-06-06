"use client"

import { useParams } from "next/navigation"
import { mockProperties } from "@/public/assetts/assetts"
import { Badge } from "@/components/ui/badge"
import { CommentCard } from "@/components/CommentCard"
import { LandLordCard } from "@/components/LandLordCard"
import PricingBreakDown from "@/components/PricingBreakDown"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LocateFixedIcon, LocateIcon, WashingMachine, Wifi } from "lucide-react"
import { BadgeCard } from "@/components/BadgeCard"
import { title } from "process"
export default function PropertyDetailsPage() {
  const { id } = useParams()
  const [property] = mockProperties!.filter((p) => p.id == Number(id))

  return (
    <main className="p-1.5">
      <div className="grid gap-2 grid-cols-1 ">
        <Card>
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <img
            src="https://avatar.vercel.sh/shadcn1"
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          />
          <CardFooter>
            <Button className="w-full">
              <LocateFixedIcon /> View on map
            </Button>
          </CardFooter>
        </Card>
        <div className="flex flex-col font-bold">
          <h1 className="">Private Backroom in Idas Vallei</h1>
          <h2>Cape Town</h2>
        </div>
        <div>
          <LandLordCard></LandLordCard>
        </div>
        <div>
          <h2 className="font-bold">House Rules</h2>
          <ul>
            <li>No Smoking indoors</li>
          </ul>
        </div>
        <div className="">
          <h1 className="font-bold">About this place</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus,
            ullam quia quisquam sapiente assumenda corrupti obcaecati odit iure
            nulla id aliquid ipsa blanditiis laborum reprehenderit magni error
            quos saepe animi.
          </p>
        </div>
        <div>
          <BadgeCard title="Amenities" variant="ghost" />
        </div>
        <div>
          <BadgeCard title="Loadshedding readiness" variant="outline" />
        </div>
        <div>
          <BadgeCard title="Security" variant="outline" />
        </div>
        <div>
          <h1 className="font-bold p-1.5">
            What previos tenants had to say
            <CommentCard/>
          </h1>
        </div>
      </div>
    </main>
  )
}
