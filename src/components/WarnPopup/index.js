import ReactDom from "react-dom"
import styles from "./WarnPopup.module.scss"
import Link from "next/link"
import { useLayoutEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"

export default function WarnPopup({ show, onClose, subtitle, children }) {
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
              <div className={styles.title}>Warning!</div>
              <div className={styles.icon}>
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  size="7x"
                  color="#FFD44D"
                />
              </div>
              <div className={styles.subtitle}>{subtitle}</div>
              <div className={styles.textinfo}>{children}</div>
              <div className={styles.button_wrapper}>
                <Link href="/me" passHref>
                  <div className={styles.leaveBtn}>Leave Page</div>
                </Link>
                <div className={styles.stayBtn} onClick={() => onClose()}>
                  Stay on Page
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