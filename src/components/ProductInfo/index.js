import styles from "./ProductInfo.module.css"

export default function ProductInfo({ detail }) {
  return (
    <div className={styles.container}>
      <div className={styles.titlectn}>Product Details</div>
      <div className={styles.infotxt}>
        <p>{detail}</p>
      </div>
    </div>
  )
}
