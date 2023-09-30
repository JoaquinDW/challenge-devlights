import Link from "next/link"
import React from "react"

import Image from "next/image"
import { AiOutlineShoppingCart } from "react-icons/ai"
import Cart from "../cart/page"
import { useCart } from "../hooks/useCart"

const Navbar = () => {
  const { cart } = useCart()
  return (
    <section className="flex justify-between items-center my-3">
      <Link href="/" className="text-2xl font-bold">
        Deal Store
      </Link>

      <div className="outline-2 outline-double p-1 rounded-md outline-rose-500">
        <Link href="/cart" className="flex items-center gap-2">
          <AiOutlineShoppingCart className="text-2xl" color="#e11d48" />
          <p className="text-rose-500">Cart ({cart.length})</p>
        </Link>
      </div>
    </section>
  )
}

export default Navbar
