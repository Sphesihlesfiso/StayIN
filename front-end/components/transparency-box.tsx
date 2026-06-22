"use client"

import { Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface TransparencyBoxProps {
  price: number
  deposit: number
  utilities: number
  adminFee: number
  nsfasAccredited: boolean
  hostName: string
  location: string
  onSave?: () => void
  isSaved?: boolean
}

export function TransparencyBox({
  price,
  deposit,
  utilities,
  adminFee,
  nsfasAccredited,
  hostName,
  location,
  onSave,
  isSaved = false,
}: TransparencyBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState(
    `Hi ${hostName}, I'd like to arrange an in-person viewing of your listing in ${location}. I'm available [dates]. Please let me know what works for you.`
  )

  const totalMoveIn = price + deposit + adminFee

  const handleSend = () => {
    toast.success("Message sent successfully!")
    setIsOpen(false)
  }

  const handleSave = () => {
    onSave?.()
    toast.success(isSaved ? "Removed from saved" : "Saved to your list")
  }

  return (
    <div className="sticky top-24 space-y-4">
      {/* Pricing Card */}
      <div className="overflow-hidden rounded-2xl border-l-4 border-l-primary bg-card shadow-lg">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Pricing breakdown
            </h3>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              No hidden fees
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Base Rent</span>
              <span className="font-medium text-foreground">
                R{price.toLocaleString("en-ZA")} /mo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Deposit</span>
              <span className="font-medium text-foreground">
                R{deposit.toLocaleString("en-ZA")}{" "}
                <span className="text-xs text-muted-foreground">
                  (2 months)
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Est. Utilities</span>
              <span className="font-medium text-foreground">
                R{utilities.toLocaleString("en-ZA")} /mo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Admin Fee</span>
              <span className="font-medium text-foreground">
                R{adminFee.toLocaleString("en-ZA")}{" "}
                <span className="text-xs text-muted-foreground">
                  (once-off)
                </span>
              </span>
            </div>

            <div className="my-4 border-t border-dashed border-border" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Total to move in
              </span>
              <span className="text-xl font-bold text-primary">
                R{totalMoveIn.toLocaleString("en-ZA")}
              </span>
            </div>
          </div>
        </div>

        {/* NSFAS Badge */}
        {nsfasAccredited && (
          <div className="border-t border-border bg-green-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-800">NSFAS Accredited</p>
                <p className="text-sm text-green-700">
                  Approved for NSFAS funding
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="h-12 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90">
            Request to View
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message {hostName}</DialogTitle>
            <DialogDescription>
              Request a viewing or ask questions about this property
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="resize-none rounded-xl"
            />
            <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p className="text-xs text-amber-800">
                Keep all communication on StayIN to stay protected from scams.
              </p>
            </div>
            <Button onClick={handleSend} className="w-full rounded-xl">
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        onClick={handleSave}
        className={cn(
          "h-12 w-full gap-2 rounded-2xl text-base font-medium",
          isSaved &&
            "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
        )}
      >
        <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
        {isSaved ? "Saved" : "Save listing"}
      </Button>
    </div>
  )
}
