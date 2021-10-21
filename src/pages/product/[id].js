import { useRouter } from "next/router"
import ProductBox from "src/components/ProductBox"
import ProductInfo from "src/components/ProductInfo"
import ReviewCard from "src/components/ReviewCard"
import styles from "src/styles/pages/ProductDetail.module.css"

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={styles.container}>
      <div className={styles.toplink}>
        <a href="/" className={styles.ahome}>Home</a>
        /Search/{id}
      </div>
      <ProductBox productname="Sony PlayStation 5 (PS5) 1 Year + 3 Months Local Singapore Warranty" price={1999} />
      <ProductInfo/>
      <ReviewCard/>
    </div>
  )
}
