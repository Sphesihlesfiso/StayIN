import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RotateCcw, Search } from "lucide-react"

const accommodationTypes = [
  { id: "single", label: "Single room" },
  { id: "sharing", label: "Shared room" },
  { id: "cottage", label: "Cottage" },
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
]

export interface PropertyFilters {
  nsfasAccredited: boolean
  accommodationTypes: string[]
  maxPrice: number
}

interface SearchFilterProps {
  onApply: (filters: PropertyFilters) => void
}

export default function SearchFilter({ onApply }: SearchFilterProps) {
  const [nsfasAccredited, setNsfasAccredited] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(10000)

  function toggleType(type: string) {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type]
    )
  }

  function resetFilters() {
    setNsfasAccredited(false)
    setSelectedTypes([])
    setMaxPrice(10000)

    onApply({
      nsfasAccredited: false,
      accommodationTypes: [],
      maxPrice: 10000,
    })
  }

  function applyFilters() {
    onApply({
      nsfasAccredited,
      accommodationTypes: selectedTypes,
      maxPrice,
    })
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* <div>
        <h2 className="text-xl font-semibold">Find accommodation</h2>
        <p className="text-sm text-muted-foreground">
          Filter properties to find a place that suits you.
        </p>
      </div> */}

      <Popover>
        <PopoverTrigger render={<Button variant="outline" className="gap-2" />}>
          <Search className="h-4 w-4" />
          Search
          {(nsfasAccredited || selectedTypes.length > 0) && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {selectedTypes.length + (nsfasAccredited ? 1 : 0)}
            </span>
          )}
        </PopoverTrigger>

        <PopoverContent align="end" className="w-[340px] space-y-6">
          {/* NSFAS */}
          <section className="space-y-3">
            <h3 className="font-semibold">NSFAS</h3>

            <div className="flex items-center gap-3">
              <Checkbox
                id="nsfas"
                checked={nsfasAccredited}
                onCheckedChange={(checked) =>
                  setNsfasAccredited(checked === true)
                }
              />
              <label htmlFor="nsfas" className="cursor-pointer text-sm">
                NSFAS-accredited accommodation
              </label>
            </div>
          </section>

          <div className="border-t" />

          {/* Accommodation type */}
          <section className="space-y-3">
            <h3 className="font-semibold">Accommodation type</h3>

            {accommodationTypes.map((type) => (
              <div key={type.id} className="flex items-center gap-3">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => toggleType(type.id)}
                />
                <label htmlFor={type.id} className="cursor-pointer text-sm">
                  {type.label}
                </label>
              </div>
            ))}
          </section>

          <div className="border-t" />

          {/* Price slider */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Maximum monthly rent</h3>
              <span className="text-sm font-medium">
                R{maxPrice.toLocaleString("en-ZA")}
              </span>
            </div>

            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>R1,000</span>
              <span>R20,000+</span>
            </div>
          </section>

          <div className="border-t" />

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>

            <Button className="flex-1" onClick={applyFilters}>
              Apply filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
