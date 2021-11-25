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
import Card from "src/components/Card"

function Sidebar({ seller }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
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
              {seller.storeName}'s store
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

  useEffect(async () => {
    const res = await fetch(`/api/item?sellerId=${seller.id}`)
    const resData = await res.json()
    setSellerItems(resData.item)
    setItemLoading(false)
  }, [])

  return (
    <>
      <div className={styles.container}>
        {/* Store profile session*/}
        <Sidebar seller={seller} />
        <div className={styles.main}>
          <section>
            <div className={styles.section_title}>All products</div>
            {/* Store itemlist session */}
            <div>
              {itemLoading ? (
                <h1>Loading...</h1>
              ) : (
                <div>
                  <div className={styles.cardContainer}>
                    {sellerItems.map((item) => (
                      <Link key={item.id} href={`/item/${item.id}`}>
                        <a>
                          <Card
                            title={item.name}
                            price={item.price}
                            image={item.images[0]}
                          />
                        </a>
                      </Link>
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
  const items = await Item.find({}, { _id: 0 })

  return {
    props: {
      seller: data,
    },
  }
}
