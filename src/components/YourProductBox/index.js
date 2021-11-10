import Link from "next/link"
import Image from "next/image"
import styles from "./YourProductBox.module.scss"
// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { faCoins, faTrash } from "@fortawesome/free-solid-svg-icons"

function SellingBox() {
  return (
    <div className={styles.orderBox}>
      <div className={styles.flexInfo}>
        <div className={styles.img}>
          <Image
            src="/molang2.jpg"
            alt="Product image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.nameblock}>
            <div className={styles.textInfo}>
              Sony vegus Pro 16 Sony vegus Pro 16 Sony vegus Pro 16
            </div>
          </div>
          <div className={styles.infoblock}>
            <div className={styles.priceblock}>
              <FontAwesomeIcon icon={faCoins} size="sm" color="#FFD44D" />
              <div className={styles.textInfo}>1299</div>
            </div>
          </div>
          <div className={styles.infoblock}>
            <div className={styles.textInfo}>100</div>
          </div>
          <div className={styles.infoblock}>
            <div className={styles.textInfo}>9</div>
          </div>
          <div className={styles.btnblock}>
            <div className={styles.deleteBtn}>
              <FontAwesomeIcon icon={faTrash} size="lg" />
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
