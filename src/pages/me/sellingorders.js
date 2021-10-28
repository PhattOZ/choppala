import Layout from "src/components/UserProfileLayout"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "src/styles/pages/user/ManageStore.module.scss"
import FirstProduct from "src/components/FirstProduct"

export default function SellingOrders() {
//     const router = useRouter()
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push("/signup")
//     },
//   })

//   // Loading session
//   if (status === "loading") {
//     return (
//       <>
//       <h1>Loading...</h1>
//       </>
//     )
//   }

  return (
    <div className={styles.container}>
      <Layout>
          <FirstProduct/>
      </Layout>
    </div>
  )
}
