import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import Layout from "src/components/Layout"
import { CartContextProvider } from "src/lib/cart-context"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Loader from "src/components/Loader"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let id

    const handleStart = () => {
      id = setInterval(() => {
        setLoading(true)
      }, 250)
    }

    const handleStop = () => {
      clearInterval(id)
      setLoading(false)
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router])

  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Layout>
          {loading ? <Loader /> : ""}
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </SessionProvider>
  )
}
