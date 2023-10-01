import Link from "next/link"

import { AiOutlineShoppingCart } from "react-icons/ai"

import { useCart } from "../hooks/useCart"

const Navbar = () => {
  const { cart } = useCart()
  return (
    <section className="flex justify-between items-center my-3 ml-2 md:ml-0">
      <Link href="/" className="text-2xl font-bold">
        Deal Store
      </Link>

      <div className="flex gap-6 items-center">
        <Link href="/" className="font-semibold text-lg hover:underline">
          Home
        </Link>
        <Link href="/#search" className="font-semibold text-lg hover:underline">
          Browse
        </Link>
        <div className="">
          <Link href="/cart" className=" ">
            <button className=" outline-2 outline-double p-1  outline-[#C9184A] mr-4 md:mr-0 flex  items-center gap-2 relative px-4 text-black text-base font-bold rounded-[50px] overflow-hidden bg-black transition-all duration-400 ease-in-out shadow-md hover:scale-105  hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#FFB3C1] before:to-[#FFF0F3] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded before:py-10 hover:before:left-0">
              <AiOutlineShoppingCart className="text-2xl " color="#C9184A" />
              {
                <>
                  {cart && (
                    <p className="text-[#C9184A] hidden md:block">
                      Cart ({cart.length})
                    </p>
                  )}
                </>
              }
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Navbar

/*
 <AiOutlineShoppingCart className="text-2xl " color="#e11d48" />
            {
              <>
                {cart && (
                  <p className="text-rose-500 hidden md:block">
                    Cart ({cart.length})
                  </p>
                )}
              </>
            }
*/
