import { createContext, useEffect, useReducer } from "react"

const CartContext = createContext({})

const cartReducer = (state, action) => {
  if (action.type === "GET_CART") {
    var sum = 0
    action.val.map((item) => {
      sum += item.price * item.quantity
    })
    return { cart: action.val, totalPrice: sum }
  } else if (action.type === "ADD_CART") {
    console.log("add to cart [context]")
  }
}

export const CartContextProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, {
    cart: [],
    totalPrice: 0,
  })

  const getCart = () => {
    fetch("api/cart")
      .then((response) => response.json())
      .then((data) => dispatchCart({ type: "GET_CART", val: data.cart }))
  }

  const addToCart = (item) => {
    console.log(item)
  }

  useEffect(() => {
    getCart()
    console.log("get cart first time")
  }, [])

  const value = { value: cart, addToCart: addToCart }

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  )
}

export default CartContext
