import { ThemeProvider } from "@/components/layout/theme-provider"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster } from "react-hot-toast"
import MainLayout from "@/components/layout/main-layout"

export function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
