

import "./globals.css"
import  Providers  from "./providers"

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen w-full flex-col">
        <Providers>
          <Navbar />
          {/* Remove flex-grow, just let content flow naturally */}
          <main className="w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}



