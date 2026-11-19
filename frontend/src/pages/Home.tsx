import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Footer2 } from "@/components/footer2"
import { CardImage } from "../components/property-card"
import { PropertyPaging } from "../components/paging"
import SearchFilter, { type PropertyFilters } from "@/components/search-filter"
export const iframeHeight = "800px"
export const description = "A responsive property listing page."
function handleApplyFilters(filters: PropertyFilters) {
  console.log("Applied filters:", filters)

  // Later: connect this to your TanStack Query property search.
}
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SidebarProvider className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="mx-6">
          <SearchFilter onApply={handleApplyFilters} />
        </div>
        <div className="flex flex-1 items-stretch">
          <AppSidebar />

          <SidebarInset className="min-w-0 flex-1">
            <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
              <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <CardImage />
                <CardImage />
                <CardImage />
                <CardImage />
                <CardImage />
                <CardImage />
              </section>

              <div className="mt-auto flex justify-center py-6">
                <PropertyPaging />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Footer outside the sidebar layout */}
      <Footer2 />
    </div>
  )
}
