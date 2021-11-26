import styles from "src/styles/pages/cart.module.scss"
import Link from "next/link"
import CartContext from "src/lib/cart-context"
import { useContext, useState } from "react"
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
  const cartLength = ctx.value.cart.length
  let cartData

  if (cartLength > 0) {
    const cartItem = transfromCart(ctx.value.cart)
    //each seller
    cartData = cartItem.map((data) => (
      <ListItems key={data.sellerId} name={data.name} items={data.items} />
    ))
  } else {
    cartData = <></>
  }

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

const ListItems = (props) => {
  const ctx = useContext(CartContext)
  const [confirm, setConfirm] = useState(
    props.items.filter((e) => e.isConfirm).length == props.items.length
  )

  const checkSellerHandler = () => {
    console.log("click!")
    ctx.selectManyCart(props.items.map((e) => e.id))
    setConfirm(!confirm)
  }

  return (
    <>
      <div className={styles.each_seller}>
        <div className={styles.each_seller__header}>
          <input
            type="checkbox"
            defaultChecked={confirm}
            onClick={checkSellerHandler}
          />
          <span className={styles.each_seller__header_name}>{props.name}</span>
        </div>
        <div>
          {props.items.map((data) => (
            <Item key={data.id} item={data} sellerConfirm={confirm} />
          ))}
        </div>
      </div>
    </>
  )
}

const Item = ({ item, sellerConfirm }) => {
  const ctx = useContext(CartContext)
  const [confirm, setConfirm] = useState(item.isConfirm)
  const [quantity, setQuantity] = useState(item.quantity)

  console.log(sellerConfirm, confirm)
  if (sellerConfirm && !confirm) {
    setConfirm(true)
  } else if (!sellerConfirm && confirm) {
    setConfirm(false)
  }
  const deleteItemHandler = () => {
    ctx.deleteItem(item.id)
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
      case "none":
        ctx.updateCart(item.id, 0)
        setConfirm(!confirm)
        break
    }
  }

  return (
    <>
      <div className={styles.each_item}>
        <input
          type="checkbox"
          onChange={updateItemHandler}
          value={"none"}
          checked={confirm}
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
            color="#8B8EA1"
          ></FontAwesomeIcon>
        </div>
      </div>
    </>
  )
}
