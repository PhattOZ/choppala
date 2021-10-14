import Image from "next/image"
import Card from "src/components/Card"
import Layout from "src/components/Layout"
import Footer from "src/components/Footer"
import styles from "src/styles/pages/index.module.scss"

function CategoryLink({ category }) {
  return (
    <div>
      <div className={styles.category_image}>
        <Image src="/molang.jpg" layout="fill" objectFit="cover" />
      </div>
      <div>{category}</div>
    </div>
  )
}

export default function Index() {
  const categories = [
    "Clothes",
    "Mobiles & Gadgets",
    "Food & Beverages",
    "Home Appliances",
  ]

  return (
    <Layout>
      <div className={styles.container}>
        <div>
          <div className={styles.section}>banner</div>
          <div className={styles.section}>
            <div className={styles.section_title}>categories</div>
            <div className={styles.categoriesContainer}>
              {categories.map((category) => (
                <CategoryLink key={category} category={category} />
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.section_title}>justforyou</div>
            <div className={styles.cardContainer}>
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
              <Card title="haha" price={123} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
