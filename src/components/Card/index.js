import styles from "./Card.module.scss"
import Image from "next/image"

export default function Card({ title, price }) {
  return (
    <div className={styles.card}>
      <div className={styles.card_image}>
        <Image src="/molang2.jpg" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.card_content}>
        <div>{title}</div>
        <div>{`B${price}`}</div>
        <div>rating and heart</div>
      </div>
    </div>
  )
}
