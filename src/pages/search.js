import styles from "src/styles/pages/search.module.scss"
import Card from "src/components/Card"

export default function Search() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Search result for blabla</div>
        <div className={styles.header_sort}>
          <div>sort by:</div>
          <div>some dropdown</div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.sidebar_header}>
            <div className={styles.sidebar_header_title}>Filter</div>
            <div>Clear all</div>
          </div>
          <div className={styles.categories}>Categories</div>
          <ul className={styles.category_list}>
            <li>clothes</li>
            <li>game</li>
            <li>card</li>
            <li>food</li>
            <li>hoho</li>
          </ul>
        </div>
        <div className={styles.card_container}>
          <Card title="progressive web apppppp" price={555} />
          <Card title="progressive web apppppp" price={555} />
          <Card title="progressive web apppppp" price={555} />
          <Card title="progressive web apppppp" price={555} />
          <Card title="progressive web apppppp" price={555} />
          <Card title="progressive web apppppp" price={555} />
        </div>
      </div>
    </div>
  )
}
