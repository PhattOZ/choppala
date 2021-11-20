import Link from "next/link"
import Image from "next/image"
import styles from "./YourProductBox.module.scss"
import { useState, useEffect } from "react"
// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { faCoins, faTrash } from "@fortawesome/free-solid-svg-icons"

function SellingBox({ name, image, price, amount, sold }) {
  return (
    <div className={styles.orderBox}>
      <div className={styles.flexInfo}>
        <div className={styles.img}>
          <Image
            src={image}
            alt="Product image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.nameblock}>
            <div className={styles.textInfo}>{name}</div>
          </div>
          <div className={styles.infoblock}>
            <div className={styles.priceblock}>
              <FontAwesomeIcon icon={faCoins} size="sm" color="#FFD44D" />
              <div className={styles.textInfo}>{price}</div>
            </div>
          </div>
          <div className={styles.infoblock}>
            <div className={styles.textInfo}>{amount}</div>
          </div>
          <div className={styles.infoblock}>
            <div className={styles.textInfo}>{sold}</div>
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

function FirstProduct() {
  return (
    <>
      <div className={styles.main}>
        <section>
          <div className={styles.peopleIcon}>
            <Image
              src="/addproduct.svg"
              alt="addproduct"
              layout="fill"
              objectFit="cover"
            />
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

export default function YourProductBox({ sellerId }) {
  const [sellerItems, setSellerItems] = useState([])
  useEffect(async () => {
    const res = await fetch(`/api/item?sellerId=${sellerId}`)
    const resData = await res.json()
    setSellerItems(resData.item)
  }, [])
  return (
    <>
      {sellerItems.length ? (
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

              {sellerItems.map((item) => (
                <SellingBox
                  name={item.name}
                  image={item.images[0]}
                  price={item.price}
                  amount={item.amount}
                  sold={item.soldCount}
                  key={item.id}
                />
              ))}
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
      ) : (
        <FirstProduct />
      )}
    </>
  )
}
