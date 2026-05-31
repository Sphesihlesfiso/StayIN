"use client"

import { useParams } from "next/navigation"
import { mockProperties } from "@/public/assetts/assetts"
import { Badge } from "@/components/ui/badge"
import { CommentCard } from "@/components/CommentCard"
import { LandLordCard } from "@/components/LandLordCard"
import PricingBreakDown from "@/components/PricingBreakDown"
export default function PropertyDetailsPage() {
  const { id } =useParams()
  const property=mockProperties!.filter((p)=>p.id==Number(id))
  
  return (
    <div className="p-6">
      <Badge>{property[0].nsfasAccredited}</Badge>
      <h1 className="text-2xl font-bold">{property[0].name} in {property[0].suburb} </h1>
      <h2>{property[0].town}

      </h2>
      <p>Details for property {id} will go here.</p>
      <div>
        <PricingBreakDown/>
        <LandLordCard/>
        <CommentCard/>
      </div>
    </div>
  )
}
