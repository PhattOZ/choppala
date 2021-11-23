import ReactDOM from "react-dom"
import Image from "next/image"
import styles from "./Loader.module.scss"
import { useLayoutEffect } from "react"

export default function Loader() {
  useLockBodyScroll()

  if (!document) {
    return <></>
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.body}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <div className={styles.logo}>
            <Image
              src="/molang.jpg"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      </div>
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
