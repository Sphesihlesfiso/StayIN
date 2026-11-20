import { Footer2 } from "@/components/layout/footer2"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SiteHeader } from "@/components/layout/site-header"
import { Outlet } from "react-router"

export default function MainLayout() {
  return (
    <SidebarProvider
      style={{ "--header-height": "3.5rem" } as React.CSSProperties}
      className="flex min-h-svh flex-col"
    >
      <SiteHeader className="h-(--header-height) shrink-0" />
      <div className="flex min-h-0 flex-1">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer2 />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
