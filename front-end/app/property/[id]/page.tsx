// "use client"

// import { useParams } from "next/navigation"

// import { Card, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// import { ReviewCard } from "@/components/ReviewCard"

// import PricingBreakDown from "@/components/PricingBreakDown"

// import { MobileActionBar } from "@/components/MobileActionBar"
// import { NearbyPlaceBadge } from "@/components/NearyByPlace"
// import { useProperty } from "@/hooks/Property/useProperty"
// import { extractDate } from "@/lib/utils"
// import { LandLordCard } from "@/components/LandLordCard"


// export default function PropertyDetailsPage() {
//   const { id } = useParams()
//   const propertyId = Number(id)
//   const { data: property, isError, isLoading } = useProperty(propertyId)
//   console.log(property)
//   console.log(`THESE ARE THEM COMMENTS ${property?.rules}`)
//   if (isError) {
//     return <>Error Loading your property</>
//   } else if (isLoading) {
//     return <>Loading your property</>
//   }
//   console.log(property?.User)
//   if (!property){
//     return <>Error Loading your property</>
//   }
//   const { username ,createdAt} = property?.User
//   return (
//     <main className="mx-auto w-full space-y-6 p-4">
//       {/* Cover Image */}
//       <Card className="relative overflow-hidden">
//         <div className="absolute inset-0 z-30 bg-black/35" />
//         <img
//           src="https://avatar.vercel.sh/shadcn1"
//           alt="Property cover"
//           className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
//         />
//         <CardFooter>
//           <Button className="w-full">View on map</Button>
//         </CardFooter>
//       </Card>

//       {/* Title + Location */}
//       <div className="space-y-1">
//         <h1 className="text-xl font-bold">Private Backroom in Idas Vallei</h1>
//         <h2 className="text-gray-600">{property?.town}</h2>
//       </div>

//       {/* Landlord */}
//       <LandLordCard
//         initial={username.charAt(0)}
//         name={username}
//         trustScore={4.5}
//         memberSince={extractDate(createdAt)}
//       />

//       {/* House Rules */}

//       <section>
//         <h2 className="mb-2 text-lg font-bold">House Rules</h2>
//         <ul className="list-inside list-disc text-gray-700">
//           {property?.rules.map((rule) => (
//             <li key={rule.id}>{rule.content}</li>
//           ))}
//         </ul>
//       </section>

//       {/* About */}
//       <section>
//         <h2 className="mb-2 text-lg font-bold">About this place</h2>
//         <p className="text-gray-700">{property?.about}</p>
//       </section>

//       {/* Amenities */}
//       <section>
//          {/* <Card className="rounded-2xl">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Sparkles className="h-5 w-5 text-primary" />
//                     Amenities
//                   </CardTitle>
                  
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//                     {amenitiesList.map((amenity) => {
//                       const Icon = amenity.icon
//                       const active = selectedAmenities.includes(amenity.id)
//                       return (
//                         <button
//                           key={amenity.id}
//                           type="button"
                          
//                           className={cn(
//                             "flex items-center gap-2 rounded-xl border-2 p-3 text-sm font-medium transition-colors",
//                             active
//                               ? "border-primary bg-primary/10 text-foreground"
//                               : "border-border text-muted-foreground hover:border-primary/50"
//                           )}
//                         >
//                           <Icon
//                             className={cn(
//                               "h-4 w-4",
//                               active ? "text-primary" : "text-muted-foreground"
//                             )}
//                           />
//                           {amenity.label}
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </CardContent>
//               </Card> */}
//         <h2 className="mb-2 text-lg font-bold">Amenities</h2>
//         <div>
//           <ul className="flex flex-wrap gap-1">
//             {property?.Amenities?.map((amneity) => (
//               <li key={amneity.id}>{amneity.name} . </li>
//             ))}
//           </ul>
//         </div>
//       </section>
//       <section>
//         <h2 className="mb-2 text-lg font-bold">Nearby Places.</h2>
//         <div>
//           {property?.NearbyPlaces.map((NearbyPlace) => (
//             <NearbyPlaceBadge
//               key={NearbyPlace.id}
//               name={NearbyPlace.name}
//               distance={NearbyPlace.distance}
//               type={NearbyPlace.type}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Reviews */}
//       <section>
//         <h2 className="mb-2 text-lg font-bold">
//           What previous tenants had to say
//         </h2>
//         {
//           <ul className="flex flex-col gap-1.5">
//             {property?.Comments.map((Comment,index) => (
//               <li key={ index } >
//                 <ReviewCard
                 
//                   comment={Comment.content}
//                   rating={Comment.rating}
//                   initial={Comment.User.username.charAt(0)}
//                   name={Comment.User.username}
//                   date={extractDate(Comment.timestamp)}
//                 />
//               </li>
//             ))}
//           </ul>
//         }
//       </section>

//       {/* Pricing Breakdown */}
//       <section className="sm:invisible">
//         <PricingBreakDown />
//       </section>
//       <MobileActionBar />
//     </main>
//   )
// }
"use client"

