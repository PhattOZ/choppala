import Image from "next/image"
import styles from "./Loader.module.scss"
import { useLayoutEffect, useState } from "react"

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
  }, [debounce])

  return (
    visible && (
      <div className={styles.body}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <div className={styles.logo}>
            <Image
              src="/logo.png"
              layout="fill"
              objectFit="contain"
              alt=""
              priority
            />
          </div>
        </div>
      </div>
    )
  )
}
