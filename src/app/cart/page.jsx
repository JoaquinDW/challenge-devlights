"use client"
import React, { useEffect, useState } from "react"
import { useCart } from "../hooks/useCart"

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const { cart, clearCart, onDecrement } = useCart()

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

  useEffect(() => {
    const newTotalPrice = cart.reduce((acc, deal) => {
      return Number(acc) + Number(deal.salePrice)
    }, 0)
    setTotalPrice(newTotalPrice.toFixed(2))
  }, [cart])

  return (
    <div>
      <button onClick={clearCart}>Empty Cart</button>
      <table className="min-w-full divide-y divide-gray-500 rounded-md">
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
        <tbody className="bg-gray-900 divide-y divide-gray-500 ">
          {cart &&
            cart.map((deal) => (
              <tr key={deal.dealID} className="content-center">
                <td className="px-6 py-4 whitespace-nowrap">{deal.title}</td>
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

      {
        <div className="flex justify-around gap-3 mt-4 text-center">
          <p className=" text-xl ">Total</p>
          <p>${totalPrice}</p>
          {cart.length > 0 && (
            <button
              onClick={checkout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Checkout
            </button>
          )}
        </div>
      }
    </div>
  )
}

export default Cart
