import Image from "next/image"
import Card from "src/components/Card"
import categories from "src/lib/categoryList"
import styles from "src/styles/pages/index.module.scss"

function CategoryLink({ category }) {
  return (
    <div className={styles.category}>
      <div className={styles.category_image}>
        <Image src="/molang.jpg" layout="fill" objectFit="cover" />
      </div>
      <div>{category}</div>
    </div>
  )
}

export default function Index() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.section}>banner</div>
        <div className={styles.section}>
          <div className={styles.section_title}>categories</div>
          <div
            className={styles.categoriesContainer}
            style={{ "--category-length": categories.length }}
          >
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
  )
}
