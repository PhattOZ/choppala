import styles from "./SmallPopup.module.scss"
// ---------------- Icon ----------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

export default function SmallPopup({ show, title, icon }) {
  return (
    <>
      {show ? (
        <div className={styles.container}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.body}>
              <div className={styles.icon}>{icon}</div>
              <div className={styles.title}>{title}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
