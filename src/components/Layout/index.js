import Header from "../Header"
import Footer from "../Footer"
import styles from "./layout.module.scss"
import Head from "next/head"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta property="og:title" content="Choppala | Shop Chim & Chill" />
        <meta
          property="og:description"
          content="Wonderously designed ecommerse application."
        />
      </Head>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
