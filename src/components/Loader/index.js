import Image from "next/image"
import styles from "./Loader.module.scss"
import { useLayoutEffect, useState } from "react"
import ClientOnlyPortal from "../Portal"

export default function Loader({ debounce }) {
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    const id = setInterval(() => {
      setVisible(true)
      document.body.style.overflow = "hidden"
    }, debounce)

    return () => {
      document.body.style.overflow = "visible"
      clearInterval(id)
    }
  }, [])

  return (
    visible && (
      <ClientOnlyPortal selector="#modal-root">
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
      </ClientOnlyPortal>
    )
  )
}
