import styles from "./Card.module.scss"
import Image from "next/image"
import Link from "next/link"

export default function Card({
  title,
  price,
  image,
  itemID,
  avg_rating,
  review_count,
}) {
  return (
    <div className={styles.card}>
      <Link href={`/product/${itemID}`}>
        <a>
          <div className={styles.img_container}>
            <div className={styles.card_image}>
              <Image src={image} layout="fill" objectFit="cover" alt="item" />
            </div>
          </div>

          <div className={styles.card_content}>
            <div className={styles.card_title}>{title}</div>
            <div className={styles.card_price}>{`฿${price}`}</div>

            <div className={styles.rating}>
              {avg_rating ? (
                <>
                  <span style={{ "--rating": avg_rating }} />
                  <div> {`(${review_count})`}</div>
                </>
              ) : (
                <div>No review</div>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}
