import categories from "src/lib/categoryList"
import styles from "./CategoryBox.module.scss"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"

export default function CategoryBox() {
  const router = useRouter()
  const { category: currentCategory } = router.query
  const min = router.query.minprice ? router.query.minprice : ""
  const max = router.query.maxprice ? router.query.maxprice : ""
  const [minPrice, setMinPrice] = useState(min)
  const [maxPrice, setMaxPrice] = useState(max)

  const handleMinChange = (e) => {
    const value = e.target.value
    setMinPrice(value)
  }

  const handleMaxChange = (e) => {
    const value = e.target.value
    setMaxPrice(value)
  }

  const handlePriceSubmit = (e) => {
    router.push({
      pathname: "/filter",
      query: { ...router.query, minprice: minPrice, maxprice: maxPrice },
    })
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <div className={styles.sidebar_header_title}>FILTERS</div>
        <Link href="/filter">
          <a className={styles.clearAll}>CLEAR ALL</a>
        </Link>
      </div>
      <div className={styles.categories}>CATEGORIES</div>
      <ul className={styles.category_list}>
        {categories.map((category) => {
          const blueStyle =
            currentCategory === category.name ? styles.fontBlueColor : null
          return (
            <Link
              key={category.name}
              href={{
                pathname: "/filter",
                query: { ...router.query, category: category.name, page: 1 },
              }}
            >
              <a>
                <li className={blueStyle}>{category.name}</li>
              </a>
            </Link>
          )
        })}
      </ul>
      <div className={styles.priceTitle}>PRICE RANGE</div>
      <div className={styles.inputPriceContainer}>
        <input
          type="number"
          placeholder="Min ฿"
          value={minPrice}
          onChange={handleMinChange}
        />
        <div>-</div>
        <input
          type="number"
          placeholder="Max ฿"
          value={maxPrice}
          onChange={handleMaxChange}
        />
      </div>
      <button className={styles.priceButton} onClick={handlePriceSubmit}>
        Set Price
      </button>
    </div>
  )
}
