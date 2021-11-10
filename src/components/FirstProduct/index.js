import Image from "next/image"
import Link from "next/link"
import styles from "./FirstProduct.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

export default function FirstProduct() {

  return (
    <>
      <div className={styles.main}>
        <section>
          <div className={styles.peopleIcon}>
            <Image src="/addproduct.svg" alt="addproduct" layout="fill" objectFit="cover" />
          </div>
          <div className={styles.text}>Start selling on Choppala</div>
          <Link href="/me/addproduct" passHref>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPlusCircle} size={"lg"} />
            Add product
          </div>
          </Link>
        </section>
      </div>
    </>
  )
}
