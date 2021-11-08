import Image from "next/image"
import styles from "./Loader.module.scss"

export default function Loader() {
  return (
    <div className={styles.body}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <div className={styles.logo}>
          <Image src="/molang.jpg" layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  )
}
