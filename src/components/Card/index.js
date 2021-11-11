import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons"
import styles from "./Card.module.scss"
import Image from "next/image"

export default function Card({ title, price, image }) {
  return (
    <div className={styles.card}>
      <div className={styles.img_container}>
        <div className={styles.card_image}>
        <Image src={image} layout="fill" objectFit="cover" alt="item" />
      </div>
      </div>
      
      <div className={styles.card_content}>
        <div className={styles.card_title}>{title}</div>
        <div className={styles.card_price}>{`B${price}`}</div>
        <div className={styles.stars_fav}>
          <div>
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
            <FontAwesomeIcon icon={faStar} size={"xs"} color="#CCCCCC" />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeart} size={"sm"} color="#4585FF" />
          </div>
        </div>
      </div>
    </div>
  )
}
