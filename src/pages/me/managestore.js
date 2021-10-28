import Layout from "src/components/UserProfileLayout"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "src/styles/pages/user/ManageStore.module.scss"
import ActivateSeller from "src/components/ActivateSeller"
import Store from "src/components/Store"
import { useSession } from "next-auth/react"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import { getSession } from "next-auth/react"

export default function ManageStore({ data }) {
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
          <Store/>
        ) : (
          <ActivateSeller name={data[0].name} email={data[0].email} />
        )}
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  if (!session){
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      },
    }
  }
 
  await dbConnect()
  const response = await User.find({ name: session.user.name, email: session.user.email })
  const data = JSON.parse(JSON.stringify(response))
  return {
    props: {
      data,
    },
  }
}
