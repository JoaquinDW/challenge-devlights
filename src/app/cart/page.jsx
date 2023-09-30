"use client"
import React, { useEffect, useState } from "react"
import { useCart } from "../hooks/useCart"

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const { cart, clearCart, onDecrement, setCart } = useCart()

  useEffect(() => {
    const newTotalPrice = cart.reduce((acc, deal) => {
      return Number(acc) + Number(deal.salePrice) * Number(deal.quantity)
    }, 0)
    setTotalPrice(newTotalPrice.toFixed(2))
  }, [cart])

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart"))
    if (cartStorage) {
      setCart(cartStorage)
    }
  }, [])
  const checkout = async () => {
    const cartProducts = cart.map((item) => {
      let nuevoElemento = {
        title: item.title,
        unit_price: Number(item.salePrice),
        quantity: Number(item.quantity),
      }
      return nuevoElemento
    })

    let response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer TEST-8133041202068119-093014-cd2faf9356477218432ff8f29fa40a9b-389442168",
        },
        body: JSON.stringify({
          items: cartProducts,
        }),
      }
    )
    let data = await response.json()
    console.log(data)
    window.open(data.init_point, "_blank")
  }

  return (
    <div>
      <table className="min-w-full divide-y divide-slate-600 rounded-md">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-600">
          {cart &&
            cart.map((deal) => (
              <tr key={deal.dealID} className="content-center">
                <td className="px-6 py-4 whitespace-nowrap ">{deal.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{deal.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${deal.salePrice}
                </td>
                <td>
                  <button
                    onClick={() => onDecrement(deal)}
                    className="hover:bg-red-600 px-2 py-1 rounded-md  text-center "
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-end gap-3 mt-4  items-center text-xl mr-4">
        <p className="">Total:</p>
        <p className="font-bold ">${totalPrice}</p>
      </div>

      {cart.length > 0 && (
        <div className="flex justify-end content-center items-center">
          <button
            onClick={clearCart}
            className="p-2 bg-red-600 rounded hover:bg-red-700 my-2"
          >
            Clear Cart
          </button>
          <button
            onClick={checkout}
            className="hover:brightness-110 hover:animate-pulse font-bold py-2 rounded-md bg-gradient-to-r from-yellow-500 via-rose-500 to-indigo-500 text-white w-[150px] flex gap-3 text-center ml-4 items-center justify-center"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
