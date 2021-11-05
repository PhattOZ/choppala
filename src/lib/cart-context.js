import { createContext, useEffect, useReducer } from "react"

const CartContext = createContext({})

const initialState = {
  cart: [],
  totalPrice: 0,
}

const calculatePrice = (data) => {
  let sum = 0
  data.map((item) => {
    if (item.isConfirm === true) {
      sum += item.price * item.quantity
    }
  })
  return sum
}

const updatedCartDB = (cart) => {
  fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify(cart),
    headers: {
      "content-type": "application/json",
    },
  })
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      const sum = calculatePrice(action.val)
      return { cart: action.val, totalPrice: sum }
    case "ADD_CART":
      const tragetIndex = state.cart.findIndex(
        (item) => item._id === action.val._id
      )
      let newCart
      let newTotal
      if (tragetIndex === -1) {
        //not found
        newCart = [...state.cart, action.val]
        newTotal = state.totalPrice + action.val.price * action.val.quantity
      } else {
        //found
        let { quantity, ...updatedItem } = action.val
        const newQuantity = quantity + state.cart[tragetIndex].quantity
        updatedItem = {
          ...updatedItem,
          quantity: newQuantity,
        }
        newCart = [
          ...state.cart.filter((item) => item._id != action.val._id),
          updatedItem,
        ]
        newTotal = calculatePrice(newCart)
      }
      updatedCartDB(newCart)
      return {
        cart: newCart,
        totalPrice: newTotal,
      }
    default:
      return {
        cart: [...state.cart],
        totalPrice: state.totalPrice,
      }
  }
}

export const CartContextProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, initialState)

  const getCart = () => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => dispatchCart({ type: "GET_CART", val: data }))
      .catch((err) => console.log(err))
  }

  const addToCart = (item) => {
    console.log("addToCart")
    dispatchCart({ type: "ADD_CART", val: item }) //update state first than update in db
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
