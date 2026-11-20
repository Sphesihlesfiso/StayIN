import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardAction,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardImage() {
  return (
    <Card className="">
      <div className="absolute inset-0 z-30 aspect-video" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction className="flex flex-wrap gap-0.5">
         
        </CardAction>
        <CardTitle>R 3500 pm</CardTitle>
        <CardDescription>
          <p className="m-0.5">4 Bedroom house in Idas Valei.</p>
          <Badge variant="outline" className="mr-0.5 p-0.5">Nsfas Accredited</Badge>
           <Badge variant="outline" className="mr-0.5 p-0.5">Cctv</Badge>
            <Badge variant="outline" className="mr-0.5 p-0.5">Shuttle</Badge>
        </CardDescription>
      </CardHeader>
      {/* <CardFooter>
        <Button className="md">View Event</Button>
      </CardFooter> */}
    </Card>
  )
}

export default function PropertyCard() {
  return (
    <div>property-card</div>
  )
}
