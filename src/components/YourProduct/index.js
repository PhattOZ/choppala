import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import Image from "next/image"
import styles from "./YourProduct.module.scss"
import SellingBox from "src/components/SellingBox"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

export default function YourProduct() {
  return (
    <>
      <div className={styles.main}>
        <section>
          <div className={styles.title}>Your Product</div>
          <div className={styles.body}>
            <div className={styles.header}>
              <div className={styles.subtitle}>Product Name</div>
              <div></div>
              <div className={styles.subheader}>
                <div className={styles.subtitle}>Price/Unit</div>
                <div className={styles.subtitle}>Amount</div>
                <div className={styles.subtitle}>Sold</div>
              </div>
              <div className={styles.subheader}></div>
            </div>

            <SellingBox />
            <SellingBox />
          </div>
          <div className={styles.button_wrapper}>
            <Link href="/me/addproduct" passHref>
              <div className={styles.addBtn}>
                <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                Add product
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
