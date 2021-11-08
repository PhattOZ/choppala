import ProductBox from "src/components/ProductBox"
import ProductInfo from "src/components/ProductInfo"
import ReviewCard from "src/components/ReviewCard"
import styles from "src/styles/pages/ProductDetail.module.css"
import Item from "src/models/Item"
import dbConnect from "src/lib/dbConnect"
import Link from "next/link"
import CartContext from "src/lib/cart-context"
import { useContext } from "react"

export default function ProductDetail({ product }) {
  const ctx = useContext(CartContext)
  const cartHandler = (val) => {
    let { reviews, ...newProduct } = product
    newProduct = {
      ...newProduct,
      isConfirm: true,
      quantity: val,
    }
    ctx.addToCart(newProduct)
  }

  return (
    <div className={styles.container}>
      <div className={styles.toplink}>
        <Link href="/">
          <a className={styles.ahome}>Home</a>
        </Link>
        /Search/{product.name}
      </div>
      <ProductBox
        onCartChange={cartHandler}
        productname={product.name}
        price={product.price}
        sellerName={product.sellerName}
        reviewCount={product.reviews.length}
      />
      <ProductInfo detail={product.detail} />
      <ReviewCard reviews={product.reviews} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  await dbConnect()
  const data = await Item.findById(id)
  return {
    props: {
      product: JSON.parse(JSON.stringify(data)),
    },
  }
}
