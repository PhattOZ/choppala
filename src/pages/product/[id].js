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
    <div className={styles.container}>
      <SmallPopup show={showPopup} onClose={() => setShowPopup(false)} />
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
        reviewCount={product.reviews.length}
        images={product.images}
      />
      <ProductInfo detail={product.detail} />
      <ReviewCard reviews={product.reviews} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  await dbConnect()
  const data = await Item.findById(id, { _id: 0 })
  return {
    props: {
      product: JSON.parse(JSON.stringify(data)),
    },
  }
}
