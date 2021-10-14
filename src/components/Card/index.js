import styles from "./Card.module.scss"
import Image from "next/image"

const star_svg = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="star"
    className="svg-inline--fa fa-star fa-w-18"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width="12"
    height="12"
  >
    <path
      fill="#ffd700"
      d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
    ></path>
  </svg>
)

const heart_solid_svg = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="heart"
    className="svg-inline--fa fa-heart fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="12"
    height="12"
  >
    <path
      fill="#4585FF"
      d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
    ></path>
  </svg>
)

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
            {star_svg}
            {star_svg}
            {star_svg}
            {star_svg}
            {star_svg}
          </div>
          <div>{heart_solid_svg}</div>
        </div>
      </div>
    </div>
  )
}
