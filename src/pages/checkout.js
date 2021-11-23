import CartContext from "src/lib/cart-context"
import styles from "src/styles/pages/checkout.module.scss"

import { useContext, useState } from "react"
import { getSession } from "next-auth/react"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import Image from "next/image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAddressCard,
  faMapMarkerAlt,
  faPen,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons"

export default function Checkout({ data }) {
  const ctx = useContext(CartContext)

  let addressFilter = data.address
    .split(/(\s+)/)
    .filter((e) => e.trim().length > 0)

  let ItemFromCtx = ctx.value.cart.filter((item) => item.isConfirm == true)

  const orderHandler = () => {
    console.log("in orderHandler")
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.info_container}>
          <div className={styles.icon_box}>
            <FontAwesomeIcon
              icon={faAddressCard}
              className={styles.fontAwesome}
            />
          </div>

          <div className={styles.info__details}>
            <div>
              General informaition
              <div className={styles.info__name}>
                <div>{data.name}</div>
                <div>{data.email}</div>
                <div>{data.phoneNumber}</div>
              </div>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faPen}
                size={"1x"}
                className={styles.icon_clickable}
              />
            </div>
          </div>
        </div>

        <div className={styles.address_container}>
          <div className={styles.icon_box}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className={styles.fontAwesome}
            />
          </div>

          <div className={styles.address_details}>
            <div>
              Delivery Address
              <div className={styles.address_name}>
                <div>
                  {addressFilter.slice(0, addressFilter.length - 3).join(" ")}
                </div>

                <div>{addressFilter.slice(-3).join(" ")}</div>
              </div>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faPen}
                size={"1x"}
                className={styles.icon_clickable}
              />
            </div>
          </div>
        </div>

        <div className={styles.payment_container}>
          <div className={styles.check_box}>
            <div className={styles.circle}></div>
          </div>
          <div className={styles.payment_details}>
            <div>
              Payment
              <div className={styles.payment_method}>
                <div className={styles.default}>
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className={styles.fontAwesome}
                  />
                  Cash on delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.order_summary}>
        Order Summary
        {ItemFromCtx.map((item) => (
          <OrderList key={item._id} data={item} />
        ))}
        <div className={styles.order__total}>
          <div>
            <span>Product total</span>
            <span>฿{ctx.value.totalPrice}</span>
          </div>
          <div>
            <span>Delivery</span>
            <span>฿20</span>
          </div>
        </div>
        <div className={styles.order__bottomPart}>
          <div>
            <span>All payment</span>{" "}
            <div className={styles.total_price}>
              <span>฿{ctx.value.totalPrice + 20}</span>
            </div>
          </div>
          <div onClick={orderHandler}>Order now</div>
        </div>
      </div>
    </div>
  )
}

const OrderList = ({ data }) => {
  return (
    <div className={styles.order__details}>
      <div className={styles.img}>
        <Image src={data.image} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.order__details_flexbox}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.price}>฿{data.price}</div>
      </div>
      <div>{data.quantity} each</div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const { req } = ctx
  const session = await getSession({ req })

  if (session) {
    await dbConnect()
    const data = await User.findOne(
      {
        name: session.user.name,
        email: session.user.email,
      },
      "name email phoneNumber address -_id"
    ).lean()

    const newData = {
      ...data,
    }

    return {
      props: {
        data: newData,
      },
    }
  } else {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    }
  }
}
