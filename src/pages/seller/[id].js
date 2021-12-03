// React, Next.js libraries
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
// Database
import dbConnect from "src/lib/dbConnect"
import Seller from "src/models/Seller"
import Item from "src/models/Item"
// Style
import styles from "src/styles/pages/storeProfile.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
//Component
import Card from "src/components/Card"

function Topbar({ seller }) {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbar_header}>
        <div className={styles.cover_container}>
          <div className={styles.cover}>
            <Image
              src={seller.storeImage}
              layout="fill"
              objectFit="cover"
              alt="StoreImage"
            />
          </div>
        </div>

        <div className={styles.img_profile}>
          <div className={styles.storeImg}>
            <Image
              src={seller.storeImage}
              layout="fill"
              objectFit="cover"
              alt="StoreImage"
            />
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.profile_info}>
            <div className={styles.title}>
              {seller.storeName}&#39;s store
              <div className={styles.check_line}>
                <FontAwesomeIcon icon={faCheckCircle} />
                seller
              </div>
            </div>
            <div className={styles.email_line}>{seller.storeEmail}</div>
          </div>

          <div className={styles.item_info}>
            <div className={styles.subtitle}>No. of items</div>
            <div className={styles.subtitle}>2</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SellerProfile({ seller }) {
  const [sellerItems, setSellerItems] = useState([])
  const [itemLoading, setItemLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/item?sellerId=${seller.id}`)
      const resData = await res.json()
      setSellerItems(resData.item)
      setItemLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className={styles.container}>
        {/* Store profile session*/}
        <Topbar seller={seller} />
        <div className={styles.main}>
          <section>
            <div className={styles.section_title}>All products</div>
            {/* Store itemlist session */}
            <div>
              {itemLoading ? (
                <div className={styles.subtitle}>Loading...</div>
              ) : (
                <div>
                  <div className={styles.cardContainer}>
                    {sellerItems.map((item) => (
                      <Card
                        key={item.id}
                        itemID={item.id}
                        title={item.name}
                        price={item.price}
                        image={item.images[0]}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  await dbConnect()
  const data = await Seller.findById(id, { _id: 0 }).lean()
  const items = await Item.find({}, { _id: 0 }).lean()

  return {
    props: {
      seller: data,
    },
  }
}
