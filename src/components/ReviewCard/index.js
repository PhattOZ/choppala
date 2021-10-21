import styles from "./ReviewCard.module.css"
import Image from "next/dist/client/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default function ReviewCard() {
  return (
    <div className={styles.container}>
      <div className={styles.titlectn}>Review & Rating</div>
      <div className={styles.reviewlist}>
        <div className={styles.review}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUser} size={"lg"} color="#ffff" />
          </div>
          <div className={styles.reviewmain}>
            <div className={styles.h2}>username</div>
            <div className={styles.liststar}>
              <div className={styles.stars}>
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#A8AABC" />
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className={styles.review}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUser} size={"lg"} color="#ffff" />
            <Image src="/molang2.jpg" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.reviewmain}>
          <div className={styles.h2}>username</div>
            <div className={styles.liststar}>
              <div className={styles.stars}>
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#A8AABC" />
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className={styles.review}>
          <div className={styles.avatar}>
            <FontAwesomeIcon icon={faUser} size={"lg"} color="#ffff" />
            <Image src="/molang.jpg" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.reviewmain}>
          <div className={styles.h2}>username</div>
            <div className={styles.liststar}>
              <div className={styles.stars}>
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#ffd700" />
                <FontAwesomeIcon icon={faStar} size={"xs"} color="#A8AABC" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
