import { createContext, useEffect, useReducer } from "react"

const CartContext = createContext({})

const initialState = {
  cart: [],
  totalPrice: 0,
}

const calculatePrice = (data) => {
  let sum = 0
  if (data.length > 0) {
    data.map((item) => {
      if (item.isConfirm === true) {
        sum += item.price * item.quantity
      }
    })
  } else {
    return 0
  }
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

const addedUserHistoryDB = (items) => {
  const newItems = items.map(({ _id: itemID, ...rest }) => ({
    itemID,
    ...rest,
  }))
  fetch("/api/userHistory", {
    method: "POST",
    body: JSON.stringify(newItems),
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
      let addedTragetIndex
      if (state.cart.length > 0) {
        addedTragetIndex = state.cart.findIndex(
          (item) => item._id === action.val._id
        )
      } else {
        return {
          cart: [action.val],
          totalPrice: action.val.quantity * action.val.price,
        }
      }

      let newCart
      let newTotal
      if (addedTragetIndex === -1) {
        //not found
        newCart = [...state.cart, action.val]
        newTotal = state.totalPrice + action.val.price * action.val.quantity
      } else {
        //found
        let { quantity, ...updatedItem } = action.val
        const newQuantity = quantity + state.cart[addedTragetIndex].quantity
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
    case "UPDATE_CART":
      const updatedTragetIndex = state.cart.findIndex(
        (item) => item._id === action.val.id
      )

      let { isConfirm, quantity, ...updatedItem } =
        state.cart[updatedTragetIndex]

      //-1 decrease, 0 switch select, 1 increase
      switch (action.val.check) {
        case -1:
          if (quantity == 1) {
            // delete item if quantity already 1 and decrease to 0
            newCart = [
              ...state.cart.filter((item) => item._id != action.val.id),
            ]
            newTotal = calculatePrice(newCart)
            updatedCartDB(newCart)
            return {
              cart: newCart,
              totalPrice: newTotal,
            }
          } else {
            updatedItem = {
              ...updatedItem,
              quantity: quantity - 1,
              isConfirm: isConfirm,
            }
          }
          break
        case 0:
          updatedItem = {
            ...updatedItem,
            quantity: quantity,
            isConfirm: !isConfirm,
          }
          break
        case 1:
          updatedItem = {
            ...updatedItem,
            quantity: quantity + 1,
            isConfirm: isConfirm,
          }
          break
      }
      newCart = [...state.cart]
      newCart[updatedTragetIndex] = updatedItem

      newTotal = calculatePrice(newCart)
      updatedCartDB(newCart)
      return {
        cart: newCart,
        totalPrice: newTotal,
      }
    case "DELETE_ITEM":
      newCart = [...state.cart.filter((item) => item._id != action.val)]
      newTotal = calculatePrice(newCart)
      updatedCartDB(newCart)
      return {
        cart: newCart,
        totalPrice: newTotal,
      }
    case "ORDER_ITEM":
      newCart = [...state.cart.filter((item) => !action.val.includes(item))]

      newTotal = calculatePrice(newCart)
      updatedCartDB(newCart)
      addedUserHistoryDB(action.val)
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

  const addToCart = (item) => {
    dispatchCart({ type: "ADD_CART", val: item }) //update state first than update in db
  }

  const updateCart = (id, val) => {
    const data = { id: id, check: val }

    dispatchCart({ type: "UPDATE_CART", val: data })
  }

  const deleteItem = (id) => {
    dispatchCart({ type: "DELETE_ITEM", val: id })
  }

  const orderItem = (items) => {
    console.log("order now!!")
    console.log(items)

    dispatchCart({ type: "ORDER_ITEM", val: items })
  }

  useEffect(() => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => dispatchCart({ type: "GET_CART", val: data }))
      .catch((err) => console.log(err))
  }, [])

  const value = {
    value: cart,
    addToCart: addToCart,
    deleteItem: deleteItem,
    updateCart: updateCart,
    orderItem: orderItem,
  }
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  )
}

export default CartContext
