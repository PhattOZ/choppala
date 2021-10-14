import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons"
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
        <div className={styles.stars_fav}>
          <div>
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeart} size={"sm"} color="#4585FF" />
          </div>
        </div>
      </div>
    </div>
  )
}
