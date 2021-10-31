import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import Image from "next/image"
import styles from "./SellingBox.module.scss"
import {
  faCoins,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"

export default function SellingBox() {
  return (
    <>
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
                      <FontAwesomeIcon
                        icon={faCoins}
                        size="sm"
                        color="#FFD44D"
                      />
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
    </>
  )
}
