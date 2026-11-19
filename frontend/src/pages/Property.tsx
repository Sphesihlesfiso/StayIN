import { Footer2 } from "@/components/footer2"
import MorphSlider from "@/components/MorphSlider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BsWhatsapp } from "react-icons/bs"

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop",
    caption: "Living room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop",
    caption: "Bedroom",
  },
  {
    image:
      "https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop",
    caption: "Exterior",
  },
]

export default function Property() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
          {/* LEFT COLUMN */}
          <div className="min-w-0 space-y-8">
            {/* Property images */}
            <section>
              <div className="h-[280px] overflow-hidden rounded-xl sm:h-[400px] lg:h-[500px]">
                <MorphSlider
                  items={items}
                  transition="melt"
                  intensity={0.55}
                  aberration={0.35}
                  drift={0.4}
                  autoplay={false}
                  overlayColor="#05060a"
                  duration={1.1}
                  ease="power2.inOut"
                  scale={2.4}
                  autoplayDelay={4}
                  loop
                  radius={16}
                  showCaptions
                  showControls
                  showIndicators
                />
              </div>

              {/* Property heading */}
              <div className="mt-6 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">House</Badge>
                  <Badge variant="outline">Available</Badge>
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  2 Bedroom House in Idas Valley
                </h1>

                <p className="text-sm text-muted-foreground">
                  Idas Valley, Stellenbosch, Western Cape
                </p>
              </div>
            </section>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About this property</CardTitle>
                <CardDescription>
                  Get to know more about this accommodation.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Natus deleniti quisquam magni facere animi id adipisci
                  assumenda! Et placeat deserunt qui quae tempore eos commodi,
                  nihil accusamus! Laboriosam, nulla aperiam.
                </p>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card>
              <CardHeader>
                <CardTitle>House rules</CardTitle>
                <CardDescription>
                  Important things to know before booking.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">No noise</Badge>
                  <Badge variant="outline">No smoking</Badge>
                  <Badge variant="outline">No parties</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
                <CardDescription>
                  Facilities available at this property.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {["WiFi", "Shuttle", "CCTV"].map((amenity) => (
                    <div
                      key={amenity}
                      className="rounded-lg border p-4 text-sm font-medium"
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nearby places */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby places</CardTitle>
                <CardDescription>
                  Explore places around this property.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {["Spar", "University", "Shopping Centre", "Transport"].map(
                    (place) => (
                      <div
                        key={place}
                        className="flex items-center justify-between border-b pb-3 last:border-0"
                      >
                        <span className="text-sm font-medium">{place}</span>
                        <span className="text-sm text-muted-foreground">
                          Nearby
                        </span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: STICKY PRICING */}
          <aside className="relative lg:sticky lg:top-24">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Pricing breakdown</CardTitle>
                <CardDescription>
                  Understand the costs before requesting a viewing.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Pricing */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly rent</span>
                    <span className="font-semibold">Not specified</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deposit</span>
                    <span className="font-semibold">Not specified</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Utilities</span>
                    <span className="font-semibold">Not specified</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total monthly cost</span>
                    <span className="text-lg font-bold">Contact host</span>
                  </div>
                </div>

                {/* Property information */}
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium">
                    Interested in this property?
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Send a request to the landlord to arrange a viewing and find
                    out more about the accommodation.
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full">Request a viewing</Button>

                <Button variant="outline" className="w-full">
                  Contact landlord <BsWhatsapp />
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  No payment is required to request a viewing.
                </p>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </main>

      <Footer2 />
    </div>
  )
}
