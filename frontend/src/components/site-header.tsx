// import { SearchForm } from "@/components/search-form"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { MenuIcon } from "lucide-react"
import {ModeToggle} from "@/components/mode-toggle"
//import DarkModeButton from '@/components/mode-button';

const logedIn:boolean =false;

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
      <div className="flex justify-between h-(--header-height) w-full items-center gap-2 px-4">
        
        
        <div className="">
          
          <h1 className="text-2xl p-0.5 text-primary font-bold">
            StayIn.
          </h1>
        </div>
        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
        <div className="flex gap-0.5">
          <div className="">
            <ModeToggle />
          </div>
          {!logedIn&&
            <Button>
            Sign-up
          </Button>}
          {!logedIn&&
           <Button>
            Sign-in
          </Button>
          }
         
          {logedIn&&<Button
          className="h-8 w-8"
          variant="default"
          size="icon"
          onClick={toggleSidebar}
        >
          <MenuIcon
          />
        </Button>}
        </div>
       
        
      </div>
    </header>
  )
}
