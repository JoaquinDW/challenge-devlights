import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    if (cart.find((item) => item.dealID === product.dealID)) {
      onIncrement(product)
      return
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ])

    //add cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  console.log(cart)

  const onIncrement = (product) => {
    const newCart = [...cart]
    const index = newCart.findIndex((p) => p.dealID === product.dealID)
    newCart[index].quantity++
    setCart(newCart)
    //console.log(cart)
  }

  const onDecrement = (product) => {
    const newCart = [...cart]
    const index = newCart.findIndex((p) => p.dealID === product.dealID)
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--
    } else {
      newCart.splice(index, 1)
    }
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        onIncrement,
        addToCart,
        onDecrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
