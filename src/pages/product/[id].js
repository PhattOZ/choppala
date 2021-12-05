import ProductBox from "src/components/ProductBox"
import ProductInfo from "src/components/ProductInfo"
import ReviewCard from "src/components/ReviewCard"
import styles from "src/styles/pages/ProductDetail.module.css"
import Item from "src/models/Item"
import dbConnect from "src/lib/dbConnect"
import Link from "next/link"
import CartContext from "src/lib/cart-context"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import SmallPopup from "src/components/SmallPopup"
import Head from "next/head"

export default function ProductDetail({ product }) {
  const { header, addToCart } = useContext(CartContext)
  const [showPopup, setShowPopup] = useState(false)
  const [, setShowHeader] = header
  const router = useRouter()

  const cartHandler = (val, isBuyNow) => {
    let { reviews, images, ...newProduct } = product
    newProduct = {
      ...newProduct,
      isConfirm: true,
      quantity: val,
      image: images[0],
    }
    addToCart(newProduct)
    setShowHeader(true)
    !isBuyNow && setShowPopup(true)
  }

  const buynowHandler = (val) => {
    cartHandler(val, 1)
    router.push("/cart")
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className={styles.container}>
        <SmallPopup
          show={showPopup}
          onClose={setTimeout(() => setShowPopup(false), 3000)}
        />
        <div className={styles.toplink}>
          <Link href="/">
            <a className={styles.ahome}>Home</a>
          </Link>
          /Search/{product.name}
        </div>
        <ProductBox
          onClickBuynow={buynowHandler}
          onCartChange={cartHandler}
          productname={product.name}
          price={product.price}
          sellerName={product.sellerName}
          sellerId={product.sellerId}
          review_count={product.review_count}
          avg_rating={product.avg_rating}
          images={product.images}
        />
        <ProductInfo detail={product.detail} />
        <ReviewCard reviews={product.reviews} />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  await dbConnect()
  const data = await Item.aggregate([
    { $match: { id: id } },
    {
      $addFields: {
        review_count: { $size: "$reviews" },
        avg_rating: { $round: [{ $avg: "$reviews.rating" }, 1] },
      },
    },
    {
      $project: { _id: 0 },
    },
  ])

  return {
    props: {
      product: data[0],
    },
  }
}
