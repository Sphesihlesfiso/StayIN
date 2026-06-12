import { Heart } from "lucide-react"
import { Button } from "./ui/button"

export const MobileActionBar = () => {
  return (
    <div className="fixed bottom-0 left-0 flex w-full gap-2 border-t bg-white p-3 sm:hidden">
      <Button className="flex-1">Request to view</Button>
      <Button variant="outline" className="flex flex-1 items-center gap-2">
        <Heart className="h-4 w-4" /> Save Listing
      </Button>
    </div>
  )
}
