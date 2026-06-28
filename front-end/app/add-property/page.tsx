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
  Wifi,
  Zap,
  ShieldCheck,
  Droplets,
  Car,
  Utensils,
  WashingMachine,
  Wind,
  Check,
  Bus,
  // 🔒 Security icons
  Camera,
  Shield,
  Bell,
  Lock,
  Fingerprint,
  DoorClosed,
  UserCheck,
  // ⚡ Loadshedding icons
  Battery,
  Flame,
  Sun,
} from "lucide-react"

import { toast } from "sonner"
import {
  provinces,
  townsByProvince,
} from "@/lib/constants/SouthAfricanLocations"
import { Province } from "@/lib/constants/SouthAfricanLocations"

const propertyTypes = [
  { value: "backroom", label: "Backroom" },
  { value: "digs", label: "Digs / Shared House" },
  { value: "single", label: "Single Room" },
  { value: "sharing", label: "Sharing Room" },
  { value: "cottage", label: "Cottage / Garden Flat" },
  { value: "apartment", label: "Apartment" },
]



const amenitiesList = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "prepaid", label: "Prepaid Electricity", icon: Zap },
  { id: "security", label: "24/7 Security", icon: ShieldCheck },
  { id: "water", label: "Water Included", icon: Droplets },
  { id: "parking", label: "Parking", icon: Car },
  { id: "kitchen", label: "Shared Kitchen", icon: Utensils },
  { id: "laundry", label: "Laundry", icon: WashingMachine },
  { id: "aircon", label: "Air Conditioning", icon: Wind },
  { id: "shuttle", label: "Shuttle", icon: Bus },

  // 🔒 Security extras
  { id: "electric-fence", label: "Electric Fence", icon: Zap },
  { id: "cctv", label: "CCTV", icon: Camera },
  { id: "armed-response", label: "Armed Response", icon: Shield },
  { id: "security-guard", label: "Security Guard", icon: UserCheck },
  { id: "alarm-system", label: "Alarm System", icon: Bell },
  { id: "security-bars", label: "Security Bars", icon: Lock },
  { id: "biometric-access", label: "Biometric Access", icon: Fingerprint },
  { id: "security-gate", label: "Security Gate", icon: DoorClosed },

  // ⚡ Loadshedding extras
  { id: "inverter", label: "Inverter", icon: Battery },
  { id: "gas", label: "Gas", icon: Flame },
  { id: "solar", label: "Solar", icon: Sun },
  { id: "generator", label: "Generator", icon: Zap },
]

export default function AddListingPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")

  const [suburb, setSuburb] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [deposit, setDeposit] = useState("")
  const [utilities, setUtilities] = useState("")
  const [adminFee, setAdminFee] = useState("")

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [photos, setPhotos] = useState<string[]>([])
  const [nsfas, setNsfas] = useState(false)
  const [gender, setGender] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [province, setProvince] = useState<Province | "">("")
  const [town, setTown] = useState("")

  const handleProvinceChange = (value: string) => {
    setProvince(value as Province)
    setTown("") // reset dependent field
  }

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
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

  const handleSubmit = (asDraft: boolean) => {
    if (!asDraft && (!title || !type || !province || !price)) {
      toast.error("Please fill in all required fields")
      return
    }
    toast.success(
      asDraft ? "Listing saved as draft" : "Listing published successfully!"
    )
    router.push("/dashboard")
  }

  const moveInTotal =
    (Number(price) || 0) + (Number(deposit) || 0) + (Number(adminFee) || 0)

  return (
    <div className="mx-auto w-full space-y-6 pb-4 p-3">
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
            <Label htmlFor="title">
              Listing title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g. Cozy backroom near UCT campus"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Property type <span className="text-destructive">*</span>
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select property type" />
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
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Select the gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the room, the neighborhood, transport links, and what makes it special..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              <Label htmlFor="price">
                Monthly rent (R) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                min={0}
                placeholder="3500"
                value={price}
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
                type="number"
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

          {/* NSFAS toggle */}
          <button
            type="button"
            onClick={() => setNsfas(!nsfas)}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
              nsfas
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-border hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                nsfas
                  ? "bg-green-500 text-white"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">NSFAS Accredited</p>
              <p className="text-sm text-muted-foreground">
                This property accepts NSFAS-funded students
              </p>
            </div>
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border-2",
                nsfas ? "border-green-500 bg-green-500" : "border-border"
              )}
            >
              {nsfas && <Check className="h-4 w-4 text-white" />}
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
            placeholder="e.g. No loud music after 10pm, no smoking indoors, visitors must sign in..."
            className="rounded-xl"
          />
          <Button>+</Button>
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
