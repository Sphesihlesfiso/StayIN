
"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
// import { PhotoGallery } from "@/components/photo-gallery"

// import { TransparencyBox } from "@/components/transparency-box"
import { CommentCard } from "@/components/reviews-section"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

import { useParams } from "next/navigation"
import { useProperty } from "@/hooks/Property/useProperty"
import { extractDate } from "@/lib/utils"
import {
  // General UI
  Star,
  CheckCircle,
  ChevronDown,
  ChevronUp,

  // General amenities
  Wifi,
  Car,
  UtensilsCrossed,
  WashingMachine,
  Bus,
  ShieldCheck,
  Droplets,
  Wind,

  // Loadshedding
  Battery,
  Sun,
  Flame,
  Zap,

  // Security
  Camera,
  Shield,
  Bell,
  Lock,
  Fingerprint,
  DoorClosed,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5" />,
  "Prepaid Electricity": <Zap className="h-5 w-5" />,
  "24/7 Security": <ShieldCheck className="h-5 w-5" />,
  "Water Included": <Droplets className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  "Shared Kitchen": <UtensilsCrossed className="h-5 w-5" />,
  Laundry: <WashingMachine className="h-5 w-5" />,
  "Air Conditioning": <Wind className="h-5 w-5" />,
  Shuttle: <Bus className="h-5 w-5" />,
}

const securityIcons: Record<string, React.ReactNode> = {
  "Electric Fence": <Zap className="h-5 w-5" />,
  CCTV: <Camera className="h-5 w-5" />,
  "Armed Response": <Shield className="h-5 w-5" />,
  "Security Guard": <UserCheck className="h-5 w-5" />,
  "Alarm System": <Bell className="h-5 w-5" />,
  "Security Bars": <Lock className="h-5 w-5" />,
  "Biometric Access": <Fingerprint className="h-5 w-5" />,
  "Security Gate": <DoorClosed className="h-5 w-5" />,
}

const loadSheddingIcons: Record<string, React.ReactNode> = {
  Inverter: <Battery className="h-5 w-5" />,
  Gas: <Flame className="h-5 w-5" />,
  Solar: <Sun className="h-5 w-5" />,
  Generator: <Zap className="h-5 w-5" />,
}


