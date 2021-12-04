import { createContext, useEffect, useReducer, useState } from "react"
import cartReducer from "./cart-reducer"

const CartContext = createContext({})

const initialState = {
  cart: [],
  totalPrice: 0,
  checked: 0,
}

export const CartContextProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, initialState)
  const [showHeader, setShowHeader] = useState(true)

  const addToCart = (item) => {
    dispatchCart({ type: "ADD_CART", val: item }) //update state first than update in db
  }

  const updateCart = (id, val) => {
    const data = { id: id, check: val }
    dispatchCart({ type: "UPDATE_CART", val: data })
  }

  const selectManyItems = (IDs, curr) => {
    if (IDs.length == 0) {
      dispatchCart({ type: "SELECT_ALL" })
    } else if (IDs.length == 1) {
      const data = { id: IDs[0], check: 0 }
      dispatchCart({ type: "UPDATE_CART", val: data })
    } else {
      const data = { IDs: IDs, check: curr }
      dispatchCart({ type: "SELECT_SELLER", val: data })
    }
  }

  const deleteItem = (id) => {
    dispatchCart({ type: "DELETE_ITEM", val: id })
  }

  const orderItem = (items) => {
    dispatchCart({ type: "ORDER_ITEM", val: items })
  }

  useEffect(() => {
    const getIDsfromDB = () => {
      fetch("/api/cart")
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            data.forEach((e) => {
              delete e._id
            })
            getItemsFromIDs(data)
          } else {
            dispatchCart({ type: "GET_CART", val: [] })
          }
        })
        .catch((err) => console.log(err))
    }

    const getItemsFromIDs = (Items) => {
      const ItemIDs = Items.map((e) => e.itemID)
      return fetch("/api/cart/item", {
        method: "POST",
        body: JSON.stringify(ItemIDs),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let merged = []
          for (let i = 0; i < Items.length; i++) {
            merged.push({
              ...Items[i],
              ...data.find((itmInner) => itmInner.id === Items[i].itemID),
            })
          }
          merged.forEach((e) => {
            delete e.itemID
          })
          dispatchCart({ type: "GET_CART", val: merged })
        })
    }
    getIDsfromDB()
  }, [])

  const value = {
    value: cart,
    header: [showHeader, setShowHeader],
    addToCart: addToCart,
    deleteItem: deleteItem,
    updateCart: updateCart,
    selectManyItems: selectManyItems,
    orderItem: orderItem,
  }
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  )
}

export default CartContext
