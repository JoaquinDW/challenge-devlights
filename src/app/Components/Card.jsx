"use client"
import { useState } from "react"
import Link from "next/link"
import { useCart } from "../hooks/useCart"
import Image from "next/image"

const Card = ({ deal }) => {
  const { addToCart } = useCart()

  const MAX_RATING_VALUE = 5
  const productRating = (rating) => {
    return new Array(MAX_RATING_VALUE).fill("").map((_, index) => {
      const iconFilename =
        index + 1 > (rating / 100) * MAX_RATING_VALUE ? "☆" : "★ "
      return <span key={index}>{iconFilename}</span>
    })
  }

  return (
    <hgroup
      key={deal.dealID}
      className="hover:border-rose-500 hover:border-2 p-2 flex items-center justify-center h-[250px] w-fit rounded-md hover:scale-110 ease-in-out mt-10"
    >
      <div>
        <Image
          src={deal.thumb}
          alt={deal.title}
          width={250}
          height={200}
          className="object-cover"
        />
        <div className="">
          <h2 className="text-xl font-bold text-white text-center">
            {deal.title.length > 20
              ? deal.title.substring(0, 20) + "..."
              : deal.title}
          </h2>
          <p className="text-center opacity-80">Steam Review</p>
          <p className=" text-center text-yellow-300 text-2xl">
            {productRating(deal.steamRatingPercent)}
          </p>
          <button
            onClick={() => addToCart(deal)}
            class="hover:brightness-110 hover:animate-pulse font-bold py-2 px-6 rounded-md bg-gradient-to-r from-yellow-500 via-rose-500 to-indigo-500 text-white w-[180px] flex gap-3 text-center ml-8 mt-1 items-center justify-center"
          >
            <p className="line-through text-slate-200 text-sm text-center">
              ${deal.normalPrice}
            </p>
            <p className="text-xl text-center">${deal.salePrice}</p>
          </button>
        </div>
      </div>
    </hgroup>
  )
}

export default Card
