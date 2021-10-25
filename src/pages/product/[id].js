import ProductBox from "src/components/ProductBox"
import ProductInfo from "src/components/ProductInfo"
import ReviewCard from "src/components/ReviewCard"
import styles from "src/styles/pages/ProductDetail.module.css"
import Item from "src/models/Item"
import dbConnect from "src/lib/dbConnect"

export default function ProductDetail({ product }) {
  return (
    <div className={styles.container}>
      <div className={styles.toplink}>
        <a href="/" className={styles.ahome}>
          Home
        </a>
        /Search/{product.name}
      </div>
      <ProductBox
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
