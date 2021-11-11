import styles from "src/styles/pages/user/PurchaseHistory.module.scss"
import { useSession } from "next-auth/react"
import Layout from "src/components/UserProfileLayout"
import Loader from "src/components/Loader"
import { useRouter } from "next/router"

export default function Profile() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signup")
    },
  })

  // Loading session
  if (status === "loading") {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <Layout user={session.user}>
        <div className={styles.main}>
          
        </div>
      </Layout>
    </div>
  )
}
