import Layout from "src/components/UserProfileLayout"
import styles from "src/styles/pages/user/SellingOrders.module.scss"
import FirstProduct from "src/components/FirstProduct"
import ActivateSeller from "src/components/ActivateSeller"
import YourProduct from "src/components/YourProduct"
import { getSession } from "next-auth/react"
import dbConnect from "src/lib/dbConnect"
import User from "src/models/User"
import AddProductBox from "src/components/AddProductBox"

export default function SellingOrders({ user }) {
  return (
    <div className={styles.container}>
      <Layout user={user}>
        {user.isSeller ? (
          <FirstProduct />
        ) : (
          <ActivateSeller name={user.name} email={user.email} />
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

  if (session) {
    await dbConnect()
    const leanResponse = await User.findOne(
      {
        name: session.user.name,
        email: session.user.email,
      },
      { _id: 0 }
    ).lean()

    return {
      props: {
        user: leanResponse,
      },
    }
  } else {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    }
  }
}
