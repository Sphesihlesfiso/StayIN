"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import {
  ArrowLeft,
  Home,
  MapPin,
  Banknote,
  ImagePlus,
  Sparkles,
  ListChecks,
  X,
  ShieldCheck,
  Check,
  Navigation,
  Footprints,
  Plus,
} from "lucide-react"
import { amenitiesList } from "../../lib/constants/PropertyAmenities"
import { toast } from "sonner"
import {
  provinces,
  townsByProvince,
} from "@/lib/constants/SouthAfricanLocations"
import { Province } from "@/lib/constants/SouthAfricanLocations"
import { placeTypes } from "../../lib/constants/PropertyAmenities"
import { NearbyPlace } from "@/types/Property/nearbyPlace"
import { useCreateProperty } from "@/hooks/Property/useProperty"
import { GenderRestriction, PropertyType } from "@/types/Property/property"
import { Rule } from "@/types/Property/PropertyRule"
const propertyTypes = [
  { value: "SharingBackroom", label: "Backroom" },
  { value: "digs", label: "Digs / Shared House" },
  { value: "single", label: "Single Room" },
  { value: "sharing", label: "Sharing Room" },
  { value: "cottage", label: "Cottage / Garden Flat" },
  { value: "apartment", label: "Apartment" },
]

export default function AddListingPage() {
  const router = useRouter()
  const [name, setTitle] = useState("")
  const [propertyType, setType] = useState<PropertyType | undefined>(undefined)

  const [suburb, setSuburb] = useState("")
  const [about, setabout] = useState("")
  const [rent, setPrice] = useState("")
  const [deposit, setDeposit] = useState("")
  const [utilities, setUtilities] = useState("")

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [photos, setPhotos] = useState<string[]>([])
  const [nsfasAccredited, setNsfasAccredited] = useState(false)
  const [genderRestriction, setGender] = useState<
    GenderRestriction | undefined
  >(undefined)
  const [isDragging, setIsDragging] = useState(false)
  const [province, setProvince] = useState<Province | "">("")
  const [town, setTown] = useState("")
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([])
  const [placeName, setPlaceName] = useState("")
  const [placeType, setPlaceType] = useState("")
  const [placeMinutes, setPlaceMinutes] = useState("")
  const [rules,setRules]=useState([""])
  const { mutate, isError, isSuccess } = useCreateProperty()
  const handleProvinceChange = (value: string) => {
    setProvince(value as Province)
    setTown("") // reset dependent field
  }

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }
  const addNearbyPlace = () => {
    if (!placeName.trim() || !placeType || !placeMinutes) {
      toast.error("Add a place name, propertyType, and walking time")
      return
    }
    // setNearbyPlaces((prev) => [
    //   ...prev,
    //   { name: placeName.trim(), propertyType: placeType, minutes: placeMinutes,  propertyId:1,id:1},
    // ])
    setPlaceName("")
    setPlaceType("")
    setPlaceMinutes("")
    toast.success("Nearby place added")
  }

  const removeNearbyPlace = (index: number) => {
    setNearbyPlaces((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddPhoto = () => {
    // Mock photo upload using placeholder images
    const mockPhotos = [
      "/cozy-bedroom.png",
      "/modern-studio-apartment.png",
      "/shared-kitchen.png",
      "/student-room-desk.png",
    ]
    const next = mockPhotos[photos.length % mockPhotos.length]
    setPhotos((prev) => [...prev, next])
    toast.success("Photo added")
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const addRule =()=>{

  }
  const handleSubmit = (asDraft: boolean) => {
    // if (!asDraft && (!name || !propertyType || !province || !rent)) {
    //   toast.error("Please fill in all required fields")
    //   console.log("touched")
    //   return
    // }

    const newProperty = {
      name,
      propertyType,
      suburb,
      about,
      address:"26 bakker street",
      rent: Number(rent),
      deposit: Number(deposit),
      nsfasAccredited,
      genderRestriction,
      landlordId:1,
      town,
      gas: 0,
      water:  0,
      electricity:  0,
      // array of NearbyPlace objects
    }
    console.log(newProperty)
    mutate(newProperty)
    toast.success(
      asDraft ? "Listing saved as draft" : "Listing published successfully!"
    )
  }

  const moveInTotal = (Number(rent) || 0) + (Number(deposit) || 0)

  return (
    <div className="mx-auto w-full space-y-6 p-3 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-xl"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Add a new listing
          </h1>
          <p className="mt-1 text-muted-foreground">
            Fill in the details to list your property
          </p>
        </div>
      </div>

      {/* Basic Details */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Basic details
          </CardTitle>
          <CardDescription>Tell tenants about your place</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Listing name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g. Cozy backroom near UCT campus"
              value={name}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Property propertyType <span className="text-destructive">*</span>
            </Label>
            <Select
              value={propertyType}
              onValueChange={(val: PropertyType) => setType(val)}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select property propertyType" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((pt) => (
                  <SelectItem key={pt.value} value={pt.value}>
                    {pt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>
              Prefered Gender <span className="text-destructive">*</span>
            </Label>
            <Select
              value={genderRestriction}
              onValueChange={(val: GenderRestriction) => setGender(val)}
            >
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select the genderRestriction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">about</Label>
            <Textarea
              id="about"
              placeholder="Describe the room, the neighborhood, transport links, and what makes it special..."
              value={about}
              onChange={(e) => setabout(e.target.value)}
              rows={4}
              className="rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Location
          </CardTitle>
          <CardDescription>Where is your property located?</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>
              Province <span className="text-destructive">*</span>
            </Label>
            <Select value={province} onValueChange={handleProvinceChange}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>
              Town <span className="text-destructive">*</span>
            </Label>
            <Select value={town} onValueChange={setTown} disabled={!province}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue
                  placeholder={
                    province ? "Select Town" : "Select a province first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {province &&
                  townsByProvince[province].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="suburb">Suburb / Area</Label>
            <Input
              id="suburb"
              placeholder="e.g. Idas Vallei, Stellenbosch"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Nearby Places */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Nearby places
          </CardTitle>
          <CardDescription>
            Add key spots near your property and how long they take to walk to
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Added places list */}
          {nearbyPlaces.length > 0 && (
            <div className="space-y-2">
              {nearbyPlaces.map((place, index) => {
                const typeInfo = placeTypes.find((t) => t.value === place.name)
                const Icon = typeInfo?.icon ?? MapPin
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">
                        {place.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {typeInfo?.label ?? "Place"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-sm font-medium text-foreground">
                      <Footprints className="h-4 w-4 text-muted-foreground" />
                      {place.minutes} min
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNearbyPlace(index)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove place</span>
                    </button>
                  </div>
                )
              })}
            </div>
          )}
          {/* Add place form */}
          <div className="rounded-xl border border-dashed border-border p-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <div className="space-y-2">
                <Label htmlFor="placeName">Place name</Label>
                <Input
                  id="placeName"
                  placeholder="e.g. UCT, Checkers"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={placeType} onValueChange={setPlaceType}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select propertyType" />
                  </SelectTrigger>
                  <SelectContent>
                    {placeTypes.map((pt) => {
                      const Icon = pt.icon
                      return (
                        <SelectItem key={pt.value} value={pt.value}>
                          <span className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            {pt.label}
                          </span>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="placeMinutes">Walk (min)</Label>
                <Input
                  id="placeMinutes"
                  type="number"
                  min="1"
                  placeholder="5"
                  value={placeMinutes}
                  onChange={(e) => setPlaceMinutes(e.target.value)}
                  className="h-11 w-full rounded-xl sm:w-24"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addNearbyPlace}
              className="mt-3 w-full gap-2 rounded-xl"
            >
              <Plus className="h-4 w-4" />
              Add nearby place
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Pricing */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary" />
            Pricing
          </CardTitle>
          <CardDescription>
            Be transparent tenants love clear pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rent">
                Monthly rent (R) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="rent"
                type="number"
                min={0}
                placeholder="3500"
                value={rent}
                onChange={(e) => setPrice(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Deposit (R)</Label>
              <Input
                id="deposit"
                type="number"
                placeholder="7000"
                min={0}
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="utilities">Est. utilities / month (R)</Label>
              <Input
                id="utilities"
                type="number"
                placeholder="350"
                value={utilities}
                min={0}
                onChange={(e) => setUtilities(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="adminFee">Admin fee (R, once-off)</Label>
              <Input
                id="adminFee"
                propertyType="number"
                placeholder="250"
                value={adminFee}
                onChange={(e) => setAdminFee(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div> */}
          </div>

          {moveInTotal > 0 && (
            <div className="flex items-center justify-between rounded-xl bg-primary/10 px-4 py-3">
              <span className="text-sm font-medium text-foreground">
                Total move-in cost
              </span>
              <span className="text-lg font-bold text-primary">
                R{moveInTotal.toLocaleString("en-ZA")}
              </span>
            </div>
          )}

          {/* NSFASAccredited toggle */}
          <button
            type="button"
            onClick={() => setNsfasAccredited(!nsfasAccredited)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
              nsfasAccredited
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-border hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                nsfasAccredited
                  ? "bg-green-500 text-white"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">
                NSFASAccredited Accredited
              </p>
              <p className="text-sm text-muted-foreground">
                This property accepts NSFASAccredited-funded students
              </p>
            </div>
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border-2",
                nsfasAccredited
                  ? "border-green-500 bg-green-500"
                  : "border-border"
              )}
            >
              {nsfasAccredited && <Check className="h-4 w-4 text-white" />}
            </div>
          </button>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Amenities
          </CardTitle>
          <CardDescription>Select all that apply</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {amenitiesList.map((amenity) => {
              const Icon = amenity.icon
              const active = selectedAmenities.includes(amenity.id)
              return (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border-2 p-3 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      active ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  {amenity.label}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImagePlus className="h-5 w-5 text-primary" />
            Photos
          </CardTitle>
          <CardDescription>
            Add at least 3 photos. Listings with photos get 5x more views
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border"
                >
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`Property photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 rounded-full bg-primary text-primary-foreground">
                      Cover
                    </Badge>
                  )}
                  <button
                    onClick={() => removePhoto(index)}
                    className="opaProvince-0 transition-opaProvince group-hover:opaProvince-100 absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove photo</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleAddPhoto}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
              handleAddPhoto()
            }}
            className={cn(
              "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary hover:bg-primary/5"
            )}
          >
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Drag and drop or click to upload photos
            </span>
            <span className="text-xs text-muted-foreground">
              JPG, PNG up to 10MB each
            </span>
          </button>
        </CardContent>
      </Card>

      {/* House Rules */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            House rules
          </CardTitle>
          <CardDescription>Set expectations for your tenants</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            className="rounded-xl"
            placeholder="No sleep overs."
            value={}
            onChange={(e) => {
              const newRule = e.target.value
            }}
          >
            <Button className="rounded-xl" onClick={() => rules.push(newRule)}>
              <Plus className="h-4 w-4" /> Add rule{" "}
            </Button>
          </Input>
          {/* {rules.map((rule, i) => (
            <Input
              key={rule.id}
              value={rule.content} 
              onChange={(e) => {
                const newRules = [...rules]
                newRules[i] = { ...rule, content: e.target.value }
                setRules(newRules)
              }}
            />
          ))} */}
          <Button className="rounded-xl" onClick={() => addRule()}>
            <Plus className="h-4 w-4" /> Add rule{" "}
          </Button>
        </CardContent>
      </Card>

      {/* Sticky Action Bar */}
      <div className="fixed right-0 bottom-0 left-0 z-20 border-t border-border bg-background/95 p-4 backdrop-blur lg:left-[var(--sidebar-offset,220px)]">
        <div className="mx-auto flex max-w-3xl items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            className="rounded-xl"
          >
            Save as draft
          </Button>
          <Button onClick={() => handleSubmit(false)} className="rounded-xl">
            Publish listing
          </Button>
        </div>
      </div>
    </div>
  )
}
