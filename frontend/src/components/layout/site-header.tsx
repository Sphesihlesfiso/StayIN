// import { SearchForm } from "@/components/search-form"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { MenuIcon } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
//import DarkModeButton from '@/components/mode-button';

import SearchFilter, { type PropertyFilters } from "@/components/search-filter"
function handleApplyFilters(filters: PropertyFilters) {
  console.log("Applied filters:", filters)

  // Later: connect this to your TanStack Query property search.
}
const logedIn: boolean = true

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-(--header-height) w-full items-center border-b bg-background px-4">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-4">
        <div className="">
          <h1 className="p-0.5 text-2xl font-bold text-primary">StayIn.</h1>
        </div>
        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
        <div className="flex gap-0.5">
          <div className="mx-6">
            <SearchFilter onApply={handleApplyFilters} />
          </div>
          <div className="">
            <ModeToggle />
          </div>
          {!logedIn && <Button>Sign-up</Button>}
          {!logedIn && <Button>Sign-in</Button>}

          {logedIn && (
            <Button
              className="h-8 w-8"
              variant="default"
              size="icon"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
