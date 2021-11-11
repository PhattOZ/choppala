import ReactDom from "react-dom"
import styles from "./ErrorPopup.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { useLayoutEffect } from "react"

export default function ErrorPopup({ show, onClose, subtitle, children }){
  // Call hook to lock body scroll
  useLockBodyScroll()

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
              <div className={styles.textinfo}>{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal-root")
  )
}

function useLockBodyScroll() {
  useLayoutEffect(() => {
    //Prevent scrolling on mount
    document.body.style.overflow = "hidden"
    //Re-enable scrolling when component unmount
    return () => (document.body.style.overflow = "visible")
  }, []) // Empty array ensures effect is only run on mount and unmount
}
