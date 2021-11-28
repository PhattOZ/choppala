import styles from "src/styles/pages/cart.module.scss"
import Link from "next/link"
import CartContext from "src/lib/cart-context"
import { useContext, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"

const transfromCart = (data) => {
  let cartItem = []
  let sellerId = []
  data.map((item) => {
    const newItemFormat = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      subTotal: item.quantity * item.price,
      isConfirm: item.isConfirm,
    }
    const indexSeller = sellerId.findIndex((id) => id === item.sellerId)

    if (indexSeller == -1) {
      // not found
      sellerId.push(item.sellerId)
      cartItem.push({
        name: item.sellerName,
        sellerId: item.sellerId,
        items: [newItemFormat],
      })
    } else {
      //found
      cartItem[indexSeller] = {
        name: item.sellerName,
        sellerId: item.sellerId,
        items: [...cartItem[indexSeller].items, newItemFormat],
      }
    }
  })
  return cartItem
}

export default function Cart() {
  const ctx = useContext(CartContext)
  const cartItem = transfromCart(ctx.value.cart)

  const selectAllHandler = () => {
    ctx.selectManyItems([])
  }

  return (
    <div className={styles.container}>
      <div className={styles.toplink}>
        <Link href="/">
          <a className={styles.ahome}>Home </a>
        </Link>
        / Shopping Cart
      </div>
      <div>Shopping Cart ({cartItem.length} items)</div>
      <div className={styles.main}>
        <div className={styles.list_items}>
          <div className={styles.header_list_items}>
            <input
              type="checkbox"
              checked={ctx.value.checked}
              onChange={selectAllHandler}
            />
            <span>Product</span>
            <span>Price/unit</span>
            <span>Quantity</span>
            <span>Sub total</span>
          </div>
          <div className={styles.main_list_items}>
            {cartItem.length > 0 ? (
              cartItem.map((data) => (
                <ListItems
                  key={data.sellerId}
                  name={data.name}
                  items={data.items}
                  id={data.sellerId}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.order_summary}>
          <div>Order Summary</div>
          <div className={styles.total_price}>
            <span>Total</span>
            <span>฿{ctx.value.totalPrice}</span>
          </div>
          <Link href="/checkout">
            <a>
              <div className={styles.process_btn}>Proceed to order</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const ListItems = ({ name, items, id }) => {
  const ctx = useContext(CartContext)

  const checkSeller = ctx.value.cart.filter(
    (e) => e.sellerId === id && e.isConfirm == false
  )
  const check = !checkSeller.length > 0

  const checkSellerHandler = () => {
    ctx.selectManyItems(
      items.map((e) => e.id),
      check
    )
  }

  return (
    <>
      <div className={styles.each_seller}>
        <div className={styles.each_seller__header}>
          <input
            type="checkbox"
            onChange={checkSellerHandler}
            checked={check}
          />
          <Link href={`/seller/${id}`}>
            <a className={styles.each_seller__header_name}>{name}</a>
          </Link>
        </div>
        <div>
          {items.map((data) => (
            <Item key={data.id} item={data} />
          ))}
        </div>
      </div>
    </>
  )
}

const Item = ({ item }) => {
  const ctx = useContext(CartContext)
  const [quantity, setQuantity] = useState(item.quantity)

  const deleteItemHandler = () => {
    ctx.deleteItem(item.id)
  }

  const comfirmHandler = () => {
    ctx.updateCart(item.id, 0)
  }

  //for isConfirm and quantity
  const updateItemHandler = (event) => {
    switch (event.target.value) {
      case "increase":
        ctx.updateCart(item.id, 1)
        setQuantity(quantity + 1)
        break
      case "decrease":
        if (quantity !== 0) {
          ctx.updateCart(item.id, -1)
          setQuantity(quantity - 1)
          break
        }
        break
    }
  }

  return (
    <>
      <div className={styles.each_item}>
        <input
          type="checkbox"
          onChange={comfirmHandler}
          value={"none"}
          checked={ctx.value.cart.find((e) => e.id === item.id).isConfirm}
        />
        <div className={styles.each_item__header}>
          <div className={styles.each_item__image}>
            <Image
              src={item.image}
              layout="fill"
              objectFit="cover"
              alt="cartItem"
            />
          </div>
          <span className={styles.each_item__name}>{item.name}</span>
        </div>
        <div className={styles.each_item__price}>฿{item.price}</div>
        <div className={styles.each_item__quantity}>
          <button
            className={styles.btncountdec}
            value={"decrease"}
            onClick={updateItemHandler}
          >
            -
          </button>
          <div className={styles.qcount}>{quantity}</div>
          <button
            className={styles.btncountadd}
            value={"increase"}
            onClick={updateItemHandler}
          >
            +
          </button>
        </div>
        <div className={styles.each_item__subTotal}>
          <div>฿{item.price * item.quantity}</div>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size={"lg"}
            onClick={deleteItemHandler}
            color="#8B8EA1"
          ></FontAwesomeIcon>
        </div>
      </div>
    </>
  )
}
