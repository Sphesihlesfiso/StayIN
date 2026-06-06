import { Heart, Shield } from "lucide-react"
import React from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export const PricingBreakDown = () => {
  return (
    <Card className="space-y-4 p-4">
      {/* Header */}
      <h1 className="text-lg font-extrabold">Pricing breakdown</h1>

      {/* Breakdown grid */}
      <div className="grid grid-cols-2 gap-y-2 border-b pb-2">
        <div className="space-y-1 text-gray-700">
          <p>Base rent</p>
          <p>Deposit</p>
          <p>Utilities</p>
        </div>
        <div className="space-y-1 text-right font-semibold">
          <p>R4500 /mo</p>
          <p>R9000 (3 months)</p>
          <p>R9000 (3 months)</p>
        </div>
      </div>

      {/* Total */}
      <div>
        <h2 className="font-bold">Total to move in</h2>
        <span className="text-lg font-extrabold text-green-600">R9000</span>
      </div>

      {/* Accreditation */}
      <div className="flex items-center gap-2 text-gray-700">
        <Shield className="h-5 w-5 text-green-500" />
        <p>NSFAS accredited</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button className="flex-1">Request to view</Button>
        <Button variant="outline" className="flex flex-1 items-center gap-2">
          <Heart className="h-4 w-4" /> Save Listing
        </Button>
      </div>
    </Card>
  )
}

export default PricingBreakDown
