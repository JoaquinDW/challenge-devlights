"use client"
import api from "./Services/api"
import { useState, useEffect } from "react"
import Card from "./Components/Card"
import Hero from "./Components/Hero"
import { useCart } from "./hooks/useCart"

export default function Home() {
  const [deals, setDeals] = useState([])
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showToast, setShowToast] = useState(false)
  const { setCart } = useCart()

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"))
    if (cartFromLocalStorage) {
      setCart(cartFromLocalStorage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    api.getDeals().then((data) => {
      setDeals(data)
    })
  }, [])

  useEffect(() => {
    const filterProducts = (products) => {
      return products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase())
      })
    }
    setFilteredProducts(filterProducts(deals))
  }, [search, deals])

  const handleShowtoast = () => {
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 1500)
  }

  return (
    <>
      <Hero />
      <main className="">
        <section className="flex justify-center container mt-2" id="search">
          <div className="m-4 p-1 rounded-md bg-gradient-to-r from-yellow-500 via-rose-500 to-indigo-500 w-[500px]">
            <input
              className="p-3 rounded-md w-full focus:outline-none bg-black text-white placeholder:text-red-400 placeholder:text-xl mx-auto"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {showToast && (
          <div className="fixed top-12 right-1  z-10">
            {showToast && (
              <div className="animate-fade-in flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2 max-w-xs mx-auto">
                <div className="text-green-500 rounded-full bg-white mr-3">
                  <svg
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 16 16"
                    className="bi bi-check"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                    />
                  </svg>
                </div>
                <div className="text-white max-w-xs ">Product added</div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col justify-center item-center">
          <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-[120px] md:ml-0">
            {filteredProducts.length ? (
              filteredProducts.map((deal) => (
                <Card
                  key={deal.dealID}
                  deal={deal}
                  handleShowtoast={handleShowtoast}
                  setShowToast={setShowToast}
                />
              ))
            ) : deals.length ? (
              deals.map((deal) => (
                <Card
                  key={deal.dealID}
                  deal={deal}
                  handleShowtoast={handleShowtoast}
                  setShowToast={setShowToast}
                />
              ))
            ) : (
              <p>Cargando...</p>
            )}
          </section>
        </div>
      </main>
    </>
  )
}
