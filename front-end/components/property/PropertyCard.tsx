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
        <CardFooter className="flex flex-wrap gap-1.5">
          {nsfasAccredited && <Badge>NSFAS Accredited</Badge>}
          <Badge variant="ghost">{genderRestriction}</Badge>
          <Badge variant="outline">{propertyType}</Badge>
          <Badge variant="secondary">Rent: R{rent}</Badge>
          <Badge variant="destructive">Deposit: R{deposit}</Badge>
          <Badge variant="outline">
            {town},{suburb}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  )
}
