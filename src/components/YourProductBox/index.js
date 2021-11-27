// React, Next.js lobraries
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
// Style
import styles from "./YourProductBox.module.scss"
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
// Component
import Loader from "../Loader"
// Custom lib
import spliceData from "src/lib/spliceData"
import Pagination from "../Pagination"

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
            <div className={styles.price_align}>
              <div className={styles.textInfo}>฿{price}</div>
            </div>
          </div>
          <div className={styles.infoblock}>
            <div className={styles.textInfo}>{amount}</div>
          </div>
          <div className={styles.soldblock}>
            <div className={styles.textInfo}>{sold}</div>
          </div>
        </div>
      </div>
      <div className={styles.btnblock}>
        <div className={styles.deleteBtn}>
          <FontAwesomeIcon icon={faTrash} size="lg" />
          Delete
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

export default function YourProductBox({ sellerId, isSeller }) {
  const router = useRouter()
  const page = router.query.page ? router.query.page : "1" // Get current page (Used in Pagination component and spliceData)
  const [allSellerItems, setAllSellerItems] = useState([])
  const [sellerItems, setSellerItems] = useState([])

  useEffect(async () => {
    if (!allSellerItems.length) {
      // User come to this page for first time
      const res = await fetch(`/api/item?sellerId=${sellerId}`)
      const resData = await res.json()
      const currentItems = spliceData(resData.item, page, 6)
      setAllSellerItems(resData.item)
      setSellerItems(currentItems)
    } else {
      // This page already fetched items list
      const currentItems = spliceData(allSellerItems, page, 6)
      setSellerItems(currentItems)
    }
  }, [router.query.page])

  return (
    <>
      {sellerItems.length || isSeller ? (
        <div className={styles.main}>
          <section>
            <div className={styles.top_part}>
              <div className={styles.title}>Your Product</div>
              <div className={styles.button_wrapper}>
                <Link href="/me/addproduct" passHref>
                  <div className={styles.addBtn}>
                    <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                    Add product
                  </div>
                </Link>
              </div>
            </div>

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
                <Link href={`/me/editproduct/${item.id}`} key={item.id}>
                  <a>
                    <SellingBox
                      name={item.name}
                      image={item.images[0]}
                      price={item.price}
                      amount={item.amount}
                      sold={item.soldCount}
                    />
                  </a>
                </Link>
              ))}
              <Pagination
                itemsPerPage={6}
                totalItems={allSellerItems.length}
                url="/me/sellingorders"
              />
            </div>
          </section>
        </div>
      ) : (
        <FirstProduct />
      )}
    </>
  )
}
