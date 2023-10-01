"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import NavbarWithSearch from "./Components/Navbar"
import { CartProvider } from "./Context/cart"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className="grid grid-rows-[auto,1fr,auto] min-h-screen container m-auto ">
          <NavbarWithSearch />

          <main className="px-4">{children}</main>
          <footer className=" px-4 leading-[60px] text-center opacity-80">
            © Joaquin De Weert
          </footer>
        </body>
      </html>
    </CartProvider>
  )
}