import { useState, use } from "react"
import { notFound } from "next/navigation"
import { PhotoGallery } from "@/components/photo-gallery"
import { MapPanel } from "@/components/map-panel"
import { TransparencyBox } from "@/components/transparency-box"
import { ReviewsSection } from "@/components/reviews-section"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { properties } from "@/lib/data"
import {
  Star,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Wifi,
  Car,
  UtensilsCrossed,
  WashingMachine,
  Shield,
  Zap,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  Kitchen: <UtensilsCrossed className="h-5 w-5" />,
  Laundry: <WashingMachine className="h-5 w-5" />,
  Security: <Shield className="h-5 w-5" />,
  "Loadshedding-ready": <Zap className="h-5 w-5" />,
}

export default function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const property = properties.find((p) => p.id === id)

  const [showAllRules, setShowAllRules] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  if (!property) {
    notFound()
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* Top Section - Split View on Desktop */}
      <div className="mb-8 grid gap-6 lg:grid-cols-[55%_45%]">
        {/* Photos */}
        <PhotoGallery images={property.images} title={property.title} />

        {/* Map - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block">
          <MapPanel
            location={property.location}
            city={property.city}
            nearbyPOI={property.nearbyPOI}
          />
        </div>

        {/* Mobile Map Button */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2 rounded-xl">
                <MapPin className="h-4 w-4" />
                View on map
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
              <SheetHeader className="mb-4">
                <SheetTitle>Location</SheetTitle>
              </SheetHeader>
              <MapPanel
                location={property.location}
                city={property.city}
                nearbyPOI={property.nearbyPOI}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-[65%_35%]">
        {/* Left Column - Details */}
        <div className="space-y-8">
          {/* Title and Type */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {property.type}
              </Badge>
              {property.nsfasAccredited && (
                <Badge className="rounded-full bg-green-100 text-green-800 hover:bg-green-100">
                  NSFAS Accredited
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {property.title} in {property.location}
            </h1>
            <p className="mt-1 text-muted-foreground">{property.city}</p>
          </div>

          {/* Host Card */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                {property.host.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">
                    Hosted by {property.host.name}
                  </h3>
                  {property.host.verified && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {property.host.trustScore} Landlord Trust Score
                  </span>
                  <span>Member since {property.host.memberSince}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Response time: {property.host.responseTime}
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
              {property.houseRules
                .slice(0, showAllRules ? undefined : 4)
                .map((rule, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {rule}
                  </li>
                ))}
            </ul>
            {property.houseRules.length > 4 && (
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
              {property.description}
            </p>
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
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Amenities</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {property.amenities.slice(0, 6).map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  {amenityIcons[amenity] || <CheckCircle className="h-5 w-5" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            {property.amenities.length > 6 && (
              <Button variant="outline" className="rounded-xl">
                Show all {property.amenities.length} amenities
              </Button>
            )}
          </div>

          {/* Loadshedding Readiness */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              Loadshedding readiness
            </h3>
            <div className="flex flex-wrap gap-2">
              {property.loadsheddingReady.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="gap-1.5 rounded-full px-3 py-1.5"
                >
                  {item === "Solar" && "☀️"}
                  {item === "Inverter" && "🔋"}
                  {item === "Gas" && "🕯️"}
                  {item === "Generator" && "⚡"}
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Security</h3>
            <div className="flex flex-wrap gap-2">
              {property.security.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="gap-1.5 rounded-full px-3 py-1.5"
                >
                  {item === "Electric Fence" && "🔒"}
                  {item === "CCTV" && "📷"}
                  {item === "Armed Response" && "🚨"}
                  {item === "Security Guard" && "👮"}
                  {item === "Alarm System" && "🔔"}
                  {item === "Security Bars" && "🔐"}
                  {item === "Biometric Access" && "👆"}
                  {item === "24/7 Security" && "🛡️"}
                  {item === "Security Gate" && "🚪"}
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <ReviewsSection reviews={property.reviews} />
        </div>

        {/* Right Column - Sticky Pricing */}
        <div className="hidden lg:block">
          <TransparencyBox
            price={property.price}
            deposit={property.deposit}
            utilities={property.utilities}
            adminFee={property.adminFee}
            nsfasAccredited={property.nsfasAccredited}
            hostName={property.host.name}
            location={property.location}
            onSave={() => setIsSaved(!isSaved)}
            isSaved={isSaved}
          />
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed right-0 bottom-16 left-0 border-t border-border bg-background p-4 md:bottom-0 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xl font-bold text-foreground">
              R{property.price.toLocaleString("en-ZA")}
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
              <TransparencyBox
                price={property.price}
                deposit={property.deposit}
                utilities={property.utilities}
                adminFee={property.adminFee}
                nsfasAccredited={property.nsfasAccredited}
                hostName={property.host.name}
                location={property.location}
                onSave={() => setIsSaved(!isSaved)}
                isSaved={isSaved}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
