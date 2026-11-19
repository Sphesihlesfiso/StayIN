import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {Footer2} from "@/components/footer2"
import { CardImage } from '../components/property-card';
import { PropertyPaging } from '../components/paging';
// import SearchFilter from '../components/search-filter';

//TODO
//Must fix sidebar to not overlap with footer
//MUst make sidebar responsive to smaller device screens.
export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."
export default function Home() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* <SearchFilter/> */}
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {/* <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" /> */}
                <CardImage/>
                  <CardImage/>
                    <CardImage/>
                      <CardImage/>
                        <CardImage/>
                          <CardImage/>
              </div>
              <PropertyPaging/>
                <Footer2/>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    
   
    </div>
  )
}
