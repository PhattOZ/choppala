// Libraries
import Link from "next/link"
// Styles
import styles from "src/styles/pages/Filter.module.scss"
// Components
import CategoryBox from "src/components/CategoryBox"
import Card from "src/components/Card"
// Query data function
import querySearch from "src/lib/querySearch"

export default function Filter({ category, itemList }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Search result for </div>
        <div className={styles.header_sort}>
          <div>sort by:</div>
          <div>some dropdown</div>
        </div>
      </div>
      <div className={styles.main}>
        <CategoryBox />
        <div className={styles.card_container}>
          {itemList &&
            itemList.map((item) => (
              <Link key={item._id} href={`/product/${item._id}`}>
                <a>
                  <Card
                    title={item.name}
                    price={item.price}
                    image={item.image}
                  />
                </a>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const keyword = context.query.keyword ? context.query.keyword : ""
  const category = context.query.category ? context.query.category : ""
  const data = await querySearch(keyword, category)
  return {
    props: {
      category,
      itemList: data,
    },
  }
}
