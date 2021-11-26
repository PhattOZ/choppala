import { createContext, useEffect, useReducer, useState } from "react"

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

const transformCart = (cart) => {
  //create new cart object before pass to DB
  let newCart = []

  cart.map((item) => {
    let newItem = {
      itemID: item.id,
      quantity: item.quantity,
      isConfirm: item.isConfirm,
    }
    newCart.push(newItem)
  })

  return newCart
}

const updatedCartDB = (cart) => {
  const newCart = transformCart(cart)
  fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify(newCart),
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
          (item) => item.id === action.val.id
        )
      } else {
        updatedCartDB([action.val])
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
          ...state.cart.filter((item) => item.id != action.val.id),
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
        (item) => item.id === action.val.id
      )

      let { isConfirm, quantity, ...updatedItem } =
        state.cart[updatedTragetIndex]

      //-1 decrease, 0 switch select/unselect, 1 increase
      switch (action.val.check) {
        case -1:
          if (quantity == 1) {
            // delete item if quantity already 1 and decrease to 0
            newCart = [...state.cart.filter((item) => item.id != action.val.id)]
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
      newCart = [...state.cart.filter((item) => item.id != action.val)]
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
  const [showHeader, setShowHeader] = useState(true)

  const addToCart = async (item) => {
    dispatchCart({ type: "ADD_CART", val: item }) //update state first than update in db
  }

  const updateCart = (id, val) => {
    const data = { id: id, check: val }
    dispatchCart({ type: "UPDATE_CART", val: data })
  }

  const selectManyCart = (IDs) => {
    if (IDs.length == 1) {
      const data = { id: IDs[0], check: 0 }
      dispatchCart({ type: "UPDATE_CART", val: data })
    } else {
    }
  }

  const deleteItem = (id) => {
    dispatchCart({ type: "DELETE_ITEM", val: id })
  }

  const orderItem = (items) => {
    console.log("order now!!")

    dispatchCart({ type: "ORDER_ITEM", val: items })
  }

  useEffect(() => {
    const getIDsfromDB = () => {
      fetch("/api/cart")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((e) => {
            delete e._id
          })
          getItemsFromIDs(data)
        })
        .catch((err) => console.log(err))
    }

    const getItemsFromIDs = (Items) => {
      console.log(Items)
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
    selectManyCart: selectManyCart,
    orderItem: orderItem,
  }
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  )
}

export default CartContext
