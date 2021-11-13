import styles from "src/styles/pages/user/PurchaseHistory.module.scss"
import { useSession } from "next-auth/react"
import Layout from "src/components/UserProfileLayout"
import Loader from "src/components/Loader"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Purchasehistory() {
  const router = useRouter()
  const [Items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signup")
    },
  })

  useEffect(() => {
    fetch("/api/userHistory")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch(setLoading(false))
  }, [])

  // Loading session
  if (status === "loading" || loading == true) {
    return <Loader />
  }

  console.log(Items)

  return (
    <div className={styles.container}>
      <Layout user={session.user}>
        <div className={styles.main}>
          <div className={styles.eachOrder}>asd</div>
        </div>
      </Layout>
    </div>
  )
}
