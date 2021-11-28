import { createContext, useEffect, useReducer, useState } from "react"

const CartContext = createContext({})

const initialState = {
  cart: [],
  totalPrice: 0,
  checked: 0,
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

const checkAllItems = (cart) => {
  let check = 1
  cart.map((e) => {
    e.isConfirm ? (check *= 1) : (check *= 0)
  })
  return check
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
  const newItems = items.map((e) => ({
    itemID: e.id,
    name: e.name,
    image: e.image,
    price: e.price,
    sellerName: e.sellerName,
    sellerID: e.sellerId,
    quantity: e.quantity,
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
      return {
        cart: action.val,
        totalPrice: calculatePrice(action.val),
        checked: checkAllItems(action.val),
      }
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
          checked: checkAllItems([action.val]),
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
      }

      updatedCartDB(newCart)
      return {
        cart: newCart,
        totalPrice: calculatePrice(newCart),
        checked: checkAllItems(newCart),
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
            updatedCartDB(newCart)
            return {
              cart: newCart,
              totalPrice: calculatePrice(newCart),
              checked: checkAllItems(newCart),
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

      updatedCartDB(newCart)
      return {
        cart: newCart,
        totalPrice: calculatePrice(newCart),
        checked: checkAllItems(newCart),
      }
    case "DELETE_ITEM":
      newCart = [...state.cart.filter((item) => item.id != action.val)]
      updatedCartDB(newCart)
      return {
        cart: newCart,
        totalPrice: calculatePrice(newCart),
        checked: checkAllItems(newCart),
      }
    case "ORDER_ITEM":
      newCart = [...state.cart.filter((item) => !item.isConfirm)]
      updatedCartDB(newCart)
      addedUserHistoryDB([...state.cart.filter((item) => item.isConfirm)])

      return {
        cart: newCart,
        totalPrice: calculatePrice(newCart),
        checked: checkAllItems(newCart),
      }
    case "SELECT_ALL":
      newCart = state.cart.map((e) => {
        return { ...e, isConfirm: !state.checked }
      })
      updatedCartDB(newCart)
      return {
        cart: newCart,
        totalPrice: calculatePrice(newCart),
        checked: !state.checked,
      }
    case "SELECT_SELLER":
      newCart = state.cart.map((e) => {
        if (action.val.IDs.includes(e.id)) {
          return { ...e, isConfirm: !action.val.check }
        } else {
          return e
        }
      })
      updatedCartDB(newCart)
      return {
        cart: newCart,
        totalPrice: calculatePrice(newCart),
        checked: checkAllItems(newCart),
      }
    default:
      return {
        cart: [...state.cart],
        totalPrice: state.totalPrice,
        checked: state.checked,
      }
  }
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
          data.forEach((e) => {
            delete e._id
          })
          getItemsFromIDs(data)
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
