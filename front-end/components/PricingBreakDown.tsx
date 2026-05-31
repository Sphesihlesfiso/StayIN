import { Heart, Shield } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
export const PricingBreakDown = () => {
  return (
    <Card>
      <div className="border-r-2">
        <h1 className="font-extrabold">Pricing breakdown</h1>
        <div className="grid grid-cols-2 border-b-2">
          <div>
            <p>Base rent</p>
            <p>Deposit</p>
            <p>Utilities</p>
          </div>
          <div>
            <p>R4500 /mo</p>
            <p>R9000(3 months)</p>
            <p>R9000(3 months)</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Total to move in</h2>
          <span> R9000</span>
        </div>
        <div className="my-1.5">
          <Shield /> <p>Nsfas accredited.</p>
        </div>
      </div>
      <Button>Request to view</Button>
      <Button ><Heart/> Save Listing</Button>
    </Card>
  )
}

export default PricingBreakDown
