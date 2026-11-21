import { CardImage } from "../components/property/property-card"
import { PropertyPaging } from "../components/paging"

export const iframeHeight = "800px"
export const description = "A responsive property listing page."
// function handleApplyFilters(filters: PropertyFilters) {
//   console.log("Applied filters:", filters)

//   // Later: connect this to your TanStack Query property search.
// }
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
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
    </div>
  )
}
