import React from "react"
import { Badge } from "@/components/ui/badge"

import { Property } from "../../types/property"

import { Card, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export const PropertyCard = ({
  nsfasAccredited,
  genderRestriction,
  propertyType,
  rent,
  deposit,
  suburb,
  town,
  id,
}: Property) => {
  return (
    <Link href={`/property/${id}`} passHref>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardFooter className="grid grid-rows-3 gap-0.5">
          <div className="text-xl font-extrabold">R{rent}/mo</div>
          <h1 className="font-black">
            {propertyType} in {town} , 
              {suburb} 
          </h1>
          <div className="flex flex-wrap gap-1">
            {nsfasAccredited && <Badge variant="secondary">Nsfas</Badge>}
            <Badge variant="secondary">{genderRestriction}</Badge>
            <Badge variant="secondary">{propertyType}</Badge>
            {deposit && <Badge variant="secondary">Deposit: R{deposit}</Badge>}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
