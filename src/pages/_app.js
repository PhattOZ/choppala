import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import Layout from "src/components/Layout"
import { CartContextProvider } from "src/lib/cart-context"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Loader from "src/components/Loader"
import ClientOnlyPortal from "src/components/Portal"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      // id = setInterval(() => {
      //   setLoading(true)
      // }, 250)
      setLoading(true)
    }

    const handleStop = () => {
      // clearInterval(id)
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
          {loading && (
            <ClientOnlyPortal selector="#modal-root">
              <Loader debounce={200} />
            </ClientOnlyPortal>
          )}
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </SessionProvider>
  )
}
