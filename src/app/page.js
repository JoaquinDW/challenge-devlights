"use client"
import api from "./Services/api"
import { useState, useEffect } from "react"
import Card from "./Components/Card"

import Hero from "./Components/Hero"

export default function Home() {
  const [deals, setDeals] = useState([])
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  //console.log(deals)

  useEffect(() => {
    api.getDeals().then((data) => {
      setDeals(data)
    })
  }, [])

  useEffect(() => {
    setFilteredProducts(
      deals.filter((deal) =>
        deal.title.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, deals])

  return (
    <>
      <Hero />
      <main className="">
        <div className="m-4 p-1 rounded-md max-w-sm bg-gradient-to-r from-yellow-500 via-rose-500 to-indigo-500 ">
          <input
            className="p-3 w-full rounded-md focus:outline-none bg-black text-white placeholder:text-red-400 placeholder:text-xl "
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <section className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
          {filteredProducts.length ? (
            filteredProducts.map((deal) => (
              <Card key={deal.dealID} deal={deal} />
            ))
          ) : deals.length ? (
            deals.map((deal) => <Card key={deal.dealID} deal={deal} />)
          ) : (
            <p>Cargando...</p>
          )}
        </section>
      </main>
    </>
  )
}
