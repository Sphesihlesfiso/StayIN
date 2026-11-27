import { ThemeProvider } from "@/components/layout/theme-provider"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster } from "react-hot-toast"
import MainLayout from "@/components/layout/main-layout"
import Property from "./pages/Property"
import EditProperty from "./pages/Edit"
import Upload from "./pages/Upload"
import LoginPage from "./pages/Sign-in"
import SignupPage from "./pages/Sign-up"
import ManangeProperty from "./pages/Manange"

export function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/properties/:id" element={<Property />} />
            <Route path="/properties/:id/edit" element={<EditProperty />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/manange/:landlordId" element={<ManangeProperty />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
