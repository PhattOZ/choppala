import ReactDom from "react-dom"
import Link from "next/link"
import styles from "./Popup.module.scss"
import { useLayoutEffect, useState } from "react"
import { useRouter } from "next/router"
// ---------------- Icon ----------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faStar } from "@fortawesome/free-solid-svg-icons"

export default function Popup({
  show,
  onClose,
  onClick,
  title,
  titlecolor,
  subtitle,
  icon,
  content1,
  content2,
  buttonShow,
  onSubmit,
}) {
  // Call hook to lock body scroll
  useLockBodyScroll()
  const [rating, setRating] = useState(-1)
  const router = useRouter()
  const rateHandler = (e) => {
    setRating(e.currentTarget.getAttribute("index"))
  }

  const submitRatingHandler = () => {
    if (rating > -1) {
      //cast rating to int first than add
      onSubmit(+rating + 1)
      onClose()
    }
  }

  const onCloseHandler = () => {
    if (buttonShow === "order") {
      router.push('/me/purchasehistory')
    } else {
      onClose()
    }
  }

  return ReactDom.createPortal(
    <>
      {show ? (
        <div className={styles.container}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <div className={styles.icon} onClick={onCloseHandler}>
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.title} style={{ color: titlecolor }}>
                {title}
              </div>
              <div className={styles.icon}>{icon}</div>
              <div className={styles.subtitle}>{subtitle}</div>
              <div className={styles.textinfo}>
                {content1}
                <br />
                {content2}
              </div>
              {buttonShow === "delete" ? (
                <div className={styles.button_wrapper}>
                  <div className={styles.cancelBtn} onClick={() => onClose()}>
                    Cancel
                  </div>
                  <div className={styles.deleteBtn} onClick={() => onClick()}>
                    {title}
                  </div>
                </div>
              ) : buttonShow === "warn" ? (
                <div className={styles.button_wrapper}>
                  <Link href="/me" passHref>
                    <div className={styles.leaveBtn}>Leave Page</div>
                  </Link>
                  <div className={styles.stayBtn} onClick={() => onClose()}>
                    Stay on Page
                  </div>
                </div>
              ) : buttonShow === "order" ? (
                <div className={styles.button_wrapper}>
                  <Link href="/" passHref>
                    <div className={styles.actionBtn}>Back to Homepage</div>
                  </Link>
                </div>
              ) : buttonShow === "rating" ? (
                <div className={styles.bottom_part}>
                  <div className={styles.stars_fav}>
                    {[...Array(5)].map((x, i) => (
                      <div
                        className={`${styles.star_icon} ${
                          i <= rating && styles.star_icon__clicked
                        }`}
                        onClick={rateHandler}
                        key={i}
                        index={i}
                      >
                        <FontAwesomeIcon icon={faStar} size={"2x"} />
                      </div>
                    ))}
                  </div>
                  <div
                    className={styles.button_wrapper}
                    onClick={submitRatingHandler}
                  >
                    <div className={styles.actionBtn}>Submit</div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
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
