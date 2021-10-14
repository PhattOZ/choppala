import Head from "next/head"
import Header from "../Header"
import Footer from "../Footer"

export default function Layout(props) {
  return (
    <div className={props.className}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}
