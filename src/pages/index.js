import Image from "next/image"
import Link from "next/link"
import Card from "src/components/Card"
import categories from "src/lib/categoryList"
import styles from "src/styles/pages/index.module.scss"
import dbConnect from "src/lib/dbConnect"
import Item from "src/models/Item"

function CategoryLink({ category }) {
  return (
    <Link href={{ pathname: "/filter", query: { category } }}>
      <a>
        <div className={styles.category}>
          <div className={styles.category_image}>
            <Image
              src="/molang.jpg"
              layout="fill"
              objectFit="cover"
              alt="category"
            />
          </div>
          <div className={styles.category_title}>{category}</div>
        </div>
      </a>
    </Link>
  )
}

export default function Index({ productList }) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.section}>banner</div>
        <section className={styles.section}>
          <div className={styles.section_title}>Categories</div>
          <div
            className={styles.categoriesContainer}
            style={{ "--category-length": categories.length }}
          >
            {categories.map((category) => (
              <CategoryLink key={category} category={category} />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.section_title}>Just for you</div>
          <div className={styles.cardContainer}>
            {productList.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <a>
                  <Card
                    title={product.name}
                    price={product.price}
                    image={product.image}
                  />
                </a>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  await dbConnect()
  const items = await Item.find({}).sort({ _id: -1 }).limit(18).lean()

  items.map((item) => {
    item._id = item._id.toString()
  })

  return {
    props: {
      productList: items,
    },
  }
}
