import ReactDom from "react-dom"
import styles from "./ErrorPopup.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons"

const ErrorPopup = ({ show, onClose, subtitle, children }) => {
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
              <div className={styles.title}>Error!</div>
              <div className={styles.icon}>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  size="7x"
                  color="#ff1f00"
                />
              </div>
              <div className={styles.subtitle}>{subtitle}</div>
              <div className={styles.textinfo}>
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal-root")
  )
}
export default ErrorPopup
