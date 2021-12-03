// React, Next.js lobraries
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Router from "next/router"
import { useRouter } from "next/router"
// Style
import styles from "./YourProductBox.module.scss"
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
// Component
import Popup from "../Popup"
// Custom lib
import spliceData from "src/lib/spliceData"
import Pagination from "../Pagination"
import { deleteProduct } from "src/lib/modalContent"

function SellingBox({ itemId, name, image, price, amount, sold }) {
  const [showModal, setShowModal] = useState(false)
  const handleDelete = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmDelete = async () => {
    const res = await fetch(`/api/item?itemId=${itemId}`, {
      method: "DELETE",
    })
    if (res.ok) {
      Router.reload() // Reload page for fetch GET item again
    }
  }

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
        <div className={styles.deleteBtn} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} size="lg" />
          Delete
        </div>
      </div>
      {/* -----------Popup------------ */}
      {showModal && (
        <Popup
          show={showModal}
          onClose={() => setShowModal(false)}
          onClick={confirmDelete}
          title={deleteProduct.title}
          titlecolor={deleteProduct.titlecolor}
          subtitle={deleteProduct.subtitle}
          icon={deleteProduct.icon}
          content1={deleteProduct.content1}
          content2={deleteProduct.content2}
          buttonShow={deleteProduct.buttonShow}
        />
      )}
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

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/item?sellerId=${sellerId}`)
      const resData = await res.json()
      if (resData) {
        // This seller sold at least 1 item
        const currentItems = spliceData(resData.item, page, 6)
        setAllSellerItems(resData.item)
        setSellerItems(currentItems)
      }
    }

    if (!allSellerItems.length) {
      // User come to this page for first time or reload page
      fetchData()
    } else {
      // This page already fetched items list
      const currentItems = spliceData(allSellerItems, page, 6)
      setSellerItems(currentItems)
    }
  }, [router.query.page])

  return (
    <>
      {allSellerItems.length ? (
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
                      itemId={item.id}
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
