import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/SellingOrders.module.scss"
import FirstProduct from "src/components/FirstProduct"
import ActivateSeller from "src/components/ActivateSeller"
import YourProduct from "src/components/YourProduct"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import AddProductBox from "src/components/AddProductBox"

export default function SellingOrders({data}) {
  const router = useRouter()
  console.log(data[0])
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signup")
    },
  })

  // Loading session
  if (status === "loading") {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <Layout>
        {data[0].isSeller ? (
          <FirstProduct />
        ) : (
          <ActivateSeller name={data[0].name} email={data[0].email} />
        )}
        {/* <AddProductBox/> 
        <YourProduct/> */}
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    }
  }

  await dbConnect()
  const response = await User.find({
    name: session.user.name,
    email: session.user.email,
  })
  const data = JSON.parse(JSON.stringify(response))
  return {
    props: {
      data,
    },
  }
}
