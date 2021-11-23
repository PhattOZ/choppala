import { createPortal } from "react-dom"
import Image from "next/image"
import styles from "./Loader.module.scss"
import { useEffect, useLayoutEffect, useState } from "react"

export default function Loader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  useLockBodyScroll()

  return mounted
    ? createPortal(
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
        </div>,
        document.getElementById("modal-root")
      )
    : null
}

function useLockBodyScroll() {
  useLayoutEffect(() => {
    //Prevent scrolling on mount
    document.body.style.overflow = "hidden"
    //Re-enable scrolling when component unmount
    return () => (document.body.style.overflow = "visible")
  }, []) // Empty array ensures effect is only run on mount and unmount
}
