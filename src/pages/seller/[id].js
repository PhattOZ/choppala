// React, Next.js libraries
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
// Database
import dbConnect from "src/lib/dbConnect"
import Seller from "src/models/Seller"
// Style
import styles from "src/styles/pages/storeProfile.module.scss"

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
      {/* Store profile session*/}
      <div>
        <h3>Store profile</h3>
        <div className={styles.storeImg}>
          <Image
            src={seller.storeImage}
            layout="fill"
            objectFit="cover"
            alt="StoreImage"
          />
        </div>
        <div>Store name : {seller.storeName}</div>
        <div>Store email : {seller.storeEmail}</div>
      </div>
      <hr />
      {/* Store itemlist session */}
      <div>
        {itemLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h3>Store items</h3>
            {sellerItems.map((i) => (
              <Link href={`/product/${i.id}`} key={i.id}>
                <div>{i.name}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  await dbConnect()
  const data = await Seller.findById(id, { _id: 0 }).lean()
  return {
    props: {
      seller: data,
    },
  }
}
