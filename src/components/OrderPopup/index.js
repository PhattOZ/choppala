import ReactDom from "react-dom"
import styles from "./OrderPopup.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import Image from "next/image"

const OrderPopup = ({ show, onClose }) => {
  return ReactDom.createPortal(
    <>
      {show ? (
        <div className={styles.container} onClick={() => onClose()}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <div className={styles.icon} onClick={() => onClose()}>
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.title}>Order Received</div>
              <div className={styles.image}>
                <Image
                  src="/order-received.svg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles.subtitle}>Thanks for your purchase!</div>
              <div className={styles.textinfo}>
                Your order has been approved.
                <br /> You can wait for shipping from seller.
              </div>
              <div className={styles.button_wrapper}>
                <Link href="/">
                  <div className={styles.actionBtn}>Back to Homepage</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal-root")
  )
}
export default OrderPopup