export default function ListingPage() {
  const { id } = useParams()
  const propertyId = Number(id)
  const [showAllRules, setShowAllRules] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  // const [isSaved, setIsSaved] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(6)
  const { data: property, isError, isLoading } = useProperty(propertyId)
  console.log(property)
  console.log(`THESE ARE THEM COMMENTS ${property?.rules}`)
  if (isError) {
    return <>Error Loading your property</>
  } else if (isLoading) {
    return <>Loading your property</>
  }
  console.log(property?.User)
  if (!property) {
    return <>Error Loading your property</>
  }
  // const { username ,createdAt} = property?.User

  const loadsheddingReady = property.Amenities.filter(
    (amenity) =>
      amenity.name === "Solar" ||
      amenity.name === "Inverter" ||
      amenity.name === "Gas" ||
      amenity.name === "Generator"
  )

  const securityReady = property.Amenities.filter(
    (amenity) =>
      amenity.name === "Electric Fence" ||
      amenity.name === "CCTV" ||
      amenity.name === "Armed Response" ||
      amenity.name === "Security Guard" ||
      amenity.name === "Alarm System" ||
      amenity.name === "Security Bars" ||
      amenity.name === "Biometric Access" ||
      amenity.name === "24/7 Security" ||
      amenity.name === "Security Gate"
  )

  if (!property) {
    notFound()
  }

  return (
    <div className="p-7 sm:p-4">
      {/* Top Section - Split View on Desktop */}
      <div className="mb-8 grid gap-6 lg:grid-cols-[55%_45%]">
        {/* Photos */}
        {/* <PhotoGallery images={} title={title} /> */}

        {/* Map - Hidden on mobile, shown on desktop */}
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="">
        {/* Left Column - Details */}
        <div className="space-y-8">
          {/* Title and Type */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {property.propertyType}
              </Badge>
              {property.nsfasAccredited && (
                <Badge className="rounded-full bg-green-100 text-green-800 hover:bg-green-100">
                  NSFAS Accredited
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {property.name} in {property.suburb}
            </h1>
            <p className="mt-1 text-muted-foreground">{property.town}</p>
          </div>

          {/* Host Card */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                {property.User.username.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">
                    Hosted by {property.User.username}
                  </h3>
                  {property.User.username && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {property.User.role} Landlord Trust Score
                  </span>
                  <span>
                    Member since {extractDate(property.User.createdAt)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {/* Response time: {host.responseTime} */}
                </p>
              </div>
            </div>
          </div>

          {/* House Rules */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              House Rules
            </h3>
            <ul className="space-y-2">
              {property.rules
                .slice(0, showAllRules ? undefined : 4)
                .map((rule, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {rule.content}
                  </li>
                ))}
            </ul>
            {property.rules.length > 4 && (
              <Button
                variant="ghost"
                onClick={() => setShowAllRules(!showAllRules)}
                className="gap-1 px-0 text-primary hover:text-primary/80"
              >
                {showAllRules ? "Show less" : "Show all rules"}
                {showAllRules ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* About this place */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              About this place
            </h3>
            <p
              className={cn(
                "leading-relaxed text-muted-foreground",
                !showFullDescription && "line-clamp-2"
              )}
            >
              {property.about}
            </p>
            {property.about.length > 500 && (
              <Button
                variant="ghost"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="gap-1 px-0 text-primary hover:text-primary/80"
              >
                {showFullDescription ? "Show less" : "Read more"}
                {showFullDescription ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Amenities</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {property.Amenities.slice(0, showAllAmenities).map((amenity) => (
                <div
                  key={amenity.id}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  {amenityIcons[amenity.name] || (
                    <CheckCircle className="h-5 w-5" />
                  )}
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
            {property.Amenities.length -
              (loadsheddingReady.length + securityReady.length) >
              6 && (
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() =>
                  setShowAllAmenities(
                    property.Amenities.length -
                      (loadsheddingReady.length + securityReady.length)
                  )
                }
              >
                Show all{" "}
                {property.Amenities.length -
                  (loadsheddingReady.length + securityReady.length)}{" "}
                amenities
              </Button>
            )}
          </div>

          {/* Loadshedding Readiness */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Loadshedding readiness
            </h3>
            <div className="flex flex-wrap gap-2">
              {loadsheddingReady.map((item) => (
                <Badge
                  key={item.name}
                  variant="secondary"
                  className="gap-1.5 rounded-full px-3 py-1.5"
                >
                  {loadSheddingIcons[item.name]}
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Security</h3>
            <div className="flex flex-wrap gap-2">
              {securityReady.map((item) => (
                <Badge
                  key={item.name}
                  variant="secondary"
                  className="gap-1.5 rounded-full px-3 py-1.5"
                >
                  {securityIcons[item.name]}
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {property.Comments.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                What previous teenants had to say.
              </h3>
              <div className="">
                {property.Comments.map((Comment) => (
                  <CommentCard
                    key={Comment.id}
                    id={Comment.id}
                    propertyId={property.id}
                    rating={Comment.rating}
                    content={Comment.content}
                    timestamp={Comment.timestamp}
                    User={Comment.User}
                    
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sticky Pricing */}
        <div className="hidden lg:block">
          {/* <TransparencyBox
            price={property.rent}
            deposit={deposit}
            utilities={property.Amenities}
            // adminFee={adminFee}
            nsfasAccredited={nsfasAccredited}
            hostName={property.User.role}
            location={location}
            onSave={() => setIsSaved(!isSaved)}
            isSaved={isSaved}
          /> */}
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed right-0 bottom-16 left-0 border-t border-border bg-background p-4 md:bottom-0 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xl font-bold text-foreground">
              R{property.rent.toLocaleString("en-ZA")}
            </span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-xl bg-primary px-6 text-primary-foreground">
                Request to View
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader className="mb-4">
                <SheetTitle>Pricing Details</SheetTitle>
              </SheetHeader>
              {/* <TransparencyBox
                price={rent}
                deposit={deposit}
                utilities={property.Amenities}
                // adminFee={adminFee}
                nsfasAccredited={nsfasAccredited}
                hostName={property.User.username}
                location={location}
                onSave={() => setIsSaved(!isSaved)}
                isSaved={isSaved}
              /> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
