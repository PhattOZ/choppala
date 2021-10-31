import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import Layout from "src/components/Layout"
import { CartContextProvider } from "src/lib/cart-context"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </SessionProvider>
  )
}
