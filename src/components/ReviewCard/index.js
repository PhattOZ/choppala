import styles from "./ReviewCard.module.css"
import Image from "next/dist/client/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default function ReviewCard({ reviews }) {
  let list = [0, 0, 0, 0, 0]

  return (
    <div className={styles.container}>
      <div className={styles.titlectn}>Review & Rating</div>
      <div className={styles.reviewlist}>
        {reviews.map((review, index) => (
          <div key={review.userName}>
            <div className={styles.review}>
              <div className={styles.avatar}>
                <Image
                  src={review.userImage}
                  layout="fill"
                  objectFit="contain"
                  alt="user_image"
                />
              </div>
              <div className={styles.reviewmain}>
                <div className={styles.h2}>{review.userName}</div>
                <div className={styles.liststar}>
                  <div className={styles.stars}>
                    {list.map((e, index) =>
                      review.rating > index ? (
                        <FontAwesomeIcon
                          icon={faStar}
                          size={"xs"}
                          color="#ffd700"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faStar}
                          size={"xs"}
                          color="#cccccc"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}
