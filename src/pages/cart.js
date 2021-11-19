import styles from "src/styles/pages/cart.module.scss"
import Link from "next/link"
import CartContext from "src/lib/cart-context"
import { useContext, useState } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"

const transfromCart = (data) => {
  let cartItem = []
  let sellerName = []
  data.map((item) => {
    const newItemFormat = {
      _id: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      subTotal: item.quantity * item.price,
      isConfirm: item.isConfirm,
    }
    const indexSeller = sellerName.findIndex((name) => name === item.sellerName)

    if (indexSeller == -1) {
      sellerName.push(item.sellerName)
      cartItem.push({ name: item.sellerName, items: [newItemFormat] })
    } else {
      cartItem[indexSeller] = {
        name: item.sellerName,
        items: [...cartItem[indexSeller].items, newItemFormat],
      }
    }
  })
  return cartItem
}

export default function Cart() {
  const ctx = useContext(CartContext)
  const cartLength = ctx.value.cart.length
  let cartData
  if (cartLength > 0) {
    const cartItem = transfromCart(ctx.value.cart)
    cartData = cartItem.map((data) => (
      <ListItems key={data.name} name={data.name} items={data.items} />
    ))
  } else {
    cartData = <></>
  }

  // const eachItem = cartItem[2].items

  return (
    <div className={styles.container}>
      <div className={styles.toplink}>
        <Link href="/">
          <a className={styles.ahome}>Home </a>
        </Link>
        / Shopping Cart
      </div>
      <div>Shopping Cart ({cartLength} items)</div>
      <div className={styles.main}>
        <div className={styles.list_items}>
          <div className={styles.header_list_items}>
            <input type="checkbox" />
            <span>Product</span>
            <span>Price/unit</span>
            <span>Quantity</span>
            <span>Sub total</span>
          </div>
          <div className={styles.main_list_items}>{cartData}</div>
        </div>
        <div className={styles.order_summary}>
          <div>Order Summary</div>
          <div className={styles.total_price}>
            <span>total</span>
            <span>฿{ctx.value.totalPrice}</span>
          </div>
          <Link href="/checkout">
            <a>
              <div className={styles.process_btn}>process to order</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

const ListItems = (props) => {
  return (
    <>
      <div className={styles.each_seller}>
        <div className={styles.each_seller__header}>
          <input type="checkbox" />
          <span className={styles.each_seller__header_name}>{props.name}</span>
        </div>
        <div>
          {props.items.map((data) => (
            <Item key={data._id} item={data} />
          ))}
        </div>
      </div>
    </>
  )
}

const Item = ({ item }) => {
  const ctx = useContext(CartContext)
  const [confirm, setConfirm] = useState(item.isConfirm)
  const [quantity, setQuantity] = useState(item.quantity)

  const deleteItemHandler = () => {
    ctx.deleteItem(item._id)
  }

  //for isConfirm and quantity
  const updateItemHandler = (event) => {
    switch (event.target.value) {
      case "increase":
        ctx.updateCart(item._id, 1)
        setQuantity(quantity + 1)
        break
      case "decrease":
        if (quantity !== 0) {
          ctx.updateCart(item._id, -1)
          setQuantity(quantity - 1)
          break
        }
        break
      case "none":
        ctx.updateCart(item._id, 0)
        setConfirm(!confirm)
        break
    }
  }

  return (
    <>
      <div className={styles.each_item}>
        <input
          type="checkbox"
          defaultChecked={confirm}
          onClick={updateItemHandler}
          value={"none"}
        />
        <div className={styles.each_item__header}>
          <div className={styles.each_item__image}>
            <Image src={item.image} layout="fill" objectFit="cover" />
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
          ></FontAwesomeIcon>
        </div>
      </div>
    </>
  )
}
