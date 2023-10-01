import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.dealID === product.dealID)

    if (existingProduct) {
      onIncrement(existingProduct)
    } else {
      const updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]
      setCart(updatedCart)

      localStorage.setItem("cart", JSON.stringify(updatedCart))
    }
  }

  const onIncrement = (product) => {
    const newCart = [...cart]
    const index = newCart.findIndex((p) => p.dealID === product.dealID)
    newCart[index].quantity++
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const onDecrement = (product) => {
    const newCart = [...cart]
    const index = newCart.findIndex((p) => p.dealID === product.dealID)
    if (newCart[index].quantity > 1) {
      newCart[index].quantity--
      localStorage.setItem("cart", JSON.stringify(newCart))
    } else {
      newCart.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(newCart))
      if (cart.length === 0) {
        clearCart()
      }
    }
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
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
