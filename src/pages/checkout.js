import CartContext from "src/lib/cart-context"
import styles from "src/styles/pages/checkout.module.scss"

import { useContext, useState } from "react"
import { getSession } from "next-auth/react"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAddressCard,
  faMapMarkerAlt,
  faCashRegister,
  faHandHoldingUsd,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons"

export default function checkout({ data }) {
  const ctx = useContext(CartContext)
  console.log(data)
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.info_container}>
          <FontAwesomeIcon
            icon={faAddressCard}
            className={styles.fontAwesome}
          />
          <div className={styles.info__details}>
            <div>
              General informaition
              <div className={styles.info__name}>
                <div>Joe bieden</div>
                <div>jeoads@gmail.com</div>
                <div>+66 123 6845</div>
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={faPencilAlt} size={"lg"} />
            </div>
          </div>
        </div>

        <div className={styles.address_container}>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className={styles.fontAwesome}
          />
          <div className={styles.address_details}>
            <div>
              Delivery Address
              <div className={styles.address_name}>
                <div>Joe bieden</div>
                <div>jeoads@gmail.com</div>
              </div>
            </div>
            <div>
              <FontAwesomeIcon icon={faPencilAlt} size={"lg"} />
            </div>
          </div>
        </div>

        <div className={styles.payment_container}>
          <FontAwesomeIcon
            icon={faCashRegister}
            className={styles.fontAwesome}
          />
          <div className={styles.payment_details}>
            <div>
              General informaition
              <div className={styles.payment_method}>
                <div>
                  <input type="checkbox" />
                  <FontAwesomeIcon
                    icon={faHandHoldingUsd}
                    className={styles.fontAwesome}
                  />
                  cash
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.order_summary}>
        Order Summary
        <div className={styles.order__details}>
          <div>picture</div>
          <div className={styles.order__details_flexbox}>
            <div>Sony playstation 5</div>
            <div>$1000</div>
          </div>
          <div>1 each</div>
        </div>
        <div className={styles.order__total}>
          <div>
            <span>Product total</span>
            <span>$100</span>
          </div>
          <div>
            <span>Delivery</span>
            <span>$20</span>
          </div>
        </div>
        <div className={styles.order__summary}>
          <div>
            <span>ALL payment</span> <span>$1000</span>
          </div>
          <div>Order now</div>
        </div>
      </div>
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
