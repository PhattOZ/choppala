import ReactDom from "react-dom"
import styles from "./DeletePopup.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { useLayoutEffect } from "react"

export default function DeletePopup({
  show,
  onClose,
  onClick,
  title,
  subtitle,
  children,
}) {
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
              <div className={styles.title}>{title}</div>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faTrashAlt} size="7x" color="#444655" />
              </div>
              <div className={styles.subtitle}>{subtitle}</div>
              <div className={styles.textinfo}>{children}</div>
              <div className={styles.button_wrapper}>
                <div className={styles.cancelBtn} onClick={() => onClose()}>
                  Cancel
                </div>
                <div className={styles.deleteBtn} onClick={() => onClick()}>
                  {title}
                </div>
              </div>
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
