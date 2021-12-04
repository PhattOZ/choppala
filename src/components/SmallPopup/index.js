import ReactDom from "react-dom"
import styles from "./SmallPopup.module.scss"
// ---------------- Icon ----------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons"

export default function SmallPopup({ show, onClose }) {
  return (
    <>
      {show ? (
        <div className={styles.container}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.body}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faCheckCircle} size="2x" color="#fff" />
              </div>
              <div className={styles.title}>Added to cart</div>
              <div className={styles.icon} onClick={() => onClose()}>
                <FontAwesomeIcon icon={faTimes} size="1x" color="#fff" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
