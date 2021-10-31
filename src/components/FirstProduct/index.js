import Image from "next/image"
import styles from "./FirstProduct.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons"

export default function FirstProduct() {

  return (
    <>
      <div className={styles.main}>
        <section>
          <div className={styles.peopleIcon}>
            <Image src="/activate-seller.svg" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.text}>Start selling on Choppala</div>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPlus} size={"lg"} />
            Add product
          </div>
        </section>
      </div>
    </>
  )
}
