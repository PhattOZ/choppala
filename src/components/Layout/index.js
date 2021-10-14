import Head from "next/head"
import Header from "../Header"

export default function Layout(props) {
  return (
    <div className={props.className}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <main>{props.children}</main>
    </div>
  )
}
